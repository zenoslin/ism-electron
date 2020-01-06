<template>
  <div>
    <el-table class="table" :data="dataStore" stripe border>
      <el-table-column prop="date" label="时间" width="180">
        <template slot-scope="scope">{{scope.row.date | formatTime}}</template>
      </el-table-column>
      <el-table-column prop="personId" label="人物" width="180">
        <template slot-scope="scope">{{scope.row.personId | formatPerson}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="订单详情" :visible.sync="dialogDetailsVisible">
      <div
        class="details-des"
      >人物：{{orderDetails.personId | formatPerson}} 时间：{{orderDetails.date | formatTime}}</div>
      <el-table class="table" :data="orderDetails.list" stripe border>
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="id" label="名称" width="180">
          <template slot-scope="scope">{{scope.row.id | formatName}}</template>
        </el-table-column>
        <el-table-column prop="value" label="数量"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Order',
  data() {
    return {
      dataStore: [],
      dialogDetailsVisible: false,
      orderDetails: {}
    };
  },
  computed: {
    orderStore() {
      return this.$store.state.orderStore;
    }
  },
  methods: {
    handleClick(details) {
      this.orderDetails = details;
      this.dialogDetailsVisible = true;
    }
  },
  async mounted() {
    await this.$store.dispatch('updateOrder');
    this.dataStore = this.orderStore;
  }
};
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  height: 100%;
}
.details-des {
  margin-bottom: 10px;
  font-size: 16px;
}
</style>