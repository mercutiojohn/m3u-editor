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
      actions: [
        {
          name: '修改',
          props: {
            type: 'text',
            size: 'mini',
            icon: 'el-icon-edit'
          },
          onClick: [this.handleToUpdate],
          show: 'modify'
        },
        {
          name: '取消',
          props: {
            type: 'text',
            size: 'mini',
            icon: 'el-icon-close'
          },
          onClick: [this.handleCancel],
          show: 'cancel'
        },
        {
          name: '查看',
          props: {
            type: 'text',
            size: 'mini',
            icon: 'el-icon-view'
          },
          onClick: [this.handleToSee],
          show: 'view'
        },

        {
          name: '编辑',
          props: {
            type: 'text',
            size: 'mini',
            icon: 'el-icon-edit'
          },
          onClick: [this.handleToUpdate],
          show: 'edit'
        },
        {
          name: '删除',
          props: {
            type: 'text',
            size: 'mini',
            icon: 'el-icon-close'
          },
          onClick: [this.handleDelete],
          show: 'delete'
        },
        {
          name: '确认',
          props: {
            type: 'text',
            size: 'mini',
            icon: 'el-icon-check'
          },
          onClick: [this.handleToUpdate1],
          show: 'settleConfirm'
        },
        {
          name: '接单',
          props: {
            type: 'text',
            size: 'mini',
            icon: 'el-icon-edit'
          },
          onClick: [this.handleToUpdate],
          show: 'take'
        },
        {
          name: '用车反馈',
          props: {
            type: 'text',
            size: 'mini',
            icon: 'el-icon-check'
          },
          onClick: [this.handleToUpdate1],
          show: 'settle'
        },
        {
          name: '查看',
          props: {
            type: 'text',
            size: 'mini',
            icon: 'el-icon-view'
          },
          onClick: [this.handleToSee],
          show: 'view-pad'
        },
        {
          name: '查看',
          props: {
            type: 'text',
            size: 'mini',
            icon: 'el-icon-view'
          },
          onClick: [this.handleToSee],
          show: 'view-analytics'
        },
        {
          name: '查看',
          props: {
            type: 'text',
            size: 'mini',
            icon: 'el-icon-view'
          },
          onClick: [this.handleToSee],
          show: 'view-maintainence'
        },
        {
          name: '查看',
          props: {
            type: 'text',
            size: 'mini',
            icon: 'el-icon-view'
          },
          onClick: [this.handleToSee],
          show: 'view-driver'
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
          width: 300,
          showOverflowTooltip: true
        },
        {
          prop: 'date',
          label: '申请时间',
          align: 'center',
          width: 160,
          showOverflowTooltip: true,
          render: (h, scope) => {
            return h('span', parseTime(scope.row.createTime, '{y}-{m}-{d}'))
          }
        },
        {
          prop: 'obligation2',
          label: '乘车人',
          align: 'center',
          width: 200,
          showOverflowTooltip: true
        },
        {
          prop: 'passengerNum',
          label: '用车人数',
          align: 'center',
          width: 100,
          showOverflowTooltip: true
        },
        {
          prop: 'carAffair',
          label: '用车事由',
          align: 'left',
          headerAlign: 'center',
          width: 200,
          showOverflowTooltip: true
        },
        {
          prop: 'departurePlace',
          label: '出发地点',
          align: 'center',
          width: 100,
          showOverflowTooltip: true
        },
        {
          prop: 'destination',
          label: '目的地',
          align: 'center',
          width: 100,
          showOverflowTooltip: true
        },
        {
          prop: 'carMiles',
          label: '预估用车公里数',
          align: 'center',
          width: 160,
          showOverflowTooltip: true
        },
        {
          prop: 'departureTime',
          label: '预计出发时间',
          align: 'center',
          width: 160,
          showOverflowTooltip: true
        },
        {
          prop: 'driverName',
          label: '司机',
          align: 'center',
          width: 100,
          showOverflowTooltip: true,
          formatter: this.driverNameFormatter
        },
        {
          prop: 'realDepartureTime',
          label: '出车时间',
          align: 'center',
          width: 160,
          showOverflowTooltip: true
        },
        {
          prop: 'realDestination',
          label: '实际目的地',
          align: 'center',
          width: 100,
          showOverflowTooltip: true
        },
        {
          prop: 'realCarMiles',
          label: '实际公里数',
          align: 'center',
          width: 100,
          showOverflowTooltip: true
        },
        {
          prop: 'reservationStatus',
          label: '订单状态',
          align: 'center',
          width: 90,
          showOverflowTooltip: true,
          formatter: this.carReservationStatusFormatter
        }
      ],
      showActionStatus: {
        // submit
        'view': ['03', '02', '07'],
        'edit': ['05'],
        'delete': ['05'],
        'cancel': ['00', '01'],
        'modify': ['00', '01'],
        'settleConfirm': ['06'],
        // pad
        'take': ['00'],
        'view-pad': ['03', '06', '02', '07'],
        'settle': ['01'],
        // analytics
        'view-analytics': true,
        // maintainence
        'view-maintainence': true,
        // driver
        'view-driver': true
      },
      showActionStatusTable: {
        'view': ['submit'],
        'edit': ['submit'],
        'delete': ['submit'],
        'cancel': ['submit'],
        'modify': ['submit'],
        'settleConfirm': ['submit'],
        // pad
        'take': ['processorAndDriver'],
        'view-pad': ['processorAndDriver'],
        'settle': ['processorAndDriver'],
        // maintainence
        'view-maintainence': ['maintainence'],
        // analytics
        'view-analytics': ['analytics'],
        // driver
        'view-driver': ['driver']
      },
      showRowStatus: {
        'index': true,
        'name': ['submit', 'processorAndDriver', 'driver', 'analytics', 'maintainence'],
        'address': ['submit', 'processorAndDriver', 'driver', 'analytics', 'maintainence'],
        'date': true,
        'obligation2': ['submit', 'processorAndDriver', 'driver', 'analytics', 'maintainence'],
        'departurePlace': ['submit', 'processorAndDriver', 'driver', 'analytics', 'maintainence'],
        'destination': ['submit', 'processorAndDriver', 'driver', 'analytics', 'maintainence'],
        'carAffair': ['submit', 'processorAndDriver', 'driver', 'analytics', 'maintainence'],
        'carMiles': ['submit'],
        'departureTime': ['submit', 'processorAndDriver', 'driver', 'maintainence'],
        'passengerNum': ['submit', 'processorAndDriver', 'driver', 'analytics', 'maintainence'],
        'driverName': ['submit', 'processorAndDriver', 'analytics', 'maintainence'],
        'realDestination': ['submit', 'processorAndDriver', 'driver', 'analytics', 'maintainence'],
        'realCarMiles': ['submit', 'processorAndDriver', 'driver', 'analytics', 'maintainence'],
        'realDepartureTime': ['submit', 'processorAndDriver', 'driver', 'analytics', 'maintainence'],
        'reservationStatus': ['submit', 'processorAndDriver', 'driver', 'analytics', 'maintainence']
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
