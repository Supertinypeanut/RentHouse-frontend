import React, { PureComponent } from 'react';

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
      <div id="container" />
    );
  }
}

export default index;