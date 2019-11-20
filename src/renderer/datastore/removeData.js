import datastore from './datastore';

/**
 * @function removeData 删除数据
 * @param {object} data 数据
 * @return {Promise} { errMsg, data }
 */
const removeData = data => {
  return new Promise(async (resolve, reject) => {
    let fineRes = await datastore.findOne({ _id: data._id });
    if (!fineRes.data) {
      resolve({ errMsg: `id不存在`, data: null });
      return;
    }
    let removeRes = await datastore.remove({ _id: data._id }, {});
    if (removeRes.errMsg) {
      resolve({ errMsg: removeRes.errMsg, data: null });
      return;
    }
    resolve({ errMsg: null, data: removeRes.data });
  });
};

export default removeData;
