<template>
  <div class="field-settings">
    <div style="display: flex; gap: 20px">
      <div style="width: 100%">
      </div>
      <vue-json-editor
        style="width: 500px; flex-shrink: 0"
        v-model="row.tableProperties"
        :showBtns="false"
        :mode="'tree'"
        lang="zh"
        :expandedOnStart="true"
      />
    </div>
  </div>
</template>

<script>
// 数据类型
import dataTypes from "../../utils/dataTypes";
import VueJsonEditor from "@/components/json-editor/index.vue";

export default {
  name: "",
  components: {
    VueJsonEditor
  },
  props: ["row"],
  data() {
    return {
      // 数据类型
      dataTypes
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