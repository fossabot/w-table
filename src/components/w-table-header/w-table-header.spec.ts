import { TestWindow } from '@stencil/core/testing';
import { WTableHeader } from './w-table-header';

describe('WTableHeader', () => {
    it('should build', () => {
        expect(new WTableHeader()).toBeTruthy();
    });

    describe('rendering', () => {

        let element: HTMLWTableHeaderElement;
        let testWindow: TestWindow;

        beforeEach(async () => {
            testWindow = new TestWindow();
            element = await testWindow.load({
                components: [WTableHeader],
                html: '<w-table-header></w-table-header>'
            });
        });

        it('should not render any content if there is not a match', async () => {
            await testWindow.flush();
            expect(element.textContent).toEqual('');
        });
    });
});