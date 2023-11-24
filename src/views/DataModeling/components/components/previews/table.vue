<template>
  <div style="width: 100%">
    <el-table
      :data="previewTableData"
      v-bind="tableOptions.props"
    >
      <el-table-column
        v-for="col in previewTableColumns"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        v-bind="col.properties.props"
      >
        <template slot="header" slot-scope="scope">
          <span>{{ col.label }}</span>
          <br />
          <el-tag type="info">{{ col.prop }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 预览渲染
export default {
  name: "TablePreview",
  props: ["tableOptions", "previewTableData", "previewTableColumns"],
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