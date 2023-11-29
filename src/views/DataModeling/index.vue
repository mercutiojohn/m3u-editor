<template>
  <div style="box-sizing: border-box; flex-direction: column; padding: 20px; overflow: hidden; display: flex; width: 100%; height:100%; gap: 10px;">
    <div class="header" style="flex-shrink:0;">
      <el-form :model="coreData" inline>
        <el-form-item prop="name" label="名称">
          <el-input v-model="coreData.name"></el-input>
        </el-form-item>
        <el-form-item prop="id" label="ID">
          <el-input v-model="coreData.id"></el-input>
        </el-form-item>
        <el-form-item prop="author" label="作者">
          <el-input v-model="coreData.author"></el-input>
        </el-form-item>
        <el-form-item prop="version" label="版本">
          <el-input v-model="coreData.version"></el-input>
        </el-form-item>
      </el-form>
      <el-tabs
          v-model="activeTab"
          type="card"
          class="tab-reset size-mini ios my-tabs"
          style="margin:0 auto; width: 100%; max-width: 800px"
        >
          <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.label" :name="item.name"> </el-tab-pane>
      </el-tabs>
    </div>
    <div class="main" v-if="activeTab === 'edit'" style="display: flex; height: 100%; width: 100%; gap: 10px">
      <div class="table" style="width: 100%;  height: calc(100% - 120px);">
        <!-- <h3>字段配置</h3> -->
        <!-- <draggable v-model="coreData.fieldList" tag="tbody" @start="drag=true" @end="drag=false"> -->
        <el-table :data="coreData.fieldList" height="calc(100% - 60px)">
          <el-table-column type="expand">
            <template #default="props">
                <el-form :model="props.row" :key="props.row.id" label-width="120px">
                  <div class="wrapper" style="display: flex; padding: 10px 0; gap: 10px">
                    <el-tabs
                      v-model="propertiesActiveTab"
                      type="card"
                      tab-position="left"
                      class="tab-reset size-mini ios my-tabs"
                    >
                      <el-tab-pane v-for="(item, index) in propertiesTabs" :key="index" :label="item.label" :name="item.name"> </el-tab-pane>
                    </el-tabs>
                    <field-basic-settings style="width: 100%" v-if="propertiesActiveTab === 'edit'" :row="props.row"/>
                    <field-table-column-settings style="width: 100%" v-if="propertiesActiveTab === 'tableColumnUtils'" :row="props.row"/>
                    <field-form-settings style="width: 100%" v-if="propertiesActiveTab === 'formUtils'" :row="props.row"/>
                    <field-search-field-settings style="width: 100%" v-if="propertiesActiveTab === 'searchUtils'" :row="props.row"/>
                    <field-role-settings style="width: 100%" v-if="propertiesActiveTab === 'roleUtils'" :row="props.row"/>
                    <field-java-settings style="width: 100%" v-if="propertiesActiveTab === 'javaUtils'" :row="props.row"/>
                    <field-sql-settings style="width: 100%" v-if="propertiesActiveTab === 'sqlUtils'" :row="props.row"/>
                    <field-dict-settings style="width: 100%" v-if="propertiesActiveTab === 'dictUtils'" :row="props.row" :dictsOptions="coreData.dictsOptions"/>
                  </div>
                </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="field" label="字段名" show-overflow-tooltip width="200"></el-table-column>
          <el-table-column prop="name" label="名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="type" label="数据类型" show-overflow-tooltip width="100"></el-table-column>
          <el-table-column label="Java 字段名" show-overflow-tooltip width="150">
            <template #default="scope">
              {{scope.row.javaProperties.javaField}}
            </template>
          </el-table-column>
          <el-table-column label="Java 数据类型" show-overflow-tooltip width="120">
            <template #default="scope">
              {{scope.row.javaProperties.javaType}}
            </template>
          </el-table-column>
          <el-table-column label="SQL 字段名" show-overflow-tooltip width="150">
            <template #default="scope">
              {{scope.row.sqlProperties.columnName}}
            </template>
          </el-table-column>
          <el-table-column label="SQL 数据类型" show-overflow-tooltip width="150">
            <template #default="scope">
              {{`${scope.row.sqlProperties.columnType}${['VARCHAR'].includes(scope.row.sqlProperties.columnType) && scope.row.sqlProperties.columnLength ? '(' + scope.row.sqlProperties.columnLength + ')' : ''}`}}
            </template>
          </el-table-column>
          <!-- <el-table-column prop="id" label="id"></el-table-column> -->
          <el-table-column label="操作" width="250">
            <template #default="scope">
              <el-button size="mini" @click="moveUp(scope.$index)" :disabled="scope.$index === 0">上移</el-button>
              <el-button size="mini" @click="moveDown(scope.$index)" :disabled="scope.$index === coreData.fieldList.length - 1">下移</el-button>
              <el-button size="mini" type="danger" @click="deleteField(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addField">添加字段</el-button>
        <!-- <el-button type="primary" @click="clearCoreData">清空</el-button> -->
        <el-button type="primary" @click="clearCoreData">初始化</el-button>
        <!-- </draggable> -->
      </div>
      <div class="right" style="width: 500px; height: calc(100% - 120px); overflow: auto; ">
        <pre>{{coreData}}</pre>
      </div>
    </div>
    <preview :coreData="coreData" v-if="activeTab === 'preview'" style="overflow-y: auto; "/>
    <table-settings :coreData="coreData" v-if="activeTab === 'tableUtils'" style="overflow-y: auto; "/>
    <form-settings :coreData="coreData" v-if="activeTab === 'formUtils'" style="overflow-y: auto; "/>
    <role-settings :coreData="coreData" v-if="activeTab === 'roleUtils'" style="overflow-y: auto; "/>
    <gen-settings :coreData="coreData" v-if="activeTab === 'genUtils'" style="overflow-y: auto; "/>
    <dict-settings :coreData="coreData" v-if="activeTab === 'dictUtils'" style="overflow-y: auto; "/>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import VueJsonEditor from "@/components/json-editor/index.vue";
// 数据类型
import dataTypes from './utils/dataTypes'
// 示例数据
import coreDataInit from './utils/init/coreDataInit'
// 字段编辑列表控制
import tableActions from './mixins/tableActions'
// 标签页
import Preview from './components/preview.vue'
import TableSettings from './components/tableSettings.vue'
import FormSettings from './components/formSettings.vue'
import RoleSettings from './components/roleSettings.vue'
import GenSettings from './components/genSettings.vue'
import DictSettings from './components/dictSettings.vue'
// 
import FieldBasicSettings from './components/fieldSettings/basic.vue'
import FieldDictSettings from './components/fieldSettings/dict.vue'
import FieldTableColumnSettings from './components/fieldSettings/tableColumn.vue'
import FieldFormSettings from './components/fieldSettings/form.vue'
import FieldSearchFieldSettings from './components/fieldSettings/searchField.vue'
import FieldRoleSettings from './components/fieldSettings/role.vue'
import FieldJavaSettings from './components/fieldSettings/java.vue'
import FieldSqlSettings from './components/fieldSettings/sql.vue'

export default {
  name: 'FieldConfigurator',
  components: {
    draggable,
    VueJsonEditor,
    // 标签页
    Preview,
    TableSettings,
    FormSettings,
    RoleSettings,
    GenSettings,
    DictSettings,
    //
    FieldBasicSettings,
    FieldDictSettings,
    FieldTableColumnSettings,
    FieldFormSettings,
    FieldSearchFieldSettings,
    FieldRoleSettings,
    FieldJavaSettings,
    FieldSqlSettings,
  },
  mixins: [tableActions],
  data() {
    return {
      // 页签控制
      activeTab: 'edit',
      propertiesActiveTab: 'edit',
      // 配置页面
      tabs: [
        { "label": "元数据", "name": "edit" },
        { "label": "视图和状态", "name": "roleUtils" },
        { "label": "自定义方法", "name": "methodUtils" },
        { "label": "自定义变量", "name": "variableUtils" },
        { "label": "字典", "name": "dictUtils" },
        { "label": "表单", "name": "formUtils" },
        // { "label": "VForm", "name": "vformUtils" }, // TODO
        { "label": "表格和查询", "name": "tableUtils" },
        // { "label": "Java 配置", "name": "javaUtils" },
        // { "label": "SQL 配置", "name": "sqlUtils" },
        { "label": "生成配置", "name": "genUtils" },
        { "label": "代码预览", "name": "preview" }
      ],
      propertiesTabs: [
        { "label":"基本信息", "name":"edit" },
        { "label":"字典配置", "name":"dictUtils" },
        { "label":"表格列配置", "name":"tableColumnUtils" },
        { "label":"表单项配置", "name":"formUtils" },
        { "label":"查询条件配置", "name":"searchUtils" },
        // { "label":"视图配置", "name":"roleUtils" },
        { "label":"Java 配置", "name":"javaUtils" },
        { "label":"SQL 配置", "name":"sqlUtils" }
      ],
      // 核心数据
      coreData: JSON.parse(localStorage.getItem('coreData')) || coreDataInit,
      // 数据类型
      dataTypes,
    }
  },
  computed: {
    getDicts() {
      return Object.keys(this.coreData.dictsOptions.staticDicts).map((dictName) => {
        return {
          label: dictName,
          value: dictName
        }
      })
    }
  },
  watch: {
    coreData: {
      deep: true,
      handler(newVal) {
        localStorage.setItem('coreData', JSON.stringify(newVal)); // 每当 coreData 改变时，保存到 localStorage
      }
    }
  },

  methods: {
    clearCoreData() {
      this.coreData = coreDataInit
    }
  }
}
</script>
