<template>
  <div style="box-sizing: border-box; flex-direction: column; padding: 20px; overflow: hidden; display: flex; width: 100%; height:100%; gap: 10px;">
    <div class="header" style="flex-shrink:0; height: 40px">
      <el-tabs
          v-model="activeTab"
          type="card"
          class="tab-reset size-mini ios my-tabs"
          style="margin:0 auto; width: 100%; max-width: 800px"
        >
          <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.label" :name="item.name"> </el-tab-pane>
      </el-tabs>
    </div>
    <div class="main" v-if="activeTab === 'edit'">
      <!-- <h3>字段配置</h3> -->
      <!-- <draggable v-model="coreData.fieldList" tag="tbody" @start="drag=true" @end="drag=false"> -->
      <el-table :data="coreData.fieldList">
        <el-table-column type="expand">
          <template #default="props">
              <el-form :model="props.row" :key="props.row.id" label-width="120px">
                <el-tabs
                  v-model="propertiesActiveTab"
                  type="card"
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
                  <el-tab-pane label="角色配置" name="roleUtils">
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
                  <el-tab-pane label="实时预览" name="preview">
                    
                  </el-tab-pane>
                </el-tabs>
              </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="field" label="字段名"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="type" label="数据类型"></el-table-column>
        <!-- <el-table-column prop="id" label="id"></el-table-column> -->
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="mini" @click="moveUp(scope.$index)" :disabled="scope.$index === 0">上移</el-button>
            <el-button size="mini" @click="moveDown(scope.$index)" :disabled="scope.$index === coreData.fieldList.length - 1">下移</el-button>
            <el-button size="mini" type="danger" @click="deleteField(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="addField">添加字段</el-button>
      <!-- </draggable> -->
    </div>
    <preview :coreData="coreData" v-if="activeTab === 'preview'"/>
    <table-settings :coreData="coreData" v-if="activeTab === 'tableUtils'"/>
    <form-settings :coreData="coreData" v-if="activeTab === 'formUtils'"/>
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

export default {
  name: 'FieldConfigurator',
  components: {
    draggable,
    VueJsonEditor,
    // 标签页
    Preview,
    TableSettings,
    FormSettings
  },
  mixins: [tableActions],
  data() {
    return {
      // 页签控制
      activeTab: 'edit',
      propertiesActiveTab: 'edit',
      // 配置页面
      tabs: [
        { "label": "字段配置", "name": "edit" },
        { "label": "表格配置", "name": "tableUtils" },
        { "label": "表单配置", "name": "formUtils" },
        { "label": "角色配置", "name": "roleUtils" },
        { "label": "实时预览", "name": "preview" }
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

  }
}
</script>
