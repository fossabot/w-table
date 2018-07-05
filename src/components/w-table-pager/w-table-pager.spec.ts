import { TestWindow } from '@stencil/core/testing';
import { WTablePager } from './w-table-pager';

describe('WTablePager', () => {
    it('should build', () => {
        expect(new WTablePager()).toBeTruthy();
    });

    describe('rendering', () => {

        let element: HTMLWTablePagerElement;
        let testWindow: TestWindow;

        beforeEach(async () => {
            testWindow = new TestWindow();
            element = await testWindow.load({
                components: [WTablePager],
                html: '<w-table-pager></w-table-pager>'
            });
        });

        it('should not render any content if there is not a match', async () => {
            await testWindow.flush();
            expect(element.textContent).toEqual('');
        });
    });
});