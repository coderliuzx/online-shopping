<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer :isShow="$route.meta.isShow"></Footer>
  </div>
</template>

<script>
  import Header from "./components/Header";
  import Footer from "./components/Footer";
  export default {
    name: 'App',
    components: {
      Header,
      Footer
    },
    mounted() {
      // 组件一挂载，就派发一个action过去，请求服务器，获取数据存到仓库中
      this.$store.dispatch('categoryList');
      
    },
  }
</script>

<style>
</style>
