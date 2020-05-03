import http from '../utils/request'


// 查询房源数据
export const getHouseData = ID => 
    http.get(`/area/map?id=${ID}`)

 // 条件查询房屋
export const getHouse = (cityId, start= 1, end = 20 ) => 
    http.get(`/houses`, {
        params: {
            cityId,
            start,
            end
        }
    })