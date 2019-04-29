<template>
  <div>
    <div class="success">
      <img src="@/assets/images/success.png" alt="">
      <p>恭喜，注册成功！</p>
      <p>您的用户名为:{{userCode}}，（可用于登录），请登录后修改。</p>
    </div>
    <div class="success_redirect" v-if="source">
      <span>{{count}}s</span>后将为您自动跳转
    </div>
  </div>
</template>
<script>
import Cookie from '@/server/cookie'
export default {
  data () {
    return {
      userCode: '',
      source: false,
      count: '',
      backUrl: '',
      urlState: ''
    }
  },
  props: [
    'emailAddress',
    'mobileNo',
    'isRegister',
    'validateCode',
    'isEmailRegister',
    'userAccount',
    'UserIp'
  ],
  methods: {
    goGrdoupRecor () {
      const TIME_COUNT = 5
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
            // 跳转的页面写在此处
            window.location.href = `${this.backUrl}accessToken=${Cookie.getCookie('accessToken')}`
          }
        }, 1000)
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    if (
      from.name === 'REGpassword' &&
      to.name === 'REGsuccess'
    ) {
      next(vm => {
        vm.userCode = `${vm.userAccount}`
        if (vm.source) {
          vm.goGrdoupRecor()
        }
      })
    }
    next()
  },
  beforeMount () {
    if (!this.validateCode) {
      const router = JSON.parse(sessionStorage.getItem('RouterQuery'))
      this.$router.push({path: '/register', query: router})
    }
  },
  created () {
    const prarm = JSON.parse(sessionStorage.getItem('RouterQuery'))
    if (prarm.redirectUrl) {
      this.source = true
      const url = decodeURIComponent(prarm.redirectUrl)
      const flag = prarm.flag
      this.urlState = prarm.state
      if (flag === '1') {
        this.backUrl = `${url}&state=${this.urlState}&`
      } else {
        this.backUrl = `${url}?state=${this.urlState}&`
      }
    }
  }
}
</script>

<style lang="less" scoped>
.success{
  img{
    width: 22%;
    margin: auto 39%;
  }
  p{
    font-size: 30px;
    color: #333;
    width: 90%;
    text-align: center;
    margin: 40px auto 40px;
    line-height: 60px;
  }
}
.success_redirect{
  width: 100%;
  text-align: center;
  font-size: 28px;
  span{
   color: #f39800
  }
}
</style>
