<template>
  <div class="field-settings">
    <div style="display: flex; gap: 20px">
      <div style="width: 100%">
        <!-- <el-form-item label="名称">
          <el-input v-model="row.name"></el-input>
        </el-form-item>
        <el-form-item label="字段名">
          <el-input v-model="row.field"></el-input>
        </el-form-item>
        <el-form-item label="数据类型">
          <el-select v-model="row.type" placeholder="请选择">
            <el-option
              v-for="item in dataTypes"
              :key="item.typeName"
              :label="item.typeLabel"
              :value="item.typeName"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="row.remark" type="textarea"></el-input>
        </el-form-item> -->
      </div>
      <vue-json-editor
        style="width: 500px; flex-shrink: 0"
        v-model="row.roleProperties"
        :showBtns="false"
        :mode="'tree'"
        lang="zh"
        :expandedOnStart="true"
      />
    </div>
  </div>
</template>

<script>
// 数据类型
import dataTypes from "../../utils/dataTypes";
import VueJsonEditor from "@/components/json-editor/index.vue";

export default {
  name: "",
  components: {
    VueJsonEditor
  },
  props: ["row"],
  data() {
    return {
      // 数据类型
      dataTypes,
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style>
</style>