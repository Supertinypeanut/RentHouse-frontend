import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

// 请求api
import { getHouseConditionData } from '../../../../api/house';

import styles from './index.module.css'

// 选中的房屋条件数据
const selectCondition = {
  area : null,
  mode : null,
  price : null,
  more : null
}

// 当前停留的房屋数据
let currentCondition = null

export default class Filter extends Component {
  state = {
    // 当前筛选方式类型
    openType : '',
    // 房屋查询条件
    condition : null,
    // 已选房屋查询条件
    selectCondition
  }

  // 更改筛选标题状态
  changeSelectStatus = (type) => {
    this.setState(() => {
      return {
        openType : type
      }
    })
  }

  // 获取当前显示筛选条件
  onGetCurrentCondition(data){
    currentCondition = data
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
    const { selectCondition, openType } = this.state
    this.setState(() => {
      return {
        openType : '',
        selectCondition : { ...selectCondition,[ openType]: currentCondition }
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
    return {data, cols, openType}
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
            selectCondition = {this.state.selectCondition} 
            changeSelectStatus = {this.changeSelectStatus}
          />

          {/* 前三个菜单对应的内容： */}
          { this.openShow() &&  
            <FilterPicker 
              onCancelPicker = { this.onCancelPicker }
              onSavePicker = { this.onSavePicker }
              data = { this.handleConditionData() }
              selectCondition = { this.state.selectCondition }
              onGetCurrentCondition = { this.onGetCurrentCondition }
            /> 
          }

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
