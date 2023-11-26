<template>
  <div>
    <el-form :model="localDictsOptions">
      <el-form-item label="静态字典">
        <el-table :data="dictsArray" style="margin-bottom: 20px;">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table :data="props.row.value">
                <el-table-column prop="label" label="标签"></el-table-column>
                <el-table-column prop="value" label="值"></el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <el-button @click="removeStaticDictItem(props.row.key, scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button @click="addStaticDictItem(props.row.key)">添加项目</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="key" label="字典名称"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="danger" size="small" @click="removeStaticDictType(scope.row.key)">删除字典</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="添加新字典类型">
        <el-input v-model="newDictKey" placeholder="请输入字典名称"></el-input>
        <el-button @click="addNewStaticDictType(newDictKey)">添加</el-button>
      </el-form-item>

      <el-form-item label="远程字典">
        <el-tag
          v-for="(dict, index) in localDictsOptions.remoteDicts"
          :key="dict"
          closable
          @close="removeRemoteDictItem(index)"
        >
          {{ dict }}
        </el-tag>
        <el-button @click="addRemoteDictItem">添加</el-button>
      </el-form-item>

      <!-- API 字典 TODO: 实现具体的编辑界面 -->
      <el-form-item label="API 字典">
        <div>待实现...</div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveOptions">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: "DictsOptionsConfig",
  props: ["coreData"],
  computed: {
    dictsArray() {
      return Object.entries(this.localDictsOptions.staticDicts).map(([key, value]) => ({ key, value }));
    }
  },
  data() {
    return {
      localDictsOptions: this.coreData.dictsOptions,
      // localDictsOptions: JSON.parse(JSON.stringify(this.coreData.dictsOptions)),
      newDictKey: ''
    };
  },
  methods: {
    // addStaticDictItem(dictKey) {
    //   this.localDictsOptions.staticDicts[dictKey].push({ label: '', value: '' });
    // },
    // removeStaticDictItem(dictKey, index) {
    //   this.localDictsOptions.staticDicts[dictKey].splice(index, 1);
    // },
    addRemoteDictItem() {
      this.localDictsOptions.remoteDicts.push('');
    },
    removeRemoteDictItem(index) {
      this.localDictsOptions.remoteDicts.splice(index, 1);
    },
    addStaticDictItem(dictKey) {
      const dict = this.localDictsOptions.staticDicts[dictKey];
      if (dict) {
        dict.push({ label: '', value: '' });
      }
    },
    removeStaticDictItem(dictKey, index) {
      const dict = this.localDictsOptions.staticDicts[dictKey];
      if (dict) {
        dict.splice(index, 1);
      }
    },
    addNewStaticDictType(newDictKey) {
      // 检查新字典键是否已存在
      if (this.localDictsOptions.staticDicts.hasOwnProperty(newDictKey)) {
        this.$message.error('字典类型已存在');
        return;
      }

      // 添加新的字典类型
      this.$set(this.localDictsOptions.staticDicts, newDictKey, []);
      this.newDictKey = ''
      // this.$message.success('新字典类型已添加');
    },
    // 删除字典类型的方法
    removeStaticDictType(dictKey) {
      // 使计算属性 dictsArray 追踪变更
      // Vue.delete(this.localDictsOptions.staticDicts, dictKey);
      
      this.$confirm('确定要删除此字典吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除字典类型的逻辑
        // 使计算属性 dictsArray 追踪变更
        Vue.delete(this.localDictsOptions.staticDicts, dictKey);
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // });
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });          
      });
    },
    saveOptions() {
      // TODO: 更新 coreData 或触发事件
    }
  }
};
</script>

<style>
/* 可以根据需要添加样式 */
</style>
