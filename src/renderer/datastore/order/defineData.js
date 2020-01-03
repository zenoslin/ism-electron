import datastore from './datastore';

/**
 * @function defineData 定义数据
 * @param {object} data 数据
 * @return {Promise} { errMsg, data }
 */
const defineData = data => {
  return new Promise(async (resolve, reject) => {
    let insertRes = await datastore.insert(data);
    if (insertRes.errMsg) {
      resolve({ errMsg: insertRes.errMsg, data: null });
      return;
    }
    resolve({ errMsg: null, data: insertRes.data });
  });
};

export default defineData;
