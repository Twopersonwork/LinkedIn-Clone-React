import updateInputWidthDefault, {
  updateInputWidth,
  getFontShorthand,
  measureText,
} from './index';

it('exports updateInputWidth() by default', () => {
  expect(updateInputWidthDefault).toBeDefined();
  expect(updateInputWidthDefault).toBe(updateInputWidth);
});

describe('updateInputWidth()', () => {
  it('sets valid width given empty input with placeholder', () => {
    const element = document.createElement('input');
    element.style.fontFamily = 'Arial';
    element.style.fontSize = '20px';

    const result = updateInputWidth(element);

    expect(result).toEqual(expect.any(Number));
  });
});

describe('getFontShorthand()', () => {
  it('returns valid font shorthand for a given element', () => {
    const element = document.createElement('input');
    element.style.fontFamily = 'Arial';
    element.style.fontSize = '20px';

    const result = getFontShorthand(element);

    expect(result).toEqual(expect.any(String));
  });

  it('returns valid font shorthand if given font', () => {
    jest.spyOn(global.window, 'getComputedStyle').mockImplementation(() => ({
      font: 'normal normal 400 20px / 25px Arial',
      'font-family': 'Arial',
      'font-size': '20px',
      'font-style': 'normal',
      'font-variant': 'normal',
      'font-weight': '400',
      'line-height': '25px',
    }));

    const element = document.createElement('input');
    const result = getFontShorthand(element);

    expect(result).toBe('normal normal 400 20px / 25px Arial');

    global.window.getComputedStyle.mockClear();
  });

  it('returns valid font shorthand if not given font', () => {
    jest.spyOn(global.window, 'getComputedStyle').mockImplementation(() => ({
      font: '',
      'font-family': 'Arial',
      'font-size': '20px',
      'font-style': 'normal',
      'font-variant': 'normal',
      'font-weight': '400',
      'line-height': '25px',
    }));

    const element = document.createElement('input');
    const result = getFontShorthand(element);

    expect(result).toBe('normal normal 400 20px / 25px Arial');

    global.window.getComputedStyle.mockClear();
  });

  it('returns valid font shorthand if given allowed font-variant', () => {
    jest.spyOn(global.window, 'getComputedStyle').mockImplementation(() => ({
      font: '',
      'font-family': 'Arial',
      'font-size': '20px',
      'font-style': 'normal',
      'font-variant': 'small-caps',
      'font-weight': '400',
      'line-height': '25px',
    }));

    const element = document.createElement('input');
    const result = getFontShorthand(element);

    expect(result).toBe('normal small-caps 400 20px / 25px Arial');

    global.window.getComputedStyle.mockClear();
  });

  it('returns valid font shorthand if given allowed font-variant', () => {
    jest.spyOn(global.window, 'getComputedStyle').mockImplementation(() => ({
      font: '',
      'font-family': 'Arial',
      'font-size': '20px',
      'font-style': 'normal',
      'font-variant': 'tabular-nums',
      'font-weight': '400',
      'line-height': '25px',
    }));

    const element = document.createElement('input');
    const result = getFontShorthand(element);

    expect(result).toBe('normal normal 400 20px / 25px Arial');

    global.window.getComputedStyle.mockClear();
  });

  it('returns empty string for an element without styles', () => {
    jest.spyOn(global.window, 'getComputedStyle').mockImplementation(() => ({
      font: '',
      'font-family': '',
      'font-size': '',
      'font-style': '',
      'font-variant': '',
      'font-weight': '',
      'line-height': '',
    }));

    const element = document.createElement('input');
    const result = getFontShorthand(element);

    expect(result).toBe('');

    global.window.getComputedStyle.mockClear();
  });
});

describe('measureText()', () => {
  it('returns valid measurement given text and font CSS shorthand', () => {
    const text = 'Hello world';
    const font = 'normal normal 600 normal 20px / 25px Arial, sans-serif';

    const result = measureText(text, font);

    expect(result).toEqual(expect.any(Number));
  });
});
