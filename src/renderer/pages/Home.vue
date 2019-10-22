<template>
  <div>{{dataStore}}</div>
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
</style>
