/**
 * Dynamically computes the element styles
 *
 * @param {*} element - element to compute style
 * @param {*} computed - computed output
 */
const getComputedStyles = (element, computed) => {
    let node = element;
    const computedStyle = window.getComputedStyle(element).cssText;

    if (element.children.length === 0) {
        node.style.cssText = computedStyle;

        return node;
    } else {
        node.style.cssText = computedStyle;
    }
    Array.from(node.children).forEach(child => {
        return getComputedStyles(child, node);
    });

    return node;
};

/**
 * Print HTML element with configurable options
 * @param {*} element = element to be printed
 * @param {*} options = configurable print options
 */
const tinyPrint = (
    element,
    {
        scanStyles = true,
        importStyles = false,
        cssStyle = '',
        hidePageRule = true,
    }
) => {
    if (!element.nodeName) {
        console.warn('Invalid DOM element passed!');
        return;
    }
    const iframe = document.createElement('iframe');
    let printElement = element.cloneNode(true);
    let printContainer = document.querySelector('.tiny-print-container');

    // check if print container exists
    if (!printContainer) {
        // create the print container
        printContainer = document.createElement('div');
        printContainer.classList.add('tiny-print-container');
        printContainer.style.display = 'none';
        document.body.appendChild(printContainer);
    }

    // if scanning is enabled then fetch computed styles
    if (scanStyles) {
        printContainer.style.display = 'block';
        printContainer.appendChild(printElement);
        printElement = getComputedStyles(printElement);
        printContainer.style.display = 'none';
    }
    const printHTML = printElement.outerHTML;

    // clean the print container
    printContainer.innerHTML = '';
    // append print iframe content
    printContainer.appendChild(iframe);
    // open iframe content
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(printHTML);

    const iframeHead = iframe.contentWindow.document.querySelector('head');
    // if import styles is enabled then append styles to the head
    if (importStyles) {
        const styles = document.querySelectorAll('style');
        // inject styles to iframe head
        styles.forEach(style => {
            const node = style.cloneNode(true);
            iframeHead.appendChild(node);
        });
    }

    // if custom css style
    if (cssStyle) {
        const customStyleNode = document.createElement('style');
        customStyleNode.innerHTML = cssStyle;
        iframeHead.appendChild(customStyleNode);
    }

    // if hide page rule
    if (hidePageRule) {
        const pageRuleStyleNode = document.createElement('style');
        pageRuleStyleNode.innerHTML = '@page { size: auto;  margin: 0mm; }';
        iframeHead.appendChild(pageRuleStyleNode);
    }

    iframe.contentWindow.print();
    iframe.contentWindow.document.close();
};

export default tinyPrint;
