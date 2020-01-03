<template>
  <div>
    <el-button class="add-btn" type="primary" @click="dialogFormVisible = true">Add</el-button>
    <el-table class="table" :data="dataStore" stripe border>
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="value" label="数量"></el-table-column>
    </el-table>
    <el-dialog title="添加" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="id" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off" placeholder="请输入ID"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="form.value" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDefine">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import InputCheck from '../utils/input-check';

export default {
  data() {
    return {
      dataStore: [],
      dialogFormVisible: false,
      form: {
        id: '',
        name: '',
        value: '0'
      },
      formLabelWidth: '120px'
    };
  },
  methods: {
    async handleDefine() {
      if (!this.checkInput()) return;

      const res = await this.$db.goods.defineData({
        id: +this.form.id,
        name: this.form.name,
        value: +this.form.value
      });
      if (res.errMsg) {
        this.$message.error(`错误：${res.errMsg}`);
        return;
      }
      this.$message({
        message: `增加${res.data.name}成功`,
        type: 'success'
      });
      this.dialogFormVisible = false;
    },
    checkInput() {
      const checkId = new InputCheck(this.form.id);
      checkId.isEmpty('ID不能为空');
      if (!checkId.isPass) {
        this.$message.error(checkId.errorMessage);
        return false;
      }
      const checkName = new InputCheck(this.form.name);
      checkName.isEmpty('名称不能为空');
      if (!checkName.isPass) {
        this.$message.error(checkName.errorMessage);
        return false;
      }
      return true;
    }
  },
  async mounted() {
    let { data } = await this.$db.goods.find({});
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
