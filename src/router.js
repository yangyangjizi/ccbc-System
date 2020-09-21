import Vue from 'vue'
import Router from 'vue-router'

// 重复点击路由报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)


let router = new Router({

  routes: [{
      path: '/',
      name: 'Login',
      component: () => import('./components/Login.vue'),
      hidden: true
    },
    //欢迎页
    {
      path: '/',
      name: '',
      iconCls: 'el-icon-discount',
      component: () => import('./components/Home.vue'),
      leaf: true, //只有一个节点
      redirect: {
        path: '/welcome'
      },
      children: [{
        path: '/welcome',
        name: '首页',
        component: () => import('./components/welcome/welcome.vue'),
      }]
    },
    //任务管理
    {
      path: '/',
      component: () => import('./components/Home.vue'),
      name: '任务管理',
      children: [{
          path: '/TimeTick',
          component: () => import('./components/system/user/Management/TimeTick.vue'),
          name: '定时任务',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/Instance',
          component: () => import('./components/system/user/Management/Instance.vue'),
          name: 'bean实例',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/Rules',
          component: () => import('./components/system/user/Management/Rules.vue'),
          name: '规则',
          hidden: true,
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/TimeTickAdd',
          component: () => import('./components/system/user/Management/TimeTickAdd.vue'),
          name: '新增',
          hidden: true,
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/TimeTickEdit',
          component: () => import('./components/system/user/Management/TimeTickEdit.vue'),
          name: '编辑',
          hidden: true,
          meta: {
            keepAlive: true // 需要缓存
          }
        },
      ]
    },
    // 账户年检统计表
    {
      path: '/',
      component: () => import('./components/Home.vue'),
      name: '账户年检统计表',
      iconCls: 'el-icon-data-line',
      children: [{
          path: '/Accountlist',
          component: () => import('./components/account-year/Accountlist.vue'),
          name: '浏览',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/Account',
          component: () => import('./components/account-year/Account.vue'),
          name: '统计',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/NewAccountAdd',
          component: () => import('./components/account-year/NewAccountAdd.vue'),
          name: ' 新增',
          hidden: true,
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/NewAccountDetail',
          component: () => import('./components/account-year/NewAccountDetail.vue'),
          name: '详情',
          hidden: true,
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/NewAccountEdit',
          component: () => import('./components/account-year/NewAccountEdit.vue'),
          name: '编辑',
          hidden: true,
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/AccountDetail',
          component: () => import('./components/account-year/AccountDetail.vue'),
          name: '详情',
          hidden: true,
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/AccountEdit',
          component: () => import('./components/account-year/AccountEdit.vue'),
          name: '编辑',
          hidden: true,
          meta: {
            keepAlive: false
          }
        },
      ]
    },

    // 银行账户情况统计表
    {
      path: '/',
      component: () => import('./components/Home.vue'),
      name: '银行账户情况统计表',
      iconCls: 'el-icon-data-board',
      children: [{
          path: '/NewBankAccountlist',
          component: () => import('./components/bank-account/NewBankAccountlist.vue'),
          name: '浏览',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/BankAccount',
          component: () => import('./components/bank-account/BankAccount.vue'),
          name: '统计',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/NewBankAccountAdd',
          component: () => import('./components/bank-account/NewBankAccountAdd.vue'),
          name: ' 新增',
          hidden: true,
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/NewBankAccountDetail',
          component: () => import('./components/bank-account/NewBankAccountDetail.vue'),
          name: '详情',
          hidden: true,
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/NewBankAccountEdit',
          component: () => import('./components/bank-account/NewBankAccountEdit.vue'),
          name: '编辑',
          hidden: true,
          meta: {
            keepAlive: false
          }
        },
      ]
    },

    // 企业违规多头开立基本存款账户检测分析表
    {
      path: '/Home',
      component: () => import('./components/Home.vue'),
      name: '智汇',
      iconCls: 'el-icon-office-building', //图标样式class
      leaf: true, //只有一个节点
      redirect: {
        path: '/Violations'
      },
      children: [{
          path: '/Violations',
          component: () => import('./components/corporate-account/Violations.vue'),
          name: '企业违规多头开立基本存款账户检测分析表',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/ViolationsDetail',
          component: () => import('./components/corporate-account/ViolationsDetail.vue'),
          name: '企业违规多头开立基本存款账户检测分析表 > 详情',
          meta: {
            keepAlive: false
          },
          hidden: true
        },
        {
          path: '/ViolationsEdit',
          component: () => import('./components/corporate-account/ViolationsEdit.vue'),
          name: '编辑',
          meta: {
            keepAlive: false
          },
          hidden: true
        },
        {
          path: '/ViolationsAdd',
          component: () => import('./components/corporate-account/ViolationsAdd.vue'),
          name: '企业违规多头开立基本存款账户检测分析表 > 新增',
          hidden: true,
          meta: {
            keepAlive: false
          }
        },
      ]

    },

    // 商机营销汇总表
    {
      path: '/Home',
      component: () => import('./components/Home.vue'),
      name: '商机汇',
      iconCls: 'el-icon-pie-chart', //图标样式class
      children: [{
          path: '/Businesslist',
          component: () => import('./components/business-market/Businesslist.vue'),
          name: '浏览（全程电子化）',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/BusinessElist',
          component: () => import('./components/business-market/BusinessElist.vue'),
          name: '浏览（一窗通）',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/NewBusinessDetail',
          component: () => import('./components/business-market/NewBusinessDetail.vue'),
          name: '详情',
          hidden: true,
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/WarningStateDetail',
          component: () => import('./components/business-market/WarningStateDetail.vue'),
          name: '预警状态详情',
          hidden: true,
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/NewBusinessEDetail',
          component: () => import('./components/business-market/NewBusinessEDetail.vue'),
          name: '详情',
          hidden: true,
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/BusinessEntinfo',
          component: () => import('./components/business-market/BusinessEntinfo.vue'),
          name: '统计(一窗通)',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/Business',
          component: () => import('./components/business-market/Business.vue'),
          name: '统计(全程电子化)',
          meta: {
            keepAlive: true // 需要缓存
          }
        }
      ]

    },
    //  单位银行结算账户数量统计
    {
      path: '/Home',
      component: () => import('./components/Home.vue'),
      name: '智汇',
      iconCls: 'el-icon-coin', //图标样式class
      leaf: true, //只有一个节点
      redirect: {
        path: '/UnitSettlementStatistics'
      },
      children: [{
        path: '/UnitSettlementStatistics',
        component: () => import('./components/unit-settlement/UnitSettlementStatistics.vue'),
        name: '单位银行结算统计',
        meta: {
          keepAlive: true // 需要缓存
        }
      }]
    },
    // 信息分发
    {
      path: '/Home',
      component: () => import('./components/Home.vue'),
      name: '智汇',
      leaf: true, //只有一个节点
      redirect: {
        path: '/InformationDistribution'
      },
      children: [{
          path: '/InformationDistribution',
          component: () => import('./components/information-distribution/InformationDistribution.vue'),
          name: '信息分发',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/InformationDistributionDetail',
          component: () => import('./components/information-distribution/InformationDistributionDetail.vue'),
          name: '信息分发 > 详情',
          meta: {
            keepAlive: false
          },
          hidden: true
        }
      ]
    },
    // 产品汇总
    {
      path: '/Home',
      component: () => import('./components/Home.vue'),
      name: '产品汇',
      iconCls: 'el-icon-grape', //图标样式class
      children: [{
          path: '/ProductList',
          component: () => import('./components/product-summary/ProductList.vue'),
          name: '浏览一',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/ProductListTwo',
          component: () => import('./components/product-summary/ProductListTwo.vue'),
          name: '浏览二',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/ProductClientList',
          component: () => import('./components/product-summary/ProductClientList.vue'),
          name: '抢户列表',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
        	path: '/ProductClientListTwo',
        	component: () => import('./components/product-summary/ProductClientListTwo.vue'),
        	name: '抢户列表二',
        	meta: {
        		keepAlive: true // 需要缓存
        	}
        },
        {
          path: '/ProductListDetail',
          component: () => import('./components/product-summary/ProductListDetail.vue'),
          name: '产品汇总 > 详情一',
          meta: {
            keepAlive: false
          },
          hidden: true
        },
        {
          path: '/ProductListDetailTwo',
          component: () => import('./components/product-summary/ProductListDetailTwo.vue'),
          name: '产品汇总 > 详情二',
          meta: {
            keepAlive: false
          },
          hidden: true
        },
        {
          path: '/Product',
          component: () => import('./components/product-summary/Product.vue'),
          name: '统计(产品营销结果)',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/ProductStatistical',
          component: () => import('./components/product-summary/ProductStatistical.vue'),
          name: '统计二',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/ProductTwo',
          component: () => import('./components/product-summary/ProductTwo.vue'),
          name: '统计(机构营销结果)',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/ProductThree',
          component: () => import('./components/product-summary/ProductThree.vue'),
          name: '统计(操作员营销结果)',
          meta: {
            keepAlive: true // 需要缓存
          }
        }
      ]
    },
    // 智汇
    {
      path: '/Home',
      component: () => import('./components/Home.vue'),
      name: '智汇',
      iconCls: 'el-icon-trophy', //图标样式class
    },
    // 预警名单
    {
      path: '/Home',
      component: () => import('./components/Home.vue'),
      name: '预警名单',
      children: [{
          path: '/Settlement',
          component: () => import('./components/risk-system/Settlement.vue'),
          name: '结算专用',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/SettlementDetail',
          component: () => import('./components/risk-system/SettlementDetail.vue'),
          name: '结算专用 > 详情',
          hidden: true,
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/General',
          component: () => import('./components/risk-system/General.vue'),
          name: '发布维护',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/GeneralDetail',
          component: () => import('./components/risk-system/GeneralDetail.vue'),
          name: '发布维护 > 详情',
          hidden: true,
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/WarningCheckSituation',
          component: () => import('./components/risk-system/WarningCheckSituation.vue'),
          name: '情况查询',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/WarningCheckSituationDetail',
          component: () => import('./components/risk-system/WarningCheckSituationDetail.vue'),
          name: '情况查询 > 详情',
          hidden: true,
          meta: {
            keepAlive: false
          }
        },
      ]
    },
    // 白名单
    {
      path: '/Home',
      component: () => import('./components/Home.vue'),
      name: '白名单',
      children: [
        {
          path: '/PublishList',
          component: () => import('./components/risk-system/white-list/PublishList.vue'),
          name: '发布维护',
          meta: {
            keepAlive: true // 需 要缓存
          }
        },
        {
          path: '/PublishListDetail',
          component: () => import('./components/risk-system/white-list/PublishListDetail.vue'),
          name: '发布维护 > 详情',
          hidden: true,
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/WhiteCheckSituation',
          component: () => import('./components/risk-system/white-list/CheckSituation.vue'),
          name: '情况查询',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/CheckSituationDetail',
          component: () => import('./components/risk-system/white-list/CheckSituationDetail.vue'),
          name: '情况查询 > 详情',
          hidden: true,
          meta: {
            keepAlive: false
          }
        },
      ]
    },
    // 人行账户
    {
      path: '/Home',
      component: () => import('./components/Home.vue'),
      name: '人行账户',
      children: [{
          path: '/PedestrianAccountList',
          component: () => import('./components/risk-system/PedestrianAccountList.vue'),
          name: '浏览',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/PedestrianAccountDetail',
          component: () => import('./components/risk-system/PedestrianAccountDetail.vue'),
          name: '详情',
          hidden: true,
          meta: {
            keepAlive: false
          }
        },
      ]
    },
    // 动态复核
    {
      path: '/Home',
      component: () => import('./components/Home.vue'),
      name: '动态复核',
      children: [{
          path: '/DailyCheck',
          component: () => import('./components/dynamic-review/daily-check/DailyCheck.vue'),
          name: '日常检查',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/DailyCheckDetail',
          component: () => import('./components/dynamic-review/daily-check/DailyCheckDetail.vue'),
          name: ' 日常检查 > 详情',
          meta: {
            keepAlive: false
          },
          hidden: true
        },
        {
          path: '/MobileScreen',
          component: () => import('./components/dynamic-review/mobile-screen/MobileScreen.vue'),
          name: '流动排查',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/MobileScreenDetail',
          component: () => import('./components/dynamic-review/mobile-screen/MobileScreenDetail.vue'),
          name: ' 流动排查 > 详情',
          meta: {
            keepAlive: false
          },
          hidden: true
        },
        {
          path: '/RiskScreen',
          component: () => import('./components/dynamic-review/risk-screening/RiskScreen.vue'),
          name: '风险筛查',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/RiskScreenDetail',
          component: () => import('./components/dynamic-review/risk-screening/RiskScreeningDetail.vue'),
          name: ' 风险筛查 > 详情',
          meta: {
            keepAlive: false
          },
          hidden: true
        },
        {
          path: '/AccountInformation',
          component: () => import('./components/dynamic-review/AccountInformation.vue'),
          name: '年检  >  账户信息对比',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/CustomerInformationDetail',
          component: () => import('./components/dynamic-review/CustomerInformationDetail.vue'),
          name: '年检  >  客户信息对比 > 详情',
          meta: {
            keepAlive: false
          },
          hidden: true
        },
        {
          path: '/CustomerInformation',
          component: () => import('./components/dynamic-review/CustomerInformation.vue'),
          name: '年检  >  客户信息对比',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/CheckSituation',
          component: () => import('./components/query-list/CheckSituation.vue'),
          name: '情况查询',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/CheckSituationDetail',
          component: () => import('./components/query-list/CheckSituationDetail.vue'),
          name: '情况查询 > 详情',
          meta: {
            keepAlive: false // 需要缓存
          },
          hidden: true
        }
      ]
    },

    // 注吊销后发生业务反馈表
    {
      path: '/Home',
      component: () => import('./components/Home.vue'),
      name: '智汇',
      iconCls: 'el-icon-connection', //图标样式class
      leaf: true, //只有一个节点
      redirect: {
        path: '/Revokedlist'
      },
      children: [{
          path: '/Revokedlist',
          component: () => import('./components/revoked-business/Revokedlist.vue'),
          name: '注吊销后发生业务反馈表',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/RevokedDetail',
          component: () => import('./components/revoked-business/RevokedDetail.vue'),
          name: '注吊销后发生业务反馈表 > 详情',
          meta: {
            keepAlive: false
          },
          hidden: true
        },
        {
          path: '/RevokedEdit',
          component: () => import('./components/revoked-business/RevokedEdit.vue'),
          name: '注吊销后发生业务反馈表 > 编辑',
          meta: {
            keepAlive: false
          },
          hidden: true
        },
        {
          path: '/RevokedAdd',
          component: () => import('./components/revoked-business/RevokedAdd.vue'),
          name: '注吊销后发生业务反馈表 > 新增',
          hidden: true,
          meta: {
            keepAlive: false
          }
        }
      ]

    },

    // 企业银行账户“即开即用”统计表
    {
      path: '/Home',
      component: () => import('./components/Home.vue'),
      name: '智汇',
      iconCls: 'el-icon-coordinate', //图标样式class
      leaf: true, //只有一个节点
      redirect: {
        path: '/Epireadylist'
      },
      children: [{
          path: '/Epireadylist',
          component: () => import('./components/epi-ready/Epireadylist.vue'),
          name: '企业银行账户“即开即用”统计表',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/EpireadyDetail',
          component: () => import('./components/epi-ready/EpireadyDetail.vue'),
          name: '企业银行账户“即开即用”统计表 > 详情',
          meta: {
            keepAlive: false
          },
          hidden: true
        },
        {
          path: '/EpireadyEdit',
          component: () => import('./components/epi-ready/EpireadyEdit.vue'),
          name: '企业银行账户“即开即用”统计表 > 编辑',
          meta: {
            keepAlive: false
          },
          hidden: true
        },
        {
          path: '/EpireadyAdd',
          component: () => import('./components/epi-ready/EpireadyAdd.vue'),
          name: '企业银行账户“即开即用”统计表 > 新增',
          hidden: true,
          meta: {
            keepAlive: false
          }
        }
      ]

    },

    // 风险问题及整改明细表
    {
      path: '/Home',
      component: () => import('./components/Home.vue'),
      name: '智汇',
      iconCls: 'el-icon-first-aid-kit', //图标样式class
      leaf: true, //只有一个节点
      redirect: {
        path: '/ChangeTableList'
      },
      children: [{
          path: '/ChangeTableList',
          component: () => import('./components/change-detail/ChangeTableList.vue'),
          name: '风险问题及整改明细表',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/ChangeTableDetail',
          component: () => import('./components/change-detail/ChangeTableDetail.vue'),
          name: '风险问题及整改明细表 > 详情',
          meta: {
            keepAlive: false
          },
          hidden: true
        },
        {
          path: '/ChangeTableEdit',
          component: () => import('./components/change-detail/ChangeTableEdit.vue'),
          name: '风险问题及整改明细表 > 编辑',
          meta: {
            keepAlive: false
          },
          hidden: true
        },
        {
          path: '/ChangeTableAdd',
          component: () => import('./components/change-detail/ChangeTableAdd.vue'),
          name: '风险问题及整改明细表 >新增',
          hidden: true,
          meta: {
            keepAlive: false
          }
        },
      ]

    },
    //农村地区非现金支付工具和方式
    {
      path: '/Home',
      component: () => import('./components/Home.vue'),
      name: '智汇',
      iconCls: 'el-icon-wallet', //图标样式class
      leaf: true, //只有一个节点
      redirect: {
        path: '/Ruralpaylist'
      },
      children: [{
          path: '/Ruralpaylist',
          component: () => import('./components/rural-pay/Ruralpaylist.vue'),
          name: '农村地区非现金支付工具和方式',
          meta: {
            keepAlive: true // 需要缓存
          }
        },
        {
          path: '/RuralpayDetail',
          component: () => import('./components/rural-pay/RuralpayDetail.vue'),
          name: '农村地区非现金支付工具和方式 > 详情',
          meta: {
            keepAlive: false
          },
          hidden: true
        },
        {
          path: '/RuralpayEdit',
          component: () => import('./components/rural-pay/RuralpayEdit.vue'),
          name: '农村地区非现金支付工具和方式 > 编辑',
          meta: {
            keepAlive: false
          },
          hidden: true
        },
        {
          path: '/RuralpayAdd',
          component: () => import('./components/rural-pay/RuralpayAdd.vue'),
          name: '农村地区非现金支付工具和方式 > 新增',
          hidden: true,
          meta: {
            keepAlive: false
          }
        }
      ]

    },
    // 设置
    {
      path: '/Home',
      component: () => import('./components/Home.vue'),
      name: '设置',
      iconCls: 'el-icon-setting', //图标样式class
      children: [{
          path: '/Userlist',
          component: () => import('./components/system/user/Userlist.vue'),
          name: '用户管理',
          meta: {
            keepAlive: false // 需要缓存
          }
        },
        //新增用户
        {
          path: '/AddUser',
          component: () => import('./components/system/user/AddUser.vue'),
          name: '用户管理 > 添加用户',
          meta: {
            keepAlive: false
          },
          hidden: true
        },
        //新增员工与用户
        {
          path: '/AddUserAndStaff',
          component: () => import('./components/system/user/AddUserAndStaff.vue'),
          name: '用户管理 > 添加员工与用户',
          meta: {
            keepAlive: false
          },
          hidden: true
        },
        // 资源管理
        {
          path: '/ResourcesList',
          component: () => import('./components/system/user/ResourcesList.vue'),
          name: '资源管理',
          hmeta: {
            keepAlive: false // 需要缓存
          }
        },
        // 数据权限管理
        {
          path: '/DataLimitList',
          component: () => import('./components/system/user/DataLimitList.vue'),
          name: '数据权限管理',
          meta: {
            keepAlive: false // 需要缓存
          }
        },
        // 员工管理
        {
          path: '/PersonManagement',
          component: () => import('./components/system/user/PersonManagement.vue'),
          name: '员工管理',
          meta: {
            keepAlive: false // 需要缓存
          }
        },
        // 岗位管理
        {
          path: '/DepartmentManagement',
          component: () => import('./components/system/user/DepartmentManagement.vue'),
          name: '岗位管理',
          meta: {
            keepAlive: false // 需要缓存
          }
        },
        // 部门管理
        {
          path: '/BranchList',
          component: () => import('./components/system/user/BranchList.vue'),
          name: '部门管理',
          meta: {
            keepAlive: false // 需要缓存
          }
        },
        {
          path: '/LoginRecord',
          component: () => import('./components/system/user/LoginRecord.vue'),
          name: '登录记录管理',
          meta: {
            keepAlive: false // 需要缓存
          }
        },

      ]
    }

  ]

})
router.beforeEach((to, from, next) => {

  let isLoginUserName = sessionStorage.getItem('userName');
  let isLoginStatus = sessionStorage.getItem('status');
  if (isLoginUserName && isLoginStatus) {
    //如果用户信息存在则往下执行。
    next()
  } else {

    if (to.path === '/') {
      next()
    } else {
      alert('请登录用户！！！')
      next('/')
    }
  }
})
export default router;
