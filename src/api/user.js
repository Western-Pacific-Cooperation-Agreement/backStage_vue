

export function login(data) {
  return request({
    url: '/user/login',
    methods: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    methods: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    methods: 'post'
  })
}
