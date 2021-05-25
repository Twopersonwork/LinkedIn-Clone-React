[![npm](https://img.shields.io/npm/v/update-input-width.svg)](https://www.npmjs.com/package/update-input-width) ![downloads](https://img.shields.io/npm/dt/update-input-width.svg) ![build](https://img.shields.io/travis/wojtekmaj/update-input-width/master.svg) ![dependencies](https://img.shields.io/david/wojtekmaj/update-input-width.svg) ![dev dependencies](https://img.shields.io/david/dev/wojtekmaj/update-input-width.svg) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

# Update-Input-Width
A function that given input element, updates its width to fit its content.

## tl;dr
* Install by executing `npm install update-input-width` or `yarn add update-input-width`.
* Import by adding `import updateInputWidth from 'update-input-width'`.
* Pass input element to it. Forget.

## User guide

### `updateInputWidth(element: HTMLInputElement)`

A function that given input element, updates its width to fit its content by setting inline `width` CSS property.

#### Sample result

```js
42
```

#### Usage

```js
import updateInputWidth from 'update-input-width';
```

or

```js
import { updateInputWidth } from 'update-input-width';
```

### `getFontShorthand(element: HTMLElement)`

A function that given HTML element returns font CSS shorthand property. Equal to Chrome-only code:

```js
window.getComputedStyle(element).font
```

#### Sample result

```js
"normal normal 600 normal 20px / 25px Arial, sans-serif"
```

#### Usage

```js
import { getFontShorthand } from 'update-input-width';
```

### `measureText(text: string, font: string)`

A function that given text and font CSS shorthand property returns text width in pixels.

#### Sample result

```js
42
```

#### Usage

```js
import { measureText } from 'update-input-width';
```

## License

The MIT License.

## Author

<table>
  <tr>
    <td>
      <img src="https://github.com/wojtekmaj.png?s=100" width="100">
    </td>
    <td>
      Wojciech Maj<br />
      <a href="mailto:kontakt@wojtekmaj.pl">kontakt@wojtekmaj.pl</a><br />
      <a href="http://wojtekmaj.pl">http://wojtekmaj.pl</a>
    </td>
  </tr>
</table>
