import http from '../utils/request'

// 首页轮播图
export const getSweiperData =  () => 
    http.get('/home/swiper')

// 租房小组
export const getGroupsData = (area = 'AREA|88cff55c-aaa4-e2e0') =>
    http.get('/home/groups', {
        params :{
            area
        }
    })