<template>
  <div id="app">
    <el-container>
      <el-aside class="ism-aside" style="width:200px">
        <el-menu default-active="1" @select="handleSider">
          <el-menu-item index="1">
            <i class="el-icon-box"></i>
            <span slot="title">总览</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-shopping-cart-full"></i>
            <span slot="title">购买</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-shopping-bag-1"></i>
            <span slot="title">出售</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-tickets"></i>
            <span slot="title">订单</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
        <el-dialog title="提示" :visible.sync="dialogRouteVisible" width="30%">
          <span>如果还没订单还未完成，离开当前页面订单将会清空</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogRouteVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmRoute">确 定</el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'ism-electron',
  data() {
    return {
      curNav: 1,
      dialogRouteVisible: false,
      orderRoute: ''
    };
  },
  methods: {
    handleSider(val) {
      if (+val === this.curNav) return;
      // 屏蔽切换nav拦截
      // if (this.curNav === 2 || this.curNav === 3) {
      //   this.buyingRoute(val);
      //   return;
      // }
      this.switchRoute(val);
      this.curNav = +val;
    },
    buyingRoute(val) {
      this.orderRoute = val;
      this.dialogRouteVisible = true;
    },
    confirmRoute() {
      this.switchRoute(this.orderRoute);
      this.curNav = +this.orderRoute;
      this.orderRoute = '';
      this.dialogRouteVisible = false;
    },
    switchRoute(val) {
      switch (val) {
        case '1':
          this.$router.replace('/');
          break;
        case '2':
          this.$router.replace('/buy');
          break;
        case '3':
          this.$router.replace('/sale');
          break;
        case '4':
          this.$router.replace('/order');
          break;
      }
    }
  },
  async created() {
    await this.$store.dispatch('updateGoodsStore');
    await this.$store.dispatch('updatePersonStore');
    await this.$store.dispatch('updateOrder');
  }
};
</script>

<style lang="scss">
$bgcolor: #fff;
// $bgcolor: #faf9de;

body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  background: $bgcolor;
}

.el-aside {
  height: 100vh;
  background-color: $bgcolor;
  color: #333;
  text-align: center;
}

.el-menu {
  background-color: $bgcolor;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
