import datastore from './datastore';
import defineData from './defineData';

export default {
  defineData,
  ...datastore,
  test(a, b) {
    return a + b;
  }
};
