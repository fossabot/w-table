export class Pivot {
    element: (key: any, group: Array<any>) => JSX.Element | string;
    accessor?: (item) => any;
    /**
     * groupBy(items: Array<any>, accessor: (item) => any) {
     *      const grouped = new Map();
     *      items.forEach((item) => {
     *          const key: any = accessor(item);
     *          const currentGroup = grouped.get(key);
     *          if (!currentGroup) {
     *              grouped.set(key, [item]);
     *          } else {
     *              currentGroup.push(item);
     *          }
     *      });
     *      return grouped;
     * }
     */
    groupingFunction: (items: Array<any>, accessor?: (item) => any) => Map<any,any>
}