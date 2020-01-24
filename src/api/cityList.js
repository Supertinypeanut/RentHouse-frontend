import http from '../utils/request'

// 获取城市列表
export const getCityData = (level = 1) => 
  http.get('/area/city',{ params:{level}})


// 获取热门城市
export const getHotCityData = () => 
  http.get('/area/hot')


// 查询房源数据
export const getHouseData = id => 
  http.get(`/area/map?id=${id}`)

