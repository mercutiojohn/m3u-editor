<template>
  <div style="width: 100%">
    <el-form inline>
      <el-form-item label="视图">
        <el-select v-model="currentView">
            <el-option 
            v-for="(item, index) in roleOptions.views"
            :key="index"
            :label="item.name"
            :value="item.id">
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开发模式">
        <el-switch v-model="devMode"></el-switch>
      </el-form-item>
    </el-form>
    <el-card>
      <el-table
        :data="previewTableData"
        v-bind="tableOptions.props"
      >
        <el-table-column
          v-for="col in previewTableColumns"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
          v-bind="col.properties.props"
        >
          <template slot="header" slot-scope="scope">
            <span>{{ col.label }}</span>
            <br />
            <el-tag v-if="devMode" type="info">{{ col.prop }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
// 预览渲染
export default {
  name: "TablePreview",
  props: ["tableOptions", "previewTableData", "previewTableColumns", "roleOptions"],
  computed: {},
  data () {
    return {
      // Mock View
      currentView: '',
      devMode: false
    }
  },
  watch: {},
  methods: {},
  created() {},
  mounted() {
    if(!this.currentView) {
      this.currentView = this.roleOptions.views[0].id
    }
  },
  beforeDestroy() {},
};
</script>

<style>
</style>