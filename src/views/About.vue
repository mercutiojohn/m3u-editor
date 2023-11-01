<template>
  <div class="about">
    Hi there
   </div>
</template>

<script>
import SplitView from "@/components/common-split-view/SplitView.vue"
import SplitViewItem from "@/components/common-split-view/SplitViewItem.vue"

export default {
  name: "About",
  components: {
    SplitView,
    SplitViewItem
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

<style lang="scss" scoped>
.about {
  height: calc(100vh - 60px);
}
/* .view {
  ::v-deep {
    .split-view-sashes {
      height: calc(100vh - 60px);
    }
    .split-view-sash.horizontal {
      height: calc(100vh - 60px);
    }
  }
} */
</style>