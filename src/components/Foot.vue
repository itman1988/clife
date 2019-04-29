<template>
  <div id="Foot">
    <ul class="clearfix foot-all-link bodyWidth">
      <li>
        <p>集团业务</p>
        <div class="clearfix">
          <p v-for="other in others" :key="other.index">
            <a href="javascript:void(0)">{{ other.name }}</a>
          </p>
        </div>
      </li>
      <li>
        <p>友情链接</p>
        <div>
          <p><a href="javascript:void(0)">中国银行保险监督管理委员会</a></p>
          <img src="../assets/images/2018121315350695511.png" alt="">
        </div>
      </li>
    </ul>
    <ul class="clearfix foot-ewm bodyWidth">
      <li>
        <img src="../assets/images/2019010115062931859.jpg" alt="">
        <p>微信订阅号</p>
      </li>
      <li>
        <img src="../assets/images/20190122093825.png" alt="">
        <p>微信服务号</p>
      </li>
      <li>
        <img src="../assets/images/493350351529819808.png" alt="">
        <p>掌上国寿APP</p>
      </li>
    </ul>
    <div class="foot-message bodyWidth">
      <p class="foot-we clearfix wewhidth1">
        <a href="">对于投资者</a>
        <a href="">我是业务员</a>
        <a href="">我是媒体人</a>
      </p>
      <p class="foot-we clearfix wewhidth2">
        <a href="">联系我们</a>
        <a href="">服务协议</a>
        <a href="">网站地图</a>
      </p>
      <p class="foot-bq">版权所有© 2018中国人寿保险（集团）公司</p>
      <p class="foot-English">Copyright © 2018 China Life Insurance(Group) Company. </p>
      <p>rights reserved.</p>
      <p class="foot-ba"><a style="color:#8e8e8e;" href="http://www.miibeian.gov.cn/" target="_blank">京ICP备05024145号</a> 京公网安备110401500015号</p>
      <ul class="foot-img clearfix">
        <li>
          <a href="https://ss.knet.cn/verifyseal.dll?sn=e16030211010262612kif8000000&pa=111332" target="_blank">
            <img src="../assets/images/2017112310410780175.png" alt="">
          </a>
        </li>
        <li>
          <a href="https://credit.cecdc.com/CX20121226002112002165.html" target="_blank">
            <img src="../assets/images/cert.png" alt="">
          </a>
        </li>
        <li>
          <a href="http://si.trustutn.org/info?sn=159170322027594788516&certType=1" target="_blank">
            <img src="../assets/images/2017062211080016520.jpg" alt="">
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Foot',
  data () {
    return {
      others: [
        {
          name: '寿险',
          link: ''
        },
        {
          name: '电子商务',
          link: ''
        },
        {
          name: '广发银行',
          link: ''
        },
        {
          name: '海外业务',
          link: ''
        },
        {
          name: '资产管理',
          link: ''
        },
        {
          name: '投资控股',
          link: ''
        },
        {
          name: '财险',
          link: ''
        },
        {
          name: '职业学院',
          link: ''
        },
        {
          name: '企业年金',
          link: ''
        },
        {
          name: '基金',
          link: ''
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
#Foot{
  background: #333;
  border-top: 15px solid #eee;
  .foot-all-link{
    li{
      width: 50%;
      float: left;
      p{
        width: 50%;
        float: left;
        padding-bottom: 18px;
        a{
          color: #999;
          font-size: 24px;
        }
      }
      &>p{
        color: #999;
        font-size: 28px;
        padding: 35px 0;
        width: 100%;
      }
      &:last-child{
        div{
          p{
            width: 100%
          }
          img{
            width: 65.7%;
            margin-top: 20px;
          }
        }
      }
    }
  }
  .foot-ewm{
    li{
      width: 33.3%;
      float: left;
      padding:30px 0;
      img,p{
        width: 85.4%;
      }
      p{
        text-align: center;
        color: #999;
        font-size: 24px;
        margin-top: 10px !important;
        text-align: center;
      }
      &:nth-child(2){
        img,p{
          margin: 0 7.3%;
        }
      }
      &:last-child{
        img,p{
          margin-left: 14.6%
        }
      }
    }
  }
  .foot-message{
    border-top: 1px solid #999;
    padding-top: 30px;
    .foot-we{
      margin: auto;
      text-align: center;
      a{
        padding: 0 3%;
        color: #999;
        font-size: 26px;
        border-right: 1px solid #999;
        float: left;
        margin-bottom: 10px;
        &:last-child{
          border: none
        }
      }
      &.wewhidth1{
        width: 74%;
      }
      &.wewhidth2{
        width: 60%;
      }
    }
    p{
      font-size: 20px;
      color: #999;
      text-align: center;
      padding-bottom: 15px;
    }
    .foot-img{
      width: 580px;
      margin: auto;
      li{
        float: left;
        width: 33.3%;
        img{
          width: 84%;
          margin: auto;
          padding: 25px 0 40px;;
        }
      }
    }
  }
}
</style>
