import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom'

// 导入子组件
import Index from '../Index'
import House from '../House'
import News from '../News'
import Profile from '../Profile'

// 导入ant组件
import { TabBar} from 'antd-mobile';

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
  // 渲染tabBar
  renderTabBarItem (){
    // 遍历数据数组
    return tabItems.map(item => 
      <TabBar.Item
      title={item.title}
      key={item.id}
      icon={<i className={`iconfont ${item.icon}`} />}
      selectedIcon={<i className={`iconfont ${item.icon}`} />}
      selected={this.props.location.pathname === item.path}
      onPress={() => {
        // 更改路径，跳转路由
        this.props.history.push(item.path)
      }}
      data-seed="logId"
    />
    )
  }

  render() {
    return (
      <>
        {/* 二级路由 */}
        <Switch>
          <Route path="/home" exact component={Index}/>
          <Route path="/home/list" component={House} />
          <Route path="/home/news" component={News} />
          <Route path="/home/profile" component={Profile} />
        </Switch>
        
        {/* tabBar 栏 */}
        <div id="tabBar">
          <TabBar>
            {this.renderTabBarItem()}
          </TabBar>
        </div>
      </>
    );
  }
}

export default index;