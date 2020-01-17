<template>
  <div>
    <div class="sreach-top">
      <el-autocomplete
        popper-class="my-autocomplete"
        class="table-input"
        type="text"
        v-model="sreachKey"
        value-key="id"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        placeholder="请输入id"
        @select="handleSreach"
      >
        <template slot-scope="{ item }">
          <div class="id">{{ item.id }}</div>
          <span class="name">{{ item.id | formatName }}</span>
        </template>
      </el-autocomplete>
    </div>
    <el-table
      class="table"
      :data="dataStore"
      stripe
      border
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column prop="date" label="时间" width="180" sortable>
        <template slot-scope="scope">{{scope.row.date | formatTime}}</template>
      </el-table-column>
      <el-table-column prop="id" label="名称" width="180">
        <template slot-scope="scope">{{scope.row.id | formatName}}</template>
      </el-table-column>
      <el-table-column prop="personId" label="人物" width="180">
        <template slot-scope="scope">{{scope.row.personId | formatPerson}}</template>
      </el-table-column>
      <el-table-column prop="value" label="数量">
        <template
          slot-scope="scope"
        >{{scope.row.type === 1 ? `+${scope.row.value}` : `-${scope.row.value}`}}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Sreach',
  data() {
    return {
      sreachKey: '',
      restaurants: [],
      dataStore: []
    };
  },
  computed: {
    goodsStore() {
      return this.$store.state.goodsStore;
    },
    personStore() {
      return this.$store.state.personStore;
    },
    orderStore() {
      return this.$store.state.orderStore;
    },
    buyOrderList() {
      return this.$store.getters.buyOrderList;
    },
    saleOrderList() {
      return this.$store.getters.saleOrderList;
    }
  },
  methods: {
    handleSreach() {
      let filterList = this.filterOrder(this.orderStore, this.sreachKey);
      filterList.sort((a, b) => b.date - a.date);
      this.dataStore = filterList;
    },
    filterOrder(orderList, key) {
      let arr = [];
      orderList.forEach(item => {
        if (JSON.stringify(item).indexOf(`"id":"${key}"`) === -1) return;
        item.list.forEach(element => {
          if (element.id === key) {
            arr.push({
              date: item.date,
              personId: item.personId,
              type: item.type,
              ...element
            });
          }
        });
      });
      return arr;
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.id.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    }
  },
  async mounted() {
    await this.$store.dispatch('updateGoodsStore');
    await this.$store.dispatch('updatePersonStore');
    await this.$store.dispatch('updateOrder');
    this.restaurants = this.goodsStore;
  }
};
</script>

<style lang="scss" scoped>
.sreach-top {
  width: 100%;
  height: 56px;
}
</style>
