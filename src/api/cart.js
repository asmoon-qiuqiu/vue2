import axios from '@/utils/request'

// 加入购物车
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return axios.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 获取购物车列表
export const getCartList = () => {
  return axios.get('/cart/list')
}

// 更新购物车商品数量
export const getCartNum = (goodsId, goodsNum, goodsSkuId) => {
  return axios.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 删除购物车商品
export const delCartGoods = (cartIds) => {
  return axios.post('/cart/clear', { cartIds })
}
