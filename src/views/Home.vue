<template>
  <div id="home">
    <CommonScreen />
    <!-- <el-button type="button" @click="counter++">counter is {{counter}}</el-button> -->
   </div>
</template>

<script>
import CommonScreen from "@/components/common-screen/index.vue"
export default {
  name: "Home",
  components: {
    CommonScreen
  },
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