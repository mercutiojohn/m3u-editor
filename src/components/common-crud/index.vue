<template>
  <div class="app">
    <div class="playground pane">
      <div class="content">
        <common-crud
          :table-data="tableData"
          :columns="columns"
          :options="tableOptions"
        />
        {{ b }}
      </div>
    </div>
    <div class="options pane">
      <div class="content">
        <!-- <JsonEditorVue
          v-model="b"
          v-bind="{
            /* 局部 props & attrs */
          }"
        /> -->
        tableOptions
        <vue-json-editor
          v-model="tableOptions"
          :showBtns="true"
          :mode="'tree'"
          lang="zh"
          :expandedOnStart="true"
          @json-change="onJsonChange"
          @json-save="onJsonSave"
        />
      </div>
      <div class="content">
        columns
        <!-- <JsonEditorVue
          v-model="b"
          v-bind="{
            /* 局部 props & attrs */
          }"
        /> -->
        <vue-json-editor
          v-model="columns"
          :showBtns="false"
          :mode="'tree'"
          lang="zh"
          :expandedOnStart="true"
          @json-change="onJsonChange"
          @json-save="onJsonSave"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import JsonEditorVue from "json-editor-vue";
import vueJsonEditor from "vue-json-editor";

const CommonCrud = {
  props: ["tableData", "columns", "options"],
  render(h) {
    const tableColumns = this.columns.map((column) => {
      return h("el-table-column", {
        props: column,
      });
    });

    return h(
      "el-table",
      {
        props: {
          data: this.tableData,
          ...this.options,
        },
      },
      tableColumns
    );
  },
};

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    CommonCrud,
    // JsonEditorVue,
    vueJsonEditor,
  },
  data() {
    return {
      a: '{"a": 1}',
      b: undefined,
      tableOptions: {
        maxHeight: "600px",
        border: true,
        stripe: true,
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      columns: [
        // 多选列
        {
          type: "selection",
          width: 60,
        },
        // 序号列
        {
          type: "index",
          label: "序号",
          width: 80,
        },
        // 其他列
        {
          label: "日期",
          prop: "date",
        },
        {
          label: "姓名",
          prop: "name",
        },
        {
          label: "地址",
          prop: "address",
        },
        // 操作列按钮
        {
          label: "操作",
          fixed: "right", // 固定在右侧
          width: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "el-button",
                {
                  props: {
                    type: "text",
                    size: "mini",
                  },
                  on: {
                    click: () => {
                      // 处理按钮点击事件
                      this.handleAction(params.row);
                    },
                  },
                },
                "编辑"
              ),
              h(
                "el-button",
                {
                  props: {
                    type: "text",
                    size: "mini",
                  },
                  on: {
                    click: () => {
                      // 处理按钮点击事件
                      this.handleAction(params.row);
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
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
</style>