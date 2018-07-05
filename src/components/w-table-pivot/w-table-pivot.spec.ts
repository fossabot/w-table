import { TestWindow } from '@stencil/core/testing';
import { WTablePivot } from "./w-table-pivot";

describe('WTablePivot', () => {
    it('should build', () => {
        expect(new WTablePivot()).toBeTruthy();
    });

    describe('rendering', () => {

        let element: HTMLWTablePivotElement;
        let testWindow: TestWindow;

        beforeEach(async () => {
            testWindow = new TestWindow();
            element = await testWindow.load({
                components: [WTablePivot],
                html: '<w-table-pivot></w-table-pivot>'
            });
        });

        it('should not render any content if there is not a match', async () => {
            await testWindow.flush();
            expect(element.textContent).toEqual('');
        });
    });
});