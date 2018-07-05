import { Component, Prop } from '@stencil/core';
import { Column } from '../../model/input/column';

@Component({
    tag: 'w-table-row',
    styleUrl: 'w-table-row.scss'
})
export class WTableRow {

    @Prop()
    item: any;

    @Prop()
    columns: Array<Column>;

    @Prop()
    isSelected: boolean;

    render(): JSX.Element {
        return (
            <div class="row">
                {
                    this.columns && this.columns.map((column: Column) => {
                        let value = this.getCellValueForItem(this.item, column.accessor);
                        return (column.element
                            ? <div class="column" style={{ flex: (column.width ? column.width.toString() : "1") }}>{column.element(value, this.item)}</div>
                            : <div class="column" style={{ flex: (column.width ? column.width.toString() : "1") }}>{value}</div>)
                    })
                }
            </div>
        );
    }

    private getCellValueForItem(item: any, accessor: (item: any) => string | string) {
        if (accessor instanceof Function) {
            return accessor(item);
        } else {
            return item[accessor];
        }
    }
}