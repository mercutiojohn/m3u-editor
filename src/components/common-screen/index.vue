<template>
  <div class="screen">
    <split-view direction="horizontal" class="view" name="编辑器" style="width: 100%">
      <split-view-item show-header name="布局和组件" init-size="350px">
        <el-tabs v-model="activeTabLeft" type="card" class="card-reset size-mini ios my-tabs">
          <el-tab-pane style="height: 100%" label="页面布局" name="layout">      
            <split-view v-if="activeTabLeft === 'layout'" direction="vertical" name="左边栏-页面布局">
              <split-view-item name="页面布局">
                <vue-json-editor
                  v-model="layout"
                  :showBtns="false"
                  :mode="'tree'"
                  lang="zh"
                  :expandedOnStart="true"
                />
              </split-view-item>
            </split-view>
          </el-tab-pane>
          <el-tab-pane style="height: 100%" label="组件绑定" name="component">      
            <split-view v-if="activeTabLeft === 'component'" direction="vertical" name="左边栏-组件绑定">
              <split-view-item name="组件绑定">
                <vue-json-editor
                  v-model="content"
                  :showBtns="false"
                  :mode="'tree'"
                  lang="zh"
                  :expandedOnStart="true"
                />
              </split-view-item>
            </split-view>
          </el-tab-pane>
        </el-tabs>
      </split-view-item>
      <split-view-item name="主界面" ref="canvasFather">
        <div class="canvas" ref="canvas" :style="{ 
          width: options.resolution[0] + 'px', 
          height: options.resolution[1] + 'px', 
          transform: `scale(${settings.scale})`,
          // zoom: settings.scale
        }">
        <grid-layout  
          v-if="!loading"
          :layout.sync="layout"
          :col-num="options.colNum"
          :row-height="options.rowHeight"
          :margin="options.margin"
          :is-mirrored="false"
          :vertical-compact="options.verticalCompact"
          :prevent-collision="settings.preventCollision"
          :is-resizable="settings.editMode"
          :is-draggable="settings.editMode"
          :use-css-transforms="settings.useCssTransforms"
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
            :style="gridItemStyles"
          >
            <div v-if="settings.devMode">
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

      </split-view-item>
      <split-view-item show-header name="设置" init-size="400px">
        <el-tabs v-model="activeTabRight" type="card" class="card-reset size-mini ios my-tabs">
          <el-tab-pane label="组件设置" name="component">
          </el-tab-pane>
          <el-tab-pane style="height: 100%" label="面板设置" name="options">
            <split-view v-if="activeTabRight === 'options'" name="右边栏-面板设置">
              <split-view-item show-header name="面板设置">
                <el-slider v-model="settings.scale" :min="0.1" :max="2" :step="0.1"></el-slider>
                <vue-json-editor
                  v-model="settings"
                  :showBtns="false"
                  :mode="'form'"
                  lang="zh"
                  :expandedOnStart="true"
                />
              </split-view-item>
              <split-view-item show-header name="面板属性">
                <vue-json-editor
                  v-model="options"
                  :showBtns="false"
                  :mode="'form'"
                  lang="zh"
                  :expandedOnStart="true"
                />
              </split-view-item>
              <split-view-item show-header name="CSS 样式">
                <vue-json-editor
                  v-model="gridItemStyles"
                  :showBtns="false"
                  :mode="'tree'"
                  lang="zh"
                  :expandedOnStart="true"
                />
              </split-view-item>
            </split-view>
            
          </el-tab-pane>
        </el-tabs>
      </split-view-item>
    </split-view>
  </div>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
import VueJsonEditor from "@/components/json-editor/index.vue";
import SplitView from "@/components/common-split-view/SplitView.vue";
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
    SplitViewItem
    // MapBox,
  },
  computed: {
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
    const canvasFather = this.$refs.canvasFather
    const canvas = this.$refs.canvas

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        console.log(entry)
        const { width, height } = entry.contentRect;
        // const targetRatio = 1600 / 900;

        const scaleX = width / 1600;
        const scaleY = height / 900;
        this.settings.scale = Math.min(scaleX, scaleY);
      }
    });
  },
  data() {
    return {
      settings: {
        devMode: false,
        editMode: true,
        useCssTransforms: true,
        preventCollision: false,
        scale: 1,
      },
      loading: true,
      activeTabLeft: 'layout',
      activeTabRight: 'component',
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
      gridItemStyles: {
        borderRadius: '10px',
        boxShadow: '0 5px 20px -2px #00000038',
        border: '1px solid #00000033',
        background: '#fff'
      },
      options: {
        colNum: 12,
        rowHeight: 30,
        verticalCompact: false,
        margin: [20, 20],
        responsive: false,
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
        // 
        resolution: [1600, 900]
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.panel {
  border-right: 1px solid #ccc;
}
.view {
  width: 100%;
}
.my-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  ::v-deep{ .el-tabs__header {
    padding: 10px;
    /* padding-top: 0; */
  }
  .el-tabs__content {
    height: 100%;
  }}
}
.grid-item {
  border: 1px solid #000;
  overflow: hidden;
}
.canvas {
  z-index: -1;
  background: #0000003e;
  overflow: auto;
}
.screen {
  height: 100%;
  display: flex;
  overflow: hidden;
  .grid {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
  .col {
    border-left: 1px solid #ccc;
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
      overflow-y: auto;
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
  border: 2px dashed #0000003a !important;
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