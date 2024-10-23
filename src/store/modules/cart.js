import { delCartGoods, getCartList, getCartNum } from '@/api/cart'
import { Toast } from 'vant'
export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    // 数据
    setCartList (state, newCartList) {
      state.cartList = newCartList
    },
    // 复选框选中&不选中
    toggleCheck (state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    // 全选
    toggleAllCheck (state, flag) {
      state.cartList.forEach(item => { item.isChecked = flag })
    },
    // 改变数字框数量
    changeCount (state, { goodsId, goodsNum }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  },
  actions: {
    async getCartAction (context) {
      const { data } = await getCartList()
      // console.log(res)
      data.list.forEach(item => {
        item.isChecked = false
      })
      context.commit('setCartList', data.list)
    },
    async changeCountAciton (context, obj) {
      const { goodsId, goodsNum, goodsSkuId } = obj
      // 先本地修改
      context.commit('changeCount',
        {
          goodsId,
          goodsNum
        })
      // 再提交服务器
      const res = await getCartNum(goodsId, goodsNum, goodsSkuId)
      console.log(res)
    },
    // 删除购物车商品
    async  delAction (context) {
      const list = context.getters.selIscheck
      const cartIdsd = list.map(item => item.id)
      await delCartGoods(cartIdsd)
      Toast('删除成功')
      // 重新渲染，拉取最新购物车数据
      context.dispatch('getCartAction')
    }

  },
  getters: {
    // 所有的商品累加总数
    selTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品项
    selIscheck (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中的总数
    selCartnum (state, getters) {
      return getters.selIscheck.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的总价
    selCartprice (state, getters) {
      return getters.selIscheck.reduce((sum, item) => {
        return sum + item.goods_num * item.goods.goods_price_min
      }, 0).toFixed(2)
    },
    // 复选框选中
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
