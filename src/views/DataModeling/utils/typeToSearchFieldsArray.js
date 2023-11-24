export default [
    { type: 'text', component: 'el-input' }, // 文本输入框
    { type: 'number', component: 'el-input-number' }, // 数字输入框
    { type: 'textarea', component: false }, // 数字输入框
    { type: 'select', component: 'el-select' }, // 下拉选择框
    { type: 'radio', component: 'el-select' }, // 单选按钮组
    { type: 'checkbox', component: 'el-select' }, // 复选框组
    { type: 'datetime', component: 'el-date-picker', props: { type: 'datetime' } }, // 日期和时间选择器
    { type: 'imageUpload', component: false },
    { type: 'fileUpload', component: false },
    { type: 'editor', component: false },

    { type: 'boolean', component: 'el-select' },  // 开关 // TODO: 字典
    { type: 'date', component: 'el-date-picker' }, // 日期选择器
    { type: 'time', component: 'el-time-picker' }, // 时间选择器

    { type: 'email', component: 'el-input', props: { type: 'email' } }, // 电子邮件输入框
    { type: 'password', component: false },
    // { type: 'color', component: 'el-color-picker' }, // 颜色选择器
    { type: 'color', component: false }, // 颜色选择器
    // { type: 'url', component: 'el-input', props: { type: 'url' } }, // URL地址输入框
    { type: 'url', component: false }, // URL地址输入框
    // { type: 'person', component: 'custom-person-selector' }, // 人员选择器，可能需要自定义组件 // TODO
    { type: 'person', component: 'el-input' }, // 人员选择器，可能需要自定义组件
    // { type: 'group', component: 'custom-group-selector' }, // 组织机构选择器，可能需要自定义组件 // TODO
    { type: 'group', component: 'el-input' }, // 组织机构选择器
    // { type: 'coordination', component: 'el-input' }, // 坐标输入组件
    { type: 'coordination', component: false }, // 坐标输入组件
    { type: 'json', component: false }, // JSON编辑器
    // ...根据需要可以继续添加其他类型的映射
  ];
  