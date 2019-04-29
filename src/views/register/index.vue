<template>
  <div>
    <!-- 注册 start -->
    <div id="userRegister" class="bodyWidth">
      <p class="register-title">用户注册</p>
      <router-view
        class="scroll_content"
        @onEmailRegister="setRegisterMode"
        @routeSwitcher="setCurrentPace"
        @onIsRegister="setIsRegister"
        @setText="setText"
        @clearForm="onClearForm"
        :currentSort="currentSort"
        :emailAddress="emailAddress"
        :mobileNo="mobileNo"
        :isRegister="isRegister"
        :validateCode="validateCode"
        :isEmailRegister="isEmailRegister"
        :userAccount="userAccount"
        :UserIp = "UserIp"
      ></router-view>
    </div>
    <!-- 注册 end -->
  </div>
</template>
<script>
import { AccountType } from '../../constants/config.es6'
import { ModuleModified } from '../../constants/routeModifiedByComponentCreated.es6'

function setProperty (obj, key, value) {
  switch (key) {
    case AccountType.mobileNo:
      obj.mobileNo = value
      break
    case AccountType.emailAddress:
      obj.emailAddress = value
      break
    case 'captch':
      obj.validateCode = value
      break
    case 'userAccount':
      console.log(value)
      obj.userAccount = value
      break
    default:
      // console.log(key, '设置表单的值')
  }
}

export default {
  name: 'register',
  data () {
    return {
      currentSort: '',
      customerClass: 'customer_item',
      currentStep: 1,
      emailAddress: '',
      mobileNo: '',
      isRegister: true,
      validateCode: null,
      isEmailRegister: false,
      userAccount: null,
      isPersonnel: false,
      UserIp: ''
    }
  },
  mixins: [ModuleModified],
  props: ['customerSort'],
  methods: {
    go (path) {
      const Query = JSON.parse(sessionStorage.getItem('RouterQuery'))
      this.$router.push({ path: path, query: Query })
    },
    modifyCustomerSort: function (sort) {
      if (sort === 'personnel') {
        this.isPersonnel = true
        this.$emit('routeName', sort)
        this.currentSort = sort
      } else {
        window.location.href = 'https://www.chinalife.com.cn/online/web/user/register/register2.jsp'
      }
    },
    setCurrentPace () {
      const name = this.$route.name
      switch (name) {
        case 'REGpassword':
          this.currentStep = 2
          break
        case 'REGsuccess':
          this.currentStep = 3
          break
        default:
          this.currentStep = 1
      }
    },
    setRegisterMode: function ({ bool }) {
      this.isEmailRegister = bool
      this.emailAddress = ''
      this.mobileNo = ''
      this.isRegister = true
      this.validateCode = null
      this.userAccount = null
    },
    setIsRegister: function ({ isRegister }) {
      this.isRegister = isRegister
    },
    setText: function (data) {
      if (Object.prototype.toString.call(data) === '[object Array]') {
        for (let i = 0; i < data.length; i++) {
          const { name, value } = data[i]
          setProperty(this, name, value)
        }
      } else {
        const { name, value } = data
        setProperty(this, name, value)
      }
    },
    onClearForm: function () {
      this.emailAddress = ''
      this.mobileNo = ''
      this.isRegister = true
      this.validateCode = null
      // this.validateCode = ''
      this.isEmailRegister = false
      this.userAccount = null
    }
  },
  created () {
    this.currentSort1 = this.$route.name
    this.currentSort = 'personnel'
    this.isPersonnel = !this.isPersonnel
    this.$emit('routeName', this.currentSort1)
  }
}
</script>
<style lang="less" scoped>
#userRegister{
  padding-bottom: 40px;
  .register-title{
    width: 100%;
    text-align: center;
    padding: 40px 0 50px;
    font-size: 32px;
    color: #333;
  }
}
</style>
