<template>
  <div class="field-settings">
    <div style="display: flex; gap: 20px">
      <div style="width: 100%">
        <el-form-item label="Java 字段名">
          <el-input v-model="row.javaProperties.javaField"></el-input>
        </el-form-item>

        <el-form-item label="物理类型">
          <el-select v-model="row.javaProperties.javaType" placeholder="请选择">
            <el-option
              v-for="item in reducedJavaTypes"
              :key="item.javaType"
              :label="item.javaType"
              :value="item.javaType"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <vue-json-editor
        style="width: 500px; flex-shrink: 0"
        v-model="row.javaProperties"
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
import javaTypeMappings from "../../utils/javaTypeMappings";
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
      javaTypeMappings
    };
  },
  computed: {
    reducedJavaTypes() {
      let arr = []
      javaTypeMappings.reduce((acc, item) => {
        if (!acc[item.javaType]) {
          acc[item.javaType] = true;
          arr.push({
            javaType: item.javaType
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