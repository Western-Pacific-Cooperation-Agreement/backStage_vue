// ��ǰģ�飬API����ͳһ������������ӿ�ͳһ����
import request from '@/utils/axios'

var qs = require('qs')

const BaseURL = '' 

// ��ȡҳ������
export const getCoreActList = () => {
    return request({
      url: BaseURL + '/coreAct/coreActList',
      methods: 'get'
    })
}
