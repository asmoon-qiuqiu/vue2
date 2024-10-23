import axios from '@/utils/request'

// 获取分类数据
export const getCategoryData = () => {
  return axios.get('/category/list')
}
