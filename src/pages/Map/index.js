import React from 'react';

import { NavBar, Icon, Toast } from 'antd-mobile';
import { getCurrCity } from '../../utils/currentCity'
import { getHouseData, getHouse } from '../../api/map'
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

const BASE_URL = `http://localhost:8080`

class index extends React.Component {
  map = null
  BMap = null
  state = {
    houseList : [],
    loaded : false,
  }

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
    label.addEventListener('click', e => {
      // 移动地图
      const { clientX, clientY } = e.changedTouches[0]
      // 移动距离
      // 中心点Y-当前点Y
      // 中心点X-当前点X
      // Y: (window.innerHeight - 330)/2 - 当前Y
      // X: (window.innerWidth / 2) - 当前点X

      const x = (window.innerHeight - 330) / 2 - clientX
      const y = window.innerWidth / 2 - clientY
      this.map.panBy(x, y)

      this.renderHouseOverlays(valueArea)
      this.map.centerAndZoom(point, nextLevel)
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
      getHouse(id).then(({ data }) => {
        if (data.status !== 200) return
        this.setState({
          houseList: data.body.list,
          loaded: true
        })
      })
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
    // 地图移动时隐藏房源列表
    this.map.addEventListener('movestart', () => {
      this.setState(() => {
        return {
          loaded: false
        }
      })
    })

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

  // 小区房源列表
  renderHouseList = () => {
    const { houseList, loaded } = this.state
    return (
      <div className={['houseList', loaded ? 'show' : ''].join(' ')}>
        <div className={'titleWrap'}>
          <h1 className={'listTitle'}>房屋列表</h1>
          <a className={'titleMore'} href="/home/list">
            更多房源
          </a>
        </div>
        <div className={'houseItems'}>
          {houseList && houseList.map(item => (
            <div onClick={()=> this.props.history.push(`/houseDetail/${item.houseCode}`) } key={item.houseCode} className={'house'}>
              <div className={'imgWrap'}>
                <img
                  className={'img'}
                  src={BASE_URL + item.houseImg}
                  alt=""
                />
              </div>
              <div className={'content'}>
                <h3 className={'title'}>{item.title}</h3>
                <div className={'desc'}>{item.desc}</div>
                <div>
                  {item.tags.map(tag => (
                    <span
                      key={tag}
                      className={['tag', 'tag1'].join(' ')}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={'price'}>
                  <span className={'priceNum'}>{item.price}</span> 元/月
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
    
  render() {
    return (
      <>
        {/* 导航栏 */}
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()
          }
        >地图找房</NavBar>
        {/* 百度地图容器 */}
        <div id="container" />
        { this.renderHouseList() }
      </>

    );
  }
}

export default index;