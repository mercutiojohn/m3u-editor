<template>
  <div>
    <h3>视图</h3>
    <el-form>
      <el-form-item label="字段名">
        <el-input v-model="coreData.roleOptions.viewBindField"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="addView">新增视图</el-button>
    <el-table :data="coreData.roleOptions.views" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form :model="props.row">
            <el-form-item label="视图名称">
              <el-input v-model="props.row.name"></el-input>
            </el-form-item>
            <el-form-item label="视图ID">
              <el-input v-model="props.row.id"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="props.row.remark"></el-input>
            </el-form-item>
            <!-- <el-form-item>
              <el-button type="primary" @click="saveView(props.row)">保存</el-button>
            </el-form-item> -->
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="视图名称"></el-table-column>
      <el-table-column prop="id" label="视图ID"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="moveView(scope.$index, true)">上移</el-button>
          <el-button size="small" @click="moveView(scope.$index, false)">下移</el-button>
          <el-button size="small" @click="deleteView(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <h3>状态</h3>
    <el-form>
      <el-form-item label="状态绑定字段">
        <el-input v-model="coreData.roleOptions.statusBindField"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="addStatus">新增状态</el-button>
    <el-table :data="coreData.roleOptions.statuses" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form :model="props.row">
            <el-form-item label="状态名称">
              <el-input v-model="props.row.name"></el-input>
            </el-form-item>
            <el-form-item label="状态ID">
              <el-input v-model="props.row.id"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="props.row.remark"></el-input>
            </el-form-item>
            <!-- <el-form-item>
              <el-button type="primary" @click="saveStatus(props.row)">保存</el-button>
            </el-form-item> -->
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="状态名称"></el-table-column>
      <el-table-column prop="id" label="状态ID"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="moveStatus(scope.$index, true)">上移</el-button>
          <el-button size="small" @click="moveStatus(scope.$index, false)">下移</el-button>
          <el-button size="small" @click="deleteStatus(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    coreData: {
      type: Object,
      required: true
    }
  },
  methods: {
    addView() {
      const newView = { name: '', aliases: [], id: '', remark: '' };
      this.coreData.roleOptions.views.push(newView);
      this.$emit('update', this.coreData);
    },
    addStatus() {
      const newStatus = { name: '', aliases: [], id: '', remark: '' };
      this.coreData.roleOptions.statuses.push(newStatus);
      this.$emit('update', this.coreData);
    },
    saveView(role) {
      // 实现保存逻辑
      // 这里可以添加API调用或其他逻辑来保存更新
      this.$emit('update', this.coreData);
    },
    saveStatus(role) {
      // 实现保存逻辑
      // 这里可以添加API调用或其他逻辑来保存更新
      this.$emit('update', this.coreData);
    },
    moveView(index, isUp) {
      const newIndex = isUp ? index - 1 : index + 1;
      if (newIndex >= 0 && newIndex < this.coreData.roleOptions.views.length) {
        const movedItem = this.coreData.roleOptions.views.splice(index, 1)[0];
        this.coreData.roleOptions.views.splice(newIndex, 0, movedItem);
        this.$emit('update', this.coreData);
      }
    },
    moveStatus(index, isUp) {
      const newIndex = isUp ? index - 1 : index + 1;
      if (newIndex >= 0 && newIndex < this.coreData.roleOptions.statuses.length) {
        const movedItem = this.coreData.roleOptions.statuses.splice(index, 1)[0];
        this.coreData.roleOptions.statuses.splice(newIndex, 0, movedItem);
        this.$emit('update', this.coreData);
      }
    },
    deleteView(index) {
      this.coreData.roleOptions.views.splice(index, 1);
      this.$emit('update', this.coreData);
    },
    deleteStatus(index) {
      this.coreData.roleOptions.statuses.splice(index, 1);
      this.$emit('update', this.coreData);
    }
  }
};
</script>

<style scoped>
/* 您的样式 */
</style>
