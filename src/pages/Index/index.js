import React, { PureComponent } from 'react';
// 导入ant组件
import { Carousel, Flex } from 'antd-mobile';
// 导入请求
import { getSweiperData } from '../../api/home'

// 导入样式
import './index.scss'

// 导入导航图片数据
import Nav1 from '../../asstes/images/nav-1.png'
import Nav2 from '../../asstes/images/nav-2.png'
import Nav3 from '../../asstes/images/nav-3.png'
import Nav4 from '../../asstes/images/nav-4.png'

// 导航数据
const navs = [
    {
      id: 1,
      img: Nav1,
      title: '整租',
      path: '/home/a'
    },
    {
      id: 2,
      img: Nav2,
      title: '合租',
      path: '/home/b'
    },
    {
      id: 3,
      img: Nav3,
      title: '地图找房',
      path: '/map'
    },
    {
      id: 4,
      img: Nav4,
      title: '去出租',
      path: '/rent/add'
    }
  ]

class index extends PureComponent {
  state = {
      // 轮播图数据
      swiperData: [],
      imgHeight: 176,
      autoplay:false
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

  // 渲染导航菜单4个
  renderNavs = () => {
    return navs.map(item => {
      return (
        <Flex.Item
          className="nav"
          key={item.id}
          // 第三方组件->自带的事件->尝试写原生事件onClick
          onClick={() => {
            // 目前还没写路由配置(只有辨识)--------TODO
            this.props.history.push(item.path)
          }}
        >
          <img src={item.img} alt="" />
          <p>{item.title}</p>
        </Flex.Item>
      )
    })
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
        swiperData: data.body,
        autoplay: true
      }
    })
  }


  // 节点挂载，进行状态修改，和数据请求操作
  componentDidMount(){
    this.getSwiper()
  }

  render() {
    return (
      <>
        {/* 轮播图 */}
        <Carousel autoplay={this.state.autoplay} infinite >
          {this.renderSwiper()}
        </Carousel>

        {/* 4个菜单 */}
        <Flex>{this.renderNavs()}</Flex>
      </>
    )
  }
}

export default index;