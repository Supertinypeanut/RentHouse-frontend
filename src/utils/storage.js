// 本地持久化


// 当前城市持久化键
const CURRENTCITY = 'currentCity'

// 当前城市持久化
export const setCurrentCityStorage = (data) => {
    window.localStorage.setItem( CURRENTCITY, JSON.stringify(data))
}

// 获取持久化当前城市
export const getCurrentCityStorage = () =>
    JSON.parse(window.localStorage.getItem( CURRENTCITY ))

// 删除当前持久化城市
export const removeCurrentCityStorage = () =>{
    window.localStorage.removeItem( CURRENTCITY )
}
