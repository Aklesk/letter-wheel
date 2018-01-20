import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';

Enzyme.configure({ adapter: new Adapter() });

global.document = new JSDOM('');
global.window = global.document.defaultView;
Object.keys(global.document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = global.document.defaultView[property];
  }
});

// Suppress warnings about View from the non-native React parsers in jsdom
const { error } = console;
const jsdomWarning1 = new RegExp(/Warning:.*Always use lowercase HTML tags in React\./);
const jsdomWarning2 = new RegExp(/Warning:.*If you meant to render a React component, start its name with an uppercase letter./);
console.error = (...args) => { // eslint-disable-line no-console
  if (args[0].match(jsdomWarning1) || args[0].match(jsdomWarning2)) {
    return null;
  }
  return error(...args);
};
