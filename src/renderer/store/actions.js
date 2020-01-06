import db from '../datastore';

/**
 * @function updateGoodsStore
 * 更新物品列表
 */
export const updateGoodsStore = async ({ state }) => {
  let { data } = await db.goods.find({});
  state.goodsStore = data;
};
/**
 * @function updatePersonStore
 * 更新人物列表
 */
export const updatePersonStore = async ({ state }) => {
  let { data } = await db.person.find({});
  state.personStore = data;
};
/**
 * @function updateOrder
 * 更新人物列表
 */
export const updateOrder = async ({ state }) => {
  return new Promise(async (resolve, reject) => {
    let { data } = await db.order.find({});
    state.orderStore = data;
    resolve();
  });
};

export const addBuyOrder = async ({ state }, payload) => {
  return new Promise(async (resolve, reject) => {
    const { personId, date, list } = payload;
    let res = await db.order.defineData({ personId, date, list });
    resolve(res);
  });
};
