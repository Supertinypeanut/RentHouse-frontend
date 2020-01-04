import React, { PureComponent } from 'react';
// 导入ant组件
import { Carousel } from 'antd-mobile';
// 导入请求
import { getSweiperData } from '../../api/home'

class index extends PureComponent {
  state = {
      // 轮播图数据
      swiperData: [],
      imgHeight: 176,
  }

   /**************** 模版渲染函数 *********************/
  // 渲染轮播图
  renderSwiper(){
    return (
      this.state.swiperData.map(val => (
        <a
          key={val.id}
          href="http://www.alipay.com"
          style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
        >
          <img
            src={`http://localhost:8080${val.imgSrc}`}
            alt=""
            style={{ width: '100%', verticalAlign: 'top' }}
            onLoad={() => {
              // fire window resize event to change height
              window.dispatchEvent(new Event('resize'));
              this.setState({ imgHeight: 'auto' });
            }}
          />
        </a>
      ))
    )
  }

  /******************** 请求函数 ********************/ 
  // 获取轮播图
  async getSwiper(){
    const { data } = await getSweiperData()

    // 对响应数据校验
    if (data.status !== 200) {
      return
    }

    // 更新数据状态
    this.setState(()=>{
      return {
        swiperData: data.body
      }
    })
    console.log(data);
    
  }


  // 节点挂载，进行状态修改，和数据请求操作
  componentDidMount(){
    this.getSwiper()
  }

  render() {
    return (
      <>
        {/* 轮播图 */}
        <Carousel
        autoplay={this.state.swiperData.length}
        infinite
        >
          {this.renderSwiper()}
        </Carousel>
      </>
    )
  }
}

export default index;