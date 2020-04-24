import React, { PureComponent } from 'react';

import { NavBar, Icon, Toast } from 'antd-mobile';
import { getCurrCity } from '../../utils/currentCity'
import { getHouseData } from '../../api/map'
import './index.scss'

const labelStyle = {
  color : "red",
  fontSize : "12px",
  height : "20px",
  lineHeight : "20px",
  background: "transparent",
  border: "none",
  fontFamily:"微软雅黑"
}

class index extends PureComponent {
  map = null
  BMap = null

  // 渲染房源覆盖物
  renderHouseOverlays = async id => {
    // 获取房源数据数据
    const { data } = await getHouseData(id)
    const { type, nextLevel } = this.getTypeAndZoom()
    if (data.status !== 200) return Toast.info('房源获取失败，请重新加载')

    // 显示
    data.body.forEach((item) => {
      this.houseOverlay( type, nextLevel,item)
    })
  }

  // 单个覆盖物
  houseOverlay = ( type, nextLevel, item) => {
    const { 
      coord: {longitude, latitude},
      value: valueArea,
      count,
      label: labelName 
    } = item
    const point = new this.BMap.Point(longitude, latitude)
    console.log(point)
    if (type === 'circle') {
      this.createCircle(point, count, valueArea, labelName, nextLevel)
    } else {
      this.createRect(point, labelName, count, valueArea)
    }
  }

  // 圆形（层级11、13）
  createCircle = (point, count, valueArea, labelName, nextLevel) => {
    const opts = {
      position : point,    // 指定文本标注所在的地理位置
      offset   : new this.BMap.Size(-35, -35)    //设置文本偏移量
    }
    const label = new this.BMap.Label("", opts);  // 创建文本标注对象
    label.setContent(`
      <div class="bubble">
        <p class="name">${labelName}</p>
        <p>${count}</p>
      </div>
    `)
    label.setStyle(labelStyle)
    
    // 点击覆盖物
    label.addEventListener('click', ()=> {
      this.renderHouseOverlays(valueArea)
      this.map.centerAndZoom(point, nextLevel)
      console.log(point, nextLevel)
      setTimeout( ()=>{
        // 清除所有覆盖物
        this.map.clearOverlays()
      }, 0)
    })
    this.map.addOverlay(label);  
  }

  // 创建矩形覆盖物（层级16）
  createRect = (point, areaName, count, id) => {
    const opts = {
      position: point,
      offset: new window.BMap.Size(-50, -28)
    }
    const label = new window.BMap.Label('', opts)
    label.setContent(`
           <div class="rect">
              <span class="housename">${areaName}</span>
              <span class="housenum">${count}</span>
              <i class="arrow"></i>
          </div>
            `)
    label.setStyle(labelStyle)
    label.addEventListener('click', () => {
      // 移动地图
      console.log('小区被点击了', id)
    })

    this.map.addOverlay(label)
  }

   // 提供地图缩放级别和覆盖物类型
   getTypeAndZoom = () => {
    let type, nextLevel
    // 获取小区缩放级别

    const currZoom = this.map.getZoom() // 项目中默认缩放级别为：11
    if (currZoom >= 10 && currZoom < 12) {
      // 区
      type = 'circle'
      nextLevel = 13
    } else if (currZoom >= 12 && currZoom < 14) {
      // 镇
      type = 'circle'
      nextLevel = 15
    } else if (currZoom >= 14 && currZoom < 16) {
      // 小区
      type = 'rect'
    }
    return {
      type,
      nextLevel
    }
  }

  // 创建百度地图
  async renserBMap(){
    this.BMap = window.BMap
    this.map = new this.BMap.Map("container"); 
    const { label='北京市', value } = await getCurrCity()

    // 创建地址解析器实例     
    var myGeo = new this.BMap.Geocoder()   
    // 将地址解析结果显示在地图上，并调整地图视野    
    myGeo.getPoint(label,
      async (point) => { 
        if (point) {
          this.map.addControl(new this.BMap.NavigationControl());    
          this.map.addControl(new this.BMap.ScaleControl());    
          this.map.addControl(new this.BMap.OverviewMapControl());    
          this.map.addControl(new this.BMap.MapTypeControl());   
          this.map.centerAndZoom(point, 11);
          
          // 渲染房源覆盖物
          this.renderHouseOverlays(value)
        }
      }, 
      label
    )
  }

  componentDidMount() {
    this.renserBMap()
  }
    
  render() {
    return (
      <>
        {/* 导航栏 */}
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log(this.props.history.goBack())
          }
        >地图找房</NavBar>
        {/* 百度地图容器 */}
        <div id="container" />
      </>

    );
  }
}

export default index;