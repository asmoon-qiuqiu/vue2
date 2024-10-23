// 本地持久化存储

// 通用的键名
const INFO_KEY = 'zh_shop_info'
const HISTORY_KEY = 'zh_shop_list' // 搜索键名

// 获取个人信息
export const getInfo = () => {
  const key = localStorage.getItem(INFO_KEY)
  return key ? JSON.parse(key) : { token: '', userInfo: '' }
}

// 设置个人信息
export const setInfo = (objInfo) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(objInfo))
}

// 移除个人信息
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 获取搜索历史
export const getSearch = () => {
  const history = localStorage.getItem(HISTORY_KEY)
  return history ? JSON.parse(history) : []
}
// 设置搜索历史
export const setSearch = (search) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(search))
}
