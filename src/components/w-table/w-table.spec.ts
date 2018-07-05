import { TestWindow } from '@stencil/core/testing';
import { WTable } from './w-table';

describe('WTable', () => {
    it('should build', () => {
        expect(new WTable()).toBeTruthy();
    });

    describe('rendering', () => {

        let element: HTMLWTableElement;
        let testWindow: TestWindow;

        beforeEach(async () => {
            testWindow = new TestWindow();
            element = await testWindow.load({
                components: [WTable],
                html: '<w-table></w-table>'
            });
        });

        it('should not render any content if there is not a match', async () => {
            await testWindow.flush();
            expect(element.textContent).toEqual('');
        });
    });
});