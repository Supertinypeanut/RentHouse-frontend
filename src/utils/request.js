import axios from 'axios'
import { getTokenStorage } from './storage'
// 设置基地值
const baseURL = 'http://localhost:8080'

const http = axios.create({
    baseURL,
    timeout: 10000
})

// 统一添加token
http.interceptors.request.use( config =>{
  if (
        config.url.startsWith('/user') && 
        !config.url.startsWith('/user/registered') && 
        !config.url.startsWith('/user/login') 
     ) {
      config.headers['authorization'] = getTokenStorage()
    }
    return config
},error => Promise.reject(error) )

export default http

export const pppp = 23