<template>
  <div>
    <div id="PassWord">
      <div class="form-item">
        <div :class="[ifErrorPs1 ? 'error' : '', 'form-captch']">
          <input
            id="password"
            name="password"
            type="password"
            :value="password"
            placeholder="请输入密码"
            @blur.prevent="blurFn1($event,'password')"
          >
        </div>
      </div>
      <div v-if="password && passwordData.validCode !== 1" class="showMsg">
        <p :class="'state_' + passwordData.validCode" style="text-align: left;"><span class="notsame"></span>{{passwordData.validMessage}}</p>
      </div>
      <div class="form-item">
        <div :class="[ifErrorPs2 ? 'error' : '', 'form-captch']">
          <input
            id="confirm_password"
            name="confirmPassword"
            type="password"
            :disabled="isDisabled"
            :value="confirmPassword"
            placeholder="请再次输入密码"
            @blur.prevent="blurFn($event,'confirmPassword')"
          >
        </div>
      </div>
      <div v-if="confirmPassword && confirmPasswordData.validCode !== 1 && confirmPasswordData.isRedBorder" class="showMsg">
        <p :class="'state_' + confirmPasswordData.validCode" style="text-align: left;"><span class="notsame"></span>{{confirmPasswordData.validMessage}}</p>
      </div>
      <p>密码规则，由6-16位数字、字母、‘-’或‘_’组成</p>
    </div>
    <span :class="[isAllReady ? '' : noAllReady, 'nextStep']" @click="onClickNextHandle">下一步</span>
  </div>
</template>
<script>
import validityUtils from '../server/validate'

export default {
  data () {
    return {
      password: '',
      confirmPassword: '',
      confirmService: false,
      passwordData: {
        validCode: 0,
        validMessage: ''
      },
      confirmPasswordData: {
        validCode: 0,
        validMessage: '',
        isRedBorder: false
      },
      isPass: 'isPass',
      serviceModal: false,
      shareModal: false,
      ifFirst: true,
      ifErrorPs2: false,
      ifErrorPs1: false,
      noAllReady: 'bgGrey'
    }
  },
  computed: {
    isDisabled: function () {
      return this.passwordData.validCode !== 1
    },
    isAllReady () {
      if (this.password && this.confirmPassword && this.confirmPasswordData.validCode) {
        return true
      } else {
        return false
      }
    }
  },
  props: [
    'emailAddress',
    'mobileNo',
    'validateCode',
    'isEmailRegister',
    'resetMeasure',
    'onNextHandle'
  ],
  methods: {
    blurFn1 (event, name) {
      let { currentTarget: { value } } = event
      value = value.trim()
      if (name === 'password') {
        const validResult = validityUtils.validateValue(name, value)
        this.$set(this[name + 'Data'], 'validCode', validResult.code)
        this.$set(this[name + 'Data'], 'validMessage', validResult.message)
        if (validResult.code !== 1) {
          this.ifErrorPs1 = true
        } else {
          this.ifErrorPs1 = false
        }
      }
      this[name] = value
    },
    blurFn (event, name) {
      let { currentTarget: { value } } = event
      value = value.trim()
      if (name === 'confirmPassword') {
        if (this.password === value) {
          this.confirmPasswordData.validCode = 1
          this.ifErrorPs2 = false
        } else {
          this.confirmPasswordData.validCode = 0
          this.confirmPasswordData.isRedBorder = true
          this.confirmPasswordData.validMessage = '密码与第一次输入的不一致，请重新输入'
          this.ifErrorPs2 = true
        }
      }
      this[name] = value
      this.ifFirst = true
    },
    onClickNextHandle: function () {
      if (!this.isAllReady) {
        console.log('ss')
      } else {
        this.onNextHandle(this)
        this.ifFirst = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
#PassWord{
  .form-item{
    height: 78px;
    margin-bottom: 30px;
    .form-captch {
      border: 1px solid #ddd;
      border-radius: 4px;
      padding-left: 68px;
      position: relative;
      height: 76px;
      &::before {
        content: "";
        display: block;
        position: absolute;
        top: 4px;
        left: 0px;
        width: 68px;
        height: 68px;
        background-repeat: no-repeat;
      }
      input{
        width: 80%;
        height: 60px;
        position: absolute;
        &:focus{outline:none;};
        font-size: 26px;
        top: 50%;
        left: 68px;
        transform: translateY(-50%);
        background: transparent;
        border: none;
      }
    }
    .form-captch {
      &::before {
        background: url("../assets/images/login_code.png");
        background-repeat: no-repeat;
        background-size:100% 100%
      }

      &:hover {
        border: 1px solid #009966;
        &::before {
          background: url("../assets/images/login_code_hover.png");
          background-repeat: no-repeat;
          background-size:100% 100%
        }
      }
      &.error {
        border: 1px solid #cc0000;
        &::before {
          background: url("../assets/images/login_code_error.png");
          background-repeat: no-repeat;
          background-size:100% 100%
        }
      }
    }
  }
  p{
    font-size:26px ;
    color: #009966;
  }
  .showMsg{
    p{
      font-size: 26px;
      color: #cc0000;
      padding-bottom: 40px;
      line-height: 40px;
      span{
        color: #ff9900;
      }
      a{
        color: #0033cc
      }
    }
  }
}
.bgGrey{
  background: #b5b5b5 !important
}
</style>
