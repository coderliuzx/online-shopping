/* 引入Vue，引入APP组件，关闭生产提示 */
import Vue from 'vue';
import App from './App.vue';
Vue.config.productionTip = false;

/* 引入路由 */
import VueRouter from 'vue-router';
import router from './router';
Vue.use(VueRouter);

/* 引入Vuex的仓库 */
import store from './store';
/* 引入mock.js模拟数据 */
import "@/mock/mockServe";
/* 引入swiper插件的CSS */
import "swiper/css/swiper.min.css";

/* 注册全局组件 */
import TypeNav from "@/components/TypeNav";  // 三级联动
import Carousel from "@/components/Carousel";  // 轮播图
import Pagination from "@/components/Pagination"; //分页器
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);

/* 创建Vue实例 */
new Vue({
  render: h => h(App),
  // 配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
  // 引用Vuex，添加store配置选项
  store
}).$mount('#app')
