<template>
  <div id="app" :style="{height: bodyHeight}">
    <router-view class="routerbody" v-if="isRouterAlive">
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      bodyHeight: '',
      isRouterAlive: true
    }
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  mounted () {
    this.bodyHeight = `${document.documentElement.clientHeight}px`
  },
  methods: {
    mainBodyIfMove (value) {
      console.log(value)
      this.bodyMove = value
    },
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  created () {
    sessionStorage.setItem('RouterQuery', JSON.stringify(this.$route.query))
  }
}
</script>

<style>
@import "../static/font/font.css";
#app {
  font-family: Arial,'Times New Roman','FZLTXIHJW','Microsoft YaHei' !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  margin: auto;
  background: #f0f0f0;
  position: relative;
  overflow: hidden;
}
/* 白色低 */
.routerbody{
  background: #fff
}
.clearfix {*zoom: 1;}
.clearfix:after{display: block;overflow: hidden;clear: both;height: 0;visibility: hidden;content: "."}
i,em{font-style: normal}
body,div,p,ul,li,ol,img{padding: 0;margin: 0}
ul,li{list-style-type: none;}
a {text-decoration: none;-webkit-tap-highlight-color: transparent;}
/* mainbody */
.bodyWidth{
  width: 94%;
  margin: auto
}
/* button */
.btn{
  display: inline-block;
  line-height: 42px;
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  height: 40px;
  padding: 0 20px;
  font-size: 14px;
  border-radius: 4px;
  border: 0;
  background: #b5b5b6
}
/* 下一步 */
.nextStep{
  width: 100%;
  display: block;
  height: 80px;
  background: #009966;
  line-height: 82px;
  font-size: 30px;
  color: #fff;
  text-align: center;
  margin-top: 40px;
  border-radius: 4px;
}
/* input 默认字 */
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
color: #ccc;
font-size: 26px;
}

::-moz-placeholder { /* Mozilla Firefox 19+ */
color: #ccc;
font-size: 26px;
}

input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
color: #ccc;
font-size: 26px;
}

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
color: #ccc;
font-size: 26px;
}
input:-webkit-autofill,textarea:-webkit-autofill,select:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px white inset;
}
input{
  line-height: normal;
  line-height: 22px\9;
}
/* 弹窗过度 */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
