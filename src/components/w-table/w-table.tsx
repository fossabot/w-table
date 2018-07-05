import { Component, Prop, Listen, State, Watch } from '@stencil/core';
import { Pivot } from '../../model/input/pivot';
import { Column } from '../../model/input/column';
import { Pagination } from '../../model/input/pagination';
import { SelectedOrderingEvent } from '../../model/events/selected-ordering';
import { RowService } from '../w-table-row/w-row-service';
import { PagingService } from '../w-table-pager/w-table-paging-service';

@Component({
    tag: 'w-table',
    styleUrl: 'w-table.scss',
    shadow: true
})
export class WTable {

    /**
     * all items that should be displayed in the table.
     */
    @Prop()
    items: Array<any>;

    /**
     * column definitions.
     */
    @Prop()
    columns: Array<Column>;

    /**
     * pagination definition.
     */
    @Prop()
    pagination: Pagination = ({
        startOfPage: 0,
        startOfSelectIndex: 0,
        steps: [10, 20, 50, 100]
    } as Pagination);

    /**
     * pivot definition.
     */
    @Prop()
    pivot?: Pivot;

    /**
     * element for additional row details or other interactions.
     */
    @Prop()
    rowDetails?: (item: any) => JSX.Element | string;

    @State()
    private currentOrdering: SelectedOrderingEvent;

    @State()
    itemsMod: Array<any>;

    @State()
    groups: Map<any, any>;

    @State()
    paginationMod: Pagination;

    @Watch('items')
    itemsChanged(newValue: Array<any>) {
        if (this.currentOrdering) {
            this.itemsMod = this.itemsMod && newValue.sort(this.currentOrdering.ordering).map((item) => item);
        } else {
            this.itemsMod = newValue;
        }
    }

    @Watch('pagination')
    paginationChanged(newValue: Pagination) {
        this.paginationMod = newValue;
    }

    @Watch('pivot')
    pivotChanged() {
        this.pivotyze();
    }

    componentWillLoad() {
        if (!this.itemsMod) {
            this.itemsMod = this.items && this.items.map((item) => item);
        }
        if (!this.paginationMod) {
            this.paginationMod = this.pagination;
        }
        this.groups = this.pivotyze();
    }

    @Listen('orderingSelected')
    changeOrdering(event: CustomEvent) {
        this.currentOrdering = event.detail;
        this.itemsMod = this.items.sort(this.currentOrdering.ordering).map((item) => item);
    }

    @Listen('pageChange')
    changePage(event: CustomEvent) {
        this.paginationMod = { ...this.paginationMod, startOfPage: parseInt(event.detail) };
        event.stopPropagation();
    }

    @Listen('itemsPerPageChange')
    changeItemsPerPage(event: CustomEvent) {
        //TODO shift to page containing similar first item than the current one.
        this.paginationMod = { ...this.paginationMod, startOfSelectIndex: parseInt(event.detail) };
        event.stopPropagation();
    }

    render(): JSX.Element {
        return (
            <div class="table">
                <w-table-header columns={this.columns}></w-table-header>
                {
                    this.groups
                        ? this.pivotOutput(PagingService.getCurrentPageForGroup(this.paginationMod, this.groups))
                        : RowService.simpleRowOutput(
                            this.itemsMod ? this.itemsMod.slice(PagingService.getCurrentItemIndex(this.paginationMod), PagingService.getCurrentItemIndex(this.paginationMod) + PagingService.getItemsPerPage(this.paginationMod)) : [],
                            this.columns
                        )
                }
                <w-table-pager total={this.itemsMod && Math.ceil(this.itemsMod.length / PagingService.getItemsPerPage(this.paginationMod))} pagination={this.paginationMod}></w-table-pager>
            </div>
        );
    }

    pivotOutput(groups: Map<any, any>): Array<JSX.Element> {
        const groupedRows: Array<JSX.Element> = [];

        groups.forEach((groupItems: Array<any>, key: any) => {
            groupedRows.push(
                <w-table-pivot key={key} groupItems={groupItems} columns={this.columns} currentOrdering={this.currentOrdering} pivot={this.pivot}></w-table-pivot>
            )
        });
        return groupedRows;
    }

    pivotyze(): Map<any, any> {
        if (this.pivot && this.pivot.groupingFunction) {
            return this.pivot.groupingFunction(this.itemsMod, this.pivot.accessor)
        } else {
            return undefined;
        }
    }
}
