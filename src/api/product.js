import axios from '@/utils/request'

// 获取搜索商品列表的数据
export const getGoodsList = (obj) => {
  const { categoryId, goodsName, page } = obj
  return axios.get('/goods/list', {
    params: {
      categoryId,
      goodsName,
      page
    }
  })
}

// 获取商品详情
export const getGoodsDetail = (goodsId) => {
  return axios.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

// 获取商品评价
export const getProComments = (goodsId, limit) => {
  return axios.get('/comment/listRows', {
    params: {
      goodsId,
      limit
    }
  })
}
