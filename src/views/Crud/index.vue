<template>
  <div class="crud">
    <SplitView direction="vertical" class="view">
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
                  <CrudActions :row="scope.row" :table-data="tableData" :actions="actions" :action-row-status="actionRowStatus" :action-page-status="actionPageStatus" status-prop="currentState" :page-type-prop="tableType" use-status />
                </template>
              </el-table-column>
            </Crud>
          </div>
        </div>
      </SplitViewItem>
      <SplitViewItem init-size="500px">
        <SplitView direction="horizontal">
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
          <SplitViewItem name="actionRowStatus" show-header>
            <vue-json-editor
              v-model="actionRowStatus"
              :showBtns="false"
              :mode="'tree'"
              lang="zh"
              :expandedOnStart="true"
            />
          </SplitViewItem>
          <SplitViewItem name="actionPageStatus" show-header>
            <vue-json-editor
              v-model="actionPageStatus"
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
import tableProperties from './mixins/tableProperties.js'
import SplitView from "@/components/common-split-view/SplitView.vue";
import SplitViewItem from "@/components/common-split-view/SplitViewItem.vue";

export default {
  name: "CrudDemo",
  props: {
    msg: String,
  },
  mixins: [tableProperties],
  components: {
    VueJsonEditor,
    SplitView,
    SplitViewItem
  },
  methods: {
    currentStateFormatter(a, b, c) {
      console.log(a, b, c)
      return c
    },
    handleSelectionChange(a) {
      console.log(a)
    }
  },
  data() {
    return {
      loading: false,
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
          currentState: 'draft'
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          currentState: 'submitted'
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          currentState: 'handled'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          currentState: 'settled'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          currentState: 'confirmed'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          currentState: 'rejected'
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          currentState: 'draft'
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          currentState: 'submitted'
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          currentState: 'handled'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          currentState: 'settled'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          currentState: 'confirmed'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          currentState: 'rejected'
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          currentState: 'draft'
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          currentState: 'submitted'
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          currentState: 'handled'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          currentState: 'settled'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          currentState: 'confirmed'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          currentState: 'rejected'
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          currentState: 'draft'
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          currentState: 'submitted'
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          currentState: 'handled'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          currentState: 'settled'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          currentState: 'confirmed'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          currentState: 'rejected'
        },
      ],
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