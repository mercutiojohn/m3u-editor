<template>
  <div id="app">
    <el-menu :default-active="$route.path" :router="true" class="nav nav-reset" mode="horizontal">
      <el-menu-item index="/">Home</el-menu-item>
      <el-menu-item index="/panel">Panel</el-menu-item>
      <el-menu-item index="/crud">Crud</el-menu-item>
      <el-menu-item index="/grid">Grid</el-menu-item>
      <el-menu-item index="/generate-m3u">GenerateM3U</el-menu-item>
      <el-menu-item index="/ical-to-epg">iCalToEPG</el-menu-item>
      <el-menu-item index="/geojson-combine">GeoJSON Combine</el-menu-item>
      <el-menu-item index="/edit-ical">Edit iCal</el-menu-item>
      <el-menu-item index="/about">About</el-menu-item>
    </el-menu>
     <!-- <nav>
       <router-link to="/">Home</router-link> |
       <router-link to="/crud">Crud</router-link> |
       <router-link to="/about">About</router-link>
     </nav> -->
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