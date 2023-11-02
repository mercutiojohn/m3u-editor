<template>
  <div class="screen">
    <split-view
      direction="horizontal"
      class="view"
      name="编辑器"
      style="width: 100%"
    >
      <!-- <split-view-item show-header name="布局和组件" init-size="350px">
        <el-tabs v-model="activeTabLeft" type="card" class="card-reset size-mini ios my-tabs">
          
        </el-tabs>
      </split-view-item> -->
      <split-view-item name="主界面">
        <div class="canvasFather" ref="canvasFather">
          <div
            class="canvas"
            ref="canvas"
            :style="{
              height: height,
              width: width,
              // transform: `scale(${settings.scale})`,
              zoom: scale,
            }"
          >
            <grid-layout
              v-if="!loading"
              :layout.sync="layout"
              :col-num="options.colNum"
              :row-height="options.rowHeight"
              :margin="options.margin"
              :is-mirrored="false"
              :vertical-compact="false"
              :prevent-collision="true"
              :is-resizable="settings.editMode"
              :is-draggable="settings.editMode"
              :use-css-transforms="settings.useCssTransforms"
              :responsive="options.responsive"
              :cols="options.cols"
              :is-bounded="true"
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
        </div>
        <div class="bottom-bar">
          <div class="pane"></div>
          <div class="pane">
            <template v-if="!settings.useAutoScale">
              <el-slider
                style="width: 100px"
                v-model="settings.scale"
                :min="0.01"
                :max="2"
                :step="0.000001"
              ></el-slider>
            </template>
            <!-- <template v-else>
              <span>{{Math.floor(scale * 100) + '%'}}</span>
            </template> -->
            <el-button
              size="mini"
              :disabled="settings.useAutoScale"
              @click="settings.scale = 1"
              >{{ Math.floor(scale * 100) + "%" }}</el-button
            >
            <el-checkbox v-model="settings.useAutoScale">自动缩放</el-checkbox>
          </div>
        </div>
      </split-view-item>
      <split-view-item show-header name="设置" init-size="400px">
        <el-tabs
          v-model="activeTabRight"
          type="card"
          class="card-reset size-mini ios my-tabs"
        >
          <el-tab-pane label="组件设置" name="component"> </el-tab-pane>
          <el-tab-pane style="height: 100%" label="页面组件" name="layout">
            <split-view
              v-if="activeTabRight === 'layout'"
              direction="vertical"
              name="左边栏-页面布局"
            >
              <split-view-item show-header name="页面布局">
                <vue-json-editor
                  v-model="layout"
                  :showBtns="false"
                  :mode="'tree'"
                  lang="zh"
                  :expandedOnStart="true"
                />
              </split-view-item>
              <split-view-item show-header name="组件绑定">
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
          <el-tab-pane style="height: 100%" label="面板设置" name="options">
            <split-view
              v-if="activeTabRight === 'options'"
              name="右边栏-面板设置"
            >
              <split-view-item show-header name="面板设置">
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
    SplitViewItem,
    // MapBox,
  },
  computed: {
    scale() {
      if (this.options.responsive) {
        // 响应式
        return 1;
      } else if (this.settings.useAutoScale) {
        // 自动缩放
        return this.autoScale;
      } else {
        // 手动调整缩放
        return this.settings.scale;
      }
    },
    height() {
      if (this.options.responsive) {
        // 响应式
        return "100%";
      } else if (this.settings.useAutoScale) {
        // 自动缩放
        return `calc(${this.options.resolution[1]}px)`;
      } else {
        // 手动调整缩放
        return this.options.resolution[1] * this.scale + "px";
      }
    },
    width() {
      if (this.options.responsive) {
        // 响应式
        return "100%";
      } else if (this.settings.useAutoScale) {
        // 自动缩放
        return `calc(${this.options.resolution[0]}px)`;
        // return ''
      } else {
        // 手动调整缩放
        return this.options.resolution[0] * this.scale + "px";
      }
    },
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
    setupCanvasScaleListener() {
      const resizeObserver = new ResizeObserver(() => {
        console.log("[CanvasScale]", "Resizing");
        this.getScale();
      });
      resizeObserver.observe(this.$refs.canvasFather);
    },
    getScale() {
      const canvasFather = this.$refs.canvasFather;
      const canvas = this.$refs.canvas;
      const width = canvasFather.clientWidth - this.fatherPadding * 2;
      const height = canvasFather.clientHeight - this.fatherPadding * 2;
      const scaleX = width / this.options.resolution[0];
      const scaleY = height / this.options.resolution[1];
      console.log("[CanvasScale]", "getScale", width, height, scaleX, scaleY);
      this.autoScale = Math.min(scaleX, scaleY);
    },
  },
  beforeCreate() {
    installComponents(Vue).then(() => {
      this.loading = false;
    });
  },
  mounted() {
    this.getScale();
    this.setupCanvasScaleListener();
  },
  data() {
    return {
      fatherPadding: 20,
      autoScale: 1,
      settings: {
        useAutoScale: true,
        devMode: false,
        editMode: true,
        useCssTransforms: false,
        scale: 1,
      },
      loading: true,
      activeTabRight: "options",
      activeCollapses: ["layout", "content"],
      layout: [
        {
          x: 3,
          y: 2,
          w: 6,
          h: 9,
          id: "0aebca",
          i: "0",
          moved: false,
        },
        {
          x: 3,
          y: 11,
          w: 6,
          h: 6,
          id: "0aebcb",
          i: "99",
          moved: false,
        },
        {
          x: 0,
          y: 0,
          w: 12,
          h: 2,
          id: "9asd7g",
          i: "1",
          moved: false,
        },
        {
          x: 0,
          y: 8,
          w: 3,
          h: 9,
          id: "9ssf2d",
          i: "2",
          moved: false,
        },
        {
          x: 0,
          y: 2,
          w: 3,
          h: 6,
          id: "asd2ed",
          i: "3",
          moved: false,
        },
        {
          x: 9,
          y: 2,
          w: 3,
          h: 6,
          id: "lk19sf",
          i: "4",
          moved: false,
        },
        {
          x: 9,
          y: 8,
          w: 3,
          h: 9,
          id: "lk19sv",
          i: "48",
          moved: false,
        },
      ],
      content: [
        { id: "0aebca", type: "component", componentName: "Hello" },
        { id: "0aebcb", type: "component", componentName: "Hello" },
        { id: "9asd7g", type: "component", componentName: "Bye" },
        { id: "9ssf2d", type: "component", componentName: "" },
        { id: "asd2ed", type: "component", componentName: "" },
        { id: "lk19sf", type: "component", componentName: "" },
        { id: "lk19sv", type: "component", componentName: "" },
      ],
      gridItemStyles: {
        borderRadius: "10px",
        // boxShadow: '0 5px 20px -2px #00000038',
        border: "1px solid #00000033",
        background: "#fff",
      },
      options: {
        colNum: 12,
        rowHeight: 30,
        margin: [20, 20],
        responsive: false,
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
        //
        resolution: [1600, 900],
      },
    };
  },
};
</script>
<style lang="scss" scoped>
$father-padding: 20px;
$bottom-bar-height: 30px;
$border-color: #ccc;
.canvasFather {
  background: rgba(0, 0, 0, 0.034);
  width: calc(100% - ($father-padding * 2));
  height: calc(100% - ($father-padding * 2) - $bottom-bar-height);
  overflow-x: auto;
  overflow-y: auto;
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
  padding: 20px;
}
.panel {
  border-right: 1px solid $border-color;
}
.bottom-bar {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  height: calc($bottom-bar-height - 1px);
  border-top: 1px solid $border-color;
  .pane {
    // width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
.view {
  width: 100%;
}
.my-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  ::v-deep {
    .el-tabs__header {
      padding: 10px;
      /* padding-top: 0; */
    }
    .el-tabs__content {
      height: 100%;
    }
  }
}
.grid-item {
  border: 1px solid #000;
  overflow: hidden;
}
.canvas {
  border-radius: 2px;
  box-shadow: 0 5px 20px -2px #00000038;
  border: 1px solid #00000033;
  background: #fff;
  z-index: -1;
  background: #fff;
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
    border-left: 1px solid $border-color;
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
    .jsoneditor-vue {
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