<template>
  <div class="field-settings">
    <div style="display: flex; gap: 20px">
      <div style="width: 100%">
        <el-form-item label="字段列名">
          <el-input v-model="row.sqlProperties.columnName"></el-input>
        </el-form-item>

        <el-form-item label="物理类型">
          <el-select v-model="row.sqlProperties.columnType" placeholder="请选择">
            <el-option
              v-for="item in reducedSqlTypes"
              :key="item.sqlType"
              :label="item.sqlType"
              :value="item.sqlType"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="列长度">
          <el-input v-model="row.sqlProperties.columnLength"></el-input>
        </el-form-item>

        <el-form-item label="查询类型">
          <el-select v-model="row.sqlProperties.queryType">
            <el-option label="=" value="EQ" />
            <el-option label="!=" value="NE" />
            <el-option label=">" value="GT" />
            <el-option label=">=" value="GTE" />
            <el-option label="<" value="LT" />
            <el-option label="<=" value="LTE" />
            <el-option label="LIKE" value="LIKE" />
            <el-option label="BETWEEN" value="BETWEEN" />
          </el-select>
        </el-form-item>

        <el-form-item label="是否插入">
          <el-checkbox v-model="row.sqlProperties.isInsert"></el-checkbox>
        </el-form-item>

        <el-form-item label="是否编辑">
          <el-checkbox v-model="row.sqlProperties.isEdit"></el-checkbox>
        </el-form-item>

        <el-form-item label="是否列表显示">
          <el-checkbox v-model="row.sqlProperties.isList"></el-checkbox>
        </el-form-item>

        <el-form-item label="是否查询">
          <el-checkbox v-model="row.sqlProperties.isQuery"></el-checkbox>
        </el-form-item>

        <el-form-item label="是否非空">
          <el-checkbox v-model="row.sqlProperties.isNotNull"></el-checkbox>
        </el-form-item>

        <!-- <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item> -->
      </div>
      <vue-json-editor
        style="width: 500px; flex-shrink: 0"
        v-model="row.sqlProperties"
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
import sqlTypeMappings from "../../utils/sqlTypeMappings";
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
      sqlTypeMappings
    };
  },
  computed: {
    reducedSqlTypes() {
      let arr = []
      sqlTypeMappings.reduce((acc, item) => {
        if (!acc[item.sqlType]) {
          acc[item.sqlType] = true;
          arr.push({
            sqlType: item.sqlType
          })
        }
        return acc;
      }, {});
      return arr
    }
  },
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style>
</style>