import React from 'react'

import { Flex } from 'antd-mobile'

import styles from './index.module.css'
// import Item from 'antd-mobile/lib/popover/Item'

// 条件筛选栏标题数组：
const titleList = [
  { title: '区域', type: 'area' },
  { title: '方式', type: 'mode' },
  { title: '租金', type: 'price' },
  { title: '筛选', type: 'more' }
]

export default function FilterTitle(props) {
  // 获取父组件状态数据
  const { titleSelectStatus, changeSelectStatus }  = props

  return (
    <Flex align="center" className={styles.root}>
      {titleList.map( Item => (
        <Flex.Item key={Item.type}>
          {/* 选中类名： selected */}
          <span 
            className={[
            styles.dropdown,
            titleSelectStatus[Item.type]? styles.selected : ''
            ].join(' ')}
            // 点击更改选中结果
            onClick = { () => changeSelectStatus(Item.type) }
          >
            <span>{Item.title}</span>
            <i className="iconfont icon-arrow" />
          </span>
        </Flex.Item>
      ) )}
    </Flex>
  )
}
