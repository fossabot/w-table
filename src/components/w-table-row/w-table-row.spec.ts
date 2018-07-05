import { TestWindow } from '@stencil/core/testing';
import { WTableRow } from './w-table-row';

describe('WTableRow', () => {
    it('should build', () => {
        expect(new WTableRow()).toBeTruthy();
    });

    describe('rendering', () => {

        let element: HTMLWTableRowElement;
        let testWindow: TestWindow;

        beforeEach(async () => {
            testWindow = new TestWindow();
            element = await testWindow.load({
                components: [WTableRow],
                html: '<w-table-row></w-table-row>'
            });
        });

        it('should not render any content if there is not a match', async () => {
            await testWindow.flush();
            expect(element.textContent).toEqual('');
        });

        /*
        it('should work with a name passed', async () => {
            element.

            await testWindow.flush();
            expect(element.textContent).toEqual(
                'Hello! My name is stencil. My name was passed in through a route param!'
            );
        });*/
    });
});