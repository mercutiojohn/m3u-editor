<template>
  <div class="split-view">
    <div v-if="!loading" :class="{'split-view-container':true, 'vertical': direction === 'vertical', 'horizontal': direction === 'horizontal' }" ref="container">
      <div class="split-view-item" v-for="(viewItem, index) in viewItems" :key="index" 
        @dragstart="startDrag($event, viewItem.id)"
        @dragover="dragOver($event, viewItem.id)"
        @drop="drop($event, viewItem.id)"
        @dragleave="dragLeave($event, viewItem.id)"
        @dragend="dragEnd($event, viewItem.id)"
        :class="{ over: index === overIndex }"
        :style="{ 
          flexBasis: viewItem.size + 'px'
        }">
        <div class="header" draggable>
          {{viewItem.name}} 
          <!-- {{viewItem.id}} {{viewItem.size}} -->
        </div>
        <component :is="viewItem.component">
          <!-- Pass any props you want to the component -->
        </component>
      </div>
    </div>
    <div :class="{'split-view-sashes':true, 'vertical': direction === 'vertical', 'horizontal': direction === 'horizontal' }">
      <div :class="{'split-view-sash':true, 'vertical': direction === 'vertical', 'horizontal': direction === 'horizontal' }" v-for="(sashItem, index) in sashItems" :key="index"
        :style="getSashStyle(sashItem.position)" @mousedown="startSashResize($event, index)"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sashItems: [],
      overIndex: -1,
      loading: false,
      containerWidth: 0,
      containerHeight: 0
    };
  },
  props: {
    direction: {
      type: [String],
      default: 'vertical'
    },
    viewItems: {
      type: [Array],
      default: () => [
        { component: () => import('@/components/common-screen/components/Bye.vue'), name:"Bye" },
        { component: () => import('@/components/common-screen/components/Hello.vue'), name:"Hello1" },
        { component: () => import('@/components/common-screen/components/Hello.vue'), name:"Hello2" },
        // 可以根据需要添加更多的视图项
      ]
    }
  },
  created() {

  },
  mounted() {
    // 初始化视图项和 Sash 项
    this.initViewItems();
    this.initSashItems();
    window.addEventListener('resize', this.handleWindowResize);
  },
  methods: {
    getSashStyle(position) {
      switch (this.direction) {
        case "vertical":
          return { top: position + 'px' }
        case "horizontal":
          return { left: position + 'px' }
        default:
          return { display: 'none' }
      }
    },
    generateRandomId(length = 8) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let id = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters.charAt(randomIndex);
      }
      return id;
    },
    initViewItems() {
      // 初始化视图项
      this.viewItems.forEach((item) => {
        item.id = this.generateRandomId()
      })
      const numItems = this.viewItems.length; // 视图项的数量
      this.containerWidth = this.$refs.container.clientWidth; // 获取 split-view-container 元素的宽度
      this.containerHeight = this.$refs.container.clientHeight; // 获取 split-view-container 元素的宽度
      let totalSize = 0;
      switch (this.direction) {
        case "vertical":
          totalSize = this.containerHeight; // 总宽度为 split-view-container 的宽度
          break;
        case "horizontal":
          totalSize = this.containerWidth; // 总宽度为 split-view-container 的宽度
          break;
        default:
          break;
      }
      const itemSize = Math.floor(totalSize / numItems); // 计算每个项的宽度
      this.viewItems.forEach((item) => {
        item.size = itemSize;
      })
      console.log(this.viewItems)
    },
    initSashItems() {
      // 初始化 Sash 项
      this.sashItems = [];
      for (let i = 0; i < this.viewItems.length - 1; i++) {
        const sashPosition = this.calculateSashPosition(i);
        this.sashItems.push({ position: sashPosition });
      }
    },
    calculateSashPosition(index) {
      // 计算 Sash 的位置
      let position = 0;
      for (let i = 0; i <= index; i++) {
        position += this.viewItems[i].size;
      }
      return position;
    },
    getSashPosition(index) {
      // 获取 Sash 的位置
      return this.sashItems[index].position;
    },
    startSashResize(event, index) {
      // 开始调整大小
      const container = this.$refs.container;
      let initialX = event.clientX;
      let initialY = event.clientY;

      const handleMouseMove = (event) => {
        const deltaX = event.clientX - initialX;
        const deltaY = event.clientY - initialY;
        switch (this.direction) {
          case "vertical":
            this.resizeViewItems(index, deltaY);
            break;
          case "horizontal":
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
    resizeViewItems(index, delta) {
      // 调整视图项的大小
      this.viewItems[index].size += delta;
      this.viewItems[index + 1].size -= delta;
      this.updateSashPositions();
    },
    updateSashPositions() {
      // 更新 Sash 的位置
      for (let i = 0; i < this.sashItems.length; i++) {
        this.sashItems[i].position = this.calculateSashPosition(i);
      }
    },
    startDrag(event, itemId) {
      console.log("startDrag", itemId)
      // 设置拖动的数据（在这里我们只需要传递 item 的 id）
      event.dataTransfer.setData('text/plain', itemId);
    },
    dragOver(event, targetItemId) {
      console.log("dragOver", event);
      event.preventDefault();

      // 找到目标项的索引
      this.overIndex = this.viewItems.findIndex(item => item.id === targetItemId);
    },
    drop(event, targetItemId) {
      console.log("drop", targetItemId)
      const sourceItemId = event.dataTransfer.getData('text/plain');

      // 找到源项和目标项的索引
      const sourceIndex = this.viewItems.findIndex(item => item.id === sourceItemId);
      const targetIndex = this.viewItems.findIndex(item => item.id === targetItemId);

      // 交换源项和目标项的位置
      if (sourceIndex > -1 && targetIndex > -1) {
        const [movedItem] = this.viewItems.splice(sourceIndex, 1);
        this.viewItems.splice(targetIndex, 0, movedItem);
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

        // console.log('width:', oldWidth, newWidth, 'height:', oldHeight, newHeight)

        // 更新每个 viewItem 的 size
        this.viewItems.forEach((item) => {
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
      } catch (error) {
        // console.log(error.type, error.message);
      }
      
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

.split-view-item {
  border: 1px solid #000;
  /* flex: 1; */
  overflow: auto;
  &.over {
    border-color: #ff0000;
  }
  .header {
    width: 100%;
    height: 30px;
    background: #ccc;
  }
}

.split-view-sashes {
  position: absolute;
  z-index: 1;
  &.horizontal {
    /* width: 4px; */
    height: 100%;
  }
  &.vertical {
    /* height: 4px; */
    width: 100%;
  }
}

.split-view-sash {
  position: absolute;
  top: 0;
  bottom: 0;
  /* background-color: #ccc; */

  &:hover {
    background-color: #ff0000;
  }
  &.horizontal {
    width: 4px;
    height: 100%;
  }
  &.vertical {
    height: 4px;
    width: 100%;
  }
}
</style>