import http from '../utils/request'

// 搜索小区
export const GetCommunityHouse = (name, id) => 
  http.get(`/area/community?name=${name}&id=${id}`)

// 房源图片上传
export const PostHouseImage = formData => 
  http.post('/houses/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

// 发布房源
export const PostIssueHouse = (body = {
    title: "整租 · 豪华小区 精装修出租 小区环境幽静",
    description: "【装修描述】 装修简洁，家电配齐，通风采光效果良好，格局方正。",
    houseImg: "img1|im2|img3",
    oriented: "ORIEN|caa6f80b-b764-c2df",
    supporting: "空调|洗衣机",
    price: "1234",
    roomType: "ROOM|ce2a5daa-811d-2f49",
    size: "123",
    floor: "FLOOR|1",
    community: "AREA|93cbbe43-741d-de54"
  }) => 
    http.post('/user/houses', body)

// 查看已发布房源
export const GetAllIssueHouse = () => 
    http.get('/user/houses')

// 上下架房屋
export const PatchToggleHouseIssueStatus = (id, shelf) => 
    http.patch(`/user/houses/${id}`,{shelf})
