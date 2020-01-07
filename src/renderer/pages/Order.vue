<template>
  <div>
    <div class="order-top">
      <el-radio-group v-model="radio">
        <el-radio-button label="购买"></el-radio-button>
        <el-radio-button label="出售"></el-radio-button>
      </el-radio-group>
      <el-select v-model="personId" placeholder="请选择人物">
        <el-option v-for="item in personStore" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-date-picker class="picker" v-model="date" type="date" placeholder="请选择日期"></el-date-picker>
    </div>
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
      >人物：{{orderDetails.personId | formatPerson}} / 时间：{{orderDetails.date | formatTime}} / 订单类型：{{orderDetails.type === 1 ? '购买' : '出售'}}</div>
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
import * as staticType from '../staticType';

export default {
  name: 'Order',
  data() {
    return {
      personId: '',
      date: '',
      dataStore: [],
      dialogDetailsVisible: false,
      orderDetails: {},
      radio: '购买'
    };
  },
  computed: {
    orderStore() {
      return this.$store.state.orderStore;
    },
    personStore() {
      return this.$store.state.personStore;
    },
    buyOrderList() {
      return this.$store.getters.buyOrderList;
    },
    saleOrderList() {
      return this.$store.getters.saleOrderList;
    }
  },
  watch: {
    personId(val) {
      const curList =
        this.radio === '购买' ? this.buyOrderList : this.saleOrderList;
      if (curList.length < 1) return;
      let tempStore = curList;
      if (val) {
        tempStore = tempStore.filter(item => item.personId === val);
      }
      if (this.date) {
        let timestamp = new Date(this.date).getTime();
        tempStore = tempStore.filter(item => item.date === timestamp);
      }
      this.dataStore = tempStore;
    },
    date(val) {
      console.log('timestamp');
      const curList =
        this.radio === '购买' ? this.buyOrderList : this.saleOrderList;
      if (curList.length < 1) return;
      let tempStore = curList;
      if (this.personId) {
        tempStore = tempStore.filter(item => item.personId === this.personId);
      }
      if (val) {
        let timestamp = new Date(this.date).getTime();
        tempStore = tempStore.filter(item => item.date === timestamp);
      }
      this.dataStore = tempStore;
    },
    radio: {
      immediate: true,
      handler(val) {
        this.dataStore =
          val === '购买' ? this.buyOrderList : this.saleOrderList;
      }
    },
    orderStore: {
      deep: true,
      handler() {
        this.dataStore =
          this.radio === '购买' ? this.buyOrderList : this.saleOrderList;
      }
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
.order-top {
  width: 100%;
  height: 56px;
  .picker {
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
      'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  }
}
</style>