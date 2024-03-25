export function createAndAppend(parent: HTMLDivElement, elementName: string, textContent: any): HTMLElement {

    const element = document.createElement(elementName);
    if (elementName != 'div' && elementName != 'img') element.innerText = textContent;

    parent.append(element);

    return element;
};


// Såhär funkar denna:
// du hämtar en klass/id från html med queryselector ex "postSection"
// för att sedan ska ett "postCard" som är en div:
// const postCard = createAndAppend(postSection, 'div')
// const postCardTitle = createAndAppend(postCard, 'h3', 'Detta är titelm')
// const postCardText = createAndAppend(postCard, 'p', 'Detta är textinnehållet i posten')