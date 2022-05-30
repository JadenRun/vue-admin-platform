import request from '@/utils/request'
const serviceUrl = '/service/business/user'
export default {
  page(searchObj) {
    return request({
      url: `${serviceUrl}/page`,
      method: 'post',
      data: searchObj
    })
  },
  deleteById(id) {
    return request({
      url: `${serviceUrl}/delete/${id}`,
      method: 'delete'
    })
  }
}
