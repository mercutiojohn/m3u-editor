export default [
  { type: 'text', component: 'el-input' },
  { type: 'number', component: 'el-input-number' },
  { type: 'email', component: 'el-input' }, // 可添加类型为 email 的特定属性
  { type: 'date', component: 'el-date-picker' },
  { type: 'datetime', component: 'el-date-picker' }, // 需要设置 type 为 'datetime'
  { type: 'boolean', component: 'el-switch' },
  { type: 'password', component: 'el-input' }, // 可添加类型为 password 的特定属性
  { type: 'textarea', component: 'el-input' }, // 需要设置 type 为 'textarea'
  { type: 'select', component: 'el-select' },
  { type: 'checkbox', component: 'el-checkbox' },
  { type: 'radio', component: 'el-radio-group' },
  { type: 'file', component: 'el-upload' }, // 文件上传组件
  { type: 'color', component: 'el-color-picker' },
  { type: 'url', component: 'el-input' }, // 可添加类型为 url 的特定属性
  // ...其他类型映射
];