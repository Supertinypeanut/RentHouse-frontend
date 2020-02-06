import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, NavBar, Icon,Toast } from 'antd-mobile'

import { Link } from 'react-router-dom'

import styles from './index.module.css'

import { postUserLogin } from '../../api/login'
import { setTokenStorage } from '../../utils/storage'

// 验证规则：
// const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
// const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Login extends Component {
  state = {
    // 用户账号密码
    username: '',
    password: ''
  }
  
  // 登录按钮逻辑
  onSubmit = async (e) =>{
    // 阻止默认事件
    e.preventDefault()
    const { username, password } = this.state

    // 发送用户登入请求
    const res = await postUserLogin({username, password })
    const { status, body, description } = res.data

    // 对返回结果进行判断
    if (status === 200) {
      setTokenStorage('token', body.token)
      this.props.history.push('/')
    } else {
      Toast.info(description, 1)
    }
  }


  render() {
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavBar 
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
          className={styles.navHeader} mode="dark">
          账号登录
        </NavBar>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <form>
            <div className={styles.formItem}>
              <input
                className={styles.input}
                name="username"
                placeholder="请输入账号"
                onChange = {e => this.setState({username:e.target.value})}
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formItem}>
              <input
                className={styles.input}
                name="password"
                type="password"
                placeholder="请输入密码"
                onChange = {e => this.setState({password:e.target.value})}
              />
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit" onClick ={ this.onSubmit }>
                登 录
              </button>
            </div>
          </form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/registe">还没有账号，去注册~</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}

export default Login
