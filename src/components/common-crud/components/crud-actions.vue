<script>
export default {
  // props: ['tableData', 'row', 'actions', 'options', 'useStatus', 'showActionStatus', 'statusProp'],
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
    showActionStatus: {
      type: Object,
      default: () => {}
    },
    statusProp: {
      type: String,
      default: ''
    },
    showActionStatusTable: {
      type: Object,
      default: () => {}
    },
    tableStatusProp: {
      type: String,
      default: ''
    }
  },
  render (h) {
    return h(
      'div',
      { },
      this.actions.map(item => {
        const isNotNull = this.statusProp && this.row[this.statusProp] && item.show && this.showActionStatus && this.showActionStatus[item.show] && this.showActionStatusTable 
        const getStatusResult = (value, includeStr) => {
          if (typeof value === 'boolean') {
            return value
          } else if (Array.isArray(value)) {
            return value.length && value.includes(includeStr)
          } else {
            return false
          }
        }
        const includes = getStatusResult(this.showActionStatus[item.show], this.row[this.statusProp]) && getStatusResult(this.showActionStatusTable[item.show], this.tableStatusProp)
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
