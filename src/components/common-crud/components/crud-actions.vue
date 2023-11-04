<script>
export default {
  // props: ['tableData', 'row', 'actions', 'options', 'useStatus', 'actionRowStatus', 'statusProp'],
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    row: {
      type: Object,
      default: () => {}
    },
    actions: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => {}
    },
    useStatus: {
      type: Boolean,
      default: false
    },
    actionRowStatus: {
      type: Object,
      default: () => {}
    },
    statusProp: {
      type: String,
      default: ''
    },
    actionPageStatus: {
      type: Object,
      default: () => {}
    },
    pageTypeProp: {
      type: String,
      default: ''
    }
  },
  render (h) {
    return h(
      'div',
      { },
      this.actions.map(item => {
        const isNotNull = this.statusProp && this.row[this.statusProp] && item.show && this.actionRowStatus && this.actionRowStatus[item.show] && this.actionPageStatus 
        const getStatusResult = (value, includeStr) => {
          if (typeof value === 'boolean') {
            return value
          } else if (Array.isArray(value)) {
            return value.length && value.includes(includeStr)
          } else {
            return false
          }
        }
        const includes = getStatusResult(this.actionRowStatus[item.show], this.row[this.statusProp]) && getStatusResult(this.actionPageStatus[item.show], this.pageTypeProp)
        if (!this.useStatus || (isNotNull && includes)) {
          return h('el-button', {
            props: item.props,
            on: {
              click: () => {
                if (item.onClick) {
                  // 处理按钮点击事件
                  item.onClick[0](this.row, this.tableData)
                }
              }
            }
          }, item.name)
        } else {
          return null
        }
      })
    )
  }
}
</script>
