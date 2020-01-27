import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

// 请求api
import { getHouseConditionData } from '../../../../api/house';

import styles from './index.module.css'

// 标题选中状态
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
    openType : '',
    // 房屋查询条件
    condition : null
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

  // 判断是否是点击前三个按扭
  openShow = () => {
    return (
      this.state.openType === 'area' ||
      this.state.openType === 'mode' ||
      this.state.openType === 'price'
    )
  }

  // 处理筛选数据
  handleConditionData(){
    const { condition:{area, subway, rentType, price}, openType } = this.state
    // 返回的处理数据
    let data
    // 列数
    let cols = 1
    switch (openType) {
      case 'area':
        data = [area, subway]
        cols = 3
        break;
      case 'mode':
        data = rentType
        break;
      case 'price':
        data = price
        break;
      default:
        break;
    }
    return {data, cols}
  }

  // 获取房屋查询条件
  async getHouseCondition(){
    // 发送请求获取数据
    const {data} = await getHouseConditionData()
    // 更改状态数据
    this.setState(()=>{
      return {
        condition: data.body
      }
    })
  }

  componentDidMount(){
    // 调用获取房屋查询条件
    this.getHouseCondition()
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
            <FilterPicker 
              onCancelPicker = { this.onCancelPicker }
              onSavePicker = { this.onSavePicker }
              data = { this.handleConditionData() }
            /> 
          }

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
