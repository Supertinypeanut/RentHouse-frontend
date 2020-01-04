import http from '../utils/request'

// 首页轮播图
export const getSweiperData =  () => 
    http.get('/home/swiper')