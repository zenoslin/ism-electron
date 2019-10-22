<template>
  <div id="app">
    <a-layout>
      <a-layout-sider class="sider" :trigger="null" collapsible v-model="collapsed">
        <div class="logo">ISM</div>
        <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
          <a-menu-item key="1" @click="handleSider(1)">
            <a-icon type="user" />
            <span>库存</span>
          </a-menu-item>
          <a-menu-item key="2" @click="handleSider(2)">
            <a-icon type="video-camera" />
            <span>进货</span>
          </a-menu-item>
          <a-menu-item key="3" @click="handleSider(3)">
            <a-icon type="upload" />
            <span>出货</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="()=> collapsed = !collapsed"
          />
        </a-layout-header>
        <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
        >
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
export default {
  name: 'ism-electron',
  data() {
    return {
      collapsed: false
    };
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
.sider {
  height: 100vh;
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  color: #fff;
  margin: 16px;
  text-align: center;
  font-size: 24px;
}
</style>
