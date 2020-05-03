import axios from 'axios'
import { getTokenStorage } from './storage'
import { Toast } from 'antd-mobile'
// 设置基地值
const baseURL = 'http://localhost:8080'

const http = axios.create({
    baseURL,
    timeout: 10000
})

// 统一添加token
http.interceptors.request.use( config =>{
  Toast.loading('加载中', 0, null, false)
  if (
        config.url.startsWith('/user') && 
        !config.url.startsWith('/user/registered') && 
        !config.url.startsWith('/user/login') 
     ) {
      config.headers['authorization'] = getTokenStorage()
    }
    return config
},error => Promise.reject(error) )

http.interceptors.response.use( res => {
  Toast.hide()
  return res
} )

export default http