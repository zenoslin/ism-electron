import * as staticType from '../staticType';

export default {
  buyOrderList(state) {
    let list = state.orderStore;
    list = list.filter(item => item.type === staticType.ORDER_TYPE_BUY);
    return list;
  },
  saleOrderList(state) {
    let list = state.orderStore;
    list = list.filter(item => item.type === staticType.ORDER_TYPE_SALE);
    return list;
  }
};
