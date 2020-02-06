import React from 'react'

// import { NavBar, Icon } from 'antd-mobile'
import SearchHeader from '../../component/SearchHeader'
import Filter from './components/Filter'
// 导入样式
import styles from './index.module.css'

import { getCurrentCityStorage } from '../../utils/storage'


// 获取当前定位城市信息
const CurrentCityData = getCurrentCityStorage()

export default class HouseList extends React.Component {
  render() {

    return (
      <div className={styles.root}>
        {/* 导航栏 */}
        <SearchHeader cityName ={ CurrentCityData.label } className ={styles.searchHeader}></SearchHeader>
        {/* 条件筛选栏 */}
        <Filter CurrentCityData = { CurrentCityData } onClick={ id =>this.props.history.push(`/houseDetail/${id}`)} />
      </div>
    )
  }
}
