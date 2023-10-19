<template>
    <div class="split-view-item"
      @dragstart="startDrag($event, id)"
      @dragover="dragOver($event, id)"
      @drop="drop($event, id)"
      @dragleave="dragLeave($event, id)"
      @dragend="dragEnd($event, id)"
      :class="{ over: id === splitView.overId }"
      :style="{ 
        flexBasis: size + 'px'
      }">
      <div class="header" :draggable="draggable" v-if="showHeader">
        {{name}} {{size}} {{splitView.overId}}
        <!-- {{viewItem.id}} {{viewItem.size}} -->
      </div>
      <div :class="{'content': true, 'show-header': showHeader}">
        <slot></slot>
      </div>
    </div>
</template>

<script>
import emitter from '@/mixins/emitter';
export default {
  name:"SplitViewItem",
  inject: ['splitView'],
  mixins: [emitter],
  data() {
    return {
      id: "",
      size: 0
    };
  },
  props: {
    draggable: {
      type: [Boolean],
      default: false
    },
    showHeader: {
      type: [Boolean],
      default: true
    },
    name: {
      type: [String],
      default: 'No Name'
    },
    // direction: {
    //   type: [String],
    //   default: 'vertical'
    // },
    // viewItems: {
    //   type: [Array],
    //   default: () => [
    //     { component: () => import('@/components/common-screen/components/Bye.vue'), name:"Bye" },
    //     { component: () => import('@/components/common-screen/components/Hello.vue'), name:"Hello1" },
    //     { component: () => import('@/components/common-screen/components/Hello.vue'), name:"Hello2" },
    //     // 可以根据需要添加更多的视图项
    //   ]
    // }
  },
  created() {
    if(!this.id) {
      this.id = this.generateRandomId()
    }
  },
  mounted() {
    console.log("addField dispatch",[this])

    this.dispatch('SplitView', 'merc.splitView.addField', [this]);
    // 初始化视图项和 Sash 项
  },
  beforeDestroy() {
    console.log("removeField dispatch")

    this.dispatch('SplitView', 'merc.splitView.removeField', [this]);
  },
  methods: {
    generateRandomId(length = 8) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let id = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters.charAt(randomIndex);
      }
      return id;
    },
    startDrag(event, itemId) {
      console.log("startDrag", itemId)
      this.dispatch('SplitView', 'merc.splitView.startDrag', [this], event, itemId);

      // // 设置拖动的数据（在这里我们只需要传递 item 的 id）
      // event.dataTransfer.setData('text/plain', itemId);
    },
    dragOver(event, targetItemId) {
      console.log("dragOver", event);
      event.preventDefault();
      this.dispatch('SplitView', 'merc.splitView.dragOver', [this], event, targetItemId);

      // // 找到目标项的索引
      // this.overIndex = this.viewItems.findIndex(item => item.id === targetItemId);
    },
    drop(event, targetItemId) {
      console.log("drop", targetItemId)
      this.dispatch('SplitView', 'merc.splitView.drop', [this], event, targetItemId);

      // const sourceItemId = event.dataTransfer.getData('text/plain');

      // // 找到源项和目标项的索引
      // const sourceIndex = this.viewItems.findIndex(item => item.id === sourceItemId);
      // const targetIndex = this.viewItems.findIndex(item => item.id === targetItemId);

      // // 交换源项和目标项的位置
      // if (sourceIndex > -1 && targetIndex > -1) {
      //   const [movedItem] = this.viewItems.splice(sourceIndex, 1);
      //   this.viewItems.splice(targetIndex, 0, movedItem);
      //   this.updateSashPositions()
      //   this.overIndex = -1
      // }
    },
    dragLeave(event, targetItemId) {
      console.log("dragLeave", targetItemId)
      this.dispatch('SplitView', 'merc.splitView.dragLeave', [this], event, targetItemId);

      // this.overIndex = -1
    },
    dragEnd(event, targetItemId) {
      console.log("dragEnd", targetItemId)
      this.dispatch('SplitView', 'merc.splitView.dragEnd', [this], event, targetItemId);
      
      // this.overIndex = -1
    }
  },
};
</script>

<style lang="scss" scoped>
.split-view-item {
  border: 1px solid #000;
  /* flex: 1; */
  overflow: hidden;
  &.over {
    border-color: #ff0000;
  }
  .header {
    width: 100%;
    height: 30px;
    background: #ccc;
    user-select: none;
  }
  .content {
    height: 100%;
    overflow: auto;
    &.show-header {
      height: calc(100% - 30px);
    }
  }
}
</style>