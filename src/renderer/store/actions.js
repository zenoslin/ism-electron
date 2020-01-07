import db from '../datastore';
import * as staticType from '../staticType';

/**
 * @function updateGoodsStore
 * 更新物品列表
 */
export const updateGoodsStore = async ({ state }) => {
  const { data } = await db.goods.find({});
  state.goodsStore = data;
};
/**
 * @function updatePersonStore
 * 更新人物列表
 */
export const updatePersonStore = async ({ state }) => {
  const { data } = await db.person.find({});
  state.personStore = data;
};
/**
 * @function updateOrder
 * 更新人物列表
 */
export const updateOrder = async ({ state }) => {
  return new Promise(async (resolve, reject) => {
    const { data } = await db.order.find({});
    state.orderStore = data;
    resolve();
  });
};
/**
 * @function addBuyOrder 添加订单
 * @returns Promise
 */
export const addBuyOrder = async ({ state }, payload) => {
  return new Promise(async (resolve, reject) => {
    const { type, personId, date, list } = payload;
    const goodsRes = await db.goods.inputData(list, type === staticType.ORDER_TYPE_SALE);
    resolve(goodsRes);
    const orderRes = await db.order.defineData({ type, personId, date, list });
    resolve(orderRes);
  });
};
