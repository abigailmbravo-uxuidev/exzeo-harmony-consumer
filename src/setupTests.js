import '@testing-library/jest-dom/extend-expect';
import { configure as reactTestingConfigure } from '@testing-library/react';

// Initialize the fontAwesome library so we don't need to mock the FontAwesomeIcon component.
import './fontAwesomeInit';

reactTestingConfigure({ testIdAttribute: 'data-test' });

const localStorageMock = {
  setItem(key, value) {
    // eslint-disable-next-line no-undef
    storage[key] = String(value) || '';
  },
  getItem(key) {
    // eslint-disable-next-line no-undef
    return key in storage ? String(storage[key]) : null;
  },
  removeItem(key) {
    // eslint-disable-next-line no-undef
    storage[key] = null;
  }
};

global.localStorage = localStorageMock;

export default localStorageMock;
