<template>
  <div class="preview" style="width: 100% height: 100vh; flex-shrink: 0">
    <!-- <h3>实时预览</h3> -->
    <el-tabs type="border-card" style="height: 100%">
      <el-tab-pane label="el-table 预览">
        <div style="display: flex; gap: 10px">
          <el-table
            :data="previewTableData.length ? previewTableData : examplePreviewTableData"
            v-bind="coreData.tableOptions"
          >
            <el-table-column
              v-for="col in previewTableColumns"
              :key="col.prop"
              :prop="col.prop"
              :label="col.label"
              v-bind="col.properties"
            >
              <template slot="header" slot-scope="scope">
                <span>{{ col.label }}</span>
                <br />
                <el-tag type="info">{{ col.prop }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
          <div class="sidebar" style="width: 400px">
            <h4>模拟数据</h4>
            <vue-json-editor
              style="width: 100%; flex-shrink: 0"
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
        <el-form :model="previewFormData">
          <el-form-item
            v-for="item in previewFormItems"
            :key="item.prop"
            :label="item.label"
          >
            <component
              :is="item.component"
              v-model="previewFormData[item.prop]"
            ></component>
          </el-form-item>
        </el-form>
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
import VueJsonEditor from "@/components/json-editor/index.vue";

export default {
  name: "Preview",
  components: {
    VueJsonEditor
  },
  mixins: [previewRender],
  props: ['coreData'],
  data() {
    return {
      // 模拟数据
      previewTableData: [],
      examplePreviewTableData: [{ exampleData: '示例数据' }, { exampleData: '示例数据' }]
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