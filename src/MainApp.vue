<template>
  <div :class="[bodyMove ? 'bodyMove': '','app']">
    <TopHeader v-on:moveRight="listenIfMoveRight"></TopHeader>
    <router-view>
    </router-view>
  </div>
</template>

<script>
import TopHeader from './components/TopHeader.vue'
export default {
  name: 'MainApp',
  data () {
    return {
      mainBodyIfMove: false,
      bodyMove: false
    }
  },
  components: {
    TopHeader
  },
  methods: {
    listenIfMoveRight (value) {
      this.bodyMove = value
    }
  },
  created () {
    sessionStorage.setItem('RouterQuery', JSON.stringify(this.$route.query))
    // eslint-disable-next-line
    var ip = returnCitySN['cip']
    sessionStorage.setItem('UserIp', ip)
  }
}
</script>
<style lang="less" scoped>
.app{
  transition: .2s;
  position: absolute;
  width: 100%;
  left: 0;
}
.bodyMove{
  left: 45%;
}
</style>
