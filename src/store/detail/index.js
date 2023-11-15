// 引入接口
import { reqGetGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
import { getUUID } from "@/utils/uuid_token";

export default {
  state: {
    goodInfo: {},
    uuid_token: getUUID(),
  },

  actions: {
    async getGoodsInfo({ commit }, skuId) {
      let result = await reqGetGoodsInfo(skuId);
      if (result.code == 200) {
        commit("GETGOODSINFO", result.data)
      }
    },

    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
      let result = await reqAddOrUpdateShopCart(skuId, skuNum);
      if (result.code == 200) {
        return "OK"
      } else {
        return Promise.reject(new Error("faile"));
      }
    },
  },

  mutations: {
    GETGOODSINFO(state, goodInfo) {
      state.goodInfo = goodInfo;
    }
  },

  getters: {
    categoryView(state) {
      return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
      return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
      return state.goodInfo.spuSaleAttrList || []
    }
  }
}