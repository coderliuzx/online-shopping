import { reqGetVerificationCode, reqUserRegister, reqLogin, reqUserInfo, reqUserLogOut } from "@/api";
// 登录与注册模块的小仓库
export default {
  state: {
    code: '',
    token: localStorage.getItem("SPH-token"),
    userInfo: {},
  },

  actions: {
    async getVerificationCode({ commit }, phone) {
      let result = await reqGetVerificationCode(phone);
      if (result.code == 200) {
        commit("GETVERIFICATIONCODE", result.data);
        return 'OK'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },

    async userRegister({ commit }, user) {
      let result = await reqUserRegister(user);
      if (result.code == 200) {
        return Promise.resolve(result)
      } else {
        return Promise.reject(result)
      }
    },

    async userLogin({ commit }, user) {
      let result = await reqLogin(user);
      if (result.code == 200) {
        localStorage.setItem('SPH-token', result.data.token);
        commit("USERLOGIN", result.data.token);
        return Promise.resolve(result)
      } else {
        return Promise.reject(result)
      }
    },

    async getUserInfo({ commit }) {
      let result = await reqUserInfo();
      if (result.code == 200) {
        commit("GETUSERINFO", result.data);
      }
    },

    async logOut({ commit }) {
      let result = await reqUserLogOut();
      if (result.code == 200) {
        commit("LOGOUT")
        return Promise.resolve(result)
      } else {
        return Promise.reject(result)
      }
    }
  },

  mutations: {
    GETVERIFICATIONCODE(state, code) {
      state.code = code
    },

    USERLOGIN(state, token) {
      state.token = token;
    },

    GETUSERINFO(state, userInfo) {
      state.userInfo = userInfo;
    },

    LOGOUT(state) {
      state.code = '';
      localStorage.removeItem('SPH-token');
      state.token = localStorage.getItem("SPH-token");
      state.userInfo = {};
    }
  },

  getters: {

  }
}