export default [
  { type: 'text', sqlType: 'VARCHAR', length: '255' }, // 文本类型，最长255个字符
  { type: 'number', sqlType: 'INT' }, // 数字类型
  { type: 'textarea', sqlType: 'TEXT' }, // 长文本类型
  { type: 'select', sqlType: 'VARCHAR', length: '255' }, // 下拉选择类型，假设为单选，最长255个字符
  { type: 'radio', sqlType: 'VARCHAR', length: '255' }, // 单选按钮类型，最长255个字符
  { type: 'checkbox', sqlType: 'TEXT' }, // 复选框类型，可以是数组或者合并成的字符串
  { type: 'datetime', sqlType: 'DATETIME' }, // 日期和时间类型
  { type: 'imageUpload', sqlType: 'VARCHAR', length: '255' }, // 图片上传类型，存储图片URL或路径，最长255个字符
  { type: 'fileUpload', sqlType: 'VARCHAR', length: '255' }, // 文件上传类型，存储文件URL或路径，最长255个字符
  { type: 'editor', sqlType: 'TEXT' }, // 富文本编辑器类型，可能需要更大的空间
    
  { type: 'status', sqlType: 'VARCHAR', length: '255' },
  
  { type: 'boolean', sqlType: 'BOOLEAN' }, // 布尔值/开关类型
  { type: 'date', sqlType: 'DATE' }, // 日期类型
  { type: 'time', sqlType: 'TIME' }, // 时间类型
  
  { type: 'email', sqlType: 'VARCHAR', length: '255' }, // 电子邮件类型，最长255个字符
  { type: 'password', sqlType: 'VARCHAR', length: '255' }, // 密码类型，加密后的密码，最长255个字符
  { type: 'color', sqlType: 'VARCHAR', length: '255' }, // 颜色选择器类型，存储颜色代码，最长255个字符
  { type: 'url', sqlType: 'VARCHAR', length: '255' }, // URL地址类型，最长255个字符
  { type: 'person', sqlType: 'VARCHAR', length: '255' }, // 人员类型，存储名字或标识符，最长255个字符
  { type: 'group', sqlType: 'VARCHAR', length: '255' }, // 组织机构类型，存储组织名或标识符，最长255个字符
  { type: 'coordination', sqlType: 'VARCHAR', length: '255' }, // 坐标类型，存储为字符串格式的坐标，最长255个字符
  { type: 'json', sqlType: 'JSON' }, // JSON类型，许多现代数据库支持JSON数据类型
  // ... 根据需要可继续添加更多类型
];
