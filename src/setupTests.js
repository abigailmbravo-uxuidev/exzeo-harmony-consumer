import '@testing-library/jest-dom/extend-expect';
import { configure as reactTestingConfigure } from '@testing-library/react';

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
