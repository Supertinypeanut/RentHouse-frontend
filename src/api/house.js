import http from '../utils/request'

// 获取房屋查询条件
export const getHouseConditionData = (ID = 'AREA|88cff55c-aaa4-e2e0') => 
    http.get(`/houses/condition?id=${ID}`)

// 根据条件查询房屋
export const getHouseData = ( params = { cityId : 'AREA|88cff55c-aaa4-e2e0'} ) => 
    http.get('/houses/', { params })