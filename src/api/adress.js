import axios from '@/utils/request'

export const getAddressList = () => {
  return axios.get('/address/list')
}
