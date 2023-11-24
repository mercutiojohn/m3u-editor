<template>
  <div class="form-settings">
    <div style="display: flex; gap: 10px; width: 100%; ">
      <div class="sidebar" style="width: 500px">
        <h4>表格配置</h4>
        <vue-json-editor
          style="width: 100%; flex-shrink: 0"
          v-model="coreData.formOptions"
          :showBtns="false"
          :mode="'tree'"
          lang="zh"
          :expandedOnStart="true"
        />
        <pre>{{coreData.formOptions}}</pre>
        <h4>模拟数据</h4>
        <vue-json-editor
          style="width: 100%; flex-shrink: 0"
          v-model="previewFormData"
          :showBtns="false"
          :mode="'tree'"
          lang="zh"
          :expandedOnStart="true"
        />
        <!-- <pre>{{examplePreviewFormData}}</pre> -->
      </div>
      <form-preview style="width: 100%" :formOptions="coreData.formOptions" :previewFormData="previewFormData" :previewFormItems="previewFormItems" />
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