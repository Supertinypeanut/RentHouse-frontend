import React, { Component } from 'react'

// 导入列表组件
import { AutoSizer, List } from "react-virtualized"

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'
import HouseItem from '../HouseItem'
// 请求api
import { getHouseConditionData, getHouseData } from '../../../../api/house';

import styles from './index.module.css'

// 选中的房屋条件数据
const selectCondition = {
  area: ["area", "null"],
  mode: ["null"],
  price: ["null"],
  more: ["null"]
}

// 当前停留的房屋数据
let currentCondition = ["null"]

// 查询房源开始项和结束项
let start = 1, end = 20

export default class Filter extends Component {
  state = {
    // 当前筛选方式类型
    openType : '',
    // 房屋查询条件
    condition : null,
    // 已选房屋查询条件
    selectCondition,
    // 筛选条件请求返回数据
    huoseData: [],
    // 返回房屋数
    count : 0
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
      // 清除当前选中信息
    }, () => currentCondition = ["null"] )
  }

  // 保存筛选
  onSavePicker = () => {
    const { selectCondition, openType } = this.state
    this.setState(() => {
      return {
        openType : '',
        selectCondition : { ...selectCondition,[ openType]: currentCondition },
        huoseData: []
      }
    },() => {
      // 重置开始项和结束项
      start = 1
      end = 20
      // 获取房屋数据
      this.getHouse()
      // 清除当前选中信息
      currentCondition = ["null"]
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
    const { condition:{ area, subway, rentType, price, characteristic, floor, oriented, roomType},
            openType
          } = this.state
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
      case 'more':
        data = { characteristic, floor, oriented, roomType}
        break;
      default:
        break;
    }
    return {data, cols, openType}
  }

  // 处理请求筛选条件
  handleRequestCondition(){
    // 获取当地城市id
    const { value } = this.props.CurrentCityData
    // 获取选择条件
    const { selectCondition } = this.state
    let { area, mode, price, more } = selectCondition

    // 处理更多筛选查询条件
    area = area.slice(-1).join()
    mode = mode.slice(-1).join()
    price = price.slice(-1).join()
    more = more.join()

    // 返回条件请求对象
    return { cityId: value, area, mode, price, more, start, end }
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

  // 根据条件查询房屋
  async getHouse(){
    // 调用请求参数处理
    const params = this.handleRequestCondition()

    // 发送参数请求
    const { data:{ body } } = await getHouseData(params)

    // 更新房屋数据
    this.setState(() => {
      return {
        huoseData: [ ...this.state.huoseData, ...body.list ],
        count : body.count
      }
    })
  }

  // 上拉加载
  onScroll = ( data ) => {
    const { scrollHeight, scrollTop } = data
    console.log(scrollHeight, scrollTop)
    // 当快接近底部时，发送请求获取下一页数据
    if (scrollTop > 300 && end < this.state.count) {
      // 更改起始项和结束项
      start += 20
      end += 20
      // 发送请求
      this.getHouse()
    }
  }

  componentDidMount(){
    // 调用获取房屋查询条件
    this.getHouseCondition()
    // 调用获取房屋信息
    this.getHouse()
  }

  // 渲染数据列表
  renderHouseItem = ( { index, key } ) => {
    // 获取数据
    const { huoseData } = this.state
    return <HouseItem key = { key } data = { huoseData[index] } />
  }

  render() {
    return (
      <>
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
            { this.state.openType === 'more' && 
                <FilterMore 
                  moreConditionData = { this.handleConditionData() }
                  onCancelPicker = { this.onCancelPicker }
                  onSavePicker = { this.onSavePicker }
                  onGetCurrentCondition = { this.onGetCurrentCondition }
                  selectCondition = { this.state.selectCondition['more'] }
                />
            }
          </div>
        </div>

        {/* 数据列表 */}
         <AutoSizer>
          {({ width }) => {
            return (
              <List
                height = { document.documentElement.clientHeight }
                width = { width }
                rowCount = { this.state.huoseData.length }
                rowHeight = { 140 }
                rowRenderer = { this.renderHouseItem }
                onScroll = { this.onScroll }
              />
            )
          }}
        </AutoSizer>
      </>      
    )
  }
}
