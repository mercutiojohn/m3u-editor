import Crud from '@/components/common-crud/components/crud.vue'
import CrudActions from '@/components/common-crud/components/crud-actions.vue'
import { parseTime } from '@/components/common-crud/utils/utils.js'

export default {
  components: {
    Crud,
    CrudActions
  },
  data () {
    return {
      tableOptions: {
        // maxHeight: '1000px',
        height: '100%',
        border: true,
        stripe: false
      },
      tableTypes: [
        {
          label: '提交 - 客户',
          value: 'submit'
        },
        {
          label: '接单 - 前台',
          value: 'handle'
        },
        {
          label: '执行 - 后厨',
          value: 'driver'
        },
        {
          label: '总览 - 主管',
          value: 'analytics'
        },
        {
          label: '数据维护 - 财务',
          value: 'maintenance'
        }
      ],
      actions: [
        {
          name: '修改',
          props: {
            type: 'text',
            size: 'mini',
            icon: 'el-icon-edit'
          },
          onClick: [this.handleToModify],
          show: 'modify',
          showRow: ['submitted'],
          showPage: ['submit'],
        },
        {
          name: '取消',
          props: {
            type: 'text',
            size: 'mini',
            icon: 'el-icon-close'
          },
          onClick: [this.handleCancel],
          show: 'cancel',
          showRow: ['submitted'],
          showPage: ['submit'],
        },
        {
          name: '查看',
          props: {
            type: 'text',
            size: 'mini',
            icon: 'el-icon-view'
          },
          onClick: [this.handleToView],
          show: 'view',
          showRow: ['handled', 'settled', 'confirmed', 'rejected'],
          showPage: ['submit']
        },

        {
          name: '编辑',
          props: {
            type: 'text',
            size: 'mini',
            icon: 'el-icon-edit'
          },
          onClick: [this.handleToTake],
          show: 'edit',
          showRow: ['draft'],
          showPage: ['submit']
        },
        {
          name: '删除',
          props: {
            type: 'text',
            size: 'mini',
            icon: 'el-icon-close'
          },
          onClick: [this.handleDelete],
          show: 'delete',
          showRow: ['draft'],
          showPage: ['submit']
        },
        {
          name: '确认',
          props: {
            type: 'text',
            size: 'mini',
            icon: 'el-icon-check'
          },
          onClick: [this.handleToConfirm],
          show: 'settleConfirm',
          showRow: ['settled'],
          showPage: ['submit']
        },
        {
          name: '接单',
          props: {
            type: 'text',
            size: 'mini',
            icon: 'el-icon-edit'
          },
          onClick: [this.handleToTake],
          show: 'handle',
          showRow: ['submitted'],
          showPage: ['handle'],
        },
        {
          name: '反馈',
          props: {
            type: 'text',
            size: 'mini',
            icon: 'el-icon-check'
          },
          onClick: [this.handleToConfirm],
          show: 'settle',
          showRow: ['handled'],
          showPage: ['handle']
        },
        {
          name: '查看',
          props: {
            type: 'text',
            size: 'mini',
            icon: 'el-icon-view'
          },
          onClick: [this.handleToView],
          show: 'view-handle',
          showRow: ['settled', 'confirmed', 'rejected'],
          showPage: ['handle']
        },
        {
          name: '查看',
          props: {
            type: 'text',
            size: 'mini',
            icon: 'el-icon-view'
          },
          onClick: [this.handleToView],
          show: 'view-analytics',
          showRow: true,
          showPage: ['analytics'],
        },
        {
          name: '查看',
          props: {
            type: 'text',
            size: 'mini',
            icon: 'el-icon-view'
          },
          onClick: [this.handleToView],
          show: 'view-maintenance',
          showRow: true,
          showPage: ['maintenance']
        },
        {
          name: '查看',
          props: {
            type: 'text',
            size: 'mini',
            icon: 'el-icon-view'
          },
          onClick: [this.handleToView],
          show: 'view-driver',
          showRow: true,
          showPage: ['driver']
        }
      ],
      columns: [
        // 多选列
        // {
        //   type: 'selection',
        //   width: 55
        // },
        // 序号列
        {
          type: 'index',
          label: '序号',
          align: 'center',
          width: 65
        },
        // 其他列
        {
          prop: 'name',
          label: '申请人',
          align: 'center',
          width: 200,
          showOverflowTooltip: true
        },
        {
          prop: 'address',
          label: '地址',
          align: 'left',
          headerAlign: 'center',
          minWidth: 300,
          showOverflowTooltip: true
        },
        {
          prop: 'date',
          label: '申请时间',
          align: 'center',
          width: 160,
          showOverflowTooltip: true,
          render: (h, scope) => {
            return h('span', parseTime(scope.row.date, '{y}-{m}-{d}'))
          }
        },
        {
          prop: 'currentState',
          label: '订单状态',
          align: 'center',
          width: 90,
          showOverflowTooltip: true,
          formatter: this.currentStateFormatter
        }
      ],
      actionRowStatus: {
        // submit
        'edit': ['draft'],
        'delete': ['draft'],
        'cancel': ['submitted'],
        'modify': ['submitted'],
        'view': ['handled', 'settled', 'confirmed', 'rejected'],
        'settleConfirm': ['settled'],
        // handle
        'handle': ['submitted'],
        'settle': ['handled'],
        'view-handle': ['settled', 'confirmed', 'rejected'],
        // analytics
        'view-analytics': true,
        // maintenance
        'view-maintenance': true,
        // driver
        'view-driver': true
      },
      actionPageStatus: {
        'view': ['submit'],
        'edit': ['submit'],
        'delete': ['submit'],
        'cancel': ['submit'],
        'modify': ['submit'],
        'settleConfirm': ['submit'],
        // pad
        'handle': ['handle'],
        'view-handle': ['handle'],
        'settle': ['handle'],
        // maintenance
        'view-maintenance': ['maintenance'],
        // analytics
        'view-analytics': ['analytics'],
        // driver
        'view-driver': ['driver']
      },
      showRowStatus: {
        'index': true,
        'name': ['submit', 'handle', 'driver', 'analytics', 'maintenance'],
        'address': ['submit', 'handle', 'driver', 'analytics', 'maintenance'],
        'date': true,
        'obligation2': ['submit', 'handle', 'driver', 'analytics', 'maintenance'],
        'departurePlace': ['submit', 'handle', 'driver', 'analytics', 'maintenance'],
        'destination': ['submit', 'handle', 'driver', 'analytics', 'maintenance'],
        'carAffair': ['submit', 'handle', 'driver', 'analytics', 'maintenance'],
        'carMiles': ['submit'],
        'departureTime': ['submit', 'handle', 'driver', 'maintenance'],
        'passengerNum': ['submit', 'handle', 'driver', 'analytics', 'maintenance'],
        'driverName': ['submit', 'handle', 'analytics', 'maintenance'],
        'realDestination': ['submit', 'handle', 'driver', 'analytics', 'maintenance'],
        'realCarMiles': ['submit', 'handle', 'driver', 'analytics', 'maintenance'],
        'realDepartureTime': ['submit', 'handle', 'driver', 'analytics', 'maintenance'],
        'currentState': ['submit', 'handle', 'driver', 'analytics', 'maintenance']
      }
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
  },
  destroyed () {
  },
  methods: {

  }
}
