<template>
  <div class="about">
    <SplitView direction="horizontal" class="view">
      <SplitViewItem>
        <SplitView direction="vertical">
          <SplitViewItem>111</SplitViewItem>
          <SplitViewItem>2222</SplitViewItem>
          <SplitViewItem>2222</SplitViewItem>
          <SplitViewItem>2222</SplitViewItem>
          <SplitViewItem>2222</SplitViewItem>
        </SplitView>
      </SplitViewItem>
      <SplitViewItem>2</SplitViewItem>
      <SplitViewItem>3</SplitViewItem>
      <SplitViewItem init-size="500px">
        <SplitView direction="vertical">
          <SplitViewItem>111</SplitViewItem>
          <SplitViewItem>2222</SplitViewItem>
          <SplitViewItem>2222</SplitViewItem>
          <SplitViewItem>2222</SplitViewItem>
          <SplitViewItem>2222</SplitViewItem>
        </SplitView>
      </SplitViewItem>
    </SplitView>
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