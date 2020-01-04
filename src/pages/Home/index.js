import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom'

// 导入子组件
import House from '../House'
import News from '../News'
import Profile from '../Profile'

// 导入ant组件
import { TabBar, Carousel } from 'antd-mobile';

// 导入字体样式
import '../../asstes/fonts/iconfont.css'
// 自定义样式
import './index.css'

// 导入请求
import { getSweiperData } from '../../api/home'


// TabBar 数据
const tabItems = [
  {
    id: 1,
    title: '首页',
    icon: 'icon-ind',
    path: '/home'
  },
  {
    id: 2,
    title: '找房',
    icon: 'icon-findHouse',
    path: '/home/list'
  },
  {
    id: 3,
    title: '资讯',
    icon: 'icon-infom',
    path: '/home/news'
  },
  {
    id: 4,
    title: '我的',
    icon: 'icon-my',
    path: '/home/profile'
  }
]

class index extends PureComponent {
  state = {
    // 当前地址栏路径
    selectedTab: this.props.location.pathname,
    // 轮播图数据
    swiperData: [],
    imgHeight: 176,
  }

  /**************** 模版渲染函数 *********************/
  // 渲染tabBar
  renderTabBarItem (){
    // 遍历数据数组
    return tabItems.map(item => 
      <TabBar.Item
      title={item.title}
      key={item.id}
      icon={<i className={`iconfont ${item.icon}`} />}
      selectedIcon={<i className={`iconfont ${item.icon}`} />}
      selected={this.state.selectedTab === item.path}
      onPress={() => {
        // 更改当前选中的图标
        this.setState({
          selectedTab: item.path,
        });

        // 更改路径，跳转路由
        this.props.history.push(item.path)
      }}
      data-seed="logId"
    />
    )
  }

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
        autoplay={false}
        infinite
        >
          {this.renderSwiper()}
        </Carousel>

        {/* 二级路由 */}
        <Switch>
          <Route path="/home/list" component={House} />
          <Route path="/home/news" component={News} />
          <Route path="/home/profile" component={Profile} />
        </Switch>
        
        {/* tabBar 栏 */}
        <div id="tabBar">
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            hidden={this.state.hidden}
          >
            {/* 对tabBar进行遍历 */}
            {this.renderTabBarItem()}
          </TabBar>
        </div>
      </>
    );
  }
}

export default index;