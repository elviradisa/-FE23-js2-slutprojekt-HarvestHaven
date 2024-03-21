export function createAndAppend(parent: HTMLDivElement, elementName: string, textContent: string): HTMLElement {

    const element = document.createElement(elementName);
    if (elementName != 'div' && elementName != 'img') element.innerText = textContent;

    parent.append(element);

    return element;
};


