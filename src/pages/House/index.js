import React from 'react'

import { Flex } from 'antd-mobile'

import Filter from './components/Filter'
// 导入样式
import styles from './index.module.css'

import { getCurrentCityStorage } from '../../utils/storage'

// 获取当前定位城市信息
const { label } = getCurrentCityStorage()

export default class HouseList extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        {/* 条件筛选栏 */}
        <Filter />
      </div>
    )
  }
}
