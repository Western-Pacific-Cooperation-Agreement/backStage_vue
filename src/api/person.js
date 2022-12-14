// 当前模块为**个人中心**请求api，API进行统一管理，即对请求接口统一管理
import request from '@/utils/axios' //api可以理解为普通axios的第二次封装
                                    //=>第一次主要是配置信息，第二次业务逻辑

var qs = require('qs')              //引入qs，会方便我们数据的转换操作

const BaseURL = '/person'//基础首页路径 =>对应后端请求的@RequestMapping("/act")

const get='/get'    //标识该请求方法为get请求

const post='/post'  //标识该请求方法为post请求方法

//******************以下为get方法请求集 **注意这里的命名要求*************************

//**********************以下为搜索界面请求 */

/** 
 * 方法名：getUserInfo()
 * 方法参数：无
 * 作者：WPCA-XieQijiang
 * 描述：获得默认（或推荐的）的活动列表
 * 时间：2022年9月9日14:19:23
 * */

// 通过获得搜索的数据可以选择的数据，例如积分之类的等等
export const getUserInfo = () => {
  return request({
    url: BaseURL+get+'/userInfo',
    method: 'get'
  })
}

/** 
 * 方法名：getApplyInfo()
 * 方法参数：无
 * 作者：WPCA-XieQijiang
 * 描述：获得默认（或推荐的）的活动列表
 * 时间：2022年9月9日14:19:23
 * */

// 通过获得默认的活动列表
export const getApplyInfo = () => {
  return request({
    url: BaseURL+get+'/applyInfo',
    method: 'get'
  })
}


/** 
 * 方法名：getCollectInfo()
 * 方法参数：无
 * 作者：WPCA-XieQijiang
 * 描述：获得默认（或推荐的）的活动列表
 * 时间：2022年9月9日14:19:23
 * */

// 通过获得默认的活动列表
export const getCollectInfo = () => {
  return request({
    url: BaseURL+get+'/collectInfo',
    method: 'get'
  })
  }


  /** 
 * 方法名：getJoinInfo()
 * 方法参数：无
 * 作者：WPCA-XieQijiang
 * 描述：获得默认（或推荐的）的活动列表
 * 时间：2022年9月9日14:19:23
 * */

// 通过获得默认的活动列表
export const getJoinInfo = () => {
  return request({
    url: BaseURL+get+'/JoinInfo',
    method: 'get'
  })
}


//**********************以下为活动详情界面请求 */
/** 
 * 方法名：getActivityInfo()
 * 方法参数：活动的id
 * 作者：WPCA-XieQijiang
 * 描述： 通过活动的id获取页面详情数据
 * 时间：2022年9月9日14:19:23
 * */

export const getActivityInfo = (id) => {
  return request({
    url: BaseURL +get+'/activityInfo'+'?actId='+id,
    method: 'get'
  })
}
/** 
 * 方法名：getActivityInfo()
 * 方法参数：
 * 作者：WPCA-XieQijiang
 * 描述： 通过活动的id获取页面详情数据
 * 时间：2022年9月9日14:19:23
 * */

 export const getMyApplyAct = (param) => {
  return request({
    url: BaseURL +get+'/myApplyAct?'+qs.stringify(param),
    method: 'get',
    param:param
  })
}
/** 
 * 方法名：getMyCollectAct()
 * 方法参数：活动的id
 * 作者：WPCA-XieQijiang
 * 描述： 通过活动的id获取页面详情数据
 * 时间：2022年9月9日14:19:23
 * */

 export const getMyCollectAct = (param) => {
  return request({
    url: BaseURL +get+'/myCollectAct?'+qs.stringify(param),
    method: 'get'
  })
}
/** 
 * 方法名：getMyJoinAct()
 * 方法参数：活动的id
 * 作者：WPCA-XieQijiang
 * 描述： 通过活动的id获取页面详情数据
 * 时间：2022年9月9日14:19:23
 * */

 export const getMyJoinAct = (param) => {
 
  return request({
    url: BaseURL +get+'/myJoinAct?'+qs.stringify(param),
    method: 'get',
  })
}


//******************以下为post方法请求集 注意这里的命名要求*************************


  /** 
   * 方法名：updateUserInfo
   * 方法参数：活动的id
   * 作者：WPCA-XieQijiang
   * 描述：取消报名参加活动
   * 时间：2022年9月9日14:19:23
   * */
   export const updateUserInfo = (param) => {
    return request({
      url: BaseURL +post+'/updateUserInfo',
      method: 'post',
      data:param
    })
  }
    //收藏活动
  /** 
 * 方法名：addCollectedAct()
 * 方法参数：活动的id
 * 作者：WPCA-XieQijiang
 * 描述：收藏
 * 时间：2022年9月9日14:19:23
 * */

export function addCollectedAct(id){

  return request({
    url: BaseURL +post+'/addCollectedAct',
    method:  'post',
    data: {id:id}
  })
}
  
  //报名活动
  /** 
 * 方法名：addSignUpAct()
 * 方法参数：活动的id
 * 作者：WPCA-XieQijiang
 * 描述：报名
 * 时间：2022年9月9日14:19:23
 * */
export function addSignUpAct(id){
  return request({
    url: BaseURL +post+'/addSignUpAct',
    method:  'post',
    data: {id:id}
  })
}

//收藏活动
  /** 
 * 方法名：addCollectedAct()
 * 方法参数：活动的id
 * 作者：WPCA-XieQijiang
 * 描述：取消收藏
 * 时间：2022年9月9日14:19:23
 * */

export function cancelCollectedAct(id){
    const params = new URLSearchParams()
    params.append('id',id)

    return request({
      url: BaseURL +post+'/cancelCollectedAct',
      method: 'post',
      data: {id:id}
    })
}
    

    /** 
   * 方法名：addSignUpAct()
   * 方法参数：活动的id
   * 作者：WPCA-XieQijiang
   * 描述：取消报名
   * 时间：2022年9月9日14:19:23
   * */
  export function cancelSignUpAct(id) {
    const params = new URLSearchParams()
    params.append('id',id)
    return request({
      url: BaseURL +post+'/cancelSignUpAct',
      method:  'post',
      data: {id:id}
    },)
  }
  