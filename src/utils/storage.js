// 本地持久化


// 当前城市持久化键
const CURRENTCITY = 'currentCity'
const USERTOKEN = 'user_token'

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


// token持久化
export const setTokenStorage = (data) => {
    window.localStorage.setItem( USERTOKEN, JSON.stringify(data))
}

// 获取持久化token
export const getTokenStorage = () =>
    JSON.parse(window.localStorage.getItem( USERTOKEN ))

// 删除token
export const removeTokenStorage = () =>{
    window.localStorage.removeItem( USERTOKEN )
}

// 判断是否存在token
export const isToken = () => !! getTokenStorage()