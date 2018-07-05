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
        return this.pagination ? (
            <div class="pager">
                <div class="prev" onClick={() => this.prev()}>&#9664;</div>
                <div class="pagenumber"><input name="pagenumber" type="number" min="1" max={this.total} value={this.pagination.startOfPage + 1} onChange={(event: UIEvent) => this.selectPage(event)}></input>
                / {this.total}</div>
                <div class="next" onClick={() => this.next()}>&#9654;</div>
                <div class="steps">
                    <select name="steps" onChange={(event: UIEvent) => this.changeAmount(event)}>
                        {this.pagination.steps.map((option, i) => {
                            return (<option value={i}>{option}</option>)
                        })}
                    </select>
                </div>
            </div>
        ) : (<div class="pager"></div>);
    }

    prev() {
        this.pageChange.emit(
            this.checkSelectedPageInRange(this.pagination.startOfPage - 1)
        );
    }

    next() {
        this.pageChange.emit(
            this.checkSelectedPageInRange(this.pagination.startOfPage + 1)
        );
    }

    selectPage(event: UIEvent) {
        this.pageChange.emit(
            this.checkSelectedPageInRange(
                parseInt((event.target as HTMLInputElement).value) - 1
            )
        );
    }

    private checkSelectedPageInRange(selectedPage: number): number {
        let lowerEnd = selectedPage < 0 ? 0 : selectedPage;
        let upperEnd = lowerEnd < this.total ? lowerEnd : this.total - 1;
        return upperEnd;
    }

    changeAmount(event: UIEvent) {
        this.itemsPerPageChange.emit((event.target as HTMLSelectElement).value);
    }
}
