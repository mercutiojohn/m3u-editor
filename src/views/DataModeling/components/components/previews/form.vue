<template>
  <div>
    <el-form :model="previewFormData" v-bind="formOptions.props">
      <el-form-item
        v-for="item in previewFormItems"
        :key="item.prop"
        :label="item.label"
      >
        <component
          :is="item.component"
          v-model="previewFormData[item.prop]"
          v-bind="item.properties.props"
        ></component>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 预览渲染
export default {
  name: "FormPreview",
  props: ["formOptions", "previewFormData", "previewFormItems"],
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