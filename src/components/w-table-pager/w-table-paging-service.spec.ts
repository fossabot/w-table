import { Pagination } from "../../model/input/pagination";
import { PagingService } from "./w-table-paging-service";

describe('PagingService', () => {

    it('should return items per page', () => {
        let pagination: Pagination = {
            startOfPage: 0,
            startOfSelectIndex: 0,
            steps: [10, 20]
        } as Pagination

        expect(PagingService.getItemsPerPage(pagination)).toBe(10);
    });

    it('should return undefined items per page', () => {
        let pagination: Pagination = {
            startOfPage: 0,
            startOfSelectIndex: 3,
            steps: [10, 20]
        } as Pagination

        expect(PagingService.getItemsPerPage(pagination)).toBeFalsy();
    });

    it('should return index for first page', () => {
        let pagination: Pagination = {
            startOfPage: 0,
            startOfSelectIndex: 0,
            steps: [10, 20]
        } as Pagination

        expect(PagingService.getCurrentItemIndex(pagination)).toBe(0);
    });

    it('should return index for any page', () => {
        let pagination: Pagination = {
            startOfPage: 4,
            startOfSelectIndex: 0,
            steps: [10, 20]
        } as Pagination

        expect(PagingService.getCurrentItemIndex(pagination)).toBe(40);
    });

    it('should return current grouped page - first page', () => {
        let pagination: Pagination = {
            startOfPage: 0,
            startOfSelectIndex: 0,
            steps: [1]
        } as Pagination

        let group: Map<any, Array<any>> = new Map([["1", ["test0", "test1"]], ["2", ["test2"]]]);

        expect(PagingService.getCurrentPageForGroup(pagination, group)).toEqual(new Map([["1", ["test0"]]]));
    });

    it('should return current grouped page - second page', () => {
        let pagination: Pagination = {
            startOfPage: 1,
            startOfSelectIndex: 0,
            steps: [1]
        } as Pagination

        let group: Map<any, Array<any>> = new Map([["1", ["test0", "test1"]], ["2", ["test2"]]]);

        expect(PagingService.getCurrentPageForGroup(pagination, group)).toEqual(new Map([["1", ["test1"]]]));
    });

    it('should return current grouped page - third page', () => {
        let pagination: Pagination = {
            startOfPage: 2,
            startOfSelectIndex: 0,
            steps: [1]
        } as Pagination

        let group: Map<any, Array<any>> = new Map([["1", ["test0", "test1"]], ["2", ["test2"]]]);

        expect(PagingService.getCurrentPageForGroup(pagination, group)).toEqual(new Map([["2", ["test2"]]]));
    });

    it('should return current grouped page - more than one group on page', () => {
        let pagination: Pagination = {
            startOfPage: 1,
            startOfSelectIndex: 0,
            steps: [3]
        } as Pagination

        let group: Map<any, Array<any>> = new Map([["1", ["test0", "test1"]], ["2", ["test2", "test3"]], ["3", ["test4", "test5"]]]);

        expect(PagingService.getCurrentPageForGroup(pagination, group)).toEqual(new Map([["2", ["test3"]], ["3", ["test4", "test5"]]]));
    });
});