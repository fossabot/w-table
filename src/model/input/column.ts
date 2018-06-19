import { Header } from "./header";
import { Ordering } from "./ordering";

export class Column {
    header: Header;
    width?: number;
    accessor: (item: any) => string | string;
    element?: (value: string, item: any) => JSX.Element | string;
    ordering?: Ordering;
    filter?: (item: any) => boolean
}