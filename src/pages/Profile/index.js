import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { Grid, Button, Toast, Modal } from 'antd-mobile'

import { isToken, removeTokenStorage } from '../../utils/storage'
import { getUserInfo } from '../../api/profile' 
import { postUserLogout } from '../../api/login'
import styles from './index.module.css'

const BASE_URL = 'http://localhost:8080'
// 菜单数据
const menus = [
  { id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorate' },
  { id: 2, name: '我的出租', iconfont: 'icon-ind', to: '/rent' },
  { id: 3, name: '看房记录', iconfont: 'icon-record' },
  {
    id: 4,
    name: '成为房主',
    iconfont: 'icon-identity'
  },
  { id: 5, name: '个人资料', iconfont: 'icon-myinfo' },
  { id: 6, name: '联系我们', iconfont: 'icon-cust' }
]

// 默认头像
const DEFAULT_AVATAR = BASE_URL + '/img/profile/avatar.png'

export default class Profile extends Component {
  state  = {
    isLogin: false,
    userInfo: {}
  }
  // 获取用户信息
  async getData() {
    if (!isToken()) return

    const {data} = await getUserInfo()

    if (data.status === 200) {
      this.setState(()=>{
        return {
          isLogin: true,
          userInfo: data.body
        }
      })
    } else {
      Toast.info('登录时间过长，请重新登录', 2)
    }
  }
  // 退出登录
  logout = ()=> {
    Modal.alert('提示','确认退出登录吗', [
      {text: '取消'},
      {
        text: '确定',
        onPress: async ()=> {
          const { data } = await postUserLogout()
          if (data.status === 200) {
            removeTokenStorage()
            this.setState(()=> {
              return {
                isLogin: false,
                userInfo: {}
              }
            })
          } 
          Toast.info(data.description, 1)
        }
      }
    ])
  }
  componentDidMount() {
    this.getData()
  }
  render() {
    const { history } = this.props
    const { userInfo } = this.state

    return (
      <div className={styles.root}>
        {/* 个人信息 */}
        <div className={styles.title}>
          <img
            className={styles.bg}
            src={BASE_URL + '/img/profile/bg.png'}
            alt="背景图"
          />
          <div className={styles.info}>
            <div className={styles.myIcon}>
              <img className={styles.avatar} src={userInfo?.avatar? BASE_URL + userInfo?.avatar : DEFAULT_AVATAR} alt="icon" />
            </div>
            <div className={styles.user}>
              <div className={styles.name}>{ userInfo?.nickname? userInfo.nickname : '游客'}</div>
              {
                this.state.isLogin ? 
                  <>
                    <div className={styles.auth}>
                      <span onClick={this.logout}>退出</span>
                    </div>
                    <div className={styles.edit}>
                      编辑个人资料
                      <span className={styles.arrow}>
                        <i className="iconfont icon-arrow" />
                      </span>
                    </div>
                  </> : 
                  <div className={styles.edit}>
                    <Button
                      type="primary"
                      size="small"
                      inline
                      onClick={() => history.push('/login')}
                    >
                      去登录
                    </Button>
                  </div>
              }
            </div>
          </div>
        </div>

        {/* 九宫格菜单 */}
        <Grid
          data={menus}
          columnNum={3}
          hasLine={false}
          renderItem={item =>
            item.to ? (
              <Link to={item.to}>
                <div className={styles.menuItem}>
                  <i className={`iconfont ${item.iconfont}`} />
                  <span>{item.name}</span>
                </div>
              </Link>
            ) : (
              <div className={styles.menuItem}>
                <i className={`iconfont ${item.iconfont}`} />
                <span>{item.name}</span>
              </div>
            )
          }
        />

        {/* 加入我们 */}
        <div className={styles.ad}>
          <img src={BASE_URL + '/img/profile/join.png'} alt="" />
        </div>
      </div>
    )
  }
}
