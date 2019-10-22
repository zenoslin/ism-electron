import Datastore from 'nedb';
import path from 'path';
import { remote } from 'electron';

const dataStore = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), './data.db')
});

export default {
  /**
   * @function insert 插入数据
   * @param {*} data 插入的数据
   * @return {Promise}
   */
  insert(data) {
    return new Promise((resolve, reject) => {
      dataStore.insert(data, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
        return;
      });
    });
  },
  /**
   * @function find 查询符合条件的所有目标
   * @param {object} query 查询参数
   * @return {Promise}
   */
  find(query) {
    return new Promise((resolve, reject) => {
      dataStore.find(query, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
        return;
      });
    });
  },
  /**
   * @function findOne 查询符合条件的一个目标
   * @param {object} query 查询参数
   * @return {Promise}
   */
  findOne(query) {
    return new Promise((resolve, reject) => {
      dataStore.findOne(query, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
        return;
      });
    });
  },
  /**
   * @function update 根据update参数的规则，更新匹配到query的结果集
   * @param {object} query 更改规则
   * @param {*} update 更新数据
   * @param {object} options 更改选项
   * @return {Promise}
   */
  update(query, update, options) {
    return new Promise((resolve, reject) => {
      dataStore.update(
        query,
        update,
        options,
        (err, numAffected, affectedDocuments, upsert) => {
          if (err) {
            reject(err);
            return;
          }
          resolve({ numAffected, affectedDocuments, upsert });
          return;
        }
      );
    });
  },
  /**
   * @function remove 删除目标数据
   * @param {object} query 删除参数
   * @param {object} options 删除配置
   * @return {Promise}
   */
  remove(query, options) {
    return new Promise((resolve, reject) => {
      dataStore.remove(query, options, (err, numRemoved) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(numRemoved);
        return;
      });
    });
  },
  /**
   * @function count 统计目标个数
   * @param {object} query 统计参数
   * @return {Promise}
   */
  count(query) {
    return new Promise((resolve, reject) => {
      dataStore.count(query, (err, num) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(num);
        return;
      });
    });
  }
};
