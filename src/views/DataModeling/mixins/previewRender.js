import typeToComponentArray from '../utils/typeToComponentArray'
import sqlTypeMappings from '../utils/sqlTypeMappings'

export default {
  data() {
    return {
      typeToComponentArray,
      sqlTypeMappings,
    }
  },
  computed: {
    previewTableColumns() {
      return this.previewTableColumnsRender(this.coreData.fieldList)
    },
    previewFormItems() {
      return this.previewFormItemsRender(this.coreData.fieldList)
    },
    previewFormData() {
      return this.previewFormDataRender(this.coreData.fieldList)
    },
    sqlPreview() {
      return this.sqlPreviewRender(this.coreData.fieldList)
    },
    mapperXmlPreview() {
      return this.mapperXmlPreviewRender(this.coreData.fieldList)
    },
    generatedCode() {
      return this.generatedCodeRender(this.coreData.fieldList);
    }
  },
  methods: {
    sqlType(type) {
      const mapping = sqlTypeMappings.find(item => item.type === type);
      return mapping ? mapping.sqlType : 'VARCHAR(255)'; // 默认回退到 VARCHAR(255)
    },

    formType(type) {
      const mapping = typeToComponentArray.find(item => item.type === type);
      return mapping ? mapping.component : 'el-input'; // 如果找不到匹配项，则回退到 el-input
    },

    previewTableColumnsRender(fieldList = this.coreData.fieldList) {
      return fieldList.map(field => ({
        prop: 'exampleData',
        label: field.name || '未命名',
        properties: field.tableProperties
      }));
    },
    previewFormItemsRender(fieldList = this.coreData.fieldList) {
      return fieldList.map(field => {
        const component = this.formType(field.type);
        return { prop: 'exampleData', label: field.name || '未命名', component };
      });
    },
    previewFormDataRender(fieldList = this.coreData.fieldList) {
      let data = {};
      fieldList.forEach(field => {
        data[field.name || 'exampleData'] = '';
      });
      return data;
    },
    sqlPreviewRender(fieldList = this.coreData.fieldList) {
      if (fieldList.length === 0) {
        return '-- SQL 预览将在这里显示';
      }

      let fieldsSql = fieldList.map(field => {
        let sqlType = this.sqlType(field.type);
        return `\`${field.field}\` ${sqlType}`;
      }).join(',\n  ');

      return `CREATE TABLE your_table_name (\n  ${fieldsSql}\n);`;
    },
    mapperXmlPreviewRender(fieldList = this.coreData.fieldList) {
      if (fieldList.length === 0) {
        return '<!-- Mapper XML 预览将在这里显示 -->';
      }

      let resultMapFields = this.coreData.fieldList.map(field =>
        `<result column="${field.field}" property="${field.field}" />`
      ).join('\n    ');

      let baseColumnList = this.coreData.fieldList.map(field => `\`${field.field}\``).join(', ');

      return `<mapper namespace="YourNamespace">
<resultMap id="BaseResultMap" type="YourType">
    ${resultMapFields}
</resultMap>

<sql id="Base_Column_List">
  ${baseColumnList}
</sql>

<!-- 这里可以添加更多的 SQL 映射，如 <select>, <insert>, <update> 等 -->
</mapper>`;
    },
    generatedCodeRender(fieldList = this.coreData.fieldList) {
      const tableColumns = fieldList.map(field => 
        `<el-table-column prop="${field.field}" label="${field.name}"></el-table-column>`
      ).join('\n    ');

      const formItems = fieldList.map(field => {
        const component = field.type === 'text' ? 'el-input' : 'el-input-number';
        return `<el-form-item label="${field.name}">
          <${component} v-model="formData.${field.field}"></${component}>
        </el-form-item>`;
      }).join('\n    ');

      return `<template>
  <div>
    <el-table :data="tableData">
      ${tableColumns}
    </el-table>
    <el-form :model="formData">
      ${formItems}
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{/* 数据 */}],
      formData: {/* 表单数据 */}
    };
  }
};
</script>`;
    }
  }
}