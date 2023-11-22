export default {
  name: `文本`,
  field: `text`,
  type: 'text',
  // 表单项配置
  formProperties: {
    type: 'el-input',
    // TODO: 如何结合 vform 自动加载
    // Form Item 配置
    base: {
      labelWidth: ''
    },
    // Input 配置
    inner: {

    }
  },
  // 表格列配置
  tableProperties: {
    prop: '',
    label: '',
    align: 'center',
    headerAlign: 'center',
    minWidth: '',
    width: '',
    showOverflowTooltip: true,
    render: ''
  },
  // SQL 配置
  sqlProperties: {
    type: 'VARCHAR',
    length: '255'
  },
  // 查询条件配置
  filterProperties: {

  },
  mapperProperties: {

  },
  javaProperties: {

  },
  roleProperties: {
    
  },
  // 
  id: ''
}