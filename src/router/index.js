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

Vue.use(VueRouter)

// 用于存储动态加载的 store
let store

// 封装一个函数来获取 store
async function getStore () {
  if (!store) {
    const storeModule = await import('@/store')
    store = storeModule.default // 获取默认导出的 store
  }
  return store
}

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
    { path: '/prodetail/:id', component: Prodetail },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList }
  ]
})

// 全局前置导航守卫
router.beforeEach(async (to, from, next) => {
  const authPath = ['/pay', '/myorder']

  // 判断是否是授权页面
  if (!authPath.includes(to.path)) {
    next()
    return
  }

  // 动态加载 store
  const store = await getStore()
  const token = store.getters.token // 获取 token

  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
