/* 对axios进行二次封装 */
import axios from "axios";
/* 引入进度条+样式，发请求时会有进度条响应 */
import nProgress from "nprogress";
import "nprogress/nprogress.css";
// 在当前模块中引入store
import store from "@/store";


/* 使用axios对象的create方法创建一个axios实例对象 */
const requests = axios.create({
  // 基础路径（路径前缀）
  baseURL: "/api",
  // 定义请求超时时间为5秒
  timeout: 5000,
})

/* 【请求拦截器】：在请求发出去之前做一些事情 */
requests.interceptors.request.use((config) => {
  if (store.state.detail.uuid_token) {
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  if (store.state.user.token) {
    config.headers.token = store.state.user.token;
  }
  nProgress.start();
  return config
})

/* 【响应拦截器】：在响应发出去后做一些事情 */
requests.interceptors.response.use((res) => {
  nProgress.done();
  return res.data;
}, (error) => {
  return Promise.reject(new Error('faile'));
})

/* 对外暴露 */
export default requests;