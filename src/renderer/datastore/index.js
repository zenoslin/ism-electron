import datastore from './datastore';
import defineData from './defineData';
import inputData from './inputData';
import removeData from './removeData';

export default {
  defineData,
  inputData,
  removeData,
  ...datastore
};
