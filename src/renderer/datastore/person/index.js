import datastore from './datastore';
import defineData from './defineData';
import removeData from './removeData';

export default {
  defineData,
  removeData,
  ...datastore
};
