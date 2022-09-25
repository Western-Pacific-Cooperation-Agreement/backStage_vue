// 当前模块，API进行统一管理，即对请求接口统一管理
import request from '@/utils/axios'

var qs = require('qs')

const BaseURL = '' 

// 获取页面数据
export const getCoreAssoList = () => {
    return request({
      url: BaseURL + '/coreAsso/findAll',
      methods: 'get'
    })
}

export const delCoreAssoById=(ids)=>{
  return request({
    url:BaseURL+'/coreAsso/delById',
    methods:'post',
    ids
  })
}







