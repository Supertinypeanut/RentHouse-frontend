import React from 'react'

import { Flex } from 'antd-mobile'

import Filter from './components/Filter'
import HouseItem from './components/HouseItem'
// 导入样式
import styles from './index.module.css'

import { getCurrentCityStorage } from '../../utils/storage'
import Item from 'antd-mobile/lib/popover/Item'

// 获取当前定位城市信息
const CurrentCityData = getCurrentCityStorage()

export default class HouseList extends React.Component {
  state = {
    huoseData : [],
    count : 0
  }

  // 获取数据列表数据
  getChildrenComponentData = ({count, huoseData}) =>{
    this.setState(()=>{
      return {
        count, 
        huoseData
      }
    })
  }

  render() {
    return (
      <div className={styles.root}>
        {/* 条件筛选栏 */}
        <Filter CurrentCityData = { CurrentCityData } getChildrenComponentData = {this.getChildrenComponentData}/>
        {/* 数据列表 */}
        { this.state.huoseData.map( Item => {
          return <HouseItem data = { Item } />
        } ) }
      </div>
    )
  }
}
