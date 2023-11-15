/* 引入路由组件 */
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";

export default [
  {
    path: '/home',
    component: Home,
    meta: {
      isShow: true
    }
  },
  {
    path: '/search/:keyword?',
    name: 'search',
    component: Search,
    meta: {
      isShow: true
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      isShow: false
    }
  },
  {
    path: '/register',
    component: Register,
    meta: {
      isShow: false
    }
  },
  {
    path: '/detail/:skuId?',
    name: 'detail',
    component: Detail,
    meta: {
      isShow: false
    }
  },
  {
    path: '/addCartSuccess',
    name: 'addCartSuccess',
    component: AddCartSuccess,
  },
  {
    path: '/shopCart',
    name: 'shopCart',
    component: ShopCart,
  },
  {
    path: '/trade',
    name: 'trade',
    component: Trade,
  },
  {
    path: '*',
    redirect: '/home'
  },
]