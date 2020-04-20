<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
// * 引入组件
import Header from './components/Header' // ? Header组件
import Footer from './components/Footer' // ? Footer组件

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="less" scoped>
</style>