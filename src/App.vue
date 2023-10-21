<template>
  <div id="app">
     <nav>
       <router-link to="/">Home</router-link> |
       <router-link to="/about">About</router-link>
     </nav>
     <router-view class="content"/>
   </div>
</template>

<script>

export default {
  name: "App",
  components: {},
  data() {
    return {
      counter: 0
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
nav {
  flex-shrink: 0;
  height: calc(60px - 1px);
  line-height: calc(60px - 1px);
  padding-left: 10px;
  border-bottom: 1px solid #ccc;
}
.content {
  width: 100%;
  height: calc(100% - 60px);
  flex-shrink: 1;
}
</style>