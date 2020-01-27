import http from '../utils/request'


// 获取房屋查询条件
export const getHouseConditionData = (ID = 'AREA%7C88cff55c-aaa4-e2e0') => 
    http.get(`/houses/condition?id=${ID}`)