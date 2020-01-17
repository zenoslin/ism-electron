<template>
  <div>
    <div class="home-top">
      <el-radio-group v-model="radio">
        <el-radio-button label="物品"></el-radio-button>
        <el-radio-button label="人物"></el-radio-button>
      </el-radio-group>
      <el-button type="primary" @click="dialogGoodsVisible = true">添加物品</el-button>
      <el-button type="primary" @click="dialogPersonVisible = true">添加人物</el-button>
    </div>
    <el-table
      class="table"
      :data="dataStore"
      stripe
      border
      :default-sort="{prop: 'id', order: 'ascending'}"
    >
      <el-table-column prop="id" label="ID" width="180" sortable></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="value" label="数量" width="180" v-if="radio === '物品'"></el-table-column>
      <el-table-column label="操作" v-if="radio === '物品'">
        <template slot-scope="scope">
          <el-button @click="handleDetail(scope.row.id)" type="text" size="small">详情</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加物品" :visible.sync="dialogGoodsVisible" v-loading="addGoodsLoading">
      <el-form :model="goodsForm">
        <el-form-item label="id" :label-width="formLabelWidth">
          <el-input v-model="goodsForm.id" autocomplete="off" placeholder="请输入ID"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="goodsForm.name" autocomplete="off" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="goodsForm.value" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogGoodsVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleGoodsDefine">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加人物" :visible.sync="dialogPersonVisible" v-loading="addPersonLoading">
      <el-form :model="personForm">
        <el-form-item label="id" :label-width="formLabelWidth">
          <el-input v-model="personForm.id" autocomplete="off" placeholder="请输入ID"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="personForm.name" autocomplete="off" placeholder="请输入名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPersonVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlePersonDefine">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogDeleteVisible" width="30%">
      <span>是否确定删除{{deleteItem.name}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDeleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirmDetele">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="物品详情" :visible.sync="dialogDetailsVisible" width="80%">
      <el-table
        class="table"
        :data="goodsDetailList"
        stripe
        border
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column prop="date" label="时间" width="180" sortable>
          <template slot-scope="scope">{{scope.row.date | formatTime}}</template>
        </el-table-column>
        <el-table-column prop="personId" label="人物" width="180">
          <template slot-scope="scope">{{scope.row.personId | formatPerson}}</template>
        </el-table-column>
        <el-table-column prop="id" label="物品" width="180">
          <template slot-scope="scope">{{scope.row.id | formatName}}</template>
        </el-table-column>
        <el-table-column prop="value" label="数量">
          <template slot-scope="scope">{{`${scope.row.type === 1 ? '+' : '-'}${scope.row.value}`}}</template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import InputCheck from '../utils/input-check';

export default {
  data() {
    return {
      dataStore: [],
      radio: '物品',
      // 添加物品弹窗
      dialogGoodsVisible: false,
      goodsForm: { id: '', name: '', value: '0' },
      addGoodsLoading: false,
      // 添加人物弹窗
      dialogPersonVisible: false,
      personForm: { id: '', name: '' },
      addPersonLoading: false,
      formLabelWidth: '120px',
      // 删除物品弹窗
      dialogDeleteVisible: false,
      deleteItem: { id: '', name: '' },
      // 物品详情弹窗
      dialogDetailsVisible: false,
      goodsDetailList: []
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
    }
  },
  watch: {
    radio: {
      immediate: true,
      async handler(val) {
        if (val === '物品') {
          await this.$store.dispatch('updateGoodsStore');
          this.dataStore = this.goodsStore;
        } else {
          await this.$store.dispatch('updatePersonStore');
          this.dataStore = this.personStore;
        }
      }
    },
    goodsStore(val) {
      if (this.radio !== '物品') return;
      this.dataStore = val;
    },
    personStore(val) {
      if (this.radio !== '人物') return;
      this.dataStore = val;
    }
  },
  methods: {
    // 定义物品
    async handleGoodsDefine() {
      this.addGoodsLoading = true;
      if (!this.checkGoodsInput()) {
        this.addGoodsLoading = false;
        return;
      }

      const res = await this.$db.goods.defineData({
        id: this.goodsForm.id,
        name: this.goodsForm.name,
        value: +this.goodsForm.value
      });
      if (res.errMsg) {
        this.$message({
          showClose: true,
          message: `错误：${res.errMsg}`,
          type: 'error'
        });
        this.addGoodsLoading = false;
        return;
      }
      this.$message({
        showClose: true,
        message: `增加${res.data.name}成功`,
        type: 'success'
      });
      await this.$store.dispatch('updateGoodsStore');
      this.addGoodsLoading = false;
      this.dialogGoodsVisible = false;
      this.personForm = { id: '', name: '' };
    },
    checkGoodsInput() {
      const checkId = new InputCheck(this.goodsForm.id).isEmpty('ID不能为空');
      if (!checkId.isPass) {
        this.$message({
          showClose: true,
          message: checkId.errorMessage,
          type: 'error'
        });
        return false;
      }
      const checkName = new InputCheck(this.goodsForm.name).isEmpty(
        '名称不能为空'
      );
      if (!checkName.isPass) {
        this.$message({
          showClose: true,
          message: checkName.errorMessage,
          type: 'error'
        });
        return false;
      }
      return true;
    },
    // 定义人物
    async handlePersonDefine() {
      this.addPersonLoading = true;
      if (!this.checkPersonInput()) {
        this.addPersonLoading = false;
        return;
      }

      const res = await this.$db.person.defineData({
        id: this.personForm.id,
        name: this.personForm.name
      });
      if (res.errMsg) {
        this.$message({
          showClose: true,
          message: `错误：${res.errMsg}`,
          type: 'error'
        });
        this.addPersonLoading = false;
        return;
      }
      this.$message({
        showClose: true,
        message: `增加${res.data.name}成功`,
        type: 'success'
      });
      await this.$store.dispatch('updatePersonStore');
      this.addPersonLoading = false;
      this.dialogPersonVisible = false;
    },
    checkPersonInput() {
      const checkId = new InputCheck(this.personForm.id).isEmpty('ID不能为空');
      if (!checkId.isPass) {
        this.$message({
          showClose: true,
          message: checkId.errorMessage,
          type: 'error'
        });
        return false;
      }
      const checkName = new InputCheck(this.personForm.name).isEmpty(
        '名称不能为空'
      );
      if (!checkName.isPass) {
        this.$message({
          showClose: true,
          message: checkName.errorMessage,
          type: 'error'
        });
        return false;
      }
      return true;
    },
    handleDelete(val) {
      this.deleteItem = val;
      this.dialogDeleteVisible = true;
    },
    async handleConfirmDetele() {
      const res = await this.$db.goods.removeData(this.deleteItem);
      if (res.errMsg) {
        this.$message({
          showClose: true,
          message: `错误：${res.errMsg}`,
          type: 'error'
        });
      }
      console.log('res', res);
      this.$message({
        showClose: true,
        message: `删除${this.deleteItem.name}成功`,
        type: 'success'
      });
      await this.$store.dispatch('updateGoodsStore');
      this.deleteItem = { id: '', name: '' };
      this.dialogDeleteVisible = false;
    },
    handleDetail(id) {
      let orderList = this.orderStore;
      let resList = [];
      orderList = orderList.filter(item => JSON.stringify(item).indexOf(id));
      orderList.forEach(item => {
        let tempList = item.list;
        tempList.forEach(element => {
          if (element.id === id)
            resList.push({
              type: item.type,
              date: item.date,
              personId: item.personId,
              ...element
            });
        });
      });
      this.goodsDetailList = resList;
      this.dialogDetailsVisible = true;
    }
  },
  async mounted() {
    await this.$store.dispatch('updateGoodsStore');
    await this.$store.dispatch('updatePersonStore');
    await this.$store.dispatch('updateOrder');
  }
};
</script>

<style lang="scss" scoped>
.home-top {
  width: 100%;
  height: 56px;
}
.table {
  width: 100%;
  height: 100%;
}
</style>
