<template>
  <div>
    <ul class="TopHeader-lead clearfix bodyWidth">
      <li v-for="item in itemList" :key="item.index">
        <a :href="item.url">{{ item.name }}</a>
      </li>
    </ul>
    <div class="TopHeader-logo">
      <div class="bodyWidth">
        <div class="more-list">
          <img src="../assets/images/more-list.png" alt="" @click="showLeftBar">
        </div>
        <div class="chinalife-logo">
          <a href="https://www.chinalife.com.cn/chinalife/index/"><img src="../assets/images/chinalife-logo.png" alt=""></a>
        </div>
      </div>
    </div>
    <div :class="[barHiddenLeft ? '': 'barHiddenLeft', 'leftBar']" :style="{height: bodyHeight}">
      <ul>
        <li v-for="about in allAbout" :key="about.index">
          <a :href="about.url">{{ about.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TopHeader',
  data () {
    return {
      itemList: [
        {
          name: '公开信息批露',
          url: 'https://www.chinalife.com.cn/chinalife/xxpl/gkxxpl/jbxx/gsgk/'
        },
        {
          name: '网站地图',
          url: 'http://wap.chinalife.com.cn/chinalife/index/sitemap/'
        },
        {
          name: '官方微博',
          url: 'https://passport.weibo.com/visitor/visitor?entry=miniblog&a=enter&url=https%3A%2F%2Fweibo.com%2Fchinalifegroup%3Fsudaref%3Dwap.chinalife.com.cn%26display%3D0%26retcode%3D6102&domain=.weibo.com&sudaref=https%3A%2F%2Flogin.sina.com.cn%2Fsso%2Flogin.php%3Furl%3Dhttps%253A%252F%252Fweibo.com%252Fchinalifegroup%26_rand%3D1552526698.882%26gateway%3D1%26service%3Dminiblog%26entry%3Dminiblog%26useticket%3D1%26returntype%3DMETA%26sudaref%3Dhttp%253A%252F%252Fwap.chinalife.com.cn%252Fchinalife%252Findex%252Fsitemap%252F%26_client_version%3D0.6.28&ua=php-sso_sdk_client-0.6.28&_rand=1552526699.2158'
        },
        {
          name: '官方微信',
          url: 'https://www.chinalife.com.cn/online/web/common/weixin/carnival/weixinCarnival.jsp'
        },
        {
          name: '国寿APP',
          url: 'https://www.chinalife.com.cn/online/cms/web/appdown.html'
        }
      ],
      allAbout: [
        {
          name: '关于我们',
          url: 'https://www.chinalife.com.cn/chinalife/gywm/'
        },
        {
          name: '新闻中心',
          url: 'https://www.chinalife.com.cn/chinalife/xwzx/gsxw/'
        },
        {
          name: '信息公开',
          url: 'https://www.chinalife.com.cn/chinalife/xxpl/gkxxpl/jbxx/gsgk/'
        },
        {
          name: '社会责任',
          url: 'https://www.chinalife.com.cn/chinalife/shzr/shzrbg/'
        },
        {
          name: '服务中心',
          url: 'https://www.chinalife.com.cn/chinalife/service/'
        },
        {
          name: '产品中心',
          url: 'https://www.chinalife.com.cn/chinalife/product/insurance/'
        },
        {
          name: '人才招聘',
          url: 'https://chinalife.com.cn/zhuzhan_old/zhaopin/'
        }
      ],
      bodyHeight: '',
      barHiddenLeft: false,
      moveRight: false
    }
  },
  methods: {
    showLeftBar () {
      this.barHiddenLeft = !this.barHiddenLeft
      this.moveRight = !this.moveRight
      this.$emit('moveRight', this.moveRight)
    }
  },
  mounted () {
    this.bodyHeight = `${document.documentElement.clientHeight}px`
  }
}
</script>
<style lang="less" scoped>
.TopHeader-lead{
  li{
    width: 18.75%;
    float: left;
    text-align: center;
    color: #999;
    font-size: 24px;
    padding: 30px 0;
    a{
      display: inline-block;
      color: #999;
      width: 100%;
      box-sizing:border-box;
      border-right: 1px solid #ddd;
    }
    &:last-child{
      a{
        border:none
      }
    }
    &:first-child{
      width:25%
    }
  }
}
.TopHeader-logo{
  width: 100%;
  border-top:1px solid #ddd;
  border-bottom: 15px solid #eee;
  div{
    &>div{
      display: inline-block;
      img{
        width: 100%
      }
    }
    .more-list{
      width: 10%;
      padding: 25px 0;
      clear: both;
    }
    .chinalife-logo{
      width: 28.5%;
      padding: 20px 0;
      float: right;
      clear: both
    }
  }
}
.leftBar{
  background: url(../assets/images/bgphone.jpg);
  background-size:100% 100%;
  position: fixed;
  left: 0;
  top: 0;
  width: 45%;
  z-index: 9;
  transition: .2s;
  ul{
    padding: 20% 0;
    li{
      a{
        display: block;
        line-height: 120px;
        font-size: 40px;
        color: #fff;
        text-align: center;
      }
    }
  }
}
.barHiddenLeft{
  left: -45% !important;
}
</style>
