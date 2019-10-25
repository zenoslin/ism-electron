import datastore from './datastore';

/**
 * @function inputDate 输入数据
 * @param {Array} dataList
 * @return {Promise} { errMsg, data }
 */
const inputDate = dataList => {
  return new Promise(async (resolve, reject) => {
    let hasUndefine = { isundefine: false, undefinId: null };
    let oldDataList = {};
    let errList = [];
    // 检查id是否定义并缓存
    for (let i = 0; i < dataList.length; i++) {
      let { data } = await datastore.findOne({ id: dataList[i].id });
      if (!data) {
        hasUndefine = { isundefine: true, undefinId: dataList[i].id };
      } else {
        oldDataList[dataList[i].id] = data;
      }
    }
    if (hasUndefine.isundefine) {
      resolve({ errMsg: `${hasUndefine.undefinId}未定义`, data: null });
      return;
    }
    // 数据更新相加
    for (let j = 0; j < dataList.length; j++) {
      let oldData = oldDataList[dataList[j].id];
      let newVal = oldData.value + dataList[j].value;
      let { errMsg } = await datastore.update(
        { _id: oldData._id },
        { $set: { value: newVal } },
        { multi: true }
      );
      if (errMsg) {
        errList.push(dataList[j].id);
      }
    }
    if (errList.length > 0) {
      resolve({ errMsg: `${errList}写入失败`, data: null });
      return;
    }
    resolve({ errMsg: null, data: null });
  });
};

export default inputDate;
