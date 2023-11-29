// javaTypeMappings.js
export default [
    { type: 'text', javaType: 'String' },
    { type: 'number', javaType: 'Integer' },
    { type: 'textarea', javaType: 'String' },
    { type: 'select', javaType: 'String' },
    { type: 'radio', javaType: 'String' },
    { type: 'checkbox', javaType: 'Boolean' },
    { type: 'datetime', javaType: 'java.util.Date' },
    { type: 'imageUpload', javaType: 'String' },
    { type: 'fileUpload', javaType: 'String' },
    { type: 'editor', javaType: 'String' },
  
    { type: 'status', javaType: 'String' },
    
    { type: 'boolean', javaType: 'Boolean' },
    { type: 'date', javaType: 'java.util.Date' },
    { type: 'time', javaType: 'java.util.Date' },
  
    { type: 'email', javaType: 'String' },
    { type: 'password', javaType: 'String' },
    { type: 'color', javaType: 'String' },
    { type: 'url', javaType: 'String' },
    { type: 'person', javaType: 'String' },
    { type: 'group', javaType: 'String' },
    { type: 'coordination', javaType: 'String' },
    { type: 'json', javaType: 'String' }, // 或者使用特定的 JSON 类型，如果数据库支持
    // ... 根据需要可继续添加更多类型
  ];
  