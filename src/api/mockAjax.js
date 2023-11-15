/* 对axios进行二次封装 */
import axios from "axios";

/* 引入进度条+样式 */
import nProgress from "nprogress";
import "nprogress/nprogress.css";


/* 使用axios对象的create方法创建一个axios实例对象 */
const requests = axios.create({
  // 基础路径（路径前缀）
  baseURL: "/mock",
  // 定义请求超时时间为5秒
  timeout: 5000,
})

/* 请求拦截器：在请求发出去之前做一些事情 */
requests.interceptors.request.use((config) => {
  nProgress.start();
  return config
})

/* 响应拦截器：在响应发出去后做一些事情 */
requests.interceptors.response.use((res) => {
  nProgress.done();
  return res.data;
}, (error) => {
  return Promise.reject(new Error('faile'));
})

/* 对外暴露 */
export default requests;