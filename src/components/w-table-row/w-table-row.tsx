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

    render(): JSX.Element {
        return (
            <div class="row">
                {
                    this.columns.map((column: Column) => {
                        let value = this.getCellValueForItem(this.item, column.accessor);
                        return (column.element
                            ? <div class="column" style={{ flex: column.width.toString() }}>{column.element(value, this.item)}</div>
                            : <div class="column" style={{ flex: column.width.toString() }}>{value}</div>)
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