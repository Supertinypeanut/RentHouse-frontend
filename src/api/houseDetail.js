import http from '../utils/request'

// 获取房屋详情
export const GetHouseDetailData = (id = '5cc4494549926d0e2b94c816') =>
    http.get(`houses/${id}`)