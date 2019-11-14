<p align="center">
<a href="https://ajainvivek.github.io/tiny-print/" target="_blank">
<img alt="TinyPrint" title="TinyPrint" src="https://image.flaticon.com/icons/svg/1497/1497542.svg" height="200">
</a>
</p>
<p align="center">Tiny print is a tiny javascript library (less than 1kb) to help printing targeted HTML element.</p>

## Installation

TinyPrint is available as an [npm package](https://www.npmjs.com/package/tiny-print).

```sh
npm install tiny-print --save
```

## Usage

```js
import tinyPrint from "tiny-print";

tinyPrint(element, {
  scanStyles: BOOLEAN, // Default: true, scans computed styles from dom for that specific node, recommended
  scanHTML: BOOLEAN, // Default: false, scans styles and links from current html page, disable scanStyles if scanHTML is enabled
  importStyles: ARRAY, // Default: [], imports external stylesheet eg: https://cdn.com/style.css
  cssStyle: STRING, // Default: '', custom css styles eg; `.title { font-size: 14px; }`
  hidePageRule: BOOLEAN // Default: false, hide print page rule i.e page title, footer etc
});
```

## Demo

Please refer the [DEMO](https://printme.netlify.com/#/).

## Contributing

We'd greatly appreciate any contribution you make. :D

## License

This project is licensed under the terms of the
[MIT license](https://github.com/ajainvivek/tiny-print/blob/v1-beta/LICENSE).
