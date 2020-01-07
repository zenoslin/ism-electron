<template>
  <div class="sale" v-if="dataStore.length > 0">
    <div class="sale-top">
      <el-select v-model="personId" placeholder="请选择人物">
        <el-option v-for="item in personStore" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-date-picker class="picker" v-model="date" type="date" placeholder="请选择日期"></el-date-picker>
    </div>
    <el-table class="table" :data="dataStore" stripe border>
      <el-table-column prop="id" label="ID" width="180">
        <template slot-scope="scope">
          <el-autocomplete
            popper-class="my-autocomplete"
            :ref="`id-${scope.row.key}`"
            class="table-input"
            type="text"
            v-model="scope.row.id"
            value-key="id"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="false"
            placeholder="请输入id"
            @keyup.enter.native="handleId(scope.row.key)"
          >
            <template slot-scope="{ item }">
              <div class="id">{{ item.id }}</div>
              <span class="name">{{ item.id | formatName }}</span>
            </template>
          </el-autocomplete>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="名称" width="180">
        <template slot-scope="scope">{{scope.row.id | formatName}}</template>
      </el-table-column>
      <el-table-column prop="value" label="数量">
        <template slot-scope="scope">
          <el-input
            :ref="`value-${scope.row.key}`"
            class="table-input"
            type="text"
            v-model="scope.row.value"
            placeholder="请输入数量"
            @keyup.enter.native="handleValue(scope.row.key)"
          />
        </template>
      </el-table-column>
    </el-table>
    <div class="toolbar">
      <el-button class="add-btn" type="primary" @click="handleSubmit" size="medium">提交</el-button>
    </div>
  </div>
</template>

<script>
import * as staticType from '../staticType';

export default {
  name: 'Sale',
  data() {
    return {
      personId: '',
      date: '',
      dataStore: [],
      restaurants: []
    };
  },
  computed: {
    goodsStore() {
      return this.$store.state.goodsStore;
    },
    personStore() {
      return this.$store.state.personStore;
    }
  },
  methods: {
    handleId(key) {
      this.$refs[`value-${key}`].$el.querySelector('input').focus();
    },
    handleValue(key) {
      // 暂时只支持99行
      if (key > 99) return;
      this.$refs[`id-${key + 1}`].$el.querySelector('input').focus();
    },
    async handleSubmit() {
      if (!this.personId) {
        this.$message({
          showClose: true,
          message: '请选择人物',
          type: 'error'
        });
        return;
      }
      if (!this.date) {
        this.$message({
          showClose: true,
          message: '请选择日期',
          type: 'error'
        });
        return;
      }
      let list = await this.formatDataStore();
      if (list.length < 1 || !this.checkDataList(list)) {
        this.$message.error('请检查数据');
        return;
      }
      let res = await this.$store.dispatch('addBuyOrder', {
        type: staticType.ORDER_TYPE_SALE,
        personId: this.personId,
        date: new Date(this.date).getTime(),
        list
      });
      if (res.errMsg) {
        this.$message.error(`错误：${res.errMsg}`);
        return;
      }
      this.$message({
        message: `提交成功`,
        type: 'success'
      });
      this.resetData();
    },
    formatDataStore() {
      if (this.dataStore.length < 1) return [];
      let tempList = [];
      this.dataStore.forEach(item => {
        if (item.id) tempList.push(item);
      });
      return tempList;
    },
    checkDataList(arr) {
      let res = true;
      arr.forEach(item => {
        if (!this.checkIdLegal(item.id)) res = false;
      });
      return res;
    },
    checkIdLegal(id) {
      let res = false;
      this.goodsStore.forEach(item => {
        if (item.id === id) res = true;
      });
      return res;
    },
    resetData() {
      this.personId = '';
      this.date = '';
      let tempList = [];
      for (let i = 0; i < 100; i++) {
        tempList.push({ key: i, id: '', value: '' });
      }
      this.dataStore = tempList;
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
  mounted() {
    this.restaurants = this.goodsStore;
    let tempList = [];
    for (let i = 0; i < 100; i++) {
      tempList.push({ key: i, id: '', value: '' });
    }
    this.dataStore = tempList;
  }
};
</script>

<style lang="scss" scoped>
.sale {
  width: 100%;
}
.sale-top {
  width: 100%;
  height: 56px;
  .picker {
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
      'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  }
}
.table {
  width: 100%;
  height: 100%;
}
.toolbar {
  width: 100%;
  height: 64px;
  position: fixed;
  bottom: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid #ebeef5;
  z-index: 10000;
  .add-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
  }
}
</style>

<style lang="scss">
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .id {
      text-overflow: ellipsis;
      overflow: hidden;
      font-family: 'Helvetica Neue', Helvetica, 'PingFang SC',
        'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
    }
    .name {
      font-size: 12px;
      color: #b4b4b4;
      font-family: 'Helvetica Neue', Helvetica, 'PingFang SC',
        'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
.el-date-table {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
.el-date-picker__header-label {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
.el-select-dropdown__item {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
</style>