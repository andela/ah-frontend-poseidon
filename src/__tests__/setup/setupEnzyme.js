import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

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

export { shallow, mount, render };
