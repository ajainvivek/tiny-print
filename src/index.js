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
const tinyPrint = (element, options) => {
    if (!element.nodeName) {
        console.warn('Invalid DOM element passed!');
        return;
    }
    const {
        scanStyles = true,
        importStyles = [],
        scanHTML = false,
        cssStyle = '',
        hidePageRule = false,
    } = options;
    const iframe = document.createElement('iframe');
    let printElement = element.cloneNode(true);
    let printContainer = document.querySelector('.tiny-print-container');

    // check if print container exists
    if (!printContainer) {
        // create the print container
        printContainer = document.createElement('div');
        printContainer.classList.add('tiny-print-container');
        printContainer.style.cssText = 'width: 100%; height: 100%;';
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
    // scan html then import all available styles then append styles to the head
    if (scanHTML) {
        const styles = document.querySelectorAll('style');
        const links = document.querySelectorAll('link[type="text/css"]');
        // inject styles to iframe head
        styles.forEach(style => {
            const node = style.cloneNode(true);
            iframeHead.appendChild(node);
        });
        // inject linked css
        links.forEach(link => {
            const node = link.cloneNode(true);
            iframeHead.appendChild(node);
        });
    }

    // import external stylesheet links
    if (importStyles.length > 0) {
        importStyles.forEach(url => {
            const link = document.createElement('link');
            link.setAttribute('type', 'text/css');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('href', url);
            iframeHead.appendChild(link);
        });
    }

    // custom css style
    if (cssStyle) {
        const customStyleNode = document.createElement('style');
        customStyleNode.innerHTML = cssStyle;
        iframeHead.appendChild(customStyleNode);
    }

    // hide page rule
    if (hidePageRule) {
        const pageRuleStyleNode = document.createElement('style');
        pageRuleStyleNode.innerHTML = '@page { size: auto;  margin: 0mm; }';
        iframeHead.appendChild(pageRuleStyleNode);
    }

    iframe.contentWindow.print();
    iframe.contentWindow.document.close();
};

export default tinyPrint;
