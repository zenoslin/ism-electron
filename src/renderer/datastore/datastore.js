import Datastore from 'nedb';

const dataStore = new Datastore({
  autoload: true,
  filename: './data/data.db'
});

export default {
  /**
   * @function insert 插入数据
   * @param {*} data 插入的数据
   * @returns {Promise} { errMsg, data }
   */
  insert(data) {
    return new Promise((resolve, reject) => {
      dataStore.insert(data, (err, res) => {
        resolve({ errMsg: err, data: res });
      });
    });
  },
  /**
   * @function find 查询符合条件的所有目标
   * @param {object} query 查询参数
   * @return {Promise} { errMsg, data }
   */
  find(query) {
    return new Promise((resolve, reject) => {
      dataStore.find(query, (err, res) => {
        resolve({ errMsg: err, data: res });
      });
    });
  },
  /**
   * @function findOne 查询符合条件的一个目标
   * @param {object} query 查询参数
   * @return {Promise} { errMsg, data }
   */
  findOne(query) {
    return new Promise((resolve, reject) => {
      dataStore.findOne(query, (err, res) => {
        resolve({ errMsg: err, data: res });
      });
    });
  },
  /**
   * @function update 根据update参数的规则，更新匹配到query的结果集
   * @param {object} query 更改规则
   * @param {*} update 更新数据
   * @param {object} options 更改选项
   * @return {Promise} { errMsg, data }
   */
  update(query, update, options) {
    return new Promise((resolve, reject) => {
      dataStore.update(
        query,
        update,
        options,
        (err, numAffected, affectedDocuments, upsert) => {
          resolve({ errMsg: err, data: res });
        }
      );
    });
  },
  /**
   * @function remove 删除目标数据
   * @param {object} query 删除参数
   * @param {object} options 删除配置
   * @return {Promise} { errMsg, data }
   */
  remove(query, options) {
    return new Promise((resolve, reject) => {
      dataStore.remove(query, options, (err, numRemoved) => {
        resolve({ errMsg: err, data: numRemoved });
      });
    });
  },
  /**
   * @function count 统计目标个数
   * @param {object} query 统计参数
   * @return {Promise} { errMsg, data }
   */
  count(query) {
    return new Promise((resolve, reject) => {
      dataStore.count(query, (err, num) => {
        resolve({ errMsg: err, data: num });
      });
    });
  }
};
