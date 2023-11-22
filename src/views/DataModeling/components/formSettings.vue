<template>
  <div class="table-settings" style="width: 100% height: 100vh; flex-shrink: 0">
    <!-- <h3>表格配置</h3> -->
    <pre>{{coreData.formOptions}}</pre>
    <vue-json-editor
      style="width: 100%; flex-shrink: 0"
      v-model="coreData.formOptions"
      :showBtns="false"
      :mode="'tree'"
      lang="zh"
      :expandedOnStart="true"
    />
  </div>
</template>

<script>
// 预览渲染
import VueJsonEditor from "@/components/json-editor/index.vue";

export default {
  name: "TableSettings",
  components: {
    VueJsonEditor
  },
  props: ['coreData'],
  data() {
    return {

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