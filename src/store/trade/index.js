import { reqAddressInfo, reqOrderInfo } from "@/api";

export default {
  state: {
    addressInfo: [],
    orderInfo: {},
  },

  actions: {
    async getAddressInfo({ commit }) {
      let result = await reqAddressInfo();
      if (result.code == 200) {
        commit("GETADDRESSINFO", result.data);
        return Promise.resolve('OK')
      } else {
        return Promise.reject(result);
      }
    },
    async getOrderInfo({ commit }) {
      let result = await reqOrderInfo();
      if (result.code == 200) {
        commit("GETORDERINFO", result.data);
      }
    }
  },

  mutations: {
    GETADDRESSINFO(state, addressInfo) {
      state.addressInfo = addressInfo;
    },
    GETORDERINFO(state, orderInfo) {
      state.orderInfo = orderInfo;
    }
  },

  getters: {

  }
}