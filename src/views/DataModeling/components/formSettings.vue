<template>
  <div class="form-settings" style="display: flex; gap: 10px; width: 100%; height: 100%; box-sizing: border-box">
    <form-preview style="width: 100%" :formOptions="coreData.formOptions" :previewFormData="previewFormData" :previewFormItems="previewFormItems" :roleOptions="coreData.roleOptions" @clickRow="handleClickRow"/>
    <div class="sidebar" style="width: 500px; height: calc(100% - 10px);  box-sizing: border-box; flex-shrink: 0">
      <el-tabs type="card" style="height: 100%" class="tabs-full-height scroll tab-reset size-mini ios my-tabs">
        <el-tab-pane label="字段配置" style="height: 100%">
          <span>{{coreData.fieldList[currentField].field}}</span>
          <span>{{coreData.fieldList[currentField].name}}</span>
          <vue-json-editor
            style="width: 100%; flex-shrink: 0"
            v-model="coreData.fieldList[currentField].formProperties"
            :showBtns="false"
            :mode="'tree'"
            lang="zh"
            :expandedOnStart="true"
          />
        </el-tab-pane>
        <el-tab-pane label="表单配置" style="height: 100%">
          <vue-json-editor
            style="width: 100%; flex-shrink: 0"
            v-model="coreData.formOptions"
            :showBtns="false"
            :mode="'tree'"
            lang="zh"
            :expandedOnStart="true"
          />
          <!-- <pre>{{ coreData.formOptions }}</pre> -->
        </el-tab-pane>

        <el-tab-pane label="模拟数据">
          <vue-json-editor
            style="width: 100%; flex-shrink: 0"
            v-model="previewFormData"
            :showBtns="false"
            :mode="'tree'"
            lang="zh"
            :expandedOnStart="true"
          />
          <!-- <pre>{{ examplePreviewFormData }}</pre> -->
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
// 预览渲染
import VueJsonEditor from "@/components/json-editor/index.vue";
import previewRender from '../mixins/previewRender'
import FormPreview from './components/previews/form.vue'

export default {
  name: "FormSettings",
  components: {
    VueJsonEditor,
    FormPreview
  },
  mixins: [previewRender],
  props: ['coreData'],
  data() {
    return {
      previewFormData: {},
      currentField: 0
    };
  },
  computed: {},
  watch: {},
  methods: {
    handleClickRow (rowId) {
      console.log(rowId)
      this.currentField = rowId
    }
  },
  created() {},
  mounted() {},
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