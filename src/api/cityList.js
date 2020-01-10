import http from '../utils/request'

// 获取城市列表
export const getCityData = (level = 1) => 
  http.get('/area/city',{ params:{level}})

