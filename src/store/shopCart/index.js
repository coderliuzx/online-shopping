// 引入API
import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";

export default {
  state: {
    cartList: [],
  },

  actions: {
    async getCartList({ commit }) {
      let result = await reqCartList();
      if (result.code == 200) {
        commit("GETCARTLIST", result.data)
      }
    },

    async deleteCartListBySkuId({ commit }, skuId) {
      let result = await reqDeleteCartById(skuId);
      if (result.code == 200) {
        return 'OK';
      } else {
        return Promise.reject(new Error('faile'))
      }
    },

    async updateCheckedById({ commit }, { skuId, isChecked }) {
      let result = await reqUpdateCheckedById(skuId, isChecked);
      if (result.code == 200) {
        return 'OK';
      } else {
        return Promise.reject(new Error('faile'))
      }
    },

    deleteAllCheckedCart({ dispatch, getters }) {
      let PromiseAll = [];
      getters.getterCartList.cartInfoList.forEach(item => {
        PromiseAll.push(item.isChecked == 1 ? dispatch("deleteCartListBySkuId", item.skuId) : '');
      });
      return Promise.all(PromiseAll)
    },

    updateAllChecked({ dispatch, getters }, checked) {
      let PromiseAll = [];
      getters.getterCartList.cartInfoList.forEach(item => {
        PromiseAll.push((item.isChecked != checked) ? dispatch("updateCheckedById", { skuId: item.skuId, isChecked: checked }) : '');
      });
      return Promise.all(PromiseAll)
    },

  },

  mutations: {
    GETCARTLIST(state, cartList) {
      state.cartList = cartList;
    }
  },

  getters: {
    getterCartList(state) {
      return state.cartList[0] || {}
    }
  }
}