

export function getList(params) {
  return request({
    url: '/table/list',
    methods: 'get',
    params
  })
}
