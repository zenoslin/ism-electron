<template>
  <div id="app">
    <el-container>
      <el-aside class="ism-aside" style="width:200px">
        <el-menu default-active="1" @select="handleSider">
          <el-menu-item index="1">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'ism-electron',
  data() {
    return {
      curNav: 1
    };
  },
  methods: {
    handleSider(val) {
      if (+val === this.curNav) return;
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
      }
      this.curNav = +val;
    }
  }
};
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: -apple-system, SF UI Text, Helvetica Neue, Helvetica,
    'Microsoft YaHei', Arial, sans-serif;
}

.el-aside {
  height: 100vh;
  background-color: #fff;
  color: #333;
  text-align: center;
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
