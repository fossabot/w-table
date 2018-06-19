export class Header {
    title?: string;
    element?: (header: Header) => JSX.Element | string;
}