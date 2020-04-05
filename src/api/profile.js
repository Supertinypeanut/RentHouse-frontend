import http from '../utils/request'

// 获取用户信息
export const getUserInfo = () => 
  http.get('/user')