<template>
  <div style="padding: 20px; ">
    <h1>欢迎使用 M3U 编辑器</h1>
    <p>这是一个简单易用的 M3U 编辑器，您可以通过它编辑和创建您的 M3U 播放列表。</p>
    <p>特点包括：</p>
    <ul>
      <li>直观的用户界面</li>
      <li>支持国内大多数平台</li>
      <li>支持肥羊转换服务</li>
      <li>可导入现有 M3U 文件并编辑</li>
      <li>快速编辑和保存 M3U 文件</li>
    </ul>
    <el-button type="primary" size="large" @click="goToGenerator">前往编辑器</el-button>
    <el-button type="normal" size="large" @click="goToGithub">查看 Github 项目</el-button>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  methods: {
    goToGenerator() {
      this.$router.push('/generate-m3u');
    },
    goToGithub() {
      location.href = 'https://github.com/mercutiojohn/m3u-editor'
    }
  }
};
</script>

<style>
/* 在这里添加您的样式 */
</style>
