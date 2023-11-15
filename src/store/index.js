/* 引入Vuex并使用 */
import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);

/* 引入小仓库（模块） */
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopCart from "./shopCart";
import user from "./user";
import trade from "./trade";

export default new Vuex.Store({
  // 实现Vuex仓库模块式开发存储数据
  modules: {
    home,
    search,
    detail,
    shopCart,
    user,
    trade
  }
})