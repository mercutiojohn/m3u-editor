<template>
  <div>
    <!-- <pre>{{searchFieldsOptions}}</pre>{{currentView}} -->
    <el-form :model="previewSearchData" v-bind="searchFieldsOptions.props" :style="gridFormStyle()">
    <template v-for="(item, index) in previewSearchItems">
      <el-form-item
        v-if="viewIncludes(item.properties.roles, 'showViews')"
        :key="item.prop"
        :label="item.label"
        :style="gridItemStyle(item)"
        v-bind="item.properties.props.base"
      >
        <template slot="label">
          <!-- <i class="el-icon-info"></i>  -->
          <span @click="$emit('clickRow', index)">{{item.label}}</span>
          <span style="color: red; margin-left: 5px" v-if="item.properties.isRequired">*</span>
          <br />
          <el-tag @click="$emit('clickRow', index)" v-if="devMode" style="margin-left: 5px" type="info">{{item.prop}}</el-tag>
        </template>
        <!-- {{item.options}} -->
        <component
          :is="item.component"
          v-model="previewSearchData[item.prop]"
          v-bind="item.properties.props.inner"
        >
        <!-- 
            :disabled="viewIncludes(item.properties.roles, 'readOnlyRoles')"
         -->
            <!-- 以下是针对特定组件的选项渲染逻辑 -->
            <template v-if="item.component === 'el-select'">
            <el-option
              v-for="option in item.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            ></el-option>
            </template>
            <template v-if="item.component === 'el-radio-group'">
            <el-radio
              v-for="option in item.options"
              :key="option.value"
              :label="option.value"
            >{{ option.label }}</el-radio>
            </template>
            <template v-if="item.component === 'el-checkbox-group'"> <!-- // TODO: 有问题 length undefined -->
            <el-checkbox
                v-for="option in item.options"
                :key="option.value"
                :label="option.value"
            >{{ option.label }}</el-checkbox>
            </template>
        </component>
        <br />
        <el-tag v-if="devMode">{{item.component}}</el-tag>
      </el-form-item>
    </template>
    <el-button icon="el-icon-search" type="primary">
      查询
    </el-button>
    <el-button icon="el-icon-delete" @click="previewSearchData = {}">
      重置
    </el-button>
    </el-form>
    <!-- <div class="form-actions">
    <template v-for="button in searchFieldsOptions.actionButtons">
        <el-button
        v-if="viewIncludes(button.roles, 'showViews')"
        :key="button.id"
        v-bind="button.props"
        @click="handleButtonClick(button.onClick)"
        >
        {{ button.name }}
        </el-button>
    </template> -->
    </div>
  </div>
</template>

<script>
// 预览渲染
export default {
  name: "SearchPreview",
  props: [
    "searchFieldsOptions",
    "previewSearchItems",
    "roleOptions",
    "currentView",
    "devMode"
  ],
  computed: {},
  watch: {},
  data() {
    return {
      previewSearchData: {},
    };
  },
  methods: {
    viewIncludes(roles, type) {
      return roles[type].includes(this.currentView);
    },
    handleButtonClick(methodName) {
      // 调用传入的方法名，可能需要一些上下文绑定或参数
      if (this[methodName]) {
        this[methodName]();
      }
    },
    gridItemStyle(item) {
      //   if (this.searchFieldsOptions.useGrid) {
      //     const span = item.properties.gridSpan || 1;

      //     return {
      //       'grid-column': `span ${span}`
      //     };
      //   } else {
      return {};
      //   }
    },
    gridFormStyle() {
      //   if (this.searchFieldsOptions.useGrid) {
      //     const gridColumns = this.searchFieldsOptions.gridColumns || 3;
      //     const gridRowGap = this.searchFieldsOptions.gridRowGap || '10px';
      //     const gridColumnGap = this.searchFieldsOptions.gridColumnGap || '10px';

      //     return {
      //       'display': 'grid',
      //       'grid-template-columns': `repeat(${gridColumns}, minmax(300px, 1fr))`,
      //       'row-gap': gridRowGap,
      //       'column-gap': gridColumnGap
      //     };
      //   } else {
      return {};
      //   }
    },
  },
  created() {},
  mounted() {
    // if(!this.currentView) {
    //   this.currentView = this.roleOptions.views[0].id
    // }
  },
  beforeDestroy() {},
};
</script>

<style>
</style>