import React from 'react'

import { NavBar, Icon } from 'antd-mobile'

import Filter from './components/Filter'
// 导入样式
import styles from './index.module.css'

import { getCurrentCityStorage } from '../../utils/storage'


// 获取当前定位城市信息
const CurrentCityData = getCurrentCityStorage()

export default class HouseList extends React.Component {
  render() {
    return (
      <>
        {/* 导航栏 */}
        <NavBar
          className={ styles.header }
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()
          }
        >城市列表</NavBar>

        <div className={styles.root}>
          {/* 条件筛选栏 */}
          <Filter CurrentCityData = { CurrentCityData } />
        </div>
      </>
    )
  }
}
