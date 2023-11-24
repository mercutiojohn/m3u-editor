<template>
  <div class="preview" style="width: 100%; height: 100vh; flex-shrink: 0">
    <!-- <h3>实时预览</h3> -->
    <el-tabs type="border-card" style="height: 100%">
      <el-tab-pane label="el-table 预览">
        <div style="display: flex; gap: 10px">
          <table-preview style="width: 100%" :tableOptions="coreData.tableOptions" :previewTableData="previewTableData.length ? previewTableData : examplePreviewTableData" :previewTableColumns="previewTableColumns" />
          <div class="sidebar" style="width: 500px; flex-shrink: 0">
            <h4>模拟数据</h4>
            <vue-json-editor
              style="width: 100%"
              v-model="previewTableData"
              :showBtns="false"
              :mode="'tree'"
              lang="zh"
              :expandedOnStart="true"
            />
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="el-form 预览">
        <div style="display: flex; gap: 10px">
          <form-preview style="width: 100%" :formOptions="coreData.formOptions" :previewFormData="previewFormData" :previewFormItems="previewFormItems" />
          <div class="sidebar" style="width: 400px; flex-shrink: 0">
            <h4>模拟数据</h4>
            <vue-json-editor
              style="width: 100%; flex-shrink: 0"
              v-model="previewFormData"
              :showBtns="false"
              :mode="'tree'"
              lang="zh"
              :expandedOnStart="true"
            />
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="SQL 预览">
        <pre>{{ sqlPreview }}</pre>
      </el-tab-pane>

      <el-tab-pane label="Mapper XML 预览">
        <pre>{{ mapperXmlPreview }}</pre>
      </el-tab-pane>

      <el-tab-pane label="前端代码预览">
        <pre>{{ generatedCode }}</pre>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 预览渲染
import previewRender from '../mixins/previewRender'
import TablePreview from './components/previews/table.vue'
import FormPreview from './components/previews/form.vue'
import VueJsonEditor from "@/components/json-editor/index.vue";

export default {
  name: "Preview",
  components: {
    VueJsonEditor,
    TablePreview,
    FormPreview
  },
  mixins: [previewRender],
  props: ['coreData'],
  data() {
    return {
      // 模拟数据
      previewTableData: [],
      examplePreviewTableData: [{ exampleData: '示例数据' }, { exampleData: '示例数据' }],
      previewFormData: {},
      exampleFormData: { exampleData: '示例数据' }
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style>
</style>