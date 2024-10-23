import Vue from 'vue'
import VueRouter from 'vue-router'
// 首页
import Layout from '@/views/layout'
// 二级路由
import home from '@/views/layout/home.vue'
import cart from '@/views/layout/cart.vue'
import user from '@/views/layout/user.vue'
import category from '@/views/layout/category.vue'
// 按需导入
const Login = () => import('@/views/login')
const Myorder = () => import('@/views/myorder')
const Pay = () => import('@/views/pay')
const Prodetail = () => import('@/views/prodetail')
const Search = () => import('@/views/search')
const SearchList = () => import('@/views/search/list.vue')
const store = () => import('@/store')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: home },
        { path: '/cart', component: cart },
        { path: '/user', component: user },
        { path: '/category', component: category }
      ]
    },
    { path: '/login', component: Login },
    { path: '/myorder', component: Myorder },
    { path: '/pay', component: Pay },
    // 动态路由传参，确定将来时那个商品
    { path: '/prodetail/:id', component: Prodetail },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList }
  ]
})

// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  const aultPath = ['/pay', '/myorder']

  // 判断是否是授权页面
  if (!aultPath.includes(to.path)) {
    // 非权限页面放行
    next()
    return
  }
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
