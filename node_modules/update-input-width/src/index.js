const allowedVariants = [
  'normal',
  'small-caps',
];

/**
 * Gets font CSS shorthand property given element.
 *
 * @param {HTMLElement} element Element to get font CSS shorthand property from
 */
export function getFontShorthand(element) {
  const style = window.getComputedStyle(element);

  if (style.font) {
    return style.font;
  }

  const isFontDefined = style['font-family'] !== '';

  if (!isFontDefined) {
    return '';
  }

  const fontVariant = allowedVariants.includes(style['font-variant']) ? style['font-variant'] : 'normal';

  return `${style['font-style']} ${fontVariant} ${style['font-weight']} ${style['font-size']} / ${style['line-height']} ${style['font-family']}`;
}

/**
 * Measures text width given text and font CSS shorthand.
 *
 * @param {String} text Text to measure
 * @param {String} font Font to use when measuring the text
 */
export function measureText(text, font) {
  const canvas = measureText.canvas || (measureText.canvas = document.createElement('canvas'));
  const context = canvas.getContext('2d');

  // Context type not supported
  if (!context) {
    return null;
  }

  context.font = font;
  const { width } = context.measureText(text);

  return Math.ceil(width);
}

/**
 * Updates input element width to fit its content given input element
 * @param {HTMLInputElement} element
 */
export function updateInputWidth(element) {
  if (typeof window === 'undefined') {
    return null;
  }

  const font = getFontShorthand(element);
  const text = element.value || element.placeholder;
  const width = measureText(text, font);

  if (width === null) {
    return null;
  }

  element.style.width = `${width}px`;
  return width;
}

export default updateInputWidth;
