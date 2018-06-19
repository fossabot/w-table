import { storiesOf } from '@storybook/html';
import { columns } from './data/columns';
import { items } from './data/items';
import { pivot } from './data/pivot';

storiesOf('WTable', module)
    .add('simple', () => {
        const table = document.createElement('w-table');
        table.columns = columns;
        table.items = items;
        return table;
    })
    .add('pivot', () => {
        const table = document.createElement('w-table');
        table.columns = columns;
        table.items = items;
        table.pivot = pivot;
        return table;
    })