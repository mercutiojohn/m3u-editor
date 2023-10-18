<template>
  <div id="app">
     <a href="https://vitejs.dev" target="_blank">
       <img src="/vite.svg" class="logo" alt="Vite logo" />
     </a>
     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
       <img src="/javascript.svg" class="logo vanilla" alt="JavaScript logo" />
     </a>
     <h1>Hello Vite!</h1>
     <!-- <div class="card">
       <el-button type="button" @click="counter++">counter is {{counter}}</el-button>
     </div> -->
     <nav>
       <router-link to="/">Home</router-link> |
       <router-link to="/about">About</router-link>
     </nav>
     <router-view />
     <p class="read-the-docs">
       Click on the Vite logo to learn more
     </p>
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
</style>