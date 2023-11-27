<template>
  <div>
    <el-form inline>
      <el-form-item label="视图">
        <el-select v-model="currentView">
          <el-option 
          v-for="(item, index) in roleOptions.views"
          :key="index"
          :label="item.name"
          :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开发模式">
        <el-switch v-model="devMode"></el-switch>
      </el-form-item>
    </el-form>
    <el-card>
      <el-form :model="previewFormData" v-bind="formOptions.props" :style="gridFormStyle()">
        <template v-for="item in previewFormItems">
          <el-form-item
            v-if="roleIncludes(item.properties.roles, 'showViews')"
            :key="item.prop"
            :label="item.label"
            :style="gridItemStyle(item)"
            v-bind="item.properties.props.base"
          >
            <template slot="label">
              <!-- <i class="el-icon-info"></i>  -->
              <span>{{item.label}}</span>
              <span style="color: red; margin-left: 5px" v-if="item.properties.isRequired">*</span>
              <br />
              <el-tag v-if="devMode" style="margin-left: 5px" type="info">{{item.prop}}</el-tag>
            </template>
            <!-- {{item.options}} -->
            <component
              :is="item.component"
              v-model="previewFormData[item.prop]"
              v-bind="item.properties.props.inner"
              :disabled="roleIncludes(item.properties.roles, 'readOnlyRoles')"
            >
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
            <el-tag v-if="devMode">{{item.component}}</el-tag>
          </el-form-item>
        </template>
      </el-form>
      <div class="form-actions">
        <template v-for="button in formOptions.actionButtons">
          <el-button
            v-if="roleIncludes(button.roles, 'showViews')"
            :key="button.id"
            v-bind="button.props"
            @click="handleButtonClick(button.onClick)"
          >
            {{ button.name }}
          </el-button>
        </template>
      </div>
    </el-card>
  </div>
</template>

<script>
// 预览渲染
export default {
  name: "FormPreview",
  props: ["formOptions", "previewFormData", "previewFormItems", "roleOptions"],
  computed: {},
  watch: {},
  data () {
    return {
      // Mock View
      currentView: '',
      devMode: false
    }
  },
  methods: {
    roleIncludes (roles, type) {
      return roles[type].includes(this.currentView)
    },
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
  mounted() {
    if(!this.currentView) {
      this.currentView = this.roleOptions.views[0].id
    }
  },
  beforeDestroy() {},
};
</script>

<style>
</style>