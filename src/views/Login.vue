<template>
  <div>
    <!-- 用户登录 start -->
    <div id="userLogin" class="bodyWidth">
      <p class="login-title">用户登录</p>
      <ul class="login-methods-choose clearfix">
        <li v-for="method in methods" :key="method.index" @click="chooseWhitch(method.ENname)" :class="chooseOne === method.ENname ? bgBlue : bgWhite">{{ method.name }}</li>
      </ul>
      <ul class="login-methods">
        <li v-if="chooseOne === 'account'">
          <div class="form-item">
            <div :class="[ifError ? 'error': '', 'form-account']">
              <input
                id="account"
                name="account"
                type="text"
                :value="accountData.value"
                :readonly = "isLogining"
                placeholder="用户名/身份证/手机号/邮箱"
                @input="onChangeText($event,'account')"
                @blur="onCheckAccountType($event)"
                @keyup="show($event)"
              >
            </div>
          </div>
          <div class="form-item">
            <div :class="[ifError ? 'error': '', 'form-password']">
              <input type='password' style='display:none'>
              <input
                id="password"
                name="password"
                type="password"
                :value="passwordData.value"
                :readonly = "isLogining"
                placeholder="密码"
                @input="onChangeText($event,'password')"
                @keyup="show($event)"
              >
            </div>
          </div>
        </li>
        <li v-else>
          <div class="form-item">
            <div :class="[ifErrorMob ? 'error' : '', 'form-mobileNo']">
              <input
                id="mobileNo"
                name="mobileNo"
                type="text"
                :value="accountData.value"
                :readonly = "isLogining"
                placeholder="手机号"
                @input="onChangeText($event,'mobileNo')"
                @keyup="show($event)"
              >
            </div>
          </div>
          <div class="clearfix">
            <div class="form-item form_addon">
              <div :class="[ifErrorCap ? 'error' : '', 'form-captch']">
                <input
                id="mobileNo_captch"
                name="captch"
                type="text"
                :value="captchData.value"
                :readonly = "isLogining"
                placeholder="请输入验证码"
                @input="onChangeText($event,'captch')"
                @keyup="show($event)"
                >
              </div>
            </div>
            <div class="form-captch-button">
              <button for="mobileNo_captch"  key="mobileNoCountDown"
              @click = "onSendCAPTCH($event,'telephone')"
              :class="[sendMobileNoCaptchStatus ? '' : 'btn_warn','btn']"
              :disabled="sendMobileNoCaptchStatus">
                <span v-if="sendMobileNoCaptchStatus">{{`${mobileNoCountDown}s`}}后重新发送</span>
                <span v-else>获取验证码</span>
              </button>
            </div>
          </div>
        </li>
      </ul>
      <Prompt :ifShow="showPrompt" v-on:promptHidden="notShow" transiton="fade"></Prompt>
      <div class="showMsg">
        <div v-if="accountData.value && tip" class="topTip">
          <p v-if="accountDataBack.validCode === '1002' || accountDataBack.validCode === '21'"><em></em>您输入的<i v-if="mobileNoName">手机号</i><i v-if="emailAddressName">邮箱</i><i v-if="userCodeName">用户名</i><i v-if="certiNoName">身份证</i>和密码不匹配，是否忘记密码，请重新输入或<span @click="onShiftRouteHandle('/reset')">找回密码</span></p>
          <p v-if="accountDataBack.validCode === '05' || accountDataBack.validCode=== '34'"><em></em>登录错误次数超限，请5分钟后再试，或者<a onclick="try{if(typeof globalVar !='undefined'){ globalVisitor.closeMini();}else{parent.closeMini();}}catch(e){}this.newWindow=window.open('http://www.chinalife.com.cn/chat/chatClient/chatbox.jsp?companyID=8929&configID=56&skillId=52', 'chatbox8929', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=800,height=540');this.newWindow.focus();this.newWindow.opener=window;void(0);try{if(LIM&&LIM.visitor){LIM.visitor.closeMini();}else{parent.closeMini();}}catch(e){}">联系客服人员</a></p>
          <p v-if="accountDataBack.validCode === '08'">
          <i v-if="loginMethod !== 1"><em></em>您输入的<i v-if="mobileNoName">手机号</i><i v-if="emailAddressName">邮箱</i><i v-if="userCodeName">用户名</i><i v-if="certiNoName">身份证</i>和密码不匹配，是否忘记密码，请重新输入或<span @click="onShiftRouteHandle('/reset')">找回密码</span></i>
          <i style="display:block;" v-if="loginMethod !== 0"><em></em>手机号错误，请重新输入</i></p>

          <p v-if="accountDataBack.validCode === '49'"><em></em>该<i v-if="mobileNoName">手机号</i><i v-if="emailAddressName">邮箱</i><i v-if="userCodeName">用户名</i><i v-if="certiNoName">身份证</i>存在异常，请通过其他方式登录，或者<a onclick="try{if(typeof globalVar !='undefined'){ globalVisitor.closeMini();}else{parent.closeMini();}}catch(e){}this.newWindow=window.open('http://www.chinalife.com.cn/chat/chatClient/chatbox.jsp?companyID=8929&configID=56&skillId=52', 'chatbox8929', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=800,height=540');this.newWindow.focus();this.newWindow.opener=window;void(0);try{if(LIM&&LIM.visitor){LIM.visitor.closeMini();}else{parent.closeMini();}}catch(e){}">联系客服人员</a></p>
          <p v-if="accountDataBack.validCode === '10'"><em></em>该<i v-if="mobileNoName">手机号</i><i v-if="emailAddressName">邮箱</i><i v-if="userCodeName">用户名</i><i v-if="certiNoName">身份证</i>未验证，请通过其他方式登录，或者<a onclick="try{if(typeof globalVar !='undefined'){ globalVisitor.closeMini();}else{parent.closeMini();}}catch(e){}this.newWindow=window.open('http://www.chinalife.com.cn/chat/chatClient/chatbox.jsp?companyID=8929&configID=56&skillId=52', 'chatbox8929', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=800,height=540');this.newWindow.focus();this.newWindow.opener=window;void(0);try{if(LIM&&LIM.visitor){LIM.visitor.closeMini();}else{parent.closeMini();}}catch(e){}">联系客服人员</a></p>
          <p v-if="accountDataBack.validCode === '100'"><em></em>该手机号不符合校验规则，请重新输入</p>
          <p v-if="accountDataBack.validCode === '33'"><em></em>未获取验证码，请获取验证码后登录</p>
          <p v-if="accountDataBack.validCode === '32'"><em></em>验证码已失效，请重新获取</p>
          <p v-if="accountDataBack.validCode === '31'"><em></em>验证码错误，请重新输入</p>
        </div>
      </div>
      <div>
        <SliderBox v-on:slideBox="listenToSlideBox" :slideFalse="captchData.validSlide"></SliderBox>
      </div>
      <div :class="[isAllReady ? '' : noAllReady, goLogin]" @click="onAccountLoginHandle">登 录</div>
      <p class="goNext"><span @click="onShiftRouteHandle('/reset')">忘记密码</span> | <span @click="onShiftRouteHandle('/register')">免费注册</span></p>
      <div class="shareBg" v-if="modal">
        <div class="share">
          <div class="pactText">
            <i class="close" @click="close">×</i>
            <h4>《中国人寿用户信息共享告知》</h4>
            <p>本人同意提供给中国人寿的信息，及本人享受中国人寿服务产生的信息（包括在本平台购买中国人寿产品而产生的信息），可用于中国人寿及其直接或间接控股的公司及因服务必要而委托的第三方为本人提供服务及推荐产品，法律禁止的除外，直到本人以书面方式撤销为止。中国人寿其委托的第三方对上述信息负有保密义务。本条款自本协议签署时生效，具有独立法律效力，不受合同成立与否及效力状态变化的影响。</p>
          </div>
          <Button type="primary" :loading="loading" @click="onApproveShareServiceHandle()" class="btn btn_primary agree">
              <span v-if="!loading">同意共享协议并登录</span>
              <span v-else>登录</span>
          </Button>
        </div>
      </div>
    </div>
    <!-- 用户登录 end -->
  </div>
</template>
<script>
import SliderBox from '../components/SliderBox.vue'
import Prompt from '@/components/Prompt.vue'
import helper from '../server/helper'
import Cookie from '../server/cookie'
import TimeUtils from '../server/timeUtils'
import validityUtils from '../server/validate'
import Config, { AccountType } from '../constants/config.es6'
const { CAPTCHCOUNTDOWN } = Config
const { validateValue } = validityUtils

export default {
  name: 'login',
  data () {
    return {
      methods: [
        {
          name: '账号密码登录',
          ENname: 'account'
        },
        {
          name: '短信验证码登录',
          ENname: 'mobileNo'
        }
      ],
      accountData: {
        value: ''
      },
      passwordData: {
        value: ''
      },
      isLogining: false,
      captchData: {
        value: '',
        validSlide: false
      },
      chooseOne: 'account',
      bgBlue: 'bgBlue',
      bgWhite: '',
      sendMobileNoCaptchStatus: false,
      goLogin: 'goLogin',
      noAllReady: 'bgGrey',
      ToSlideBox: false,
      accountDataBack: {
        validCode: 0,
        validMessage: ''
      },
      mobileNoCountDown: CAPTCHCOUNTDOWN,
      loginMethod: 0,
      tip: false,
      ifError: false,
      ifErrorCap: false,
      ifErrorMob: false,
      showPrompt: false,
      modal: false,
      loading: false,
      userCodeName: false,
      mobileNoName: false,
      emailAddressName: false,
      certiNoName: false
    }
  },
  computed: {
    isAllReady () {
      if (
        this.accountData.value &&
        (this.passwordData.value || (this.captchData.value && this.sendMobileNoCaptchStatus)) &&
        !this.isLogining &&
        this.ToSlideBox
      ) {
        return true
      } else {
        return false
      }
    }
  },
  components: {
    SliderBox,
    Prompt
  },
  methods: {
    notShow (value) {
      this.showPrompt = value
    },
    listenToSlideBox (value) {
      this.ToSlideBox = value
      this.captchData.validSlide = true
    },
    chooseWhitch (value) {
      this.chooseOne = value
      if (value === 'account') {
        this.loginMethod = 0
      } else {
        this.loginMethod = 1
      }
      this.onResetData()
    },
    onResetData: function () {
      this.isLogining = false
      this.accountType = ''
      this.accountData = {}
      this.passwordData = {}
      this.captchData.value = ''
      this.isScan = true
      this.ToSlideBox = false
      this.captchData.validSlide = false
      this.ifError = false
      this.ifErrorCap = false
      this.ifErrorMob = false
    },
    onShiftRouteHandle (path) {
      if (path === '/reset') {
        window.location.href = 'https://www.chinalife.com.cn/online/web/user/reset/resetPassword.jsp'
        window.event.returnValue = false
      } else {
        const Query = JSON.parse(sessionStorage.getItem('RouterQuery'))
        this.$router.push({ path: path, query: Query })
      }
    },
    onChangeText (event, name) {
      let { currentTarget: { value } } = event
      value = value.trim()
      if (name === 'mobileNo') {
        this.$set(this['accountData'], 'value', value)
        this.accountType = AccountType.mobileNo
      } else {
        this.$set(this[name + 'Data'], 'value', value)
      }
    },
    onCheckAccountType (event) {
      let { currentTarget: { value } } = event
      if (value) {
        this.accountType = helper.getAccountType(value)
      }
    },
    show () {
      this.tip = false
      this.ifError = false
      this.ifErrorMob = false
      this.ifErrorCap = false
      // if (this.accountDataBack.validCode === '31') {
      //   this.Codetip = false
      // }
    },
    onSendCAPTCH (event, type) {
      if (!this.accountData.value) {
        return
      } else if (validateValue(type, this.accountData.value).code !== 1) {
        this.tip = true
        this.accountDataBack.validCode = '100'
        this.ifErrorMob = true
        return
      }
      // let captchLoginData = null
      let mobileNoCountDownTimer = null
      const { value: mobileNo } = this.accountData
      this.mobileNoName = true
      helper.getUserInfo(
        helper.getUserRequestData(AccountType.mobileNo, mobileNo),
        userInfo => {
          helper.getValidateCode({
            validateCodeType: '02',
            mobileNo
          },
          () => {
            this.showPrompt = true
            this.tip = false
            this.accountDataBack.validCode = '01'
            this.sendMobileNoCaptchStatus = true
            mobileNoCountDownTimer = setInterval(() => {
              this.mobileNoCountDown--
            }, 1000)
            setTimeout(() => {
              this.mobileNoCountDown = CAPTCHCOUNTDOWN
              this.sendMobileNoCaptchStatus = false
              clearInterval(mobileNoCountDownTimer)
              this.ToSlideBox = false
              this.captchData.validSlide = false
              this.captchData.value = ''
              this.isLogining = false
            }, CAPTCHCOUNTDOWN * 1000)
          },
          msg => {
            this.tip = true
            this.accountDataBack.validCode = '49'
          })
        },
        msg => {
          console.log(msg)
          this.tip = true
          this.accountDataBack.validCode = msg.respCode
          this.accountDataBack.validMessage = msg.errorMsg
          this.ifErrorMob = true
        }
      )
    },
    onAccountLoginHandle () {
      if (!this.isAllReady) {
        console.log('无效')
      } else {
        this.isLogining = true
        switch (this.loginMethod) {
          case 0:
            // 账号
            // 防止瘦狗浏览器无法触发onblue
            console.log('aaaa')
            if (!this.accountType) {
              this.accountType = helper.getAccountType(this.accountData.value)
            }
            const userRequestInfo = helper.getUserRequestData(
              this.accountType,
              this.accountData.value
            )
            if (userRequestInfo.userCode) {
              this.userCodeName = true
              this.mobileNoName = false
              this.emailAddressName = false
              this.certiNoName = false
            } else if (userRequestInfo.mobileNo) {
              this.mobileNoName = true
              this.userCodeName = false
              this.emailAddressName = false
              this.certiNoName = false
            } else if (userRequestInfo.emailAddress) {
              this.emailAddressName = true
              this.mobileNoName = false
              this.userCodeName = false
              this.certiNoName = false
            } else {
              this.certiNoName = true
              this.emailAddressName = false
              this.mobileNoName = false
              this.userCodeName = false
            }
            helper.getUserInfo(
              userRequestInfo,
              () => {
                const loginData = helper.getLoginRequestData(
                  this.accountType,
                  this.accountData.value,
                  this.passwordData.value,
                  this.loginMethod
                )
                helper.userLogin(
                  loginData,
                  userInfo => {
                    console.log('akkkddddd')
                    const { userCode, oldUserId } = userInfo
                    helper.getShareState(
                      {
                        oldUserId: oldUserId
                      },
                      status => {
                        if (status === '31') {
                          this.modal = true
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
                            window.event.returnValue = false
                          })
                        }
                      }
                    )
                  },
                  msg => {
                    console.log(msg)
                    this.tip = true
                    this.accountDataBack.validMessage = msg.errorMsg
                    this.accountDataBack.validCode = msg.respCode
                    this.isLogining = false
                    this.ToSlideBox = false
                    this.captchData.validSlide = false
                    this.ifError = true
                  }
                )
              },
              msg => {
                this.tip = true
                this.accountDataBack.validMessage = msg.errorMsg
                this.accountDataBack.validCode = msg.respCode
                this.isLogining = false
                this.ToSlideBox = false
                this.captchData.validSlide = false
                this.ifError = true
              }
            )
            break
          case 1:
            // 手机动态验证码登录
            const userRequestInfo1 = helper.getUserRequestData(
              this.accountType,
              this.accountData.value
            )
            if (userRequestInfo1.userCode) {
              this.userCodeName = true
            } else if (userRequestInfo1.mobileNo) {
              this.mobileNoName = true
            } else if (userRequestInfo1.emailAddress) {
              this.emailAddressName = true
            } else {
              this.certiNoName = true
            }
            helper.getUserInfo(
              userRequestInfo1,
              () => {
                const loginData = helper.getLoginRequestData(
                  this.accountType,
                  this.accountData.value,
                  this.captchData.value,
                  this.loginMethod
                )
                helper.userLogin(
                  loginData,
                  userInfo => {
                    console.log('akkk')
                    const { userCode, oldUserId } = userInfo
                    this.Codetip = false
                    helper.getShareState(
                      {
                        oldUserId: oldUserId
                      },
                      status => {
                        console.log(status)
                        if (status === '31') {
                          this.modal = true
                          const shareData = {
                            oldUserId,
                            optype: '0',
                            section: '0',
                            status: '1',
                            opdate: TimeUtils.getFormatTime(Date.parse(new Date()))
                          }
                          console.log('ddddddd')
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
                            window.event.returnValue = false
                          })
                        }
                      }
                    )
                  },
                  msg => {
                    this.tip = true
                    this.Codetip = false
                    this.accountDataBack.validMessage = msg.errorMsg
                    this.accountDataBack.validCode = msg.respCode
                    this.isLogining = false
                    this.ToSlideBox = false
                    this.captchData.validSlide = false
                    if (msg.respCode === '31' || msg.respCode === '32' || msg.respCode === '33') {
                      this.ifErrorCap = true
                    } else {
                      this.ifErrorCap = true
                      this.ifErrorMob = true
                    }
                  }
                )
              },
              msg => {
                this.tip = true
                this.accountDataBack.validMessage = msg.errorMsg
                this.accountDataBack.validCode = msg.respCode
                this.isLogining = false
                this.ToSlideBox = false
                this.captchData.validSlide = false
                this.ifErrorMob = true
              }
            )
            break
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
      this.modal = false
    }
  }
}
</script>
<style lang="less" scoped>
#userLogin{
  padding-bottom: 40px;
  .login-title{
    width: 100%;
    text-align: center;
    padding: 40px 0;
    font-size: 32px;
    color: #333;
  }
  .login-methods-choose{
    li{
      width: 50%;
      float: left;
      text-align: center;
      height: 80px;
      line-height: 82px;
      color: #009966;
      font-size: 28px;
    }
    border-bottom: 1px solid #009966;
  }
  .login-methods{
    li{
      padding-top: 40px;
      .form-item{
        height: 78px;
        margin-bottom: 30px;
        .form-account,.form-password,.form-mobileNo,.form-captch {
          padding-left: 68px;
          border: 1px solid #ddd;
          border-radius: 4px;
          position: relative;
          height: 76px;
          &::before {
            content: "";
            display: block;
            position: absolute;
            left: 0px;
            top: 4px;
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
        .form-account {
          &::before {
            background: url("../assets/images/account_normal.png");
            background-repeat: no-repeat;
            background-size:100% 100%
          }
          &:hover {
            border: 1px solid #009966;
            &::before {
              background: url("../assets/images/account_hover.png");
              background-repeat: no-repeat;
              background-size:100% 100%
            }
          }
          &.error{
            border: 1px solid #cc0000;
            &::before {
              background: url("../assets/images/account_error.png");
              background-repeat: no-repeat;
              background-size:100% 100%
            }
          }
        }
        .form-password {
          &::before {
            background: url("../assets/images/password_normal.png");
            background-repeat: no-repeat;
            background-size:100% 100%
          }
          &:hover {
            border: 1px solid #009966;
            &::before {
              background: url("../assets/images/password_hover.png");
              background-repeat: no-repeat;
              background-size:100% 100%
            }
          }
          &.error{
            border: 1px solid #cc0000;
            &::before {
              background: url("../assets/images/password_error.png");
              background-repeat: no-repeat;
              background-size:100% 100%
            }
          }
        }
        .form-mobileNo {
          &::before {
            background: url("../assets/images/mobile_no.png");
            background-repeat: no-repeat;
            background-size:100% 100%
          }

          &:hover {
            border: 1px solid #009966;
            &::before {
              background: url("../assets/images/mobile_hover.png");
              background-repeat: no-repeat;
              background-size:100% 100%
            }
          }
          &.error{
            border: 1px solid #cc0000;
            &::before {
              background: url("../assets/images/mobile_error.png");
              background-repeat: no-repeat;
              background-size:100% 100%
            }
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
          &.error{
            border: 1px solid #cc0000;
            &::before {
              background: url("../assets/images/login_code_error.png");
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
  .goLogin{
    width: 100%;
    height: 80px;
    text-align: center;
    line-height: 82px;
    background: #ff9900;
    color: #fff;
    font-size: 30px;
    margin-top:40px;
  }
  .bgGrey{
    background: #b5b5b5
  }
  .goNext{
    width: 100%;
    text-align: center;
    font-size: 26px;
    color: #333;
    margin-top: 40px;
  }
  .bgBlue{
    background: #009966;
    color: #fff !important
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
