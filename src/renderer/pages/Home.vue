<template>
  <div>
    <el-radio-group v-model="radio">
      <el-radio-button label="物品"></el-radio-button>
      <el-radio-button label="人物"></el-radio-button>
    </el-radio-group>
    <el-button class="add-btn" type="primary" @click="dialogGoodsVisible = true">添加物品</el-button>
    <el-button class="add-btn" type="primary" @click="dialogPersonVisible = true">添加人物</el-button>
    <el-table class="table" :data="dataStore" stripe border>
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="value" label="数量" width="180" v-if="radio === '物品'"></el-table-column>
      <el-table-column label="操作" v-if="radio === '物品'">
        <template slot-scope="scope">
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
      deleteItem: { id: '', name: '' },
      dialogDeleteVisible: false
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
        this.$message.error(`错误：${res.errMsg}`);
        this.addGoodsLoading = false;
        return;
      }
      this.$message({
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
        this.$message.error(checkId.errorMessage);
        return false;
      }
      const checkName = new InputCheck(this.goodsForm.name).isEmpty(
        '名称不能为空'
      );
      if (!checkName.isPass) {
        this.$message.error(checkName.errorMessage);
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
        this.$message.error(`错误：${res.errMsg}`);
        this.addPersonLoading = false;
        return;
      }
      this.$message({
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
        this.$message.error(checkId.errorMessage);
        return false;
      }
      const checkName = new InputCheck(this.personForm.name).isEmpty(
        '名称不能为空'
      );
      if (!checkName.isPass) {
        this.$message.error(checkName.errorMessage);
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
        this.$message.error(`错误：${res.errMsg}`);
      }
      console.log('res', res);
      this.$message({
        message: `删除${this.deleteItem.name}成功`,
        type: 'success'
      });
      await this.$store.dispatch('updateGoodsStore');
      this.deleteItem = { id: '', name: '' };
      this.dialogDeleteVisible = false;
    }
  },
  async created() {
    await this.$store.dispatch('updatePersonStore');
  }
};
</script>

<style lang="scss" scoped>
.add-btn {
  margin: 10px 0 10px auto;
}
.table {
  width: 100%;
  height: 100%;
}
</style>
