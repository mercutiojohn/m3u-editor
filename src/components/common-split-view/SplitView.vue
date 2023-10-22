<template>
  <div class="split-view" ref="splitView">
    <div v-if="!loading" :class="{'split-view-container':true, 'vertical': direction === 'vertical', 'horizontal': direction === 'horizontal' }" ref="container">
      <slot></slot>
    </div>
    <div :class="{'split-view-sashes':true, 'vertical': direction === 'vertical', 'horizontal': direction === 'horizontal' }">
      <div 
        :class="{'split-view-sash':true, 'vertical': direction === 'vertical', 'horizontal': direction === 'horizontal' }"
        v-for="(sashItem, index) in sashItems"
        :key="index"
        :style="getSashStyle(sashItem.position)"
        @mousedown="startSashResize($event, index)"
        @mouseup="endSashResize($event, index)"
      ></div>
    </div>
  </div>
</template>

<script>
import { getCalcResult } from './utils/index.js'
export default {
  name: 'SplitView',
  componentName: 'SplitView',
  computed: {
    cursor() {
      console.log(document.body.style.cursor)
      return document.body.style.cursor
    },
  },
  watch: {
    $slots: {
      deep: true,
      handler() {
        console.log('$slots changed')
        // 插槽发生变化时执行的方法
        // this.initViewItems();
        // this.initSashItems();
      },
    },
  },
  data() {
    return {
      mountedFlag: false,
      sashItems: [],
      overId: -1,
      loading: false,
      containerWidth: 0,
      containerHeight: 0,
      fields: [],
      parentWidth: 0,
      parentHeight: 0,
      parentTop: 0
    };
  },
  provide() {
    return {
      splitView: this
    };
  },
  props: {
    direction: {
      type: [String],
      default: 'vertical'
    }
  },
  created() {
    this.$on('merc.splitViewItem.addField', (field) => {
      if (field) {
        // console.log('addField $on', field)
        this.fields.push(field);
        if(this.mountedFlag) {
          this.initViewItems(()=>{
            this.initSashItems()
          });
        }
      }
    });
    this.$on('merc.splitViewItem.removeField', (field) => {
      if (field) {
        console.log('removeField $on', field)
        this.fields.splice(this.fields.indexOf(field), 1);
      }
    });
    // Drag
    this.$on('merc.splitViewItem.startDrag', (field, event, itemId) => {
      if (field) {
        this.startDrag(event, itemId);
      }
    });
    this.$on('merc.splitViewItem.dragOver', (field, event, targetItemId) => {
      if (field) {
        this.dragOver(event, targetItemId);
      }
    });
    this.$on('merc.splitViewItem.drop', (field, event, targetItemId) => {
      if (field) {
        this.drop(event, targetItemId);
      }
    });
    this.$on('merc.splitViewItem.dragLeave', (field, event, targetItemId) => {
      if (field) {
        this.dragLeave(event, targetItemId);
      }
    });
    this.$on('merc.splitViewItem.dragEnd', (field, event, targetItemId) => {
      if (field) {
        this.dragEnd(event, targetItemId);
      }
    });
    // Expand
    this.$on('merc.splitViewItem.expand', (field) => {
      if (field) {
        const index = this.fields.findIndex((findField) => findField.id === field.id);
        console.log('[expand] $on', field.expanded, field.id, field.size, field.savedSize)
        if (field.expanded) {
          const savedSize = field.savedSize
          field.savedSize = 0
          // console.log('saved size', field.savedSize, 'size add', (savedSize - 30))
          this.resizeViewItems(index, (savedSize - 30))
        } else {
          field.savedSize = field.size
          // console.log('size add', (0 - (field.size - 30)), 'size saved', field.savedSize)
          this.resizeViewItems(index, (0 - (field.size - 30)))
        }
      }
    });
  },
  mounted() {
    // 初始化视图项和 Sash 项
    this.initViewItems(()=>{
      this.initSashItems()
    });
    this.mountedFlag = true
    // window.addEventListener('resize', this.handleWindowResize);
    this.setupSplitViewWidthListener();
  },
  methods: {
    calcParentHeight() {
      try {
        this.parentHeight =  this.$refs.splitView.offsetHeight
        // return getComputedStyle(this.$refs.splitView).height.split('px')[0]
      } catch (e) {}
    },
    calcParentWidth() {
      try {
        this.parentWidth =  this.$refs.splitView.offsetWidth
        // return getComputedStyle(this.$refs.splitView).width.split('px')[0]
      } catch (e) {}
    },
    calcParentTop() {
      try {
        this.parentTop =  this.$refs.splitView.offsetTop
        // return getComputedStyle(this.$refs.splitView).height.split('px')[0]
      } catch (e) {}
    },
    getSashStyle(position) {
      // console.log('getSashStyle', position, this.parentWidth, this.parentHeight)
      switch (this.direction) {
        case 'vertical':
          return { top: position + 'px', width: this.parentWidth + 'px' }
        case 'horizontal':
          return { left: position + 'px', top: this.parentTop + 'px', height: this.parentHeight + 'px' }
        default:
          return { display: 'none' }
      }
    },
    setupSplitViewWidthListener() {
      const resizeObserver = new ResizeObserver(() => {
        this.calcParentWidth();
        this.calcParentHeight();
        this.calcParentTop();
        this.handleWindowResize();
      });
      resizeObserver.observe(this.$refs.splitView);
    },
    initViewItems(cb = () => {}) {
      let initSizes = [];
      this.fields.forEach((item) => {
        if (item.initSize) {
          initSizes.push(item.initSize);
          // console.log('initSizes', initSizes)
        }
      })
      const initSizesCalc = initSizes.length ? initSizes.join(' + ') : '0px';
      
      const numItems = this.fields.length - initSizes.length; // 视图项的数量
      this.containerWidth = this.$refs.container.clientWidth; // 获取 split-view-container 元素的宽度
      // this.containerWidth = window.getComputedStyle(this.$refs.container).width.split('px')[0];
      this.containerHeight = this.$refs.container.clientHeight; // 获取 split-view-container 元素的宽度
      // this.containerHeight = window.getComputedStyle(this.$refs.container).height.split('px')[0];
      let totalSize = 0;
      switch (this.direction) {
        case 'vertical':
          totalSize = this.containerHeight; // 总宽度为 split-view-container 的宽度
          break;
        case 'horizontal':
          totalSize = this.containerWidth; // 总宽度为 split-view-container 的宽度
          break;
        default:
          break;
      }
      // const itemSize = Math.floor((totalSize - initSizes) / numItems); // 计算每个项的宽度

      console.log('initViewItems', 
        'parentWidth', this.parentWidth,
        'containerWidth', window.getComputedStyle(this.$refs.container).width,
        'parentHeight', this.parentHeight,
        'containerHeight', window.getComputedStyle(this.$refs.container).height,
        'this.fields.length',this.fields.length,
        'initSizes.length',initSizes.length,
        'calculation', `calc((${totalSize}px - ${initSizesCalc}) / ${numItems})`, 
        'calculated', getCalcResult(`calc((${totalSize}px - (${initSizesCalc})) / ${numItems})`)
      )

      const itemSize = getCalcResult(`calc((${totalSize}px - (${initSizesCalc})) / ${numItems})`);

      this.fields.forEach((item) => {
        if (!item.initSize) {
          item.size = itemSize;
          // console.log('initViewItems', item.size)
        } else {
          item.size = getCalcResult(item.initSize);
          // console.log('initViewItems', item.size)
        }
      })
      cb()
      // console.log('initViewItems', this.fields)
    },
    initSashItems() {
      // 初始化 Sash 项
      this.sashItems = [];
      for (let i = 0; i < this.fields.length - 1; i++) {
        const sashPosition = this.calculateSashPosition(i);
        this.sashItems.push({ position: sashPosition });
      }
    },
    calculateSashPosition(index) {
      // 计算 Sash 的位置
      let position = 0;
      for (let i = 0; i <= index; i++) {
        position += this.fields[i].size;
      }
      return position;
    },
    getSashPosition(index) {
      // 获取 Sash 的位置
      return this.sashItems[index].position;
    },
    startSashResize(event, index) {
      switch (this.direction) {
        case 'vertical':
          document.body.style.cursor = 'ns-resize';
          break;
        case 'horizontal':
          document.body.style.cursor = 'ew-resize';
          break;
        default:
          break;
      }
      // 开始调整大小
      const container = this.$refs.container;
      let initialX = event.clientX;
      let initialY = event.clientY;

      const handleMouseMove = (event) => {
        const deltaX = event.clientX - initialX;
        const deltaY = event.clientY - initialY;
        switch (this.direction) {
          case 'vertical':
            this.resizeViewItems(index, deltaY);
            break;
          case 'horizontal':
            this.resizeViewItems(index, deltaX);
            break;
          default:
            break;
        }
        initialX = event.clientX;
        initialY = event.clientY;
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    endSashResize() {
      document.body.style.cursor = ''
      delete document.body.style.cursor
    },
    resizeViewItems(index, delta) {
      // 调整视图项的大小
      this.fields[index].size += delta;
      if (this.fields[index + 1]) {
        this.fields[index + 1].size -= delta;
      } else {
        this.fields[index - 1].size -= delta;
      }
      this.updateSashPositions();
    },
    updateSashPositions() {
      // 更新 Sash 的位置
      for (let i = 0; i < this.sashItems.length; i++) {
        this.sashItems[i].position = this.calculateSashPosition(i);
      }
    },
    startDrag(event, itemId) {
      console.log('startDrag', itemId)
      // 设置拖动的数据（只需要传递 item 的 id）
      event.dataTransfer.setData('text/plain', itemId);
    },
    dragOver(event, targetItemId) {
      console.log('dragOver', event);
      event.preventDefault();

      // 找到目标项的索引
      this.overId = this.fields.find(item => item.id === targetItemId).id;
    },
    drop(event, targetItemId) {
      console.log('drop', targetItemId)
      const sourceItemId = event.dataTransfer.getData('text/plain');

      // 找到源项和目标项的索引
      const sourceIndex = this.fields.findIndex(item => item.id === sourceItemId);
      const targetIndex = this.fields.findIndex(item => item.id === targetItemId);

      // 交换源项和目标项的位置
      if (sourceIndex > -1 && targetIndex > -1) {
        const [movedItem] = this.fields.splice(sourceIndex, 1);
        this.fields.splice(targetIndex, 0, movedItem);
        this.updateSashPositions()
        this.overIndex = -1
      }
    },
    dragLeave(event, targetItemId) {
      this.overIndex = -1
    },
    dragEnd(event, targetItemId) {
      this.overIndex = -1
    },
    handleWindowResize() {
      // 获取新的窗口宽度和高度
      try {
        const newWidth = this.$refs.container.clientWidth;
        const newHeight = this.$refs.container.clientHeight;

        // 计算缩放比例
        const oldWidth = this.containerWidth;
        const oldHeight = this.containerHeight;

        // 更新每个 viewItem 的 size
        this.fields.forEach((item) => {
          switch (this.direction) {
            case 'vertical':
              item.size = item.size * newHeight / oldHeight;
              break;
            case 'horizontal':
              item.size = item.size * newWidth / oldWidth;
              break;
            default:
              break;
          }
        });

        this.containerWidth = newWidth;
        this.containerHeight = newHeight;

        // 更新 Sash 的位置
        this.updateSashPositions();
      } catch (error) {}
    }
  },
};
</script>

<style lang="scss" scoped>
.split-view {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  height: 100%;
  &.vertical {
    min-height: 500px;
  }
}

.split-view-container {
  display: flex;
  flex: 1;
  overflow: hidden;
  &.horizontal {
    flex-direction: row;
    height: 100%;
  }
  &.vertical {
    flex-direction: column;
    width: 100%;
  }
}

.split-view-sashes {
  z-index: 1;
  &.horizontal {
    /* height: 100%; */
    cursor: ew-resize;
  }
  &.vertical {
    position: absolute;
    /* width: 100%; */
    cursor: ns-resize;
  }
}

.split-view-sash {
  user-select: none;
  position: absolute;
  top: 0;
  bottom: 0;

  &:hover {
    /* background-color: #ff0000; */
  }
  &.horizontal {
    transform: translateX(-3px);
    width: 6px;
    /* height: 100%; */
    &::after {
      transform: translateX(3px);
      width: 1px;
      height: 100%;
    }
  }
  &.vertical {
    transform: translateY(-3px);
    height: 6px;
    /* width: 100%; */
    &::after {
      transform: translateY(3px);
      width: 100%;
      height: 1px;
    }
  }
  &::after {
    content: '';
    display: block;
    background-color: #ccc;
  }
}
</style>