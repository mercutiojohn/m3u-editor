<template>
  <div class="screen">
    <div class="grid" v-if="!loading">
      <grid-layout
        :layout.sync="layout"
        :col-num="options.colNum"
        :row-height="options.rowHeight"
        :is-draggable="options.isDraggable"
        :is-resizable="options.isResizable"
        :is-mirrored="false"
        :vertical-compact="options.verticalCompact"
        :prevent-collision="options.preventCollision"
        :margin="options.margin"
        :use-css-transforms="options.useCssTransforms"
        :responsive="options.responsive"
        :cols="options.cols"
      >
        <grid-item
          v-for="item in layout"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="item.id"
          class="grid-item"
        >
          <div v-if="devMode">
            <p>id:{{ item.id }}</p>
            <p>i:{{ item.i }}</p>
            <p>x:{{ item.x }}</p>
            <p>y:{{ item.y }}</p>
            <p>h:{{ item.h }}</p>
          </div>
          <component :is="getComponent(item.id)"></component>
        </grid-item>
      </grid-layout>
    </div>
    <div class="col">
      <el-tabs v-model="activeTab" type="card">
        <el-tab-pane label="component" name="component">

        </el-tab-pane>
        <el-tab-pane style="height: 100%" label="layout" name="layout">
          <split-view-new v-if="activeTab === 'layout'">
            <split-view-item name="layout">
              <vue-json-editor
                  v-model="layout"
                  :showBtns="false"
                  :mode="'tree'"
                  lang="zh"
                  :expandedOnStart="true"
                />
            </split-view-item>
            <split-view-item name="content">
              <vue-json-editor
                  v-model="content"
                  :showBtns="false"
                  :mode="'tree'"
                  lang="zh"
                  :expandedOnStart="true"
                />
            </split-view-item>
          </split-view-new>
        </el-tab-pane>
        <el-tab-pane style="height: 100%" label="options" name="options">
          <split-view-new v-if="activeTab === 'options'">
            <split-view-item name="options"  :show-header="false">
              <vue-json-editor
                v-model="options"
                :showBtns="false"
                :mode="'tree'"
                lang="zh"
                :expandedOnStart="true"
              />
            </split-view-item>
          </split-view-new>
          
        </el-tab-pane>
      </el-tabs>

      <!-- <code v-html="JSON.stringify(layout, 2, ' ')"></code> -->
      <!--         @json-change="onJsonChange"
        @json-save="onJsonSave" -->
    </div>
  </div>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
import VueJsonEditor from "@/components/json-editor/index.vue";
import SplitView from "@/components/common-split-view/index.vue";
import SplitViewNew from "@/components/common-split-view/SplitView.vue";
import SplitViewItem from "@/components/common-split-view/SplitViewItem.vue";
// import MapBox from "@/components/mapbox"
import installComponents from "./utils/dataFlow";
import Vue from "vue";

export default {
  name: "CommonScreen",
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    VueJsonEditor,
    SplitView,
    SplitViewNew,
    SplitViewItem
    // MapBox,
  },
  methods: {
    getComponent(id) {
      let a = this.content.filter((item) => item.id === id);
      // console.log(id, a);

      if (a.length && a[0].componentName) {
        return a[0].componentName;
      } else {
        return "";
      }
      // return this.content.filter((item) => {
      //   item.id === id
      // })[0].componentName
    },
  },
  beforeCreate() {
    installComponents(Vue).then(() => {
      this.loading = false;
    });
  },
  mounted() {
    this.options.isDraggable = this.editMode;
    this.options.isResizable = this.editMode;
  },
  data() {
    return {
      loading: true,
      devMode: false,
      editMode: false,
      activeTab: 'component',
      activeCollapses: ['layout','content'],
      layout: [
        { x: 0, y: 12, w: 12, h: 9, id: "0aebca", i: "0", moved: false },
        { x: 0, y: 0, w: 12, h: 12, id: "9asd7g", i: "1", moved: false },
        { x: 0, y: 27, w: 6, h: 6, id: "9ssf2d", i: "2", moved: false },
        { x: 0, y: 21, w: 12, h: 6, id: "asd2ed", i: "3", moved: false },
        { x: 6, y: 27, w: 6, h: 6, id: "lk19sf", i: "4", moved: false },
      ],
      content: [
        { id: "0aebca", type: "component", componentName: "Hello" },
        { id: "9asd7g", type: "component", componentName: "Bye" },
        { id: "9ssf2d", type: "component", componentName: "" },
        { id: "asd2ed", type: "component", componentName: "" },
        { id: "lk19sf", type: "component", componentName: "" },
      ],
      options: {
        colNum: 12,
        rowHeight: 30,
        isDraggable: false,
        isResizable: false,
        verticalCompact: false,
        preventCollision: false,
        useCssTransforms: true,
        margin: [30, 30],
        responsive: false,
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.grid-item {
  /* border: 1px solid #000; */

  /* width: 100%;
  height: 100%; */
  border-radius: 10px;
  box-shadow: 0 5px 20px -2px #00000038;
  border: 1px solid #00000033;
  overflow: hidden;
}
.screen {
  height: 100%;
  display: flex;
  gap: 10px;
  overflow: hidden;
  .grid {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
  .col {
    flex-shrink: 0;
    width: 500px;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    /* overflow-y: scroll; */
    ::v-deep .el-tabs {
      height: 100%;
    }
    ::v-deep .el-tabs__content {
      height: 100%;
      overflow-y: scroll;
    }
  }
}
::v-deep {
  
  
  .jsoneditor-vue-outer {
    height: 100%;
    .jsoneditor-vue{
      height: 100%;
      .jsoneditor {
        border: none;
        height: 100%;
        height: calc(100% - 61px);
        div.jsoneditor-outer.has-nav-bar.has-main-menu-bar {
          margin-top: 0;
          padding-top: 0;
          height: 100%;
        }
      }
    }
  }
}
</style>
<style>
.vue-grid-item.vue-grid-placeholder {
  border-radius: 10px !important;
  border: 5px dashed #00000013 !important;
  background: none !important;
  opacity: 1 !important;
  transition-duration: 100ms;
  z-index: 2;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
</style>