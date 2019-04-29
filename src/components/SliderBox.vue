<template>
  <div class="drag" id="dragBg" unselectable="on" onselectstart="return false;" style="-moz-user-select:none;">
    <div class="drag_bg"></div>
    <div v-bind:class="[isActive ? activeClass : '', errorClass]">{{confirmWords}}</div>
    <div @mousedown="mousedownFn($event)" class="handler handler_bg" @touchstart="touchstart($event)" id="handler"></div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: '',
  components: {},
  props: [
    'slideFalse'
  ],
  data () {
    return {
      beginClientX: 0, /* 距离屏幕左端距离 */
      mouseMoveStata: false, /* 触发拖动状态  判断 */
      maxwidth: 280, /* 拖动最大宽度，依据滑块宽度算出来的 */
      confirmWords: '向右滑动滑块，完成验证', /* 滑块文字 */
      confirmSuccess: false, /* 验证成功判断 */
      errorClass: 'drag_text',
      activeClass: 'color_white',
      isActive: false
    }
  },
  methods: {
    // pc按下滑块函数
    mousedownFn: function (e) {
      this.mouseMoveStata = true
      this.beginClientX = e.clientX
    },
    // mobile按下滑块函数
    touchstart: function (e) {
      const touch = e.touches[0]
      this.mouseMoveStata = true
      this.beginClientX = touch.clientX
      event.preventDefault()
    },
    successFunction () {
      $('.handler').removeClass('handler_bg').addClass('handler_ok_bg')
      this.confirmWords = '验证通过'
      $('.drag').css({'color': '#fff'})
      $('.handler').css({'left': this.maxwidth})
      $('.drag_bg').css({'width': this.maxwidth})
      $('#dragBg').unbind('mousemove')
      $('#dragBg').unbind('mouseup')
      this.confirmSuccess = true
      this.$emit('slideBox', this.confirmSuccess)
      this.isActive = true
    }, // 验证成功函数
    successFunctionForMob () {
      $('.handler').removeClass('handler_bg').addClass('handler_ok_bg')
      this.confirmWords = '验证通过'
      $('.drag').css({'color': '#fff'})
      $('.handler').css({'left': this.maxwidth})
      $('.drag_bg').css({'width': this.maxwidth})
      $('#dragBg').unbind('touchmove')
      $('#dragBg').unbind('touchend')
      this.confirmSuccess = true
      this.$emit('slideBox', this.confirmSuccess)
      this.isActive = true
    } // 验证成功函数
  },
  mounted () {
    // pc端
    $('#dragBg').on('mousemove', (e) => { // 拖动，这里需要用箭头函数，不然this的指向不会是vue对象
      if (this.mouseMoveStata) {
        var width = e.clientX - this.beginClientX
        if (width > 0 && width <= this.maxwidth) {
          $('.handler').css({'left': width})
          $('.drag_bg').css({'width': width})
        } else if (width > this.maxwidth) {
          this.successFunction()
        }
      }
    })
    $('#dragBg').on('mouseup', (e) => { // 鼠标放开
      this.mouseMoveStata = false
      var width = e.clientX - this.beginClientX
      if (width < this.maxwidth) {
        $('.handler').css({'left': 1})
        $('.drag_bg').css({'width': 0})
      }
    })
    // 移动端
    $('#dragBg').on('touchmove', (e) => { // 拖动，这里需要用箭头函数，不然this的指向不会是vue对象
      if (this.mouseMoveStata) {
        const touch = e.touches[0]
        var width = touch.clientX - this.beginClientX
        if (width > 0 && width <= this.maxwidth) {
          $('.handler').css({'left': width})
          $('.drag_bg').css({'width': width})
        } else if (width > 0 && width > this.maxwidth) {
          this.successFunctionForMob()
        } else {}
      }
    })
    $('#dragBg').on('touchend', (e) => {
      this.mouseMoveStata = false
      var width = e.changedTouches[0].pageX - this.beginClientX
      if (width < this.maxwidth && width > 0) {
        $('.handler').css({'left': 1})
        $('.drag_bg').css({'width': 0})
      } else if (width < 0) {
      }
    })
    let Width = document.getElementById('dragBg').clientWidth
    let handlerWidth = document.getElementById('handler').clientWidth
    this.maxwidth = Width - handlerWidth
  },
  watch: {
    slideFalse (value, e) {
      if (value) {
      } else {
        $('.handler').css({'left': 1})
        $('.drag_bg').css({'width': 0})
        $('.handler').removeClass('handler_ok_bg').addClass('handler_bg')
        this.confirmWords = '拖动滑块验证'
        $('.drag').css({'color': '#2c3e50'})
        this.isActive = false
        $('#dragBg').on('mousemove', (e) => { // 拖动，这里需要用箭头函数，不然this的指向不会是vue对象
          if (this.mouseMoveStata) {
            var width = e.clientX - this.beginClientX
            if (width > 0 && width <= this.maxwidth) {
              $('.handler').css({'left': width})
              $('.drag_bg').css({'width': width})
            } else if (width > this.maxwidth) {
              this.successFunction()
            }
          }
        })
        $('#dragBg').on('mouseup', (e) => { // 鼠标放开
          this.mouseMoveStata = false
          var width = e.clientX - this.beginClientX
          if (width < this.maxwidth) {
            $('.handler').css({'left': 0})
            $('.drag_bg').css({'width': 0})
          }
        })
        // 移动端
        $('#dragBg').on('touchmove', (e) => { // 拖动，这里需要用箭头函数，不然this的指向不会是vue对象
          if (this.mouseMoveStata) {
            const touch = e.touches[0]
            var width = touch.clientX - this.beginClientX
            if (width > 0 && width <= this.maxwidth) {
              $('.handler').css({'left': width})
              $('.drag_bg').css({'width': width})
            } else if (width > 0 && width > this.maxwidth) {
              this.successFunctionForMob()
            } else {}
          }
        })
        $('#dragBg').on('touchend', (e) => {
          this.mouseMoveStata = false
          var width = e.changedTouches[0].pageX - this.beginClientX
          if (width < this.maxwidth && width > 0) {
            $('.handler').css({'left': 0})
            $('.drag_bg').css({'width': 0})
          } else if (width < 0) {
          }
        })
        this.mouseMoveStata = false
        this.confirmSuccess = false
      }
    }
  }
}
</script>

<style scoped>
.drag{
    position: relative;
    background: url('../assets/images/slideBackground.png');
    width: 100%;
    height: 78px;
    line-height: 78px;
    text-align: center;
    margin:0 auto 0px;
    border: 1px solid #b1b1b1;
}
.handler{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 78px;
    height: 78px;
    cursor: move;
}
.handler_bg{
  background: url('../assets/images/slideRight.png');
  background-size: 100% 100%;
  box-shadow: 7px 0px 12px -3px #d0d0d0;
}
.handler_ok_bg{
    background: url('../assets/images/ok.png');
    background-size: 100% 100%
}
.drag_bg{
    background-color: #4da41d;
    height: 78px;
    width: 0px;
}
.drag_text{
    position: absolute;
    top: 0px;
    width: 100%;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -o-user-select:none;
    -ms-user-select:none;
    color: #aaa;
    font-size: 26px;
    height: 78px;
    line-height: 80px;
}
.color_white{
  color: #fff !important
}
</style>
