import React, { PureComponent } from 'react';

import { NavBar, Icon } from 'antd-mobile';

import './index.scss'

class index extends PureComponent {

  // 创建百度地图
  renserBMap(){
    var map = new window.BMap.Map("container"); 
    var point = new window.BMap.Point(116.404, 39.915);
    map.centerAndZoom(point, 15); 
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