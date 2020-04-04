import http from '../utils/request'

export const postUserRegistered = body => 
    http.post('/user/registered', body)