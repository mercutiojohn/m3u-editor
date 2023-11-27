<template>
  <div class="table-settings">
    <div style="display: flex; gap: 10px; width: 100%; overflow-x: hidden">
      <div class="sidebar" style="width: 500px">
        <el-tabs type="border-card">
          <el-tab-pane label="表格配置">
            <vue-json-editor
              style="width: 100%; flex-shrink: 0"
              v-model="coreData.tableOptions"
              :showBtns="false"
              :mode="'tree'"
              lang="zh"
              :expandedOnStart="true"
            />
            <pre>{{ coreData.tableOptions }}</pre>
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
            <pre>{{ examplePreviewTableData }}</pre>
          </el-tab-pane>
        </el-tabs>
      </div>
      <table-preview :tableOptions="coreData.tableOptions" :previewTableData="previewTableData" :previewTableColumns="previewTableColumns" :roleOptions="coreData.roleOptions" />
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
      // examplePreviewTableData: [{ exampleData: '示例数据' }, { exampleData: '示例数据' }]
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {
    if(!this.previewTableData.length) {
      this.previewTableData = this.examplePreviewTableData
    }
  },
  beforeDestroy() {},
};
</script>

<style>
</style>