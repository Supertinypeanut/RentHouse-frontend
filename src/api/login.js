import http from '../utils/request'


// 登录接口
export const postUserLogin = body => 
    http.post('/user/login', body)

// 登出
export const postUserLogout = () => 
    http.post('/user/logout')