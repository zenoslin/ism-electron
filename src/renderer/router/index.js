import Vue from 'vue';
import Router from 'vue-router';

import home from '../pages/Home';
import buy from '../pages/Buy';
import sale from '../pages/Sale';
import order from '../pages/Order';
import sreach from '../pages/Sreach';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/buy',
      name: 'buy',
      component: buy
    },
    {
      path: '/sale',
      name: 'sale',
      component: sale
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/sreach',
      name: 'sreach',
      component: sreach
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});
