import Vue from 'vue';
import store from '../store';

Vue.filter('formatName', id => {
  let res = '';
  store.state.goodsStore.forEach(item => {
    if (item.id === id) res = item.name;
  });
  return res;
});

Vue.filter('formatPerson', id => {
  let res = '';
  console.log('store.state.personStore', store.state.personStore);
  store.state.personStore.forEach(item => {
    if (item.id === id) res = item.name;
  });
  return res;
});

Vue.filter('formatTime', timestamp => {
  const date = new Date(timestamp);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
});
