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
      <search-preview :searchFieldsOptions="searchFieldsOptions" :previewSearchItems="previewSearchItems" :roleOptions="roleOptions" :currentView="currentView" :devMode="devMode" @clickRow="$emit('clickCol', $event)"/>
      <el-table
        :data="previewTableData"
        v-bind="tableOptions.props"
      >
      <template v-for="col in previewTableColumns">
        <el-table-column
          v-if="viewIncludes(col.properties.roles, 'showViews')"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
          v-bind="col.properties.props"
        >
          <template slot="header" slot-scope="scope">
            <span @click="$emit('clickCol', scope.$index)">{{ col.label }}</span>
            <br />
            <el-tag @click="$emit('clickCol', scope.$index)" v-if="devMode" type="info">{{ col.prop }}</el-tag>
          </template>
        </el-table-column>
      </template>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="150">
          <template slot-scope="scope">
            <template v-for="button in tableOptions.actionButtons">
              <el-button
                v-if="viewIncludes(button.roles, 'showViews') && statusIncludes(button.roles, 'showStatus', scope.row, roleOptions.statusBindField)"
                :key="button.id"
                v-bind="button.props"
                @click="handleButtonClick(button.onClick)"
              >
                {{ button.name }}
              </el-button>
            </template>
            <!-- <CrudActions :row="scope.row" :table-data="tableData" :actions="actions" :action-row-status="actionRowStatus" :action-page-status="actionPageStatus" status-prop="currentState" :page-type-prop="tableType" use-status /> -->
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import SearchPreview from './search.vue'

// 预览渲染
export default {
  name: "TablePreview",
  props: ["tableOptions", "previewTableData", "previewTableColumns", "roleOptions", "searchFieldsOptions", "previewSearchItems"],
  components: {
    SearchPreview
  },
  computed: {},
  data () {
    return {
      // Mock View
      currentView: '',
      devMode: false
    }
  },
  watch: {},
  methods: {
    viewIncludes (roles, type) {
      return roles[type].includes(this.currentView)
    },
    statusIncludes (roles, type, row, statusField) {
      return roles[type].includes(row[statusField])
    },
    handleButtonClick(methodName) {
      // 调用传入的方法名，可能需要一些上下文绑定或参数
      if (this[methodName]) {
        this[methodName]();
      }
    },
  },
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