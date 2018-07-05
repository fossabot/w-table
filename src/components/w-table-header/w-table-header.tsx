import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import { Column } from '../../model/input/column';
import { SelectedOrderingEvent } from '../../model/events/selected-ordering';

@Component({
    tag: 'w-table-header',
    styleUrl: 'w-table-header.scss'
})
export class WTableHeader {

    /**
     * column definitions.
     */
    @Prop()
    columns: Array<Column>;

    @Prop()
    activeOrdering: SelectedOrderingEvent;

    @Event()
    orderingSelected: EventEmitter;

    render(): JSX.Element {
        return (
            <div class="header">
                <div class="header-row">
                {
                    this.columns && this.columns.map((column: Column) => {
                        return (<div class="column" style={{ flex: column.width.toString() }}>
                            <div class="title">
                                {column.header.element ? column.header.element(column.header) : column.header.title}
                            </div>
                            <div class="ordering">
                                {column.ordering && column.ordering.ascending ? <div class="up" onClick={(event: UIEvent) => this.ascendingOrdering(event, column)}>&#9650;</div> : ""}
                                {column.ordering && column.ordering.descending ? <div class="down" onClick={(event: UIEvent) => this.descendingOrdering(event, column)}>&#9660;</div> : ""}
                            </div>
                        </div>)
                    })
                }
                </div>
            </div>
        );
    }

    //@ts-ignore
    ascendingOrdering(event: UIEvent, column: Column) {
        this.orderingSelected.emit(new SelectedOrderingEvent(column, column.ordering.ascending));
    }

    //@ts-ignore
    descendingOrdering(event: UIEvent, column: Column) {
        this.orderingSelected.emit(new SelectedOrderingEvent(column, column.ordering.descending));
    }
}
