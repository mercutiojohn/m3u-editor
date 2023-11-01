<template>
  <div class="crud">
    <SplitView direction="horizontal" class="view">
      <SplitViewItem>
        <div class="playground pane">
          <div class="content">
            <Crud
              v-if="true"
              :v-loading="loading"
              :data="tableData"
              :columns="columns"
              :options="tableOptions"
              use-status
              :show-row-status="showRowStatus"
              :status-prop="tableType"
              @selection-change="handleSelectionChange"
            >
              <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="150">
                <template slot-scope="scope">
                  <CrudActions :row="scope.row" :table-data="tableData" :actions="actions" :show-action-status="showActionStatus" :show-action-status-table="showActionStatusTable" status-prop="curstate" :table-status-prop="tableType" use-status />
                </template>
              </el-table-column>
            </Crud>
            {{ b }}
          </div>
        </div>
      </SplitViewItem>
      <SplitViewItem init-size="500px">
        <SplitView direction="vertical">
          <SplitViewItem name="tableOptions" show-header>
            <vue-json-editor
              v-model="tableOptions"
              :showBtns="false"
              :mode="'tree'"
              lang="zh"
              :expandedOnStart="true"
            />
          </SplitViewItem>
          <SplitViewItem name="columns" show-header>
            <vue-json-editor
              v-model="columns"
              :showBtns="false"
              :mode="'tree'"
              lang="zh"
              :expandedOnStart="true"
            />
          </SplitViewItem>
          <SplitViewItem name="actions" show-header>
            <vue-json-editor
              v-model="actions"
              :showBtns="false"
              :mode="'tree'"
              lang="zh"
              :expandedOnStart="true"
            />
          </SplitViewItem>
          <SplitViewItem name="showRowStatus" show-header>
            <vue-json-editor
              v-model="showRowStatus"
              :showBtns="false"
              :mode="'tree'"
              lang="zh"
              :expandedOnStart="true"
            />
          </SplitViewItem>
          <SplitViewItem name="showActionStatus" show-header>
            <vue-json-editor
              v-model="showActionStatus"
              :showBtns="false"
              :mode="'tree'"
              lang="zh"
              :expandedOnStart="true"
            />
          </SplitViewItem>
          <SplitViewItem name="showActionStatusTable" show-header>
            <vue-json-editor
              v-model="showActionStatusTable"
              :showBtns="false"
              :mode="'tree'"
              lang="zh"
              :expandedOnStart="true"
            />
          </SplitViewItem>
        </SplitView>
      </SplitViewItem>
    </SplitView>
  </div>
</template>

<script>
import VueJsonEditor from "@/components/json-editor/index.vue";
import mixinTableProperties from '@/components/common-crud/mixins/data.js'
import SplitView from "@/components/common-split-view/SplitView.vue";
import SplitViewItem from "@/components/common-split-view/SplitViewItem.vue";

export default {
  name: "CrudDemo",
  props: {
    msg: String,
  },
  mixins: [mixinTableProperties],
  components: {
    VueJsonEditor,
    SplitView,
    SplitViewItem
  },
  data() {
    return {
      a: '{"a": 1}',
      b: undefined,
      tableType: 'submit',
      // tableOptions: {
      //   maxHeight: "600px",
      //   border: true,
      //   stripe: true,
      // },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          curstate: '00'
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          curstate: '01'
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          curstate: '02'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          curstate: '03'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          curstate: '05'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          curstate: '06'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          curstate: '07'
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          curstate: '00'
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          curstate: '01'
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          curstate: '02'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          curstate: '03'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          curstate: '05'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          curstate: '06'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          curstate: '07'
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          curstate: '00'
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          curstate: '01'
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          curstate: '02'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          curstate: '03'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          curstate: '05'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          curstate: '06'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          curstate: '07'
        },
      ],
      // columns: [
      //   // 多选列
      //   {
      //     type: "selection",
      //     width: 60,
      //   },
      //   // 序号列
      //   {
      //     type: "index",
      //     label: "序号",
      //     width: 80,
      //   },
      //   // 其他列
      //   {
      //     label: "日期",
      //     prop: "date",
      //   },
      //   {
      //     label: "姓名",
      //     prop: "name",
      //   },
      //   {
      //     label: "地址",
      //     prop: "address",
      //   },
      //   // 操作列按钮
      //   {
      //     label: "操作",
      //     fixed: "right", // 固定在右侧
      //     width: 100,
      //     render: (h, params) => {
      //       return h("div", [
      //         h(
      //           "el-button",
      //           {
      //             props: {
      //               type: "text",
      //               size: "mini",
      //             },
      //             on: {
      //               click: () => {
      //                 // 处理按钮点击事件
      //                 this.handleAction(params.row);
      //               },
      //             },
      //           },
      //           "编辑"
      //         ),
      //         h(
      //           "el-button",
      //           {
      //             props: {
      //               type: "text",
      //               size: "mini",
      //             },
      //             on: {
      //               click: () => {
      //                 // 处理按钮点击事件
      //                 this.handleAction(params.row);
      //               },
      //             },
      //           },
      //           "删除"
      //         ),
      //       ]);
      //     },
      //   },
      // ],
    };
  },
};
</script>
<style>
body {
  margin: 0;
  padding: 0;
}
.jsoneditor-vue {
  height: 100% !important;
}
div.jsoneditor {
  border: none;
}
div.jsoneditor-menu {
  background: #00000073;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this common-crudonent only -->
<style lang="scss" scoped>
.app {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
.pane {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  box-sizing: border-box;
}
.playground {
  width: 100%;
  padding: 10px;
  .content {
    overflow: hidden;
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 0 5px 20px -2px #00000038;
    border: 1px solid #00000033;
  }
}
.options {
  flex-shrink: 0;
  width: 450px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .content {
    overflow: hidden;
    width: 100%;
    /* height: 50%; */
    min-height: 200px;
    border-radius: 10px;
    box-shadow: 0 5px 20px -2px #00000038;
    border: 1px solid #00000033;
    > div {
      height: 100% !important;
      /* ::v-deep .jsoneditor-vue {
        height: 100% !important;
      } */
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