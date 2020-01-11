import http from '../utils/request'

// 获取城市列表
export const getCityData = (level = 1) => 
  http.get('/area/city',{ params:{level}})


// 获取热门城市
export const getHotCityData = () => 
  http.get('/area/hot')

