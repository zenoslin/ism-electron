<template>
  <div id="app">
    <el-container>
      <el-aside width="160px">Aside</el-aside>
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
    return {};
  },
  methods: {
    handleSider(val) {
      switch (val) {
        case 1:
          this.$router.replace('/');
          break;
        case 2:
          this.$router.replace('/buy');
          break;
        case 3:
          this.$router.replace('/sale');
          break;
      }
    }
  }
};
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}

.el-aside {
  height: 100vh;
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
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
