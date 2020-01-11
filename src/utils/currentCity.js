
import { getCurrCityData } from '../api/home'

import { Toast } from 'antd-mobile' 

export const getCurrCity = (cb)=>{
    // 获取百度地图当前位置
    const { BMap } = window
    var myCity = new BMap.LocalCity();
    myCity.get(async (result)=>{
      // 获取城市名
      var cityName = result.name
      // 获取当前城市详细信息
      const { data } = await getCurrCityData(cityName)

      // 判断是否请求成功
      if (data.status !== 200) {
        return Toast.info('当前定位失败！', 1)
      }

      // 使用回调接收
      cb && cb(data.body)
    })
}