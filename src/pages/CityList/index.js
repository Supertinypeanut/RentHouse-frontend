import React, { PureComponent } from 'react';

// ant组件
import { NavBar, Icon } from 'antd-mobile';

// 导入api
import { getCityData, getHotCityData } from '../../api/cityList'

// 导入获取当前城市工具
import { getCurrCity } from '../../utils/currentCity'

import './index.scss'

class index extends PureComponent {
  state = {
    // 城市列表数据
    cityList: [],
    // 热门城市
    hotCityList:[],
    // 展示顺序索引
    orderIndex:[],
    // 展示数据
    showCityList: {}
  }

  // 获取城市列表数据
  async getCityList(){
    const { data } = await getCityData()
    // 更新数据并二次处理数据
    this.setState(()=>{
      return {
        cityList : data.body
      }
    },this.compileCityList)
  }

  // 获取城市列表数据
  async getHotCityList(){
    const { data } = await getHotCityData()
    
    // 更新数据并二次处理数据
    this.setState(()=>{
      return {
        hotCityList : data.body
      }
    },this.compileCityList)
  }

  // 处理数据
  compileCityList(){
    const { cityList, showCityList, hotCityList } = this.state
    // 遍历城市列表
    cityList.forEach( item => {
      // 获取首字母
      const headLetter = item.pinyin.substr(0,1)
      // 将同字母开头的地区划分到同键
      showCityList[headLetter] 
        ? showCityList[headLetter].push(item) 
        : (showCityList[headLetter] = [item])
    })
    // 获取有序键数组
    const orderIndex = Object.keys( showCityList ).sort((a,b) => a - b)

    // 添加热门城市到展示数据
    showCityList['Hot'] = hotCityList
    // 防止数组二次添加hot
    orderIndex.includes('Hot') || orderIndex.unshift('Hot')
    
    // 获取当前城市
    getCurrCity(data => {
      // 添加热门城市到展示数据
      showCityList['#'] = [data]
      // 防止数组二次添加#
      orderIndex.includes('#') || orderIndex.unshift('#')
    })
    
    // 更新容器中展示数据
    this.setState(()=>{
      return { 
        showCityList,
        orderIndex
      }
    })
  }

  componentDidMount(){
    // 获取城市列表
    this.getCityList()
    // 获取热门城市
    this.getHotCityList()
  }

  render() {
    return (
      <>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()
          }
        >城市列表</NavBar>
      </>
    );
  }
}

export default index;