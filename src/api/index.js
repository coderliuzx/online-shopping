/* 对所有API进行统一管理 */
import requests from "./request";
import mockRequests from "./mockAjax";

/* axios发请求返回的结果是promise对象 */
// 三级联动接口
export const reqCategoryList = () => {
  return requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
  })
};
// 获取搜索模块的数据
export const reqGetSearchInfo = (params) => {
  return requests({
    url: '/list',
    method: 'post',
    data: params
  })
}
// 获取产品详情信息的接口：URL:  /api/itm/{skuId} 请求方式get
export const reqGetGoodsInfo = (skuId) => {
  return requests({
    url: `/item/${skuId}`,
    method: 'get'
  })
}
// 获取添加购物车时的信息
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
  })
}
// 获取购物车列表数据
export const reqCartList = () => {
  return requests({
    url: '/cart/cartList',
    method: 'get'
  })
}
// 删除购物车产品的接口
export const reqDeleteCartById = skuId => {
  return requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
  })
}
// 更新选择状态接口
export const reqUpdateCheckedById = (skuId, isChecked) => {
  return requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
  })
}
// 获取验证码接口
export const reqGetVerificationCode = phone => {
  return requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
  })
}
// 注册接口
export const reqUserRegister = data => {
  return requests({
    url: '/user/passport/register',
    data: data,
    method: 'post'
  })
}
// 登录接口
export const reqLogin = data => {
  return requests({
    url: '/user/passport/login',
    data,
    method: 'post'
  })
}
// 获取用户信息接口
export const reqUserInfo = () => {
  return requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
  })
}
// 用户退出登录接口
export const reqUserLogOut = () => {
  return requests({
    url: 'user/passport/logout',
    method: 'get'
  })
}
// 获取用户地址信息接口
export const reqAddressInfo = () => {
  return requests({
    url: 'user/userAddress/auth/findUserAddressList',
    method: 'get'
  })
}
// 获取商品清单
export const reqOrderInfo = () => {
  return requests({
    url: '/order/auth/trade',
    method: 'get'
  })
}


/* mockAjax请求 */
// 获取banner轮播图
export const reqGetBannerList = () => {
  return mockRequests({
    url: '/banner',
    method: 'get'
  })
}
// 获取floor轮播图
export const reqFloorList = () => {
  return mockRequests({
    url: '/floor',
    method: 'get'
  })
}