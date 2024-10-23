// 首页api数据

import axios from '@/utils/request'

// 获取首页数据
export const getHomeData = () => {
  return axios.get('/page/detail', {
    params: {
      pageId: 0
    }
  })
}
