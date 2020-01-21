import React, { PureComponent } from 'react'
import { AutoSizer, List } from 'react-virtualized'

// ant组件
import { NavBar, Icon, Toast } from 'antd-mobile'

// 导入api
import { getCityData, getHotCityData, getHouseData } from '../../api/cityList'

// 导入获取当前城市工具
import { getCurrCity } from '../../utils/currentCity'
import { setCurrentCityStorage } from '../../utils/storage'

import './index.scss'

// const Item = List.Item

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

  // 渲染每一行数据 
  rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) => {
    const { showCityList, orderIndex } = this.state
    return (
      <div key={key} style={style} className="city">
        {/* 对当前索引地址城市渲染 */}
        <div className="title">{ orderIndex[index] }</div>
        {showCityList[orderIndex[index]].map( cityItem => 
          <div className="name" key={cityItem.value} 
            // 切换当前城市
            onClick={async ()=> {
              // 查询当前城市是否有房源
              const { data }= await getHouseData(cityItem.value)
              
              // 判断选择城市是否有房源
              if (data.body && data.body.length === 0) {
                return Toast.info('暂无房源', 1)
              }
              // 持久化本地存储
              setCurrentCityStorage(cityItem)
              this.props.history.goBack()
            }
            }
          >{cityItem.label}</div>
        )}
      </div>
    )
  }

  // 渲染展示数据列表
  // renderList(){
  //   return ( 
  //     // 根据顺序渲染列表
  //     this.state.orderIndex.map((item, index) => {
  //       return (
  //         <List key={index} renderHeader={() => item} className="my-list">

  //           {/* 渲染每一个字母所有城市 */}
  //           {this.state.showCityList[item].map(cityItem => {
  //             return (
  //               <Item 
  //                 key={cityItem.value}
  //                 // 切换当前城市
  //                 onClick={async ()=> {
  //                   // 查询当前城市是否有房源
  //                   const { data }= await getHouseData(cityItem.value)
                    
  //                   // 判断选择城市是否有房源
  //                   if (data.body && data.body.length === 0) {
  //                     return Toast.info('暂无房源', 1)
  //                   }

  //                   // 持久化本地存储
  //                   setCurrentCityStorage(cityItem)
  //                   this.props.history.goBack()
  //                 }
  //                 }
  //                 >
  //                   {cityItem.label}
  //               </Item>
  //             )
  //           })}
  //         </List>
  //       )
  //     })
  //   )
  // }


  // 当个元素高度
  renderItemHeight = ({ index }) =>{
    const { showCityList, orderIndex } = this.state
    const itemHeight = (showCityList[orderIndex[index]].length * 45)
    return 45 + itemHeight
  }

  // 获取城市列表数据
  async getCityList(){
    const { data } = await getCityData()
    // 更新数据并二次处理数据
    this.setState(()=>{
      return {
        cityList : data.body
      }
      // 获取热门城市
    },this.getHotCityList)
  }

  // 获取热门城市列表数据
  async getHotCityList(){
    const { data } = await getHotCityData()
    
    // 更新数据并二次处理数据
    this.setState(()=>{
      return {
        hotCityList : data.body
      }

      // 编译列表
    },this.compileCityList)
  }

  // 处理数据
  async compileCityList(){
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
    const orderIndex = Object.keys( showCityList ).sort((a,b) => a.localeCompare(b))
    // 添加热门城市到展示数据
    showCityList['Hot'] = hotCityList
    // 防止数组二次添加hot
    orderIndex.includes('Hot') || orderIndex.unshift('Hot')
    
    // 获取当前城市
    const data = await getCurrCity()
    // 添加热门城市到展示数据
    showCityList['#'] = [data]
    // 防止数组二次添加#
    orderIndex.includes('#') || orderIndex.unshift('#')
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
  }

  render() {
    return (
      <>
        {/* 导航栏 */}
        <NavBar
          className="narBar"
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()
          }
        >城市列表</NavBar>

        {/* 列表 */}
        {/* {this.renderList()} */}
        <AutoSizer>
          {({height, width}) => (
            <List
              width={width}
              height={height}
              rowCount={this.state.orderIndex.length}
              rowHeight={this.renderItemHeight}
              rowRenderer={this.rowRenderer}
            />
          )}
        </AutoSizer>
      </>
    );
  }
}

export default index;