<template>
  <div style="display: flex; height: 100%; gap: 20px">
    <!-- 路径预览 -->
    <el-card style="width: 100%;" class="card-full-height scroll">
      <span slot="header">生成路径预览</span>
      <div class="path-preview" style="width: 100%; height: 100%; overflow-y: auto">
        <div v-for="(category, categoryName) in generatedPaths" :key="categoryName">
          <h4>{{ categoryName }}</h4>
          <ul>
            <li v-for="(path, pathName) in category" :key="pathName">
              {{ pathName }}：<pre>{{ path }}</pre>
            </li>
          </ul>
        </div>
      </div>
    </el-card>
    <!-- 生成配置 -->
    <div style="width: 500px; height: 100%; overflow-y: auto; flex-shrink: 0">
      <el-form :model="localGenOptions" label-width="100px" label-position="left">
        <h3>生成配置</h3>
        <el-form-item label="功能作者">
          <el-input v-model="localGenOptions.functionAuthor"></el-input>
        </el-form-item>
        <el-form-item label="模块名称">
          <el-input v-model="localGenOptions.moduleName"></el-input>
        </el-form-item>
        <el-form-item label="生成代码方式">
          <el-select v-model="localGenOptions.genType">
            <!-- // TODO -->
            <!-- <el-option label="ZIP 压缩包" value="zip"></el-option> -->
            <el-option label="ZIP 压缩包" value="0"></el-option>
            <!-- <el-option label="自定义路径" value="path"></el-option> -->
            <el-option label="自定义路径" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自定义生成路径" v-if="localGenOptions.genType === '1'">
          <!-- // TODO -->
          <el-input v-model="localGenOptions.genPath"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-input v-model="localGenOptions.parentMenuId"></el-input>
        </el-form-item>
        <el-form-item label="菜单名称">
          <el-input v-model="localGenOptions.menuName"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标">
          <i :class="localGenOptions.icon" v-if="localGenOptions.icon"></i>
          <el-input v-model="localGenOptions.icon"></el-input>
        </el-form-item>
      </el-form>
      <h3>Java 配置</h3>
      <el-form :model="localJavaOptions" label-width="100px" label-position="left">
        <!-- Java 选项字段 -->
        <el-form-item label="包名">
          <el-input v-model="localJavaOptions.packageName"></el-input>
        </el-form-item>
        <el-form-item label="类名">
          <el-input v-model="localJavaOptions.className"></el-input>
        </el-form-item>
      </el-form>
      <h3>SQL 配置</h3>
      <el-form :model="localSqlOptions" label-width="100px" label-position="left">
        <!-- SQL 选项字段 -->
        <el-form-item label="表名">
          <el-input v-model="localSqlOptions.tableName"></el-input>
        </el-form-item>
        <el-form-item label="表描述">
          <el-input v-model="localSqlOptions.tableComment"></el-input>
        </el-form-item>
      </el-form>
      <!-- <el-button type="primary" @click="saveOptions">保存</el-button> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    coreData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    generatedPaths() {
      const paths = [];
      const javaPath = this.localJavaOptions.packageName.replace(/\./g, '/');
      const className = this.localJavaOptions.className;
      const moduleName = this.coreData.genOptions.moduleName;
      const businessName = this.coreData.id || '...'; // TODO: 根据需要定义 businessName
      const mybatisPath = 'resources'; // TODO: 定义 MyBatis 文件路径
      const vuePath = 'frontend/src'; // TODO: 定义 Vue 文件路径

      // // 根据模板生成路径
      // paths.push(`${javaPath}/domain/${className}.java`);
      // // TODO: 需要根据具体情况添加 sub-domain 的路径
      // paths.push(`${javaPath}/mapper/${className}Mapper.java`);
      // paths.push(`${javaPath}/service/I${className}Service.java`);
      // paths.push(`${javaPath}/service/impl/${className}ServiceImpl.java`);
      // paths.push(`${javaPath}/controller/${className}Controller.java`);
      // paths.push(`${mybatisPath}/${className}Mapper.xml`);
      // // 可能需要的 SQL 脚本路径
      // paths.push(`${businessName}Menu.sql`);
      // // 前端 Vue.js 和 JavaScript 文件路径
      // paths.push(`${vuePath}/api/${moduleName}/${businessName}.js`);
      // paths.push(`${vuePath}/views/${moduleName}/${businessName}/index.vue`);
      // // 如果有树形结构的视图
      // paths.push(`${vuePath}/views/${moduleName}/${businessName}/index-tree.vue`);

      // return paths;

      return {
        '后端': {
          'Domain': `${javaPath}/domain/${className}.java`,
          'Mapper XML': `${mybatisPath}/${className}Mapper.xml`,
          'Mapper': `${javaPath}/mapper/${className}Mapper.java`,
          'Service': `${javaPath}/service/I${className}Service.java`,
          'ServiceImpl': `${javaPath}/service/impl/${className}ServiceImpl.java`,
          'Controller': `${javaPath}/controller/${className}Controller.java`,
        },
        '前端': {
          '列表页面': `${vuePath}/views/${moduleName}/${businessName}/index.vue`,
          '表单页面': `${vuePath}/views/${moduleName}/${businessName}/index-tree.vue`,
          'API 文件': `${vuePath}/api/${moduleName}/${businessName}.js`
        },
        'SQL': {
          'SQL': `${businessName}Menu.sql`
        }
        // TODO: 添加其他分类和路径
      };
    }
  },
  data() {
    return {
      localGenOptions: this.coreData.genOptions,
      localJavaOptions: this.coreData.javaOptions,
      localSqlOptions: this.coreData.sqlOptions,
    };
  },
  methods: {
    // saveOptions() {
    //   // 实现保存逻辑
    //   this.$emit('update', {
    //     ...this.coreData,
    //     genOptions: this.localGenOptions,
    //     javaOptions: this.localJavaOptions,
    //     sqlOptions: this.localSqlOptions
    //   });
    // }
  },
};
</script>

<style lang="scss" scoped>
.card-full-height ::v-deep {
  .el-card__body {
    box-sizing: border-box;
    padding: 0;
    height: calc(100% - 60px);
    &.scroll {
      overflow-y: scroll;
    }
  }
}
.path-preview {
  box-sizing: border-box;
  padding: 20px;
}
</style>
