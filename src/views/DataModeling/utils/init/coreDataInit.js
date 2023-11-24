import fieldsInit from "./fieldsInit"

export default {
  name: '个人信息',
  id: 'personalInfo',
  functionAuthor: 'Mercutio',
  remark: '',
  // 字段列表
  fieldList: fieldsInit,
  /** ----- 前端 ----- */
  // 表格全局选项
  tableOptions: {
    // ElTable 配置
    props: {
      height: '100%', // 高度
      width: '100%',
      maxHeight: '100vh', // Table 的最大高度
      border: true, // 纵向边框
      stripe: false, // 隔行阴影 斑马纹
      // size: '' // Table 的尺寸
      fit: true, // 列的宽度是否自撑开
      showHeader: true, // 是否显示表头
      highlightCurrentRow: false, // 是否要高亮当前行
      highlightSelectionRow: false // 是否要高亮复选框选中行（仅针对开启 selection 有效）
    },
    // 表格操作列
    actionButtons: [
      {
        name: '编辑',
        props: {
            type: 'text',
            size: 'mini',
            icon: 'el-icon-edit'
        },
        onClick: '',
        show: 'edit',
        showRow: [],
        showPage: []
    }
    ],
  },
  // 查询条件全局选项
  searchFieldsOptions: {
    props: {
      labelPosition: 'left',	// 字段标签位置
      labelWidth: '200px', // 标签宽度
      inline: true,
    },
  },
  // 表单全局选项
  formOptions: {
    useGrid: true, // 使用 Grid 布局
    gridColumns: 3, // Grid 列数
    // ElForm 配置
    props: {
      // size: '', // 全局组件大小
      // disabled: false, //
      labelPosition: 'left',	// 字段标签位置
      labelWidth: '200px', // 标签宽度
      inline: false, // 行内布局
      showMessage: true, // 是否显示校验错误信息
      statusIcon: true, // 是否在输入框中显示校验结果反馈图标	
      inlineMessage: true, // 是否以行内形式展示校验信息
      rules: {} // 校验规则
    }
  }, 
  // 自定义 CSS 样式
  customCssClasses: '',
  // 自定义方法
  customMethods: {},
  // 自定义变量
  customData: {},
  // 字典配置
  dictsOptions: {
    // 静态字典
    dicts: {
      sex: [
        {
          label: '男',
          value: 1,
        }, {
          label: '女',
          value: 0,
        }
      ],
    },
    // 通过字典管理获取的字典
    remoteDicts: ['a', 'b'],
    // 通过 API 获取的字典 // TODO
    apiDicts: [
      {},
      {}
    ]
  },
  // 接口属性配置 // TODO
  apiOptions: {
    apis: [
      {},
      {}
    ]
  },
  /** ----- RBAC / 流程 视图 ----- */
  // 角色属性配置
  roleOptions: {
    // TODO: 表格预览可选择角色视图
    roles: [
      {
        name: '编辑',
        id: 'edit',
        remark: ''
      },
      {
        name: '审批',
        id: 'approve',
        remark: ''
      },
      {
        name: '查看',
        id: 'view',
        remark: ''
      }
    ],
    // TODO: 表格视图顺序
    tableOrdersVariationByRole: []
  },
  /** ----- 后端 ----- */
  // 生成属性配置
  genOptions: {
    moduleName: 'personManage', // 模块名（前台和 Mapper XML 使用）
    genType: '0', // 生成代码方式，0：zip压缩包；1：自定义路径 // TODO: backend changes to english expression like 'zip' or 'path'
    genPath: '', // 自定义生成路径
    // 菜单
    parentMenuId: '', // 上级菜单
    menuName: '个人信息维护', // 自定义菜单名 // TODO
    icon: 'el-document', // 菜单Icon // TODO
  },
  // Java 属性配置
  javaOptions: {
    packageName: 'com.example.personManage', // 生成包路径
    className: 'personalInfo', // 实体类名称
  },
  // 数据库表属性配置
  sqlOptions: {
    tableName: 'personal_info', // 表名称
    tableComment: '个人信息表' // 表描述
  },
}