import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import { Pagination } from '../../model/input/pagination';

@Component({
    tag: 'w-table-pager',
    styleUrl: 'w-table-pager.scss'
})
export class WTablePager {

    @Prop()
    total: number;

    @Prop()
    pagination: Pagination;

    @Event()
    itemsPerPageChange: EventEmitter;

    @Event()
    pageChange: EventEmitter;

    render(): JSX.Element {
        return (
            <div class="pager">
                <div class="prev"></div>
                <input name="pagenumber" type="number" min="1" max={this.total} value={this.pagination.startOfPage + 1} onChange={(event: UIEvent) => this.selectPage(event)}></input>
                / {this.total}
                <div class="next"></div>
                <select name="steps" onChange={(event: UIEvent) => this.changeAmount(event)}>
                    {this.pagination.steps.map((option, i) => {
                        return (<option value={i}>{option}</option>)
                    })}
                </select>
            </div>
        );
    }

    changeAmount(event: UIEvent) {
        this.itemsPerPageChange.emit((event.target as HTMLSelectElement).value);
    }

    selectPage(event: UIEvent) {
        this.pageChange.emit(parseInt((event.target as HTMLInputElement).value) - 1);
    }
}
