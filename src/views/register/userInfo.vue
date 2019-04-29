<template>
  <div id="chooseTheWay">
    <ul class="register-methods">
      <li v-if="!isEmailRegister">
        <div class="form-item">
          <div :class="[ifError ? 'error' : '', 'form-phoneRegister']">
            <input
              id="telephone"
              type="text"
              name="telephone"
              :focus="true"
              :value="telephoneData.value"
              placeholder="请输入手机号"
              @input="onChangeText($event,'telephone')"
              @blur="onValidateText($event,'telephone')"
            >
          </div>
        </div>
        <div class="clearfix">
          <div class="form-item form_addon">
            <div :class="[ifErrorCap ? 'error' : '', 'form-captch']">
              <input
                id="telephone_captch"
                type="text"
                name="captch"
                :value="captchData.value"
                placeholder="请输入验证码"
                @input="onChangeText($event,'captch')"
                @blur="onValidateText($event,'captch')"
                @keyup="show($event)"
              >
            </div>
          </div>
          <div class="form-captch-button">
            <button
              type="button"
              key="phoneCountDown"
              @click = "onSendCAPTCH($event,'telephone')"
              :class="[sendPhoneCaptchStatus ? '': 'btn_warn','btn']"
              :disabled="sendPhoneCaptchStatus"
              >
                <span v-if="sendPhoneCaptchStatus">{{phoneContent}}</span>
                <span v-else>获取验证码</span>
              </button>
          </div>
        </div>
      </li>
      <li v-else>
        <div class="form-item">
          <div :class="[ifError ? 'error' : '', 'form-phoneRegister']">
            <input
              id="email"
              name="email"
              type="text"
              :value="emailData.value"
              placeholder="请输入邮箱"
              @input="onChangeText($event,'email')"
              @blur="onValidateText($event,'email')"
            >
          </div>
        </div>
        <div class="clearfix">
          <div class="form-item form_addon">
            <div :class="[ifErrorCap ? 'error' : '', 'form-captch']">
              <input
                id="email_captch"
                name="captch"
                type="text"
                :value="captchData.value"
                placeholder="请输入验证码"
                @input="onChangeText($event,'captch')"
                @blur="onValidateText($event,'captch')"
                @keyup="show($event)"
              >
            </div>
          </div>
          <div class="form-captch-button">
            <button  key="emailCountDown"
              @click = "onSendCAPTCH($event,'email')"
              :class="[sendEmailCaptchStatus ? '': 'btn_warn','btn']"
              :disabled="sendEmailCaptchStatus">
                <span v-if="sendEmailCaptchStatus">{{emailContent}}</span>
                <span v-else>获取验证码</span>
            </button>
          </div>
        </div>
      </li>
    </ul>
    <div class="showMsg">
      <div v-if="emailData.hasValidated && emailData.validCode !== 1" class="form_validation">
        <p :class="'state_' + emailData.validCode"><span class="error"></span><i  v-html="emailData.validMessage">{{emailData.validMessage}}</i></p>
      </div>
      <div v-if="captchData && captchData.validCode !== 1 && tip" class="form_validation">
        <p :class="'state_' + captchData.validCode"><span class="error"></span>{{captchData.validMessage}}</p>
      </div>
      <!-- <div v-if="captchData.validCode === 1 && sendEmailCaptchStatus" class="form_validation">
        <p :class="'state_' + captchData.validCode"><span class="ok"></span>{{captchData.validMessage}}</p>
      </div> -->
      <div v-if="telephoneData.hasValidated && telephoneData.validCode !== 1" class="form_validation">
        <p :class="'state_' + telephoneData.validCode"><span class="error"></span><i  v-html="telephoneData.validMessage">{{telephoneData.validMessage}}</i></p>
      </div>
      <!-- <div v-if="captchData.validCode === 1 && sendPhoneCaptchStatus" class="form_validation">
        <p :class="'state_' + captchData.validCode"><span class="ok"></span>{{captchData.validMessage}}</p>
      </div> -->
    </div>
    <Agree v-on:confirmService="listenIfOk"></Agree>
    <SliderBox v-on:slideBox="listenToSlideBox" :slideFalse="captchData.validSlide"></SliderBox>
    <p class="choose-method"><span  @click="onChangeMode">切换为{{ this.goPhoneSignUpName }}注册</span></p>
    <span :class="[isAllReady ? '' : noAllReady, nextStep]" @click="onNextStepHandle">下一步</span>
    <div class="modal" v-if="modal">
      <div>
          <p><b>尊敬的用户您好：</b></p>
          <p>{{userAccount.type}}（{{userAccount.account}}）已绑定用户名为：{{userAccount.userCode}}的账号。</p>
          <p>如果该账号为您本人使用请<span @click="onLoginHandle">立即登录</span>；
          如果账号不是您本人使用请使用<span @click="onChangeMode($event, userAccount.type ==='邮箱'? '手机号':'邮箱')">{{userAccount.type ==="邮箱"? "手机号":"邮箱"}}注册</span>或使用其它<span @click="onChangeMode($event, userAccount.type)">{{userAccount.type}}注册</span>。</p>
      </div>
    </div>
    <Prompt :ifShow="showPrompt" v-on:promptHidden="notShow"></Prompt>
    <div class="shareBg" v-if="ShareModal">
      <div class="share">
        <div class="pactText">
          <i class="close" @click="close">×</i>
          <h4>《中国人寿用户信息共享告知》</h4>
          <p>本人同意提供给中国人寿的信息，及本人享受中国人寿服务产生的信息（包括在本平台购买中国人寿产品而产生的信息），可用于中国人寿及其直接或间接控股的公司及因服务必要而委托的第三方为本人提供服务及推荐产品，法律禁止的除外，直到本人以书面方式撤销为止。中国人寿其委托的第三方对上述信息负有保密义务。本条款自本协议签署时生效，具有独立法律效力，不受合同成立与否及效力状态变化的影响。</p>
        </div>
        <Button type="primary" :loading="loading" @click="onApproveShareServiceHandle()" class="btn agree">
            <span v-if="!loading">同意共享协议并登录</span>
            <span v-else>登录</span>
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
import Agree from '@/components/Agree.vue'
import SliderBox from '@/components/SliderBox.vue'
import Prompt from '@/components/Prompt.vue'
import validityUtils from '../../server/validate'
import Cookie from '@/server/cookie'
import Config, { AccountType } from '../../constants/config.es6'
import TimeUtils from '../../server/timeUtils'
import helper from '../../server/helper'
// import { RouteModified } from '../../constants/routeModifiedByComponentCreated.es6'
const { CAPTCHCOUNTDOWN } = Config

export default {
  name: 'userInfo',
  data () {
    return {
      method: '邮箱',
      isLogining: false,
      captchData: {
        value: '',
        validCode: 0,
        validMessage: '',
        validSlide: false
      },
      telephoneData: {
        value: '',
        hasValidated: false,
        validCode: 0,
        validMessage: ''
      },
      emailData: {
        value: '',
        validCode: 0,
        hasValidated: false,
        validMessage: ''
      },
      sendMobileNoCaptchStatus: false,
      sendPhoneCaptchStatus: false,
      sendEmailCaptchStatus: false,
      phoneCountDown: CAPTCHCOUNTDOWN,
      emailCountDown: CAPTCHCOUNTDOWN,
      phoneContent: '获取验证码',
      emailContent: '获取验证码',
      canClickPhone: true,
      nextStep: 'nextStep',
      noAllReady: 'bgGrey',
      ToSlideBox: false,
      confirmService: false,
      nextCanClick: false,
      captchStatusTimer: null,
      userAccount: {},
      modal: false,
      tip: false,
      ifErrorCap: false,
      ifError: false,
      showPrompt: false,
      ShareModal: false,
      loading: false,
      goPhoneSignUpName: '邮箱'
    }
  },
  computed: {
    isAllReady () {
      if (this.isEmailRegister) {
        if (
          this.captchData.value &&
          this.sendEmailCaptchStatus &&
          this.emailData.validCode &&
          this.ToSlideBox &&
          this.nextCanClick && this.confirmService
        ) {
          return true
        } else {
          return false
        }
      } else {
        if (
          this.sendPhoneCaptchStatus &&
          this.captchData.value &&
          this.telephoneData.validCode &&
          this.ToSlideBox &&
          this.nextCanClick && this.confirmService
        ) {
          return true
        } else {
          return false
        }
      }
    }
  },
  inject: ['reload'],
  components: {
    SliderBox,
    Agree,
    Prompt
  },
  props: [
    'currentSort',
    'emailAddress',
    'mobileNo',
    'isRegister',
    'validateCode',
    'isEmailRegister'
  ],
  methods: {
    notShow (value) {
      this.showPrompt = value
    },
    listenIfOk (value) {
      this.confirmService = value
    },
    listenToSlideBox (value) {
      this.ToSlideBox = value
      this.captchData.validSlide = value
    },
    show () {
      this.ifErrorCap = false
      this.tip = false
    },
    chooseMethod () {
      this.isEmailRegister = !this.isEmailRegister
      if (this.isEmailRegister) {
        this.method = '邮箱'
      } else {
        this.method = '手机'
      }
    },
    onChangeText: function (event, name) {
      let { currentTarget: { value } } = event
      value = value.trim()
      this.$set(this[name + 'Data'], 'value', value)
      if (name !== 'captch') {
        this.$set(this[name + 'Data'], 'hasValidated', false)
        this.ifError = false
      }
    },
    onValidateText: function (event, name) {
      let { currentTarget: { value } } = event
      value = value.trim()
      if (name !== 'captch') {
        const validResult = validityUtils.validateValue(name, value)
        this.$set(this[name + 'Data'], 'validCode', validResult.code)
        this.$set(this[name + 'Data'], 'hasValidated', true)
        this.$set(this[name + 'Data'], 'validMessage', validResult.message)
        this.captchData.validSlide = false
        if (validResult.code !== 1) {
          this.ifError = true
        }
      }
    },
    phoneCountDownTimer () {
      if (!this.canClickPhone) return // 改动的是这两行代码
      this.canClickPhone = false
      this.phoneContent = this.emailCountDown + 's后重新发送'
      var clock = window.setInterval(() => {
        this.phoneCountDown--
        this.phoneContent = this.phoneCountDown + 's后重新发送'
        this.isLogining = true
        if (this.phoneCountDown < 0) {
          window.clearInterval(clock)
          this.phoneContent = '重新发送验证码'
          this.phoneCountDown = 120
          this.sendPhoneCaptchStatus = false
          this.canClickPhone = true // 这里重新开启
          this.captchData.validSlide = false
          this.tip = false
          this.captchData.value = ''
          this.isLogining = false
          this.ifErrorCap = false
        }
        if (this.sendPhoneCaptchStatus === false) {
          window.clearInterval(clock)
        }
      }, 1000)
    },
    emailCountDownTimer () {
      if (!this.canClick) return // 改动的是这两行代码
      this.canClick = false
      this.emailContent = this.emailCountDown + 's后重新发送'
      var clock = window.setInterval(() => {
        this.emailCountDown--
        this.emailContent = this.emailCountDown + 's后重新发送'
        this.isLogining = true
        if (this.emailCountDown < 0) {
          window.clearInterval(clock)
          this.emailContent = '重新发送验证码'
          this.emailCountDown = 120
          this.sendEmailCaptchStatus = false
          this.canClick = true // 这里重新开启
          this.captchData.validSlide = false
          this.tip = false
          this.captchData.value = ''
          this.isLogining = false
          this.ifErrorCap = false
        }
        if (this.sendEmailCaptchStatus === false) {
          window.clearInterval(clock)
        }
      }, 1000)
    },
    onSendCAPTCH: function (event, type) {
      let captchRegisterData = null
      let captchLoginData = null
      if (!this.isEmailRegister && this.telephoneData.validCode === 0) {
        return
      }
      if (this.isEmailRegister && this.emailData.validCode === 0) {
        return
      }
      if (this.isEmailRegister) {
        if (this.emailData.validCode) {
          const email = this.emailData.value
          captchRegisterData = {
            validateCodeType: '03',
            emailAddress: email
          }
          captchLoginData = {
            validateCodeType: '04',
            emailAddress: email
          }
        } else {
          // console.log('Email不符合规则')
          return
        }
      } else if (this.telephoneData.validCode) {
        const mobileNo = this.telephoneData.value
        captchRegisterData = {
          validateCodeType: '01',
          mobileNo
        }
        captchLoginData = {
          validateCodeType: '02',
          mobileNo
        }
      } else {
        // console.log('手机号码不符合校验规则')
        return
      }
      console.log(captchRegisterData)
      helper.getValidateCode(
        captchRegisterData,
        () => {
          if (type === 'email') {
            this.sendEmailCaptchStatus = true
            this.emailCountDownTimer()
          } else {
            this.sendPhoneCaptchStatus = true
            this.phoneCountDownTimer()
          }
          this.$emit('onChangeRegisterMode', {
            isRegister: true
          })
          this.nextCanClick = true
          this.showPrompt = true
        },
        msg => {
          console.log(msg)
          this.$set(this[type + 'Data'], 'validCode', 0)
          this.$set(this[type + 'Data'], 'validMessage', msg)
          this.ifError = true
        },
        () => {
          // 登录
          console.log('sssss')
          this.$emit('onIsRegister', {
            isRegister: false
          })
          this.$set(this[type + 'Data'], 'validCode', 1)
          helper.getValidateCode(
            captchLoginData,
            () => {
              console.log('kkk')
              if (type === 'email') {
                this.sendEmailCaptchStatus = true
                this.emailCountDownTimer()
              } else {
                this.sendPhoneCaptchStatus = true
                this.phoneCountDownTimer()
              }
              this.nextCanClick = true
              this.showPrompt = true
            },
            () => {
              console.log('aaaaa')
              let url = "try{if(typeof globalVar !='undefined'){ globalVisitor.closeMini();}else{parent.closeMini();}}catch(e){}this.newWindow=window.open('http://www.chinalife.com.cn/chat/chatClient/chatbox.jsp?companyID=8929&configID=56&skillId=52', 'chatbox8929', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=800,height=540');this.newWindow.focus();this.newWindow.opener=window;void(0);try{if(LIM&&LIM.visitor){LIM.visitor.closeMini();}else{parent.closeMini();}}catch(e){}"
              let stringDemo = "<a style='color: #4239bf;font-size:12px' ' + ' class='blue' ' + ' onClick=\"" + url + "\")'>联系客服人员</a>"
              if (type === 'email') {
                this.demo = '邮箱'
              } else {
                this.demo = '手机号'
              }
              this.$set(this[type + 'Data'], 'validCode', 0)
              this.$set(this[type + 'Data'], 'validMessage', `${this.demo}异常，请更换账号注册或者${stringDemo}`)
              this.captchData.validSlide = false
              this.ifError = true
            },
            () => {
            }
          )
        }
      )
    },
    onNextStepHandle () {
      // this.isLogining = true
      if (!this.isAllReady) {
        console.log('无效点击')
      } else {
        let captchData, name, value, userData
        console.log(this.isRegister)
        if (this.isRegister) {
          if (this.isEmailRegister) {
            captchData = {
              emailAddress: this.emailData.value,
              validateCodeType: '03',
              validateCode: this.captchData.value
            }
            name = AccountType.emailAddress
            value = this.emailData.value
          } else {
            captchData = {
              mobileNo: this.telephoneData.value,
              validateCodeType: '01',
              validateCode: this.captchData.value
            }
            name = AccountType.mobileNo
            value = this.telephoneData.value
          }
        } else {
          if (this.isEmailRegister) {
            if (this.emailData.validCode) {
              const email = this.emailData.value
              userData = {
                queryType: '6',
                resultFlag: '2',
                emailAddress: email
              }
            } else {
              // console.log('Email不符合规则')
              return
            }
          } else if (this.telephoneData.validCode) {
            const mobileNo = this.telephoneData.value
            userData = {
              queryType: '5',
              resultFlag: '2',
              mobileNo
            }
          } else {
            // console.log('手机号码不符合校验规则')
            return
          }
          console.log(userData)
          helper.getUserInfo(
            userData,
            userInfo => {
              if (
                (userInfo.checkStatus === '2' && this.telephoneData.validCode) ||
                (userInfo.checkStatus === '1' && this.emailData.validCode) ||
                userInfo.checkStatus === '3'
              ) {
                this.$set(this.userAccount, 'userId', userInfo.userId)
                this.$set(this.userAccount, 'userCode', userInfo.userCode)
              }
            },
            msg => {
              let url = "try{if(typeof globalVar !='undefined'){ globalVisitor.closeMini();}else{parent.closeMini();}}catch(e){}this.newWindow=window.open('http://www.chinalife.com.cn/chat/chatClient/chatbox.jsp?companyID=8929&configID=56&skillId=52', 'chatbox8929', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=800,height=540');this.newWindow.focus();this.newWindow.opener=window;void(0);try{if(LIM&&LIM.visitor){LIM.visitor.closeMini();}else{parent.closeMini();}}catch(e){}"
              let stringDemo = "<a class='blue' ' + ' onClick=\"" + url + "\")'>联系客服人员</a>"
              this.$set(this.telephoneData, 'validCode', 0)
              this.$set(this.telephoneData, 'validMessage', `手机号异常，请更换号码注册或者${stringDemo}`)
            }
          )
          if (this.isEmailRegister) {
            captchData = {
              emailAddress: this.emailData.value,
              validateCodeType: '04',
              validateCode: this.captchData.value
            }
            name = AccountType.emailAddress
            value = this.emailData.value
          } else {
            captchData = {
              mobileNo: this.telephoneData.value,
              validateCodeType: '02',
              validateCode: this.captchData.value
            }
            name = AccountType.mobileNo
            value = this.telephoneData.value
          }
        }
        console.log(captchData)
        helper.checkValidateCode(
          captchData,
          () => {
            console.log('mmmmm')
            this.captchData.validCode = 1
            if (this.isRegister) {
              this.captchStatusTimer = null
              this.$emit('setText', [
                {
                  name,
                  value
                },
                {
                  name: 'captch',
                  value: this.captchData.value
                },
                {
                  name: 'userAccount',
                  value: this.userAccount
                }
              ])
              const router = JSON.parse(sessionStorage.getItem('RouterQuery'))
              this.$router.push({path: '/register/password', query: router})
            } else {
              this.$set(
                this.userAccount,
                'type',
                this.isEmailRegister ? '邮箱' : '手机号'
              )
              this.$set(
                this.userAccount,
                'userCode',
                helper.starReplaceStr(
                  this.userAccount.userCode
                )
              )
              this.$set(
                this.userAccount,
                'account',
                this.isEmailRegister
                  ? this.emailData.value
                  : this.telephoneData.value
              )
              this.modal = true
            }
          },
          msg => {
            console.log(msg)
            this.tip = true
            this.captchData.validCode = 0
            if (msg.respCode === '31') {
              this.captchData.validMessage = '验证码错误，请重新输入'
            } else {
              this.captchData.validMessage = msg.errorMsg
            }
            this.ToSlideBox = false
            this.isLogining = false
            this.captchData.validSlide = false
            this.ifErrorCap = true
            // this.sendPhoneCaptchStatus = false
            // this.$emit('clearForm')
            // this.reset()
          }
        )
      }
    },
    onLoginHandle () {
      const type =
          this.userAccount.type === '邮箱'
            ? AccountType.emailAddress
            : AccountType.mobileNo
      const accountValue =
          this.userAccount.type === '邮箱'
            ? this.emailData.value
            : this.telephoneData.value
      const loginMethod = 1
      const userRequestInfo = helper.getUserRequestData(
        type,
        accountValue
      )
      helper.getUserInfo(
        userRequestInfo,
        userInfo => {
          const loginData = helper.getLoginRequestData(
            type,
            accountValue,
            this.captchData.value,
            loginMethod
          )
          helper.userLogin(
            loginData,
            userInfo => {
              const { userCode, oldUserId } = userInfo
              helper.getShareState(
                {
                  oldUserId: oldUserId
                },
                status => {
                  if (status === '31') {
                    this.modal = false
                    this.ShareModal = true
                    const shareData = {
                      oldUserId,
                      optype: '0',
                      section: '0',
                      status: '1',
                      opdate: TimeUtils.getFormatTime(Date.parse(new Date()))
                    }
                    this.shareDataReal = shareData
                    this.userInfoReal = userInfo
                  } else {
                    const userip = sessionStorage.getItem('UserIp')
                    helper.afterLoginSuccessHanlde({
                      userCode,
                      oldUserId,
                      userip
                    },
                    () => {},
                    () => {
                      window.location.href = `${this.goUrl()}accessToken=${Cookie.getCookie('accessToken')}`
                    })
                  }
                }
              )
            }
          )
        }
      )
      this.mode = false
    },
    onChangeMode (event, mode) {
      if (arguments.length < 2) {
        this.reset()
        this.sendPhoneCaptchStatus = false
        this.confirmService = false
        this.$emit('clearForm')
        this.$emit('onEmailRegister', {
          bool: !this.isEmailRegister
        })
        if (!this.isEmailRegister) {
          this.goPhoneSignUpName = '手机'
        } else {
          this.goPhoneSignUpName = '邮箱'
        }
      } else {
        if (mode === '邮箱') {
          this.reset()
          this.sendPhoneCaptchStatus = false
          this.confirmService = false
          this.$emit('clearForm')
          this.modal = false
          this.emailContent = '重新发送验证码'
          this.emailCountDown = 120
          this.sendEmailCaptchStatus = false
          this.canClick = true // 这里重新开启
          this.$emit('onEmailRegister', {
            bool: mode
          })
        } else {
          this.reload()
        }
      }
    },
    goUrl () {
      const RouterQuery = JSON.parse(sessionStorage.getItem('RouterQuery')) ? JSON.parse(sessionStorage.getItem('RouterQuery')) : ''
      const url = RouterQuery.redirectUrl ? decodeURIComponent(RouterQuery.redirectUrl) : ''
      const flag = RouterQuery.flag
      this.urlState = RouterQuery.state
      if (flag === '1') {
        return url + `&state=${this.urlState}&`
      } else {
        return url + `?state=${this.urlState}&`
      }
    },
    reset () {
      this.isLogining = false
      this.userAccount = {}
      this.captchData.value = ''
      this.telephoneData.value = ''
      this.emailData.value = ''
      this.ToSlideBox = false
      this.captchData.validSlide = false
      this.telephoneData.validCode = 0
      this.emailData.validCode = 0
      this.telephoneData.hasValidated = false
      this.emailData.hasValidated = false
      this.emailContent = '重新发送验证码'
      this.emailCountDown = 120
      this.sendEmailCaptchStatus = false
      this.canClick = true // 这里重新开启
      this.phoneCountDown = 120
      this.sendPhoneCaptchStatus = false
      this.canClickPhone = true // 这里重新开启
      this.confirmService = false
      this.ifError = false
      this.ifErrorCap = false
      if (document.getElementById('service_proto').checked) {
        document.getElementById('service_proto').checked = !document.getElementById('service_proto').checked
      }
    },
    onApproveShareServiceHandle () {
      this.loading = true
      setTimeout(() => {
        // console.log(this.shareDataReal)
        helper.shareState(this.shareDataReal)
        const { userCode, oldUserId } = this.userInfoReal
        const userip = sessionStorage.getItem('UserIp')
        helper.afterLoginSuccessHanlde({
          userCode,
          oldUserId,
          userip
        },
        () => {},
        () => {
          window.location.href = `${this.goUrl()}accessToken=${Cookie.getCookie('accessToken')}`
          window.event.returnValue = false
        })
      }, 2000)
    },
    close () {
      this.ShareModal = false
    }
  },
  beforeRouteEnter (to, from, next) {
    if (
      from.name === 'REGpassword' &&
      to.name === 'register'
    ) {
      next(vm => {
        vm.$set(vm.telephoneData, 'validCode', 1)
        vm.$set(vm.telephoneData, 'value', vm.mobileNo)
      })
    } else {
      next()
    }
  }
}
</script>
<style lang="less" scoped>
#chooseTheWay{
  padding-bottom: 50px;
  .register-methods{
    li{
      .form-item{
        height: 78px;
        margin-bottom: 30px;
        .form-phoneRegister,.form-captch {
          border: 1px solid #ddd;
          border-radius: 4px;
          padding-left: 68px;
          position: relative;
          height: 76px;
          &::before {
            content: "";
            display: block;
            position: absolute;
            top: 5px;
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
        .form-phoneRegister {
          &::before {
            background: url("../../assets/images/mobile_no.png");
            background-repeat: no-repeat;
            background-size:100% 100%
          }
          &:hover {
            border: 1px solid #009966;
            &::before {
              background: url("../../assets/images/mobile_hover.png");
              background-repeat: no-repeat;
              background-size:100% 100%
            }
          }
          &.error{
            border: 1px solid #cc0000;
            &::before {
              background: url("../../assets/images/mobile_error.png");
              background-repeat: no-repeat;
              background-size:100% 100%
            }
          }
        }
        .form-captch {
          &::before {
            background: url("../../assets/images/login_code.png");
            background-repeat: no-repeat;
            background-size:100% 100%
          }

          &:hover {
            border: 1px solid #009966;
            &::before {
              background: url("../../assets/images/login_code_hover.png");
              background-repeat: no-repeat;
              background-size:100% 100%
            }
          }
          &.error{
            border: 1px solid #cc0000;
            &::before {
              background: url("../../assets/images/login_code_error.png");
              background-repeat: no-repeat;
              background-size:100% 100%
            }
          }
        }
      }
      .form_addon {
        width: 64% !important;
        float: left;
      }
      .form-captch-button{
        width: 33%;
        margin-left: 2%;
        float: left;
        button{
          width: 100%;
          height: 78px;
          span{
            font-size: 24px;
            color: #fff
          }
        }
        .btn_warn{
          background: #ff9900;
        }
      }
    }
  }
  .choose-method{
    width: 100%;
    text-align: center;
    font-size: 26px;
    color: #009966;
    margin-top: 50px;
  }
  .bgGrey{
    background: #b5b5b5 !important
  }
  .modal{
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    div{
      padding: 20px;
      width: 80%;
      background: #fff;
      border-radius: 5px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      p{
        font-size: 30px;
        color: #333;
        line-height: 60px;
        span{
          color: #009966;
          padding: 0;
          font-size: 30px;
        }
      }
    }
  }
  .showMsg{
    p{
      font-size: 26px;
      color: #cc0000;
      padding-bottom: 40px;
      line-height: 40px;
      span{
        color: #ff9900;
        font-size: 26px;
      }
      a{
        color: #0033cc;
        font-size: 26px;
      }
    }
  }
  .shareBg{
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    z-index: 9;
    top: 0;
    left: 0;
    .share{
      background: #fff;
      width: 90%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      padding: 20px;
      border-radius: 10px;
      .pactText{
        position: relative;
        .close{
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.5);
          display: block;
          position: absolute;
          right: -10px;
          top: -60px;
          color: #fff;
          text-align: center;
          line-height: 42px;
        }
        h4{
          font-size: 34px;
          text-align: center;
          margin: 45px 0;
        }
        p{
          font-size: 26px;
          line-height: 46px;
          color: #333;
          text-align: justify;
          margin-bottom: 20px;
        }
      }
      button{
        width: 300px;
        height: 80px;
        margin: auto;
        display: block;
        background: #009966;
        color: #fff;
        font-size: 30px;
      }
    }
  }
}
</style>
