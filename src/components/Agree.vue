<template>
  <div id="Agree">
    <input id="service_proto" @change="chooseServiceHandle($event)" type="checkbox" ref="service_proto">
    <label class="checkbox_label" for="service_proto"></label>
    <span class="dw">我已阅读并同意<b @click="onShowServiceProt"> 《服务协议》</b></span>
    <transition name="fade">
      <div class="service-agreement" v-if="showService">
        <div class="service-agreement-inner">
          <div>
            <p style="color:#ff9900">任何人士使用本网站前，请仔细阅读本服务条款。若不同意遵守下述的任何条款或者对于条款有任何的保留，请勿使用本网站。阁下进入本网站及浏览任何网页，即表示阁下同意遵守本服务条款。中国人寿保留随时自行决定更改、修改、更新本服务条款的权利，恕不另行通知。</p>
              <h4>服务条款</h4>
              <p class="item-title">第一条</p>
              <p>本网站内容（包括但不限于本网站所发布的信息、资料等内容）或服务由中国人寿保险（集团）公司（以下简称"本公司"）及其成员公司（包括但不限于中国人寿保险股份有限公司、中国人寿资产管理有限公司、中国人寿财产保险股份有限公司、中国人寿养老保险股份有限公司、中国人寿电子商务有限公司、中国人寿保险（海外）股份有限公司、国寿投资控股有限公司、保险职业学院）提供，在本服务条款中，"本公司"和"成员公司"统称为"中国人寿"。</p>
              <p class="item-title">第二条 网站内容和服务的使用</p>
              <p>（一）使用本网站，不得将本网站所提供的内容或服务，用于任何不合法的目的，或从事任何可能损害中国人寿声誉和利益的事宜，或以任何不符合本服务条款的方式使用该等内容或服务。</p>
              <p>（二）本网站只在法律允许的国家中提供本网站所述的内容及服务。本网站所发布的内容或服务无意提供给受法律限制的国家的人士或居民使用。</p>
              <p>（三）本网站的内容或服务不应视为专业人士意见。使用本网站的用户应在有需要时寻求专业人士建议。在任何情况下，中国人寿对于任何人士依赖本网站的内容或服务而做出的决定或采取的行动不承担任何责任。</p>
              <p>（四）本网站内容和服务的中英文本如有歧义，应以中文文本为准。</p>
              <p>（五）本人同意提供给中国人寿的信息，及本人享受中国人寿服务产生的信息（包括在本平台购买中国人寿产品而产生的信息），可用于中国人寿及其直接或间接控股的公司及因服务必要而委托的第三方为本人提供服务及推荐产品，法律禁止的除外，直到本人以书面方式撤销为止。中国人寿其委托的第三方对上述信息负有保密义务。本条款自本协议签署时生效，具有独立法律效力，不受合同成立与否及效力状态变化的影响。</p>
              <p class="item-title">第三条 权利声明</p>
              <p>（一）本网站所载述的域名、商号、商标、文字、信息、版面设计、图形、图案、图像、声音、流程、程序及其他内容资料均受著作权法以及其他有关法律、法规、规范性法律文件及相关国际条约的保护，除另有声明外，其包括著作权在内的所有权利均由中国人寿享有并保留。除非本服务条款中另有规定，未经中国人寿事先书面同意，任何单位或者个人均不得对于本网站中所载述的域名、商号、商标、文字、信息、版面设计、图形、图案、图像、声音、流程、程序及其他内容资料进行任何的修改、复制、储存于检索系统、传送、抄袭、分发，转载或用于任何商业或公开用途。</p>
              <p>（二）任何对上述权利的侵犯均有可能导致相关单位或者个人依照法律规定承担相应的民事、行政或刑事责任。</p>
              <p>（三）在同时遵守如下条件的情况下，除非网站中明确说明该内容禁止转载，单位和个人可以将网站中的内容进行转载：</p>
              <p>1、必须将内容进行整体转载，不得破坏转载内容的整体性和完整性；</p>
              <p>2、转载时应当注明内容来源，在显著位置标注"来源：[中国人寿网站www.chinalife.com.cn ]"；</p>
              <p>3、确保内容的转载或使用不会损害中国人寿的声誉或者利益；</p>
              <p>4、同意并且确认：中国人寿可以在任何情况下要求转载的单位或者个人删除转载内容或者断开其链接，而无须说明理由，且转载者应立即执行。</p>
              <p class="item-title">第四条 预测性陈述</p>
              <p>（一）本网站发布信息中会包含某些与中国人寿经营战略、业绩预期、投资计划、行业竞争和产品政策等方面的预测性陈述。该等陈述包含一定的风险因素和不确定性，旨在反映中国人寿对将来事件的目前看法，并非对将来业务表现的保证。中国人寿的业绩结果可能会因某些风险因素导致重大出入，在可以获知的范围内，这些风险因素可能在本公司或成员公司的各种形式的报告、公告及文件中进行说明，但是，无论如何，中国人寿不对上述报告、公告及文件中所披露的预测性陈述提供任何形式的担保或保证。</p>
              <p>（二）本网站内容中使用如"预期"、"计划"、"相信"、"预测"、"期望"、"可能"、"打算"以及其他类似词语进行陈述时，凡与中国人寿有关的，目的均是要说明其为预测性陈述。中国人寿不保证这些预测性陈述的准确性、时效性和可实现性。</p>
              <p class="item-title">第五条 隐私权保护</p>
              <p>中国人寿郑重承诺，未经用户同意，本网站不会搜集任何用户的资料。如因服务需要，通过本网站获得和掌握的用户电子邮件、填报资料等涉及个人隐私的信息，中国人寿将予以严格保密并不向任何中国人寿以外的第三方透露和提供。但下列情况除外：</p>
              <p>（一）事先获得用户的明确授权；</p>
              <p>（二）根据有关法律法规的要求；</p>
              <p>（三）依据法院或仲裁机构的裁判或裁决，以及其他司法程序的要求；</p>
              <p>（四）应相关政府部门或监管机构的要求；</p>
              <p>（五）用户违反本服务条款或有其他损害中国人寿利益的行为。</p>
              <p class="item-title">第六条 免责声明</p>
              <p>（一）对本网站的内容或服务，中国人寿不提供任何形式的明示或默示的关于内容或服务的正确性、及时性、有效性、稳定性、可用性等方面的保证；中国人寿不保证网站服务器及网络的稳定性，不保证本网站在任何时候均可供浏览、阅读和使用；可随时更改本网站的内容或服务，但并不保证在内容或服务变化时及时作更新通知。</p>
              <p>（二）任何单位或个人认为本网站上的内容或服务可能涉嫌侵犯其信息网络传播权或者其他合法权利，应该及时向本公司提出书面权利通知，并提供身份证明、权属证明、具体链接（URL）及详细侵权情况证明。本公司在收到上述法律文件后，将会依法尽快移除相关涉嫌侵权的内容或服务。</p>
              <p>（三）中国人寿就任何信息传递或传送的失误、不准确或错误，不对任何人士负任何直接或间接的责任。在法律允许的范围内，中国人寿不承担任何人士就使用或未能使用本网站所提供的内容或服务所引致的任何直接、间接、附带、从属、特殊、惩罚性或惩戒性的损害赔偿（包括但不限于收益、预期利润的损失、失去的业务、信息数据丢失和财产毁坏等损失）。</p>
              <p>（四）关于本网站中涉及的与中国人寿产品、客户服务、销售等有关的内容，如产品目录及险种描述、合同及保单样本、网点位置、代理人分布及设置、服务电话等，仅为向用户初步介绍产品或者服务的目的，不构成向任何人士的要约邀请和/或要约，具体产品或者服务的内容请以正式合同、承诺、约定为准。本网站所载相关内容不表示中国人寿对上述的产品、实际保险服务过程、流程或合同内容以及有关信息的真实性、准确性、及时性作出任何的明示或者暗示的保证或承诺，中国人寿不因此履行任何的义务或承担任何的责任。</p>
              <p class="item-title">第七条 链接政策</p>
              <p>（一）对于任何第三方建立的、与本网站的链接，中国人寿不负任何形式的责任。任何此种形式的链接并不代表该第三方与中国人寿之间有任何形式的合作、或已经得到中国人寿的认可。因而，对于用户或者任何第三方由于使用这种链接所可能招致的任何损失或伤害，中国人寿不承担任何责任。</p>
              <p>（二）在某些情况下，本公司会在本网站上，提供与互联网上其它网站的网站链接。被链接的网站可能是由与中国人寿无关的第三方开设的。提供与这些网站的链接，目的在于帮助用户收集相关信息并增加用户使用互联网的经验或者便利。本公司尽最大努力为用户选择那些享有良好声誉的站点和信息来源。但是，提供与外部网站的网站链接，并不代表中国人寿认可、推荐、批准或介绍任何第三方、或其提供的服务或产品。</p>
              <p>（三）对于任何外部链接的网站、或与本网站链接的网页，中国人寿不承担其内容或使用上的任何法律责任。</p>
              <p class="item-title">第八条 法律适用</p>
              <p>由于本网站内容导致的一切诉讼或争议均适用中华人民共和国法律。若用户和中国人寿就此发生任何纠纷或争议，首先应友好协商解决，协商不成的，任何一方均可将纠纷或者争议提交北京仲裁委员会，按照该会届时有效的仲裁规则进行仲裁，仲裁裁决是终局的，对双方均有法律约束力。</p>
              <p class="item-title">本服务条款符合中华人民共和国法律，该服务条款解释权由本公司完全享有。</p>
          </div>
          <button class="btn" @click="closeService">关 闭</button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showService: false
    }
  },
  methods: {
    chooseServiceHandle (event) {
      const { target: { checked } } = event
      this.$emit('confirmService', checked)
    },
    onShowServiceProt () {
      this.showService = true
    },
    closeService () {
      this.showService = false
    }
  }
}
</script>
<style lang="less" scoped>
#Agree{
  height: 40px;
  line-height: 42px;
  margin-bottom: 20px;
  position: relative;
  input[type="checkbox"] {
    display: none;
    &:checked {
      & +.checkbox_label::before {
        background: #009966;
        border: 6px solid #b5b5b6;
      }
    }
  }
  label {
    font-weight: 800;
    position: relative;
    &::before{
      content: "";
      display: inline-block;
      top: 3px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 6px;
      box-sizing: border-box;
      border: 1px solid #009b63;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: #fff;
    }
  }
  span{
    font-size: 24px;
    color: #333;
    padding-left: 40px;
  }
  b{
    font-weight: normal;
    color: #0033cc;
    font-size: 24px;
  }
  .service-agreement{
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    z-index: 9;
    top: 0;
    left: 0;
    .service-agreement-inner{
      background: #fff;
      width: 93.6%;
      height: 90%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      &>div{
        width: 90%;
        height: 85%;
        margin: 30px auto 30px;
        overflow-y:scroll ;
        p{
          font-size: 26px;
          line-height: 46px;
          color: #333;
          text-align: justify;
          &.item-title{
            margin-top: 45px
          }
        }
        h4{
          font-size: 34px;
          text-align: center;
          margin: 45px 0;
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
