import React, { Component } from 'react'

import { SearchBar } from 'antd-mobile'

import { getCurrCity } from '../../../utils/currentCity'
import { GetCommunityHouse } from '../../../api/rent'

import styles from './index.module.css'

export default class Search extends Component {
  state = {
    // 搜索框的值
    searchTxt: '',
    tipsList: []
  }

  // 渲染搜索结果列表
  renderTips = () => {
    const { tipsList } = this.state

    return tipsList.map(item => (
      <li 
        key={item.community} 
        className={styles.tip} 
        onClick={()=> this.adjectiveHouse(item)} 
      >
        {item.communityName}
      </li>
    ))
  }

  // 确认小区名
  adjectiveHouse = (house) => {
    const { communityName, community } = house
    this.props.history.replace('/rent/add',{
      name: communityName,
      id: community
    })
  }

  // 搜索小区
  valueChange = async (val) => {
    if (val.trim().length === 0) {
      this.setState(()=>{
        return {
          searchTxt: '',
          tipsList: []
        }
      })
      return
    }

    // 当前城市id
    const  { value: id } =await getCurrCity()
    const { data } = await GetCommunityHouse(val, id)
    if (data.status === 200) {
      this.setState(()=> {
        return {
          searchTxt: val,
          tipsList: data.body
        }
      })
    }
  }

  render() {
    const { history } = this.props
    const { searchTxt } = this.state

    return (
      <div className={styles.root}>
        {/* 搜索框 */}
        <SearchBar
          placeholder="请输入小区或地址"
          value={searchTxt}
          showCancelButton={true}
          onChange={this.valueChange}
          onCancel={() => history.replace('/rent/add')}
        />

        {/* 搜索提示列表 */}
        <ul className={styles.tips}>{this.renderTips()}</ul>
      </div>
    )
  }
}
