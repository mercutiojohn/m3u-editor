<script>
import { cloneDeep } from 'lodash-es';

export default {
  // props: ['data', 'columns', 'options', 'vLoading', 'useStatus', 'showRowStatus', 'statusProp'],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => {}
    },
    vLoading: {
      type: Boolean,
      default: false
    },
    useStatus: {
      type: Boolean,
      default: false
    },
    showRowStatus: {
      type: Object,
      default: () => {}
    },
    statusProp: {
      type: String,
      default: ''
    }
  },
  render (h) {
    const tableColumns = [
      ...this.columns.map((column) => {
        let columnProps = cloneDeep(column)
        delete columnProps.render
        // let columnProps = column
        const notNull = this.showRowStatus && (column.prop || column.type) && this.statusProp
        const statusItem = this.showRowStatus[column.prop || column.type]
        const getStatusResult = (value) => {
          if (typeof value === 'boolean') {
            return value
          } else if (Array.isArray(value)) {
            return value.length && value.includes(this.statusProp)
          } else {
            return false
          }
        }
        if (!this.useStatus || (notNull && statusItem && getStatusResult(statusItem))) {
          return h('el-table-column', {
            props: columnProps,
            scopedSlots: column.render ? {
              default: (scope) => {
                return column.render(h, scope)
              }
            } : {}
          })
        } else return null
      }),
      this.$slots.default
    ]

    return h(
      'el-table',
      {
        props: {
          data: this.data,
          ...this.options
        },
        directives: [{
          name: 'loading',
          value: this.vLoading
        }],
        on: {
          'selection-change': this.handleSelectionChange
        }
      },
      tableColumns
    )
  },
  methods: {
    handleSelectionChange (selectedRows) {
      this.$emit('selection-change', selectedRows)
    }
  }
}
</script>
