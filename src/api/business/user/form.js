import request from '@/utils/request'
const serviceUrl = '/service/business/user'
export default {
  save(user) {
    let childUrl = `${serviceUrl}/save`
    if (user.id) {
      childUrl = `${serviceUrl}/update`
    }
    return request({
      url: childUrl,
      method: 'post',
      data: user
    })
  },
  getById(id) {
    return request({
      url: `${serviceUrl}/get/${id}`,
      method: 'get'
    })
  }
}
