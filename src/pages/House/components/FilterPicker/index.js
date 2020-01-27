import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../component/FilterFooter'

export default class FilterPicker extends Component {
  render() {
    // 父传子，点击取消和确定方法逻辑
    const { onCancelPicker, onSavePicker, data, selectCondition, onGetCurrentCondition } = this.props
    return (
      <>
        {/* 选择器组件： */}
        <PickerView
          data={ data.data }
          value={ selectCondition[data.openType] }
          cols={ data.cols }
          onChange = { (info)=>{ onGetCurrentCondition(info) } }
        />

        {/* 底部按钮 */}
        <FilterFooter 
          onCancelPicker = { onCancelPicker }
          onSavePicker = { onSavePicker }
        />
      </>
    )
  }
}
