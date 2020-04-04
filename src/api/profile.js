import http from '../utils/request'
import { getTokenStorage } from '../utils/storage'

// 获取用户信息
export const getUserInfo = () => 
  http.get('/user', {
      headers: {
        authorization: getTokenStorage()
      }
  })