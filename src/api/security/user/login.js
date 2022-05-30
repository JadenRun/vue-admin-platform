import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/s/login',
    method: 'post',
    data: data
  })
}

export function getInfo(token) {
  return request({
    url: '/s/getUserInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/s/logout',
    method: 'post'
  })
}
