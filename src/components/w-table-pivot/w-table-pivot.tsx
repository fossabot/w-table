import { Component, Prop, State } from '@stencil/core';
import { Pivot } from '../../model/input/pivot';
import { RowService } from '../w-table-row/w-row-service';
import { Column } from '../../model/input/column';
import { SelectedOrderingEvent } from '../../model/events/selected-ordering';

@Component({
    tag: 'w-table-pivot',
    styleUrl: 'w-table-pivot.scss'
})
export class WTablePivot {

    @Prop()
    key: any;

    @Prop()
    groupItems: Array<any>;

    @Prop()
    columns: Array<Column>;

    @Prop()
    currentOrdering: SelectedOrderingEvent;

    @Prop()
    pivot?: Pivot;

    @State()
    isOpen: boolean;

    render(): JSX.Element {
        let pivotHeadContent = this.pivot && this.pivot.element(this.key, this.groupItems);
        if (!(pivotHeadContent instanceof Element)) {
            pivotHeadContent = (<span>{pivotHeadContent}</span>);
        }
        return (
            <div class="pivot">
                <div class="pivot-head" onClick={() => this.isOpen = !this.isOpen}>{pivotHeadContent}</div>
                <div class="pivot-rows" style={{ display: this.isOpen ? 'block' : 'none' }}>{RowService.simpleRowOutput(this.groupItems, this.columns)}</div>
            </div>
        );
    }
}