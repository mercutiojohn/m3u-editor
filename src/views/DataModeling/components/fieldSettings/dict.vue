<template>
  <div class="field-settings">
    <div style="display: flex; gap: 20px">
      <el-form-item label="绑定字典">
        <el-select v-model="row.bindDict" placeholder="请选择" clearable>
          <el-option
            v-for="item in getDicts"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
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
  props: ["row", "dictsOptions"],
  data() {
    return {
      // 数据类型
      dataTypes,
    };
  },
  computed: {
    getDicts() {
      return Object.keys(this.dictsOptions.staticDicts).map((dictName) => {
        return {
          label: dictName,
          value: dictName
        }
      })
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