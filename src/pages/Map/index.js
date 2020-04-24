import React, { PureComponent } from 'react';

import { NavBar, Icon } from 'antd-mobile';
import { getCurrCity } from '../../utils/currentCity'
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
  // 创建百度地图
  async renserBMap(){
    const BMap = window.BMap
    const map = new BMap.Map("container"); 
    const { label='北京' } = await getCurrCity()

    // 创建地址解析器实例     
    var myGeo = new BMap.Geocoder();      
    // 将地址解析结果显示在地图上，并调整地图视野    
    myGeo.getPoint(label, function(point){      
      if (point) {
          map.addControl(new BMap.NavigationControl());    
          map.addControl(new BMap.ScaleControl());    
          map.addControl(new BMap.OverviewMapControl());    
          map.addControl(new BMap.MapTypeControl());   
          map.centerAndZoom(point, 16);      

          const opts = {
            position : point,    // 指定文本标注所在的地理位置
            offset   : new BMap.Size(0, 0)    //设置文本偏移量
          }
          const label = new BMap.Label("", opts);  // 创建文本标注对象
          label.setContent(`
            <div class="bubble">
              <p class="name">浦东新区</p>
              <p>388套</p>
            </div>
          `)
          label.setStyle(labelStyle);
          map.addOverlay(label);   
        }      
      }, 
      label);
    }

  componentDidMount(){
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