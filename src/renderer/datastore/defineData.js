import datastore from './datastore';

/**
 * @function defineData 定义数据
 * @param {object} data 数据
 * @return {Promise} { errMsg, data }
 */
const defineData = data => {
  return new Promise(async (resolve, reject) => {
    let fineRes = await datastore.findOne({ id: data.id });
    if (!fineRes.err) {
      resolve({ errMsg: `id已存在`, data: null });
      return;
    }
    let insertRes = await datastore.insert(data);
    if (insertRes.err) {
      resolve({ errMsg: insertRes.err, data: null });
      return;
    }
    resolve({ errMsg: null, data: insertRes.data });
  });
};

export default defineData;
