import { Pagination } from "../../model/input/pagination";

export class PagingService {
    public static getItemsPerPage(pagination: Pagination): number {
        return pagination && pagination.steps.length >= pagination.startOfSelectIndex && pagination.steps[pagination.startOfSelectIndex];
    }

    public static getCurrentItemIndex(pagination: Pagination): number {
        return pagination && pagination.startOfPage * PagingService.getItemsPerPage(pagination);
    }

    public static getCurrentPageForGroup(pagination: Pagination, groups: Map<any,Array<any>>, orderedKeys?: Array<any>): Map<any,any> {
        let page: Map<any,any> = new Map();

        const itemsPerPage = PagingService.getItemsPerPage(pagination);
        const startItemIndex = PagingService.getCurrentItemIndex(pagination);
        let itemCount = 0;
        let overAllCount = 0;

        let keys: Array<any> = orderedKeys ? orderedKeys : Array.from(groups.keys());
        for (let i = 0; i < keys.length; i++) {
            let groupItems = groups.get(keys[i]);
            let groupItemCount = groupItems.length;
            let inGroupItemsIndexStart = startItemIndex - overAllCount + itemCount;
            let inGroupItemsIndexEnd = inGroupItemsIndexStart + (itemsPerPage - itemCount) > groupItemCount ? groupItemCount : inGroupItemsIndexStart + (itemsPerPage - itemCount) ;
            overAllCount = overAllCount + groupItemCount;

            if (inGroupItemsIndexStart >= 0 && inGroupItemsIndexStart < inGroupItemsIndexEnd) {
                itemCount = itemCount + inGroupItemsIndexEnd - inGroupItemsIndexStart;
                page.set(keys[i], groupItems.slice(inGroupItemsIndexStart, inGroupItemsIndexEnd));
            }
            if (itemCount == itemsPerPage) {
                return page;
            }
        }
        return page;
    }
}