// ��ǰģ�飬API����ͳһ������������ӿ�ͳһ����
import request from '@/utils/axios'

var qs = require('qs')

const BaseURL = '' 

// ��ȡҳ������
export const getCoreActTypeList = () => {
    return request({
      url: BaseURL + '/coreActGrade/actTypeList',
      methods: 'get'
    })
}

