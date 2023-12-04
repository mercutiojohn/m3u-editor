<template>
  <div id="app">
    <el-menu :default-active="$route.path" :router="true" class="nav nav-reset" mode="horizontal">
      <el-menu-item index="/">Home</el-menu-item>
      <el-menu-item index="/generate-m3u">GenerateM3U</el-menu-item>
      <el-menu-item index="/about">About</el-menu-item>
    </el-menu>
     <router-view class="content"/>
   </div>
</template>

<script>

export default {
  name: "App",
  components: {},
  data() {
    return {
      counter: 0,
      activeTab: 'a'
    }
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style scoped>
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
/* nav {
  flex-shrink: 0;
  height: 60px;
  box-sizing: border-box;
  line-height: 60px;
  padding-left: 10px;
  border-bottom: 1px solid #ccc;
} */
.nav {
  flex-shrink: 0;
  /* flex-shrink: 0; */
  height: 60px;
  box-sizing: border-box;
  /* line-height: 60px; */
  /* padding-left: 10px; */
  /* border-bottom: 1px solid #ccc; */
}
.content {
  width: 100%;
  height: calc(100% - 60px);
  flex-shrink: 1;
}
</style>