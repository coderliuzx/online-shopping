import { reqGetSearchInfo } from '@/api';
// search路由组件模块的小仓库
export default {

  state: {
    searchList: {},
  },

  actions: {
    getSearchList(context, params = {}) {
      reqGetSearchInfo(params).then(res => {
        if (res.code == 200) {
          context.commit("GETSEARCHLIST", res.data);
        }
      })
    }
  },

  mutations: {
    GETSEARCHLIST(state, searchList) {
      state.searchList = searchList;
    }
  },

  getters: {
    attrsList(state) {
      return state.searchList.attrsList || []
    },
    goodsList(state) {
      return state.searchList.goodsList || []
    },
    // trademarkList(state) {
    //   return state.searchList.trademarkList
    // }
    trademarkList: state => state.searchList.trademarkList || [],
  }
}