<template>
  <div>{{dataStore}}</div>
</template>
<script>
export default {
  data() {
    return { dataStore: [] };
  },
  mounted() {
    this.$db.find({ type: 1 }, (err, ret) => {
      this.dataStore = ret;
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
