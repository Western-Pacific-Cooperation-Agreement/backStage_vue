// 当前模块，API进行统一管理，即对请求接口统一管理
import requests from '@/utils/request'

var qs = require('qs')

const BaseURL = 'http://localhost:5000/'

// 获取页面数据
export const getPageParam = () => {
    return requests({
      url: BaseURL + '/getParam',
      method: 'get'
    })
  }

