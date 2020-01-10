import React, { PureComponent } from 'react';
// 导入ant组件
import { Carousel, Flex, Grid, WingBlank, Toast } from 'antd-mobile';
// 导入请求
import { getSweiperData, getGroupsData, getNewsData, getCurrCityData } from '../../api/home'

// 导入样式
import './index.scss'

// 导入导航图片数据
import Nav1 from '../../asstes/images/nav-1.png'
import Nav2 from '../../asstes/images/nav-2.png'
import Nav3 from '../../asstes/images/nav-3.png'
import Nav4 from '../../asstes/images/nav-4.png'

// 导入顶部搜索栏
import Search from '../../component/SearchHeader'

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
    autoplay:false,
    
    // 租房小组数据
    groupsData: [],

    // 最新资讯
    newsData: [],

    //当前城市信息
    currCityInfo: { 
      label:'北京',
      value: 'AREA|88cff55c-aaa4-e2e0'
    }
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
  renderNavs(){
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

  // 渲染租房小组
  renderGroup(){
    return (
      <>
        <Flex className="group-title" justify="between">
          <h3>租房小组</h3>
          <span>更多</span>
        </Flex>

        <Grid
          square={false}
          hasLine={false}
          data={this.state.groupsData}
          columnNum={2}
          renderItem={item => (
            <Flex className="grid-item" justify="between">
              <div className="desc">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
            </Flex>
          )}
        />
      </>
    )
  }

  // 渲染最新资讯
  renderNews() {
    return this.state.newsData.map(item => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img
            className="img"
            src={`http://localhost:8080${item.imgSrc}`}
            alt=""
          />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ))
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

  // 获取租房小组
  async getGroups(){
    const { data } = await getGroupsData()

    // 对响应数据校验
    if (data.status !== 200) {
      return
    }

    // 更新数据状态
    this.setState(()=>{
      return {
        groupsData: data.body
      }
    })
  }

  // 获取最新
  async getNews(){
    const { data } = await getNewsData()

    // 对响应数据校验
    if (data.status !== 200) {
      return
    }

    // 更新数据状态
    this.setState(()=>{
      return {
        newsData: data.body
      }
    })
  }

  // 获取当前城市信息
  getCurrCity(){
    // 获取百度地图当前位置
    const { BMap } = window
    var myCity = new BMap.LocalCity();
    myCity.get(async (result)=>{
      // 获取城市名
      var cityName = result.name
      // 获取当前城市详细信息
      const { data } = await getCurrCityData(cityName)

      // 判断是否请求成功
      if (data.status !== 200) {
        return Toast.info('当前定位失败！', 1)
      }

      // 更新当前城市位置
      this.setState(()=>{
        return { 
          currCityInfo:{ 
            label: data.body.label,
            value: data.body.value
          }
        }
      })
    })
  }


  // 节点挂载，进行状态修改，和数据请求操作
  componentDidMount(){
    this.getSwiper()
    this.getGroups()
    this.getNews() 
    this.getCurrCity()
  }

  render() {
    return (
      <>
        {/* 搜索栏 */}
        <Search cityName={this.state.currCityInfo.label}></Search>

        {/* 轮播图 */}
        {this.state.autoplay ? (<Carousel autoplay infinite >
          {this.renderSwiper()}
        </Carousel>) : ''}

        {/* 4个菜单 */}
        <Flex className="Navs">{this.renderNavs()}</Flex>

        {/* 租房小组 */}
        <div className="group">{this.renderGroup()}</div>

        {/* 最新资讯 */}
        <div className="news home">
          <h3 className="group-title">最新资讯</h3>
          <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>
      </>
    )
  }
}

export default index;