<template>
  <div>
    <Header />
    <router-view></router-view>
    <!-- !$route.meta.isHideFooter: 是否显示Footer -->
    <Footer v-if="!$route.meta.isHideFooter" />
  </div>
</template>

<script>
// - 引入Header组件
import Header from './components/Header'
// - 引入Footer组件
import Footer from './components/Footer'

export default {
  name: 'App',
  // TODO 注册组件
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="less" scoped>
</style>