export default [
  {
    type: 'text',
    render: (row, column, cellValue) => {
      // 文本渲染逻辑
      return `<span>${cellValue}</span>`;
    }
  },
  {
    type: 'number',
    render: (row, column, cellValue) => {
      // 数字渲染逻辑
      return `<span>${cellValue}</span>`;
    }
  },
  {
    type: 'textarea',
    render: (row, column, cellValue) => {
      // 文本渲染逻辑
      return `<span>${cellValue}</span>`;
    }
  },
  {
    type: 'select',
    render: (row, column, cellValue) => {
      // 下拉选择渲染逻辑，使用字典进行显示
      return `<span>${dictTranslate(cellValue, 'selectDict')}</span>`;
    }
  },
  {
    type: 'radio',
    render: (row, column, cellValue) => {
      // 单选按钮渲染逻辑，使用字典进行显示
      return `<span>${dictTranslate(cellValue, 'radioDict')}</span>`;
    }
  },
  {
    type: 'checkbox',
    render: (row, column, cellValue) => {
      // 复选框渲染逻辑，使用字典进行显示
      return `<span>${dictTranslate(cellValue, 'checkboxDict')}</span>`;
    }
  },
  {
    type: 'datetime',
    render: (row, column, cellValue) => {
      // 日期时间渲染逻辑，可以格式化日期
      return `<span>${formatDate(cellValue)}</span>`;
    }
  },
  {
    type: 'imageUpload',
    render: (row, column, cellValue) => {
      // 图片渲染逻辑，显示图片预览
      return cellValue ? `<img src="${cellValue}" style="width: 100px; height: auto;" />` : '';
    }
  },
  {
    type: 'fileUpload',
    render: (row, column, cellValue) => {
      // 文件渲染逻辑，显示文件链接
      return cellValue ? `<a href="${cellValue}" target="_blank">下载文件</a>` : '';
    }
  },
  {
    type: 'editor',
    render: (row, column, cellValue) => {
      // 文本渲染逻辑
      return `<span>${cellValue}</span>`;
    }
  },
  // --------------
  {
    type: 'boolean',
    render: (row, column, cellValue) => {
      // 布尔值渲染逻辑，使用开关显示
      return `<el-switch v-model="row.${column.property}"></el-switch>`;
    }
  },
  {
    type: 'date',
    render: (row, column, cellValue) => {
      // 日期时间渲染逻辑，可以格式化日期
      return `<span>${formatDate(cellValue)}</span>`;
    }
  },
  {
    type: 'time',
    render: (row, column, cellValue) => {
      // 日期时间渲染逻辑，可以格式化日期
      return `<span>${formatDate(cellValue)}</span>`;
    }
  },
  // --------------
  {
    type: 'color',
    render: (row, column, cellValue) => {
      // 颜色渲染逻辑，显示颜色和对应的值
      return `<span style="color: ${cellValue};">${cellValue}</span>`;
    }
  },
  {
    type: 'password',
    render: (row, column, cellValue) => {
      // 密码渲染逻辑，用眼睛按钮切换显示/隐藏
      return `<el-input type="password" v-model="row.${column.property}" show-password></el-input>`;
    }
  },
  {
    type: 'json',
    render: (row, column, cellValue) => {
      // JSON渲染逻辑，使用<pre>标签进行预格式化显示
      return `<pre>${JSON.stringify(cellValue, null, 2)}</pre>`;
    }
  },
  // ...其他字段映射
];
