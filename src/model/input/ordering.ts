export class Ordering {
    ascending?: (item1, item2) => number;
    descending?: (item1, item2) => number;
}