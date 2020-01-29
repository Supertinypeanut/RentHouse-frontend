import React, { Component } from 'react'

import FilterFooter from '../../../../component/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends Component {
  state = {
    // 选中筛选条件
    defaultSelectCondition : this.props.selectCondition
  }

  // 点击选中的条件
  onSelectCondition( value ){
    let { defaultSelectCondition } = this.state
    // 判断当前点击的筛选条件是否选中(我)
    this.judgmentConditionExist( value ) 
      ? defaultSelectCondition.splice(defaultSelectCondition.indexOf(value), 1)
      : defaultSelectCondition = [...defaultSelectCondition, value]

    console.log(defaultSelectCondition)
    // 更新选中筛选条件
    this.setState( ()=>{
      return {
        // 去重，防止用户点击同一个
        defaultSelectCondition
      }
    })
  }

  // 判断筛选条件是否存在
  judgmentConditionExist(value){
    return this.state.defaultSelectCondition.includes(value)
  }

  // 渲染标签
  renderFilters( data ) {
    // 高亮类名： styles.tagActive
    return (
      // 渲染对应房屋筛选列表
      data.map( item => 
      <span 
        className={[styles.tag, 
                    this.judgmentConditionExist(item.value) ? styles.tagActive : '' ].join(' ')}
        key = { item.value }
        onClick = { () => { this.onSelectCondition(item.value) } }
      >
        { item.label }
      </span>
      )
    )
  }

  render() {
    const { onCancelPicker, onSavePicker, moreConditionData, onGetCurrentCondition } = this.props
    // 父组件传更多筛选条件
    const { characteristic, floor, oriented, roomType } = moreConditionData.data

    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div onClick = { () => onCancelPicker() } className={styles.mask} />

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters(characteristic)}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter 
          className={styles.footer} 
          onCancelPicker = { onCancelPicker }
          onSavePicker = { () => {
            // 更新父组件的当前筛选条件
            onGetCurrentCondition( this.state.defaultSelectCondition.slice(1) )
            onSavePicker()
          } }
        />
      </div>
    )
  }
}
