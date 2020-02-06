import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, NavBar, Icon,Toast } from 'antd-mobile'

// 表单验证formik
import { withFormik } from 'formik'
import * as yup from 'yup'

import { Link } from 'react-router-dom'

import styles from './index.module.css'

import { postUserLogin } from '../../api/login'
import { setTokenStorage } from '../../utils/storage'

// 验证规则：
const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Login extends Component {  
  render() {
    // 接收formik高阶组件
    const { 
      values,
      handleSubmit,
      handleChange,
      handleBlur,
      errors,
      touched
    } = this.props    
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
          <form onSubmit={ handleSubmit }>
            <div className={styles.formItem}>
              <input
                className={styles.input}
                value = { values.username}
                name="username"
                placeholder="请输入账号"
                onChange = { handleChange }
                onBlur = { handleBlur }
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {
              touched.username && 
              errors.username && 
              <div className={styles.error}>{errors.username}</div>
            }
            <div className={styles.formItem}>
              <input
                className={styles.input}
                name="password"
                type="password"
                value = { values.password }
                placeholder="请输入密码"
                onBlur = { handleBlur }
                onChange = {handleChange}
              />
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            {
              touched.password && 
              errors.password && 
              <div className={styles.error}>{errors.password}</div>
            }
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit" >
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

export default withFormik({
  mapPropsToValues: () => ({ username: '', password: '' }),
  validationSchema: yup.object().shape({
    username: yup
      .string()
      .required('账号不能为空')
      .matches(REG_UNAME,'长度为5~8位,字母数字下划线'),
    password: yup
      .string()
      .required('账号不能为空')
      .matches(REG_PWD,'长度为5~12位,字母数字下划线')
  }),
  handleSubmit: async ( values, formBag ) =>{
    const { username, password } = values

    // 发送用户登入请求
    const res = await postUserLogin({username, password })
    const { status, body, description } = res.data

    // 对返回结果进行判断
    if (status === 200) {
      setTokenStorage('token', body.token)
      formBag.props.history.push('/')
    } else {
      Toast.info(description, 1)
    }
  }

})(Login)
