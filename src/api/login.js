import http from '../utils/request'

export const postUserLogin = body => 
    http.post('/user/login', body)