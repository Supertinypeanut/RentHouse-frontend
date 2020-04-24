import http from '../utils/request'


// 查询房源数据
export const getHouseData = ID => 
    http.get(`/area/map?id=${ID}`)
