<template>
  <transition name="fade">
    <div class="cap-send" v-if="ifShow">
      <p>验证码已发送，请查收</p>
    </div>
  </transition>
</template>
<script>
export default {
  data () {
    return {
      CountDownTime: 2
    }
  },
  props: [
    'ifShow'
  ],
  watch: {
    ifShow (value) {
      var clock = window.setInterval(() => {
        this.CountDownTime--
        if (this.CountDownTime < 0) {
          window.clearInterval(clock)
          this.$emit('promptHidden', false)
        }
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
.cap-send{
  background: rgba(0, 0, 0, 0.7);
  padding: 20px;
  font-size: 28px;
  color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  }
</style>
