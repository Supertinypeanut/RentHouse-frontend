import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom'

// 导入子组件
import House from '../House'
import News from '../News'
import Profile from '../Profile'

// 导入ant组件
import { TabBar } from 'antd-mobile';

// 导入字体样式
import '../../asstes/fonts/iconfont.css'
// 自定义样式
import './index.css'


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
    selectedTab: this.props.location.pathname,
  }

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

  render() {
    return (
      <div>
        {/* 二级路由 */}
        <Switch>
          <Route path="/home/list" component={House} />
          <Route path="/home/news" component={News} />
          <Route path="/home/profile" component={Profile} />
        </Switch>

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
      </div>
    );
  }
}

export default index;