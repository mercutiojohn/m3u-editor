<template>
  <div>
    <el-form :model="previewFormData" v-bind="formOptions.props" :style="gridFormStyle()">
      <el-form-item
        v-for="item in previewFormItems"
        :key="item.prop"
        :label="item.label"
        :style="gridItemStyle(item)"
        v-bind="item.properties.props.base"
      >
        <template slot="label">
          <!-- <i class="el-icon-info"></i>  -->
          <span>{{item.label}}</span>
          <span style="color: red; margin-left: 5px" v-if="item.properties.isRequired">*</span>
          <el-tag style="margin-left: 5px" type="info">{{item.prop}}</el-tag>
        </template>
        <component
          :is="item.component"
          v-model="previewFormData[item.prop]"
          v-bind="item.properties.props.inner"
        ></component>
      </el-form-item>
    </el-form>
    <div class="form-actions">
      <el-button
        v-for="button in formOptions.actionButtons"
        :key="button.id"
        v-bind="button.props"
        @click="handleButtonClick(button.onClick)"
      >
        {{ button.name }}
      </el-button>
    </div>
  </div>
</template>

<script>
// 预览渲染
export default {
  name: "FormPreview",
  props: ["formOptions", "previewFormData", "previewFormItems"],
  computed: {},
  watch: {},
  methods: {
    handleButtonClick(methodName) {
      // 调用传入的方法名，可能需要一些上下文绑定或参数
      if (this[methodName]) {
        this[methodName]();
      }
    },
    gridItemStyle(item) {
      if (this.formOptions.useGrid) {
        const span = item.properties.gridSpan || 1;

        return {
          'grid-column': `span ${span}`
        };
      } else {
        return {}
      }
    },
    gridFormStyle() {
      if (this.formOptions.useGrid) {
        const gridColumns = this.formOptions.gridColumns || 3;
        const gridRowGap = this.formOptions.gridRowGap || '10px';
        const gridColumnGap = this.formOptions.gridColumnGap || '10px';

        return {
          'display': 'grid',
          'grid-template-columns': `repeat(${gridColumns}, minmax(300px, 1fr))`,
          'row-gap': gridRowGap,
          'column-gap': gridColumnGap
        };
      } else {
        return {}
      }
    }
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style>
</style>