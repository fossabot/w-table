import { Column } from "../input/column";

export class SelectedOrderingEvent {
    readonly column: Column;
    readonly ordering: (item1, item2) => number;

    constructor(column: Column, ordering: (item1, item2) => number) {
        this.column = column;
        this.ordering = ordering;
    }
}