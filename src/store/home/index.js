import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api";
/* home路由组件模块的小仓库 */

export default {

  state: {
    categoryList: [], // 默认初始值应该与从服务器获取返回的数据类型一致
    bannerList: [],
    floorList: []
  },

  actions: {
    /* 通过API里面的接口函数调用，向服务器发请求，获取商品分类列表数据 */
    categoryList(context) {
      reqCategoryList().then((res) => {
        if (res.code == 200) {
          context.commit('CATEGORYLIST', res.data);
        }
      }).catch((err) => {
        alert('服务器请求categoryList出错：\n' + err)
      })
    },
    // 两种写法一样
    async getBannerList({ commit }) {
      let result = await reqGetBannerList();
      if (result.code == 200) {
        commit('GETBANNERLIST', result.data);
      }
    },

    async getFloorList({ commit }) {
      let result = await reqFloorList();
      if (result.code == 200) {
        commit('GETFLOORLIST', result.data);
      }
    },


  },

  mutations: {
    /* 获取商品分类列表数据 */
    CATEGORYLIST(state, categoryList) {
      // 一级分类只要16条数据
      if (categoryList.length > 16) {
        categoryList = categoryList.slice(0, 16)
      }
      // 二级分类只要9条数据
      for (let i = 0; i < categoryList.length; i++) {
        if (categoryList[i].categoryChild.length > 9) {
          categoryList[i].categoryChild = categoryList[i].categoryChild.slice(0, 9)
        }
      }
      state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
      state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
      state.floorList = floorList;
    }
  },

  getters: {

  }
}