const title = 'NewBanker-'
export default [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['@/pages/login.vue'], resolve),
    meta: { title: `${title}登录`, needLogin: false }
  },
  {
    path: '',
    component: resolve => require(['@/pages/layout/index.vue'], resolve),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: resolve => require(['@/pages/dashboard.vue'], resolve),
        meta: {
          title: `${title}首页`,
          needLogin: true
        }
      }
    ]
  },
  {
    path: '/tenant',
    component: resolve => require(['@/pages/layout/index.vue'], resolve),
    children: [
      {
        path: '',
        name: 'tenant_list',
        component: resolve => require(['@/pages/tenant/index.vue'], resolve),
        meta: {
          title: `${title}租户管理`,
          needLogin: true,
          crumbs: {
            list: [{
              name: '首页',
              link: '/'
            }, {
              name: '租户管理'
            }]
          }
        }
      }, {
        path: 'detail/:id',
        name: 'tenant_detail',
        component: resolve => require(['@/pages/tenant/detail.vue'], resolve),
        meta: {
          title: `${title}租户详情`,
          needLogin: true,
          crumbs: {
            back: true,
            list: [{
              name: '租户管理',
              link: '/tenant'
            }, {
              name: '租户详情'
            }]
          }
        }
      }, {
        path: 'create',
        name: 'tenant_create',
        component: resolve => require(['@/pages/tenant/create.vue'], resolve),
        meta: {
          title: `${title}创建租户`,
          needLogin: true,
          crumbs: {
            back: true,
            list: [{
              name: '租户管理',
              link: '/tenant'
            }, {
              name: '创建租户'
            }]
          }
        }
      }
    ]
  },
  {
    path: '/user',
    component: resolve => require(['@/pages/layout/index.vue'], resolve),
    children: [
      {
        path: '',
        name: 'user_list',
        component: resolve => require(['@/pages/user/index.vue'], resolve),
        meta: {
          title: `${title}用户管理`,
          needLogin: true,
          crumbs: {
            list: [{
              name: '首页',
              link: '/'
            }, {
              name: '用户管理'
            }]
          }
        }
      }, {
        path: 'detail/:id',
        name: 'user_detail',
        component: resolve => require(['@/pages/user/detail.vue'], resolve),
        meta: {
          title: `${title}用户详情`,
          needLogin: true,
          crumbs: {
            back: true,
            list: [{
              name: '用户管理',
              link: '/user'
            }, {
              name: '用户详情'
            }]
          }
        }
      }, {
        path: 'create',
        name: 'user_create',
        component: resolve => require(['@/pages/user/create.vue'], resolve),
        meta: {
          title: `${title}用户创建`,
          needLogin: true,
          crumbs: {
            back: true,
            list: [{
              name: '用户管理',
              link: '/user'
            }, {
              name: '用户创建'
            }]
          }
        }
      }
    ]
  },
  {
    path: '/bucket',
    component: resolve => require(['@/pages/layout/index.vue'], resolve),
    children: [
      {
        path: '',
        name: 'bucket_list',
        component: resolve => require(['@/pages/bucket/index.vue'], resolve),
        meta: {
          title: `${title}系统管理`,
          needLogin: true,
          crumbs: {
            list: [{
              name: '首页',
              link: '/'
            }, {
              name: '系统管理'
            }]
          }
        }
      }, {
        path: 'create',
        name: 'bucket_create',
        component: resolve => require(['@/pages/bucket/create.vue'], resolve),
        meta: {
          title: `${title}系统创建`,
          needLogin: true,
          crumbs: {
            list: [{
              name: '首页',
              link: '/'
            }, {
              name: '系统管理'
            }]
          }
        }
      }
    ]
  },
  {
    path: '/api',
    component: resolve => require(['@/pages/layout/index.vue'], resolve),
    children: [
      {
        path: '',
        name: 'api_list',
        component: resolve => require(['@/pages/api/index.vue'], resolve),
        meta: {
          title: `${title}API管理`,
          needLogin: true,
          crumbs: {
            list: [{
              name: '首页',
              link: '/'
            }, {
              name: 'API管理'
            }]
          }
        }
      }, {
        path: 'create',
        name: 'api_create',
        component: resolve => require(['@/pages/api/create.vue'], resolve),
        meta: {
          title: `${title}API创建`,
          needLogin: true,
          crumbs: {
            list: [{
              name: '首页',
              link: '/'
            }, {
              name: 'API管理'
            }]
          }
        }
      }, {
        path: 'detail/:id',
        name: 'api_detail',
        component: resolve => require(['@/pages/api/detail.vue'], resolve),
        meta: {
          title: `${title}API详情`,
          needLogin: true,
          crumbs: {
            back: true,
            list: [{
              name: 'API管理',
              link: '/api'
            }, {
              name: 'API详情'
            }]
          }
        }
      }
    ]
  },
  {
    path: '*',
    name: 'error',
    component: resolve => require(['@/pages/404.vue'], resolve),
    meta: { title: '您访问的页面找不到', needLogin: false }
  }
]
