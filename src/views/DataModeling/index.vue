<template>
  <div style="box-sizing: border-box; flex-direction: column; padding: 20px; overflow: hidden; display: flex; width: 100%; height:100%; gap: 10px;">
    <div class="header" style="flex-shrink:0; height: 40px">
      <!-- <el-form :model="coreData" inline label-width="120px">
        <el-form-item prop="name" label="名称">
          <el-input v-model="coreData.name"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="作者">
          <el-input v-model="coreData.functionAuthor"></el-input>
        </el-form-item>
      </el-form> -->
      <el-tabs
          v-model="activeTab"
          type="card"
          class="tab-reset size-mini ios my-tabs"
          style="margin:0 auto; width: 100%; max-width: 800px"
        >
          <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.label" :name="item.name"> </el-tab-pane>
      </el-tabs>
    </div>
    <div class="main" v-if="activeTab === 'edit'" style="overflow-y: scroll; ">
      <el-form :model="coreData" inline label-width="120px">
        <el-form-item prop="name" label="名称">
          <el-input v-model="coreData.name"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="ID">
          <el-input v-model="coreData.id"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="作者">
          <el-input v-model="coreData.author"></el-input>
        </el-form-item>
        <el-form-item prop="版本" label="ID">
          <el-input v-model="coreData.version"></el-input>
        </el-form-item>
      </el-form>
      <!-- <h3>字段配置</h3> -->
      <!-- <draggable v-model="coreData.fieldList" tag="tbody" @start="drag=true" @end="drag=false"> -->
      <el-table :data="coreData.fieldList">
        <el-table-column type="expand">
          <template #default="props">
              <el-form :model="props.row" :key="props.row.id" label-width="120px">
                <el-tabs
                  v-model="propertiesActiveTab"
                  type="card"
                  tab-position="left"
                  class="tab-reset size-mini ios my-tabs"
                >
                  <el-tab-pane label="基本信息" name="edit">
                    <div style="display: flex; gap: 10px">
                      <div style="width: 100%">
                        <el-form-item label="名称">
                          <el-input v-model="props.row.name"></el-input>
                        </el-form-item>
                        <el-form-item label="字段名">
                          <el-input v-model="props.row.field"></el-input>
                        </el-form-item>
                        <el-form-item label="数据类型">
                          <el-select v-model="props.row.type" placeholder="请选择">
                            <el-option
                            v-for="item in dataTypes"
                            :key="item.typeName"
                            :label="item.typeLabel"
                            :value="item.typeName">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="备注">
                          <el-input v-model="props.row.remark" type="textarea"></el-input>
                        </el-form-item>
                      </div>
                      <vue-json-editor
                        style="width: 500px; flex-shrink: 0"
                        v-model="props.row"
                        :showBtns="false"
                        :mode="'tree'"
                        lang="zh"
                        :expandedOnStart="true"
                      />
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="表格列配置" name="tableColumnUtils">
                    <div style="display: flex; gap: 10px">
                      <div style="width: 100%">
                        <!-- <el-form-item label="名称">
                          <el-input v-model="props.row.tableProperties.name"></el-input>
                        </el-form-item>
                        <el-form-item label="字段名">
                          <el-input v-model="props.row.field"></el-input>
                        </el-form-item>
                        <el-form-item label="数据类型">
                          <el-select v-model="props.row.type" placeholder="请选择">
                            <el-option
                            v-for="item in dataTypes"
                            :key="item.typeName"
                            :label="item.typeLabel"
                            :value="item.typeName">
                            </el-option>
                          </el-select>
                        </el-form-item> -->
                      </div>
                      <!-- <el-table :data="previewTableData">
                        <el-table-column
                          v-for="col in previewTableColumns"
                          :key="col.prop"
                          :prop="col.prop"
                          :label="col.label">
                        </el-table-column>
                      </el-table> -->
                      <vue-json-editor
                        style="width: 500px; flex-shrink: 0"
                        v-model="props.row.tableProperties"
                        :showBtns="false"
                        :mode="'tree'"
                        lang="zh"
                        :expandedOnStart="true"
                      />
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="表单项配置" name="formUtils">
                    <div style="display: flex; gap: 10px">
                      <div style="width: 100%">
                        <!-- <el-form-item label="名称">
                          <el-input v-model="props.row.name"></el-input>
                        </el-form-item>
                        <el-form-item label="字段名">
                          <el-input v-model="props.row.field"></el-input>
                        </el-form-item>
                        <el-form-item label="数据类型">
                          <el-select v-model="props.row.type" placeholder="请选择">
                            <el-option
                            v-for="item in dataTypes"
                            :key="item.typeName"
                            :label="item.typeLabel"
                            :value="item.typeName">
                            </el-option>
                          </el-select>
                        </el-form-item> -->
                      </div>
                      <vue-json-editor
                        style="width: 500px; flex-shrink: 0"
                        v-model="props.row.formProperties"
                        :showBtns="false"
                        :mode="'tree'"
                        lang="zh"
                        :expandedOnStart="true"
                      />
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="查询条件配置" name="searchUtils">
                    <div style="display: flex; gap: 10px">
                      <div style="width: 100%">
                        <!-- <el-form-item label="名称">
                          <el-input v-model="props.row.name"></el-input>
                        </el-form-item>
                        <el-form-item label="字段名">
                          <el-input v-model="props.row.field"></el-input>
                        </el-form-item>
                        <el-form-item label="数据类型">
                          <el-select v-model="props.row.type" placeholder="请选择">
                            <el-option
                            v-for="item in dataTypes"
                            :key="item.typeName"
                            :label="item.typeLabel"
                            :value="item.typeName">
                            </el-option>
                          </el-select>
                        </el-form-item> -->
                      </div>
                      <vue-json-editor
                        style="width: 500px; flex-shrink: 0"
                        v-model="props.row.searchProperties"
                        :showBtns="false"
                        :mode="'tree'"
                        lang="zh"
                        :expandedOnStart="true"
                      />
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="视图配置" name="ro'le'U'ti'ls">
                    <div style="display: flex; gap: 10px">
                      <div style="width: 100%">
                        <!-- <el-form-item label="名称">
                          <el-input v-model="props.row.name"></el-input>
                        </el-form-item>
                        <el-form-item label="字段名">
                          <el-input v-model="props.row.field"></el-input>
                        </el-form-item>
                        <el-form-item label="数据类型">
                          <el-select v-model="props.row.type" placeholder="请选择">
                            <el-option
                            v-for="item in dataTypes"
                            :key="item.typeName"
                            :label="item.typeLabel"
                            :value="item.typeName">
                            </el-option>
                          </el-select>
                        </el-form-item> -->
                      </div>
                      <vue-json-editor
                        style="width: 500px; flex-shrink: 0"
                        v-model="props.row.roleProperties"
                        :showBtns="false"
                        :mode="'tree'"
                        lang="zh"
                        :expandedOnStart="true"
                      />
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="Java 配置" name="javaUtils">
                    <div style="display: flex; gap: 10px">
                      <div style="width: 100%">
                        <!-- <el-form-item label="名称">
                          <el-input v-model="props.row.name"></el-input>
                        </el-form-item>
                        <el-form-item label="字段名">
                          <el-input v-model="props.row.field"></el-input>
                        </el-form-item>
                        <el-form-item label="数据类型">
                          <el-select v-model="props.row.type" placeholder="请选择">
                            <el-option
                            v-for="item in dataTypes"
                            :key="item.typeName"
                            :label="item.typeLabel"
                            :value="item.typeName">
                            </el-option>
                          </el-select>
                        </el-form-item> -->
                      </div>
                      <vue-json-editor
                        style="width: 500px; flex-shrink: 0"
                        v-model="props.row.javaProperties"
                        :showBtns="false"
                        :mode="'tree'"
                        lang="zh"
                        :expandedOnStart="true"
                      />
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="SQL 配置" name="sqlUtils">
                    <div style="display: flex; gap: 10px">
                      <div style="width: 100%">
                        <!-- <el-form-item label="名称">
                          <el-input v-model="props.row.name"></el-input>
                        </el-form-item>
                        <el-form-item label="字段名">
                          <el-input v-model="props.row.field"></el-input>
                        </el-form-item>
                        <el-form-item label="数据类型">
                          <el-select v-model="props.row.type" placeholder="请选择">
                            <el-option
                            v-for="item in dataTypes"
                            :key="item.typeName"
                            :label="item.typeLabel"
                            :value="item.typeName">
                            </el-option>
                          </el-select>
                        </el-form-item> -->
                      </div>
                      <vue-json-editor
                        style="width: 500px; flex-shrink: 0"
                        v-model="props.row.sqlProperties"
                        :showBtns="false"
                        :mode="'tree'"
                        lang="zh"
                        :expandedOnStart="true"
                      />
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="field" label="字段名" show-overflow-tooltip width="200" fixed="left"></el-table-column>
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
        <el-table-column label="操作" fixed="right">
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
      <pre>{{coreData}}</pre>
    </div>
    <preview :coreData="coreData" v-if="activeTab === 'preview'" style="overflow-y: scroll; "/>
    <table-settings :coreData="coreData" v-if="activeTab === 'tableUtils'" style="overflow-y: scroll; "/>
    <form-settings :coreData="coreData" v-if="activeTab === 'formUtils'" style="overflow-y: scroll; "/>
    <role-settings :coreData="coreData" v-if="activeTab === 'roleUtils'" style="overflow-y: scroll; "/>
    <gen-settings :coreData="coreData" v-if="activeTab === 'genUtils'" style="overflow-y: scroll; "/>
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
    GenSettings
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
        { "label": "表单", "name": "formUtils" },
        // { "label": "VForm", "name": "vformUtils" }, // TODO
        { "label": "表格和查询", "name": "tableUtils" },
        { "label": "视图和状态", "name": "roleUtils" },
        { "label": "字典", "name": "dictUtils" },
        // { "label": "Java 配置", "name": "javaUtils" },
        // { "label": "SQL 配置", "name": "sqlUtils" },
        { "label": "生成配置", "name": "genUtils" },
        { "label": "预览", "name": "preview" }
      ],
      // 核心数据
      coreData: JSON.parse(localStorage.getItem('coreData')) || coreDataInit,
      // 数据类型
      dataTypes,
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
