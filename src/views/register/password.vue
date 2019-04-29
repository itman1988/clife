<template>
  <div class="SettingPassword">
    <p>您注册的{{ this.registerName }}为<span>{{ this.registerAccount }}</span>，请设置登录密码</p>
    <PassWord
      class="password_info"
      :emailAddress= "emailAddress"
      :mobileNo= "mobileNo"
      :validateCode= "validateCode"
      :isEmailRegister = "isEmailRegister"
      :onNextHandle= "onRegisterHandle"
      :userAccount= "userAccount"
    ></PassWord>
  </div>
</template>
<script>
import md5 from 'md5'
import PassWord from '@/components/PassWord.vue'
import helper from '@/server/helper'
import { RouteModified } from '@/constants/routeModifiedByComponentCreated.es6'
export default {
  data () {
    return {
      registerName: '',
      registerAccount: ''
    }
  },
  components: {
    PassWord
  },
  props: [
    'emailAddress',
    'mobileNo',
    'validateCode',
    'isEmailRegister',
    'userAccount'
  ],
  mixins: [RouteModified],
  methods: {
    onRegisterHandle: function ($this) {
      if (
        $this.passwordData.validCode === 1 &&
        $this.password === $this.confirmPassword
      ) {
        let registData
        if ($this.isEmailRegister) {
          registData = {
            registType: '03',
            userPsw: md5($this.password).toUpperCase(),
            validateCode: $this.validateCode,
            emailAddress: $this.emailAddress
          }
        } else {
          registData = {
            registType: '02',
            userPsw: md5($this.password).toUpperCase(),
            validateCode: $this.validateCode,
            mobileNo: $this.mobileNo
          }
        }
        helper.userRegist(
          registData,
          success => {
            const oldUserId = success
            const ip = sessionStorage.getItem('UserIp')
            helper.afterRegisterSuccessHanlde({ oldUserId, ip }, userCode => {
              this.$emit('setText', [
                {
                  name: 'userAccount',
                  value: userCode
                }
              ])
              const router = JSON.parse(sessionStorage.getItem('RouterQuery'))
              this.$router.push({path: '/register/success', query: router})
            })
          },
          errorMsg => {
            console.log(errorMsg)
            $this.$set($this['confirmPasswordData'], 'validMessage', errorMsg)
            const router = JSON.parse(sessionStorage.getItem('RouterQuery'))
            setTimeout(() => {
              this.$router.push({path: '/register', query: router})
            }, 1000)
          }
        )
      } else {
        $this.confirmPasswordData.isRedBorder = true
        $this.confirmPasswordData.validCode = 0
        $this.confirmPasswordData.validMessage = '密码与第一次输入的不一致，请重新输入'
      }
    }
  },
  mounted () {
    if (this.mobileNo) {
      this.registerName = '手机号'
      this.registerAccount = helper.starReplaceMob(this.mobileNo)
    } else if (this.emailAddress) {
      this.registerName = '邮箱'
      this.registerAccount = helper.starReplaceMob(this.emailAddress)
    } else {}
  },
  beforeMount () {
    if (!this.validateCode) {
      const router = JSON.parse(sessionStorage.getItem('RouterQuery'))
      this.$router.push({path: '/register', query: router})
    }
  },
  beforeRouteEnter (to, from, next) {
    if (
      from.name === 'REGsuccess' &&
      to.name === 'REGpassword'
    ) {
      next(vm => {
        const router = JSON.parse(sessionStorage.getItem('RouterQuery'))
        vm.$router.push({path: '/register', query: router})
      })
    }
    next()
  }
}
</script>
<style lang="less" scoped>
.SettingPassword{
  p{
    font-size: 26px;
    margin-bottom: 40px;
    &>span{
      color: #009966
    }
  }
}
</style>
