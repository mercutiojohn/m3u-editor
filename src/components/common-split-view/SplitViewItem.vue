<template>
    <div class="split-view-item"
      @dragstart="startDrag($event, id)"
      @dragover="dragOver($event, id)"
      @drop="drop($event, id)"
      @dragleave="dragLeave($event, id)"
      @dragend="dragEnd($event, id)"
      :class="{ over: id === splitView.overId }"
      :style="{ flexBasis: size + 'px' }">
      <div class="header" :draggable="draggable" v-if="showHeader">
        <span class="title">{{name}}</span>
      </div>
      <div :class="{'content': true, 'show-header': showHeader}" ref="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
import emitter from './mixins/emitter';
import { generateRandomId } from './utils';
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
      default: false
    },
    name: {
      type: [String],
      default: ''
    },
    initSize: {
      type: [String, Number, Boolean],
      default: false
    }
  },
  created() {
    if(!this.id) {
      this.id = generateRandomId()
    }
  },
  mounted() {
    // 初始化视图项和 Sash 项
    this.dispatch('SplitView', 'merc.splitView.addField', [this]);
  },
  beforeDestroy() {
    this.dispatch('SplitView', 'merc.splitView.removeField', [this]);
  },
  methods: {
    startDrag(event, itemId) {
      console.log("startDrag", itemId)
      this.dispatch('SplitView', 'merc.splitView.startDrag', [this], event, itemId);
    },
    dragOver(event, targetItemId) {
      console.log("dragOver", event);
      event.preventDefault();
      this.dispatch('SplitView', 'merc.splitView.dragOver', [this], event, targetItemId);
    },
    drop(event, targetItemId) {
      console.log("drop", targetItemId)
      this.dispatch('SplitView', 'merc.splitView.drop', [this], event, targetItemId);
    },
    dragLeave(event, targetItemId) {
      console.log("dragLeave", targetItemId)
      this.dispatch('SplitView', 'merc.splitView.dragLeave', [this], event, targetItemId);
    },
    dragEnd(event, targetItemId) {
      console.log("dragEnd", targetItemId)
      this.dispatch('SplitView', 'merc.splitView.dragEnd', [this], event, targetItemId);
    }
  },
};
</script>

<style lang="scss" scoped>
.split-view-item {
  /* border: 1px solid #ccc; */
  overflow: hidden;
  &.over {
    /* border-color: #ff0000; */
    opacity: .5;
  }
  .header {
    width: 100%;
    height: 30px;
    border-bottom: 1px solid #ccc;
    user-select: none;
    .title {
      line-height: 30px;
      padding-left: 10px;
    }
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