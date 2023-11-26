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
    // examplePreviewFormData() {
    //   return this.previewFormDataRender(this.coreData.fieldList)
    // },
    examplePreviewTableData() {
      return this.examplePreviewTableDataRender(this.coreData.fieldList)
    },
    sqlPreview() {
      return this.sqlPreviewRender(this.coreData.sqlOptions.tableName, this.coreData.fieldList)
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
        // prop: 'exampleData',
        prop: field.field,
        label: field.name || '未命名',
        properties: field.tableProperties
      }));
    },
    previewFormItemsRender(fieldList = this.coreData.fieldList) {
      return fieldList.map(field => {
        const component = this.formType(field.type);
        return { 
          // prop: 'exampleData',
          prop: field.field,
          label: field.name || '未命名',
          component,
          properties: field.formProperties
        };
      });
    },
    // previewFormDataRender(fieldList = this.coreData.fieldList) {
    //   let data = {};
    //   fieldList.forEach(field => {
    //     data[field.field || 'exampleData'] = '';
    //   });
    //   return data;
    // },
    examplePreviewTableDataRender(fieldList = this.coreData.fieldList) {
      let data = {};
      fieldList.forEach(field => {
        data[field.field || 'exampleData'] = '示例数据';
      });
      return [data, data];
    },
    // sqlPreviewRender(fieldList = this.coreData.fieldList) {
    //   if (fieldList.length === 0) {
    //     return '-- SQL 预览将在这里显示';
    //   }

    //   let fieldsSql = fieldList.map(field => {
    //     let sqlType = this.sqlType(field.type);
    //     return `\`${field.field}\` ${sqlType}`;
    //   }).join(',\n  ');

    //   return `CREATE TABLE your_table_name (\n  ${fieldsSql}\n);`;
    // },

    sqlPreviewRender(tableName = this.coreData.sqlOptions.tableName, fieldList = this.coreData.fieldList) {
      if (fieldList.length === 0) {
        return '-- SQL 预览将在这里显示';
      }

      // 将每个字段转换为 SQL 列定义
      const columnDefs = fieldList.map(field => {
        const sql = field.sqlProperties;
        return `\`${sql.columnName}\` ${sql.columnType}${sql.columnLength ? `(${sql.columnLength})` : ''} ${sql.isNotNull ? 'NOT NULL' : ''}`;
      }).join(',\n  ');
    
      // 生成 CREATE TABLE 语句
      return `CREATE TABLE \`${tableName}\` (\n  ${columnDefs}\n);`;
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
      // 转换属性名从小驼峰到横线连接形式
      const camelCaseToKebabCase = (str) => {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      };
      // 将属性对象转换为 HTML 属性字符串
      const propsToHtmlAttributes = (props) => {
        return Object.entries(props || {})
          .map(([key, value]) => `${camelCaseToKebabCase(key)}="${value}"`)
          .join(' ');
      };

      const tableColumns = fieldList.map(field => {
        const columnProps = propsToHtmlAttributes(field.tableProperties.props);
        return `<el-table-column ${columnProps.trim()}></el-table-column>`;
      }).join('\n      ');

      const formItems = fieldList.map(field => {
        let component = '';
        switch (field.type) {
          case 'text':
            component = 'el-input';
            break;
          case 'number':
            component = 'el-input-number';
            break;
          case 'radio':
            component = 'el-radio-group';
            break;
          case 'checkbox':
            component = 'el-checkbox-group';
            break;
          // 添加其他类型的处理逻辑
          default:
            component = 'el-input';
        }
        const formItemProps = propsToHtmlAttributes(field.formProperties.props.base);
        const componentProps = propsToHtmlAttributes(field.formProperties.props.inner);
        return `<el-form-item ${formItemProps}>
        <${component} v-model="formData.${field.field}" ${componentProps.trim()}></${component}>
      </el-form-item>`;
      }).join('\n      ');

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
      tableData: [{/* 初始化表格数据 */}],
      formData: {
        // 初始化表单数据
        ${fieldList.map(field => `${field.field}: null`).join(',\n        ')}
      }
    };
  }
};
</script>`;
    
    }
  }
}