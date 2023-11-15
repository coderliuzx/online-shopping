/* 配置路由 */
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store";

/* 编程式路由多次跳转到当前路由(参数不变)，会抛出navigationDuplicated的警告错误 ==> 这个错误本身不影响其它代码执行 */
// console.dir(VueRouter); ===> 备份push()和replace()
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push()和replace()
VueRouter.prototype.push = function (option, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, option, resolve, reject)
    // 注意：在这个文件中直接调用普通函数originPush(函数内部的this指向的是此index.js全局 -- undefined)
  }
  else if (resolve || reject) {
    if (resolve) {
      originPush.call(this, option, resolve, () => { })
    }
    else {
      originPush.call(this, option, () => { }, reject)
    }
  }
  else {
    originPush.call(this, option).then(() => { }).catch(() => { })
  }
};
VueRouter.prototype.replace = function (option, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, option, resolve, reject)
  }
  else if (resolve || reject) {
    if (resolve) {
      originReplace.call(this, option, resolve, () => { })
    }
    else {
      originReplace.call(this, option, () => { }, reject)
    }
  }
  else {
    originReplace.call(this, option).then(() => { }).catch(() => { })
  }
};



let router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 }
  }
})
// 全局路由守卫
router.beforeEach(async (to, from, next) => {
  if (store.state.user.token) {
    // 登录状态
    if (to.path == '/login') {
      next('/home')
    }
    else {
      // 登录状态去其他页面
      if (store.state.user.userInfo.name) {
        next();
      }
      else {
        try {
          await store.dispatch('getUserInfo');
          next();
        }
        catch (err) {
          await store.dispatch('logOut');
          next('login')
        }
      }
    }
  }
  else {
    console.log(6)
    // 未登录状态
    next();
  }
})
export default router