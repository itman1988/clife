import Vue from 'vue'
import Router from 'vue-router'
import localstorage from '../server/localTimeOver'
import { getUrlKey } from '../server/getRouterQuery'
import helper from '../server/helper'

const Login = r => require.ensure([], () => r(require('@/views/Login')), 'Login')
const Register = r => require.ensure([], () => r(require('../views/register/index')), 'Register')
const RegisterSuccess = r => require.ensure([], () => r(require('../views/register/success')), 'RegisterSuccess')
const RegisterPassword = r => require.ensure([], () => r(require('../views/register/password')), 'RegisterPassword')
const RegisterUserInfo = r => require.ensure([], () => r(require('../views/register/userInfo')), 'RegisterUserInfo')
const Main = r => require.ensure([], () => r(require('../MainApp.vue')), 'Main')

Vue.use(Router)

const RouterConfig = {
  base: '/userweb/h5/',
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/register',
        component: Register,
        children: [
          {
            path: '/register',
            redirect: 'userInfo'
          },
          {
            path: 'userInfo',
            name: 'register',
            component: RegisterUserInfo
          },
          {
            path: 'password',
            name: 'REGpassword',
            component: RegisterPassword
          },
          {
            path: 'success',
            name: 'REGsuccess',
            component: RegisterSuccess
          }
        ]
      }
    ]
  }]
}

export const router = new Router(RouterConfig)

router.beforeEach((to, from, next) => {
  let isLogin = localstorage.get('accessToken')
  const redirectUrl = getUrlKey('redirectUrl')
  // const accessTokenGo = getUrlKey('accessToken')
  const url = decodeURIComponent(redirectUrl)
  var domain = url.split('/')
  // 生产
  // let realRedirectUrl = [
  //   'tccj.chinalife-p.com.cn:8081',
  //   'tccj.chinalife-p.com.cn',
  //   'i.chinalife.com.cn',
  //   'www.chinalife.com.cn',
  //   'pay.chinalife.com.cn',
  //   'pay.chinalife.com.cn:9463',
  //   '10.7.1.22:7001',
  //   '10.28.3.92:9080',
  //   '10.28.13.25:9080',
  //   'trade.chinalife.com.cn'
  // ]
  // 测试
  let realRedirectUrl = [
    'tccj.chinalife-p.com.cn:8081',
    'tccj.chinalife-p.com.cn',
    'i.chinalife.com.cn',
    'www.chinalife.com.cn',
    'pay.chinalife.com.cn',
    'pay.chinalife.com.net',
    '10.31.23.16',
    'www1.chinalife.com.cn:9001',
    'pay.chinalife.com.cn:9463',
    '10.7.1.22:7001',
    '10.28.3.92:9080',
    '218.107.129.234',
    '10.31.17.23:9099',
    '10.28.13.25:9080',
    'www1.chinalife.com.cn:7001',
    '10.7.1.22:9085',
    'trade.chinalife.com.cn',
    'trade1.chinalife.com.cn:9085',
    'www1.chinalife.com.cn:9086',
    '10.0.12.149:9086'
  ]
  for (let i = 0; i < realRedirectUrl.length; i++) {
    if (domain[2] === realRedirectUrl[i]) {
      console.log('回调地址在白名单中')
      // 生产 2019.3.14
      // if (to.name === 'autologin') {
      //   helper.accessTokenLogin(
      //     {
      //       loginType: '02',
      //       accessToken: accessTokenGo
      //     },
      //     userInfo => {
      //       const { oldUserId, userCode } = userInfo
      //       const activatedData = {
      //         userType: '2',
      //         oldUserId,
      //         userCode,
      //         ip: sessionStorage.getItem('UserIp'),
      //         behaviorCode: '01001',
      //         actionTime: TimeUtils.getFormatTime(Date.parse(new Date()))
      //       }
      //       helper.collectUserAction(activatedData)
      //       localstorage.setAge(30 * 60 * 1000).set('accessToken', accessTokenGo)
      //       const url = decodeURIComponent(redirectUrl)
      //       const flag = getUrlKey('flag')
      //       const state = getUrlKey('state')
      //       if (flag === '1') {
      //         window.location.href = `${url}&state=${state}&accessToken=${accessTokenGo}`
      //       } else {
      //         window.location.href = `${url}?state=${state}&accessToken=${accessTokenGo}`
      //       }
      //     },
      //     msg => {
      //       console.log(msg)
      //       alert('登录超时请重新登录')
      //       next({
      //         path: 'login',
      //         query: {
      //           clientSender: getUrlKey('clientSender'),
      //           state: getUrlKey('state'),
      //           redirectUrl: getUrlKey('redirectUrl')
      //         }
      //       })
      //     }
      //   )
      // } else {
      //   if (isLogin) { // 判断是否已经登录且前往的页面不是登录页
      //     helper.accessTokenLogin(
      //       {
      //         loginType: '02',
      //         accessToken: isLogin
      //       },
      //       () => {
      //         const url = decodeURIComponent(redirectUrl)
      //         const flag = getUrlKey('flag')
      //         const state = getUrlKey('state')
      //         if (flag === '1') {
      //           window.location.href = `${url}&state=${state}&accessToken=${isLogin}`
      //         } else {
      //           window.location.href = `${url}?state=${state}&accessToken=${isLogin}`
      //         }
      //       },
      //       () => {
      //         next()
      //       }
      //     )
      //   } else {
      //     next()
      //   }
      // }
      // 生产 旧的
      if (isLogin) { // 判断是否已经登录且前往的页面不是登录页
        helper.accessTokenLogin(
          {
            loginType: '02',
            accessToken: isLogin
          },
          () => {
            const url = decodeURIComponent(redirectUrl)
            const flag = getUrlKey('flag')
            const state = getUrlKey('state')
            if (flag === '1') {
              window.location.href = `${url}&state=${state}&accessToken=${isLogin}`
            } else {
              window.location.href = `${url}?state=${state}&accessToken=${isLogin}`
            }
          },
          () => {
            next()
          }
        )
      } else {
        next()
      }
    } else {
    }
  }
})
