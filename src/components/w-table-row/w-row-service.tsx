import { Column } from "../../model/input/column";

export class RowService {
    static simpleRowOutput(items: Array<any>, columns: Array<Column>): Array<JSX.Element> {
        return items && items.map((item) => <w-table-row item={item} columns={columns}></w-table-row>);
    }
}