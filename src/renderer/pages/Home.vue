<template>
  <div>
    <el-button class="add-btn" type="primary">Add</el-button>
    <el-table class="table" :data="dataStore" stripe border>
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="value" label="数量"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataStore: []
    };
  },
  async mounted() {
    let { data } = await this.$db.find({});
    this.dataStore = data;
  }
};
</script>

<style lang="scss" scoped>
.add-btn {
  display: block;
  margin: 10px 0 10px auto;
}
.table {
  width: 100%;
  height: 100%;
}
</style>
