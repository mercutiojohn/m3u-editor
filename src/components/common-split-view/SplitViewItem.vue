<template>
<!--  
      @dragstart="startDrag($event, id)"
      @dragover="dragOver($event, id)"
      @drop="drop($event, id)"
      @dragleave="dragLeave($event, id)"
      @dragend="dragEnd($event, id)" 
-->
    <section class="split-view-item"
      :class="{ over: id === splitView.overId }"
      :style="{ flexBasis: size + 'px' }">
      <div :class="{'header': true, 'folded': !expanded}" :draggable="draggable" v-show="(expanded && showHeader) || (!expanded && direction === 'vertical')">
        <span class="title">{{name}}</span>
        <button class="expand-toggle" @click="toggleExpand()">
          <!-- <template v-if="direction === 'vertical'">
            <ArrowUp v-if="expanded" class="arrow"/>
            <ArrowDown v-else class="arrow"/>
          </template>
          <template v-else>
            <ArrowLeft v-if="expanded" class="arrow"/>
            <ArrowRight v-else class="arrow"/>
          </template> -->
          <ArrowDown v-if="expanded" class="arrow"/>
          <ArrowRight v-else class="arrow"/>
        </button>
      </div>
      <div v-show="expanded" :class="{'content': true, 'show-header': showHeader, 'hide': !expanded}" ref="content">
        <slot></slot>
      </div>
      <div @click="toggleExpand()" class="horizontal-folded" v-show="!expanded && direction === 'horizontal'">
        <button class="expand-toggle">
          <!-- <template v-if="direction === 'vertical'">
            <ArrowUp v-if="expanded" class="arrow"/>
            <ArrowDown v-else class="arrow"/>
          </template>
          <template v-else>
            <ArrowLeft v-if="expanded" class="arrow"/>
            <ArrowRight v-else class="arrow"/>
          </template> -->
          <ArrowDown v-if="expanded" class="arrow"/>
          <ArrowRight v-else class="arrow"/>
        </button>
        <span class="title">{{name}}</span>
      </div>
    </section>
</template>

<script>
import ArrowDown from './assets/arrow-down.svg'
import ArrowUp from './assets/arrow-up.svg'
import ArrowLeft from './assets/arrow-left.svg'
import ArrowRight from './assets/arrow-right.svg'
import emitter from './mixins/emitter';
import { generateRandomId } from './utils';
export default {
  name: 'SplitViewItem',
  componentName: 'SplitViewItem',
  components: { ArrowDown, ArrowUp, ArrowLeft, ArrowRight },
  inject: [ 'splitView' ],
  mixins: [ emitter ],
  data() {
    return {
      id: '',
      size: 0,
      savedSize: 0,
      expanded: true
    };
  },
  computed: {
    direction() {
      if (this.splitView) return this.splitView.direction
      else return 'vertical'
    }
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
    // console.log('[SplitViewItem]', 'created', this.name, 'size:', this.size, this)
    if(!this.id) {
      this.id = generateRandomId()
    }
  },
  mounted() {
    // console.log('[SplitViewItem]', 'mounted', this.name, 'size:', this.size, this)
    // 初始化视图项和 Sash 项
    this.dispatch('SplitView', 'merc.splitViewItem.addField', [this]);
  },
  beforeDestroy() {
    // console.log('[SplitViewItem]', 'beforeDestroy', this.name, 'size:', this.size, this)
    this.dispatch('SplitView', 'merc.splitViewItem.removeField', [this]);
  },
  beforeUpdate() {
    // console.log('[SplitViewItem]', 'beforeUpdate', this.name, 'size:', this.size, this)
  },
  updated() {
    // console.log('[SplitViewItem]', 'updated', this.name, 'size:', this.size, this)
  },
  methods: {
    toggleExpand() {
      // console.log('[expand] dispatch', this.expanded, this.id, this.size)
      this.dispatch('SplitView', 'merc.splitViewItem.expand', [this]);
    },
    startDrag(event, itemId) {
      // console.log("startDrag", itemId)
      // this.dispatch('SplitView', 'merc.splitViewItem.startDrag', [this], event, itemId);
    },
    dragOver(event, targetItemId) {
      // console.log("dragOver", event);
      event.preventDefault();
      // this.dispatch('SplitView', 'merc.splitViewItem.dragOver', [this], event, targetItemId);
    },
    drop(event, targetItemId) {
      // console.log("drop", targetItemId)
      // this.dispatch('SplitView', 'merc.splitViewItem.drop', [this], event, targetItemId);
    },
    dragLeave(event, targetItemId) {
      // console.log("dragLeave", targetItemId)
      // this.dispatch('SplitView', 'merc.splitViewItem.dragLeave', [this], event, targetItemId);
    },
    dragEnd(event, targetItemId) {
      // console.log("dragEnd", targetItemId)
      // this.dispatch('SplitView', 'merc.splitViewItem.dragEnd', [this], event, targetItemId);
    }
  },
};
</script>

<style lang="scss" scoped>
.split-view-item {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  /* border: 1px solid #ccc; */
  overflow: hidden;
  &.over {
    /* border-color: #ff0000; */
    opacity: .5;
  }
  &:not(:last-child) {
    .header {
      &.folded {
        border-bottom-color: transparent;
      }
    }
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 30px;
    padding: 0 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    user-select: none;
    /* &.folded {
      border-bottom-color: transparent;
    } */
    .title {
      line-height: 30px;
    }
    .expand-toggle {
      &:hover {
        background: #00000023;
      }
    }
  }
  .content {
    height: 100%;
    overflow: auto;
    &.show-header {
      height: calc(100% - 30px);
    }
    &.hide {
      display: none;
    }
  }
  .horizontal-folded {
    writing-mode: vertical-rl;
    width: 30px;
    line-height: 30px;
    height: 100%;
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    justify-content: flex-start;
    padding: 10px 0;
    height: 100%;
    gap: 10px;
    &:hover {
      background: #00000013;
    }
  }
  .expand-toggle {
    border: none;
    background: none;
    .arrow {
      transform: scale(1.5);
    }
  }
}
</style>