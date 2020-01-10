import React, { PureComponent } from 'react';

// ant组件
import { NavBar, Icon } from 'antd-mobile';

// 导入api
import { getCityData } from '../../api/cityList'

import './index.scss'

class index extends PureComponent {
  state = {
    // 城市列表数据
    cityList: []
  }

  // 获取城市列表数据
  async getCityList(){
    const { data } = await getCityData()
    this.setState(()=>{
      return {
        cityList : data.body
      }
    })
  }

  componentDidMount(){
    this.getCityList()
    
  }

  render() {
    return (
      <>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()
          }
        >城市列表</NavBar>
      </>
    );
  }
}

export default index;