export default {
  name: `文本测试`,
  field: `textTest`,
  type: 'text',
  remark: '',
  bindDict: 'gender', // 绑定字典
  // 表单项配置
  formProperties: {
    type: 'el-input', // 类型 // TODO: 初始化选择总 type 自动填入该值
    isRequired: true, // 必填 // TODO: backend links this
    gridSpan: 1, // 如果使用 Grid 布局，所占格数量
    roles: {
      showViews: ['edit', 'approve', 'view'], // 字段显示的视图
      showStatus: ['draft', 'submitted', 'approved', 'view'], // 字段显示的表单状态
      readOnlyRoles: ['view'], // 字段只读的视图
    },
    // TODO: 如何结合 vform 自动加载
    props: {
      // Form Item 配置
      base: {
        labelWidth: '' // TODO
      },
      // Input 配置 // TODO：动态加载，不同类型预设；初始化选择总 type 自动填入该值 props；v-bind
      inner: {
  
      }
    },
  },
  // 表格列配置
  tableProperties: {
    tableRenderType: 'text', // 渲染模式预设 // TODO: 初始化选择总 type 自动填入该值
    renderFunc: '', // 自定义渲染函数 // TODO: 初始化选择总 type 自动填入该值；转译文本
    roles: {
      showViews: ['edit', 'approve', 'view'], // 字段显示的视图
    },
    props: {
      prop: 'textTest',
      label: '文本测试',
      align: 'center',
      headerAlign: 'center',
      minWidth: '',
      width: '',
      showOverflowTooltip: true,
      render: ''
    }
  },
  // 查询条件配置
  searchFieldProperties: {
    searchFieldType: 'text', // 渲染模式预设 // TODO: 初始化选择总 type 自动填入该值
    roles: {
      showViews: ['edit', 'approve', 'view'], // 字段显示的视图
    },
    props: {
      // Form Item 配置
      base: {
        labelWidth: '' // TODO
      },
      // Input 配置 // TODO：动态加载，不同类型预设；初始化选择总 type 自动填入该值 props；v-bind
      inner: {
  
      }
    },
  },
  javaProperties: {
    javaField: 'textTest',
    javaType: 'String',
  },
  // 表格配置
  sqlProperties: {
    columnName: 'text_test', // 字段列名
    columnType: 'VARCHAR', // 物理类型
    columnLength: '255',
    queryType: 'EQ',
    isInsert: true,
    isEdit: true,
    isList: true,
    isQuery: true,
    isNotNull: false
  },
  roleProperties: {
    
  },
  // 
  id: ''
}