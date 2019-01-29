import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';

Enzyme.configure({ adapter: new Adapter() });

Object.defineProperty(global.document, 'getElementById', {
  value: jest.fn(() => ({ innerHTML: ['none'] })),
  writable: true
});

Object.defineProperty(global.document, 'execCommand', {
  value: jest.fn(),
  writable: true,
});

Object.defineProperty(global, 'prompt', { value: jest.fn(() => ['none']) });

fontawesome.library.add(solid, regular);

global.fontawesome = fontawesome;

export { shallow, mount, render };
