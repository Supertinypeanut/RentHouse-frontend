import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'

const titleSelectStatus = {
  area : true,
  mode : false,
  price : false,
  more : false
}

export default class Filter extends Component {
  state = {
    // 标题选中状态数据
    titleSelectStatus,
    // picker选择器前三个
    openType : ''
  }

  // 更改筛选标题状态
  changeSelectStatus = (type) => {
    this.setState(() => {
      return {
        titleSelectStatus : { ...this.state.titleSelectStatus, [type] : true },
        openType : type
      }
    })
  }

  // 取消前三个筛选，隐藏picker
  onCancelPicker = () => {
    this.setState(() => {
      return {
        openType : ''
      }
    })
  }


  // 保存筛选
  onSavePicker = () => {
    this.setState(() => {
      return {
        openType : ''
      }
    })
  }


  // 取消前三个筛选，隐藏picker
  onCancelPicker = () => {
    this.setState(() => {
      return {
        openType : ''
      }
    })
  }

  // 判断是否是点击前三个按扭
  openShow = () => {
    return (
      this.state.openType === 'area' ||
      this.state.openType === 'mode' ||
      this.state.openType === 'price'
    )
  }

  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        { this.openShow() && 
          <div onClick = { this.onCancelPicker } 
          className={styles.mask} />
        }

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle 
            titleSelectStatus = {this.state.titleSelectStatus} 
            changeSelectStatus = {this.changeSelectStatus}
          />

        {/* 前三个菜单对应的内容： */}
        { this.openShow() &&  
            <FilterPicker onCancelPicker ={ this.onCancelPicker } onSavePicker = { this.onSavePicker }/> }

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
