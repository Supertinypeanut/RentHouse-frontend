import React from 'react'
// import style from './index.module.css'
// import PropTypes from 'prop-types'
// props
// 1. cheldren -> 获取组件动态内容  <Child>adadsd</Child>
// 2. defautProps -> 为组件设置默认属性  num
// 3. prop-types -> 为组件的属性提供默认类型  age

import styles from './index.module.css'

function HouseItem({ houseImg, title, tags, price, desc, onClick, style }) {
  return (
    <div className={styles.house} onClick={onClick} style={style}>
      <div className={styles.imgWrap}>
        <img className={styles.img} src={ 'http://localhost:8080' + houseImg} alt="" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.desc}>{desc}</div>
        <div>
          {/* ['近地铁', '随时看房'] */}
          { tags && tags.slice(0,3).map((tag, index) => {
            const tagClass = 'tag' + (index + 1)
            return (
              <span
                className={[styles.tag, styles[tagClass]].join(' ')}
                key={tag}
              >
                {tag}
              </span>
            )
          })}
        </div>
        <div className={styles.price}>
          <span className={styles.priceNum}>{price}</span> 元/月
        </div>
      </div>
    </div>
  )
}

// export default {
//   // props:["list"]
//   props:{
//     num:{
//       type:Array,
//       default:()=>[]
//     }
//   }

// }

// var a = 10
// var arr = 1000

// arr.map(()=>{})

// 类名.属性 -> propTypes是一个类属性->静态属性
// 对比->  类.方法||属性  <-> 对象.方法||属性
// js->伪面向对象语言
// 面向对象: JAVA OC SWIFT 等 类的概念class
// 面向过程: C

HouseItem.propTypes = {
  // src: PropTypes.string,
  // title: PropTypes.string,
  // desc: PropTypes.string,
  // tags: PropTypes.array.isRequired,
  // price: PropTypes.number,
  // onClick: PropTypes.func
}

export default HouseItem
