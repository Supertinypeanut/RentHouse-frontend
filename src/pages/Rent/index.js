import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile'

import { Link } from 'react-router-dom'

import  http  from '../../utils/request'
import HouseItem from '../House/components/HouseItem'
import NoHouse from '../../component/NoHouse'

import styles from './index.module.css'

const BASE_URL = 'http://localhost:8080'
export default class Rent extends Component {
  state = {
    // 出租房屋列表
    list: []
  }

  // 获取已发布房源的列表数据
  async getHouseList() {
    const res = await http.get('/user/houses')
    // console.log(res.data.body)

    const { status, body } = res.data
    if (status === 200) {
      this.setState({
        list: body
      })
    } else {
      const { history } = this.props
      history.replace('/login')
    }
  }

  componentDidMount() {
    this.getHouseList()
  }

  renderHouseItem() {
    const { list } = this.state
    const { history } = this.props

    // console.log(list, history)

    return list.map(item => {
      return (
        <HouseItem
          key={item.houseCode}
          onClick={() => {
            history.push(`/houseDetail/${item.houseCode}`)
          }}
          src={BASE_URL + item.houseImg}
          title={item.title}
          desc={item.desc}
          tags={item.tags}
          price={item.price}
        />
      )
    })
  }

  renderRentList() {
    const { list } = this.state
    const hasHouses = list.length > 0

    if (!hasHouses) {
      return (
        <NoHouse>
          您还没有房源，
          <Link to="/rent/add" className={styles.link}>
            去发布房源
          </Link>
          吧~
        </NoHouse>
      )
    }

    return <div className={styles.houses}>{this.renderHouseItem()}</div>
  }

  render() {
    const { history } = this.props

    return (
      <div className={styles.root}>
        <NavBar
          className={styles.navHeader}
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => history.go(-1)}
        >
          房屋管理
        </NavBar>
        {this.renderRentList()}
      </div>
    )
  }
}
