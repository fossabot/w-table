import { Column } from "../input/column";

export class FilterChangeEvent {
    readonly column: Column;
    readonly filter: (item: any) => boolean;
    readonly value: string;

    constructor(column: Column, filter: (item: any) => boolean, value: string) {
        this.column = column;
        this.filter = filter;
        this.value = value;
    }
}