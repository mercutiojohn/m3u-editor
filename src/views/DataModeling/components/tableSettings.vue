<template>
  <div class="table-settings" style="display: flex; gap: 10px; width: 100%; overflow-x: hidden; height: 100%">
    <table-preview :tableOptions="coreData.tableOptions" :previewTableData="previewTableData" :previewTableColumns="previewTableColumns" :roleOptions="coreData.roleOptions" :searchFieldsOptions="coreData.searchFieldsOptions" :previewSearchItems="previewSearchItems" @clickCol="handleClickCol" />
    <div class="sidebar" style="width: 500px; height: calc(100% - 10px); flex-shrink: 0">
      <el-tabs type="card" style="height: 100%" class="tabs-full-height scroll tab-reset size-mini ios my-tabs">
        <el-tab-pane label="列配置" style="height: 100%">
          <span>{{coreData.fieldList[currentColumn].field}}</span>
          <span>{{coreData.fieldList[currentColumn].name}}</span>
          <vue-json-editor
            style="width: 100%; flex-shrink: 0"
            v-model="coreData.fieldList[currentColumn].searchFieldProperties"
            :showBtns="false"
            :mode="'tree'"
            lang="zh"
            :expandedOnStart="true"
          />
          <vue-json-editor
            style="width: 100%; flex-shrink: 0"
            v-model="coreData.fieldList[currentColumn].tableProperties"
            :showBtns="false"
            :mode="'tree'"
            lang="zh"
            :expandedOnStart="true"
          />
        </el-tab-pane>
        <el-tab-pane label="表格配置" style="height: 100%">
          <vue-json-editor
            style="width: 100%; flex-shrink: 0"
            v-model="coreData.tableOptions"
            :showBtns="false"
            :mode="'tree'"
            lang="zh"
            :expandedOnStart="true"
          />
          <!-- <pre>{{ coreData.tableOptions }}</pre> -->
        </el-tab-pane>

        <el-tab-pane label="模拟数据">
          <vue-json-editor
            style="width: 100%; flex-shrink: 0"
            v-model="previewTableData"
            :showBtns="false"
            :mode="'tree'"
            lang="zh"
            :expandedOnStart="true"
          />
          <!-- <pre>{{ examplePreviewTableData }}</pre> -->
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
// 预览渲染
import VueJsonEditor from "@/components/json-editor/index.vue";
import previewRender from '../mixins/previewRender'
import TablePreview from './components/previews/table.vue'

export default {
  name: "TableSettings",
  components: {
    VueJsonEditor,
    TablePreview
  },
  mixins: [previewRender],
  props: ['coreData'],
  data() {
    return {
      // 模拟数据
      previewTableData: [],
      currentColumn: 0
      // examplePreviewTableData: [{ exampleData: '示例数据' }, { exampleData: '示例数据' }]
    };
  },
  computed: {},
  watch: {},
  methods: {
    handleClickCol (colId) {
      console.log(colId)
      this.currentColumn = colId
    }
  },
  created() {},
  mounted() {
    if(!this.previewTableData.length) {
      this.previewTableData = this.examplePreviewTableData
    }
  },
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
.tabs-full-height ::v-deep{
  .el-tabs__content {
    box-sizing: border-box;
    height: calc(100% - 40px);
  }
  &.scroll .el-tabs__content {
    overflow-y: scroll;
  }
}
</style>