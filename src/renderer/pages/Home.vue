<template>
  <div>
    <div class="home-data">{{dataStore}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return { dataStore: [] };
  },
  mounted() {
    this.$db.find({ type: 1 }).then(res => {
      console.log(res);
      this.dataStore = res;
    });
  }
};
</script>

<style lang="scss" scoped>
.home-data {
  font-size: 16px;
  line-height: 24px;
}
</style>
