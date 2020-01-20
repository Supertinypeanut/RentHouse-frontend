// 请求方法
import { getCurrCityData } from '../api/home'

// 导入持久化工具
import { setCurrentCityStorage, getCurrentCityStorage } from '../utils/storage'

// 组件
import { Toast } from 'antd-mobile' 

export const getCurrCity = ()=>{
  // 获取本地数据是否存储当前城市
  let currentCityParams = getCurrentCityStorage()
  if (!currentCityParams) {
    return new Promise((resolve, reject) => {
      // 获取百度地图当前位置
      const { BMap } = window
      var myCity = new BMap.LocalCity()
      myCity.get(async (result)=>{
        // 获取城市名
        var cityName = result.name
        // 获取当前城市详细信息
        const { data } = await getCurrCityData(cityName)

        // 对当前城市进行本地存储
        setCurrentCityStorage(data.body)

        // 判断是否请求成功
        if (data.status !== 200) {
          return Toast.info('当前定位失败！', 1)
        }
        currentCityParams = data.body

        // 返回结果
        resolve(currentCityParams)
      })
    })
  }
  // 使用回调接收
  // cb && cb(currentCityParams)

  // 使用promise返回结果，解决回调地狱问题
  return Promise.resolve(currentCityParams)
}