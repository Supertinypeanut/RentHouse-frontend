import http from '../utils/request'

// 获取房屋详情
export const GetHouseDetailData = (id = '5cc4494549926d0e2b94c816') =>
    http.get(`/houses/${id}`)

// 房屋是否收藏
export const GetHouseFavorites = (id = '5cc4494549926d0e2b94c816') =>
    http.get(`/user/favorites/${id}`)

// 添加房屋收藏
export const PostHouseFavorites = (id = '5cc4494549926d0e2b94c816') =>
    http.post(`/user/favorites/${id}`)

// 删除房屋收藏
export const DeleteHouseFavorites = (id = '5cc4494549926d0e2b94c816') =>
    http.delete(`/user/favorites/${id}`)