export default [
  { type: 'text', component: 'el-input' }, // 文本输入框
  { type: 'number', component: 'el-input-number' }, // 数字输入框
  { type: 'textarea', component: 'el-input', props: { type: 'textarea' } }, // 长文本输入框，需要设置 type 为 'textarea'
  { type: 'select', component: 'el-select' }, // 下拉选择框
  { type: 'radio', component: 'el-radio-group' }, // 单选按钮组
  { type: 'checkbox', component: 'el-checkbox-group' }, // 复选框组
  { type: 'datetime', component: 'el-date-picker', props: { type: 'datetime' } }, // 日期和时间选择器，需要设置 type 为 'datetime'
  { type: 'imageUpload', component: 'el-upload', props: { listType: 'picture-card' } }, // 图片上传组件
  { type: 'fileUpload', component: 'el-upload'}, // 文件上传组件
  { type: 'editor', component: 'custom-rich-text-editor' }, // 富文本编辑器，可能需要自定义组件

  { type: 'boolean', component: 'el-switch' }, // 开关
  { type: 'date', component: 'el-date-picker' }, // 日期选择器
  { type: 'time', component: 'el-time-picker' }, // 时间选择器

  { type: 'email', component: 'el-input', props: { type: 'email' } }, // 电子邮件输入框，可添加类型为 email 的特定属性
  { type: 'password', component: 'el-input', props: { type: 'password' } }, // 密码输入框，可添加类型为 password 的特定属性
  { type: 'color', component: 'el-color-picker' }, // 颜色选择器
  { type: 'url', component: 'el-input', props: { type: 'url' } }, // URL地址输入框，可添加类型为 url 的特定属性
  // { type: 'person', component: 'custom-person-selector' }, // 人员选择器，可能需要自定义组件
  { type: 'person', component: 'el-input' }, // 人员选择器，可能需要自定义组件
  // { type: 'group', component: 'custom-group-selector' }, // 组织机构选择器，可能需要自定义组件
  { type: 'group', component: 'el-input' }, // 组织机构选择器，可能需要自定义组件
  // { type: 'coordination', component: 'custom-coordination-input' }, // 坐标输入组件，可能需要自定义组件
  { type: 'coordination', component: 'el-input' }, // 坐标输入组件，可能需要自定义组件
  // { type: 'json', component: 'custom-json-editor' }, // JSON编辑器，可能需要自定义组件
  { type: 'json', component: 'el-input', props: { type: 'textarea' } }, // JSON编辑器，可能需要自定义组件
  // ...根据需要可以继续添加其他类型的映射
];
