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

// 最新资讯
export const getNewsData = (area = 'AREA|88cff55c-aaa4-e2e0') =>
    http.get('/home/news', {
        params :{
            area
        }
    })

// 查询当前城市信息
export const getCurrCityData = (name = '%E5%8C%97%E4%BA%AC%E5%B8%82') => 
    http.get(`/area/info?name=${name}`)