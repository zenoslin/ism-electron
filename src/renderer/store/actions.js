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
