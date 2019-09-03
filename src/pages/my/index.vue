<template>
  <div>
    <navbar title='我的' :btL=false></navbar>

    <div class="top">
            <div class="user">
                <button class="avatar"  @tap='tapEvent' id="icon">
                  <open-data type="userAvatarUrl" ></open-data>
                </button>
                <div class="name" v-if="userInfo">
                  <open-data type="userNickName" ></open-data>
                </div>
                <div v-else>
                  <button class="loginBt" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfo1">获取权限</button>
                </div>
            </div>
            <div class="top_bo"></div>
    </div>
    <div class="middle" v-if="webState==250">
      <div class="orders">
        <div class="Titel">辅助功能</div>
        <div class="Line"></div>
        <div class="Btns">
          <div class="Btn" v-for="(item, index) in assist" :key="index" @click="nav_to(item)">
            <img class="more" :src="item.url" alt="">
            <text>{{item.text}}</text>
          </div>
        </div>
      </div>
    </div>
    <div class="middle" v-else>
      <div class="orders">
        <div class="Titel" @click="nav_to_process()"><p>所有进程</p> <img src="/static/icon/you.png" alt=""> </div>
        <div class="Line"></div>
        <div class="Btns">
          <div class="Btn" v-for="(item, index) in orders" :key="index" @click="tap(item)">
            <img :src="item.url" alt="">
            <text>{{item.text}}</text>
          </div>
        </div>
      </div>

      <div class="orders">
        <div class="Titel">更多</div>
        <div class="Line"></div>
        <div class="Btns">
          <div class="Btn" v-for="(item, index) in mores" :key="index" @click="nav_to(item)" open-type="contact">
            <img class="more" :src="item.url" alt="">
            <text>{{item.text}}</text>
          </div>
          <button class="zaixainkefu" open-type="contact">
            <img src="/static/images/my/kefu.png" alt="">
            <div>客服</div>
          </button>
        </div>
      </div>

      <div class="orders">
        <div class="Titel">辅助功能</div>
        <div class="Line"></div>
        <div class="Btns">
          <div class="Btn" v-for="(item, index) in assist" :key="index" @click="nav_to(item)">
            <img class="more" :src="item.url" alt="">
            <text>{{item.text}}</text>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import navbar from '@/components/navbar'
import com from '@/utils/common'
import {
  showSuccess,
  showLoading
} from '@/utils/showToast'
import config from '@/config'
import wx from '@/utils/wx'
// let theModuleName = 'pages/my'
export default {
  data () {
    return {
      // canIUse: wx.canIUse('button.open-type.getUserInfo'),
      USERavatarUrl: 'http://pic41.nipic.com/20140508/18609517_112216473140_2.jpg',
      USERnickName: '授权登录',
      orders: [
        { text: '已投递', url: '/static/images/my/ytd.png' },
        { text: '待面试', url: '/static/images/my/dms.png' },
        { text: 'offer', url: '/static/images/my/mswc.png' }
      ],
      mores: [
        { text: '线上简历', url: '/static/images/my/xianshang.png' },
        { text: '简历附件', url: '/static/images/my/fujian.png' },
        // { text: '客服', url: '/static/images/my/kefu.png' },
        { text: '邀请人', url: '/static/images/my/yaoqingren.png', nav: '/pages/invite/main'}
      ],
      assist: [
        { text: '邀请码', url: '/static/images/my/creQR.png', nav: '/pages/createdQR/main'}
      ],

      appid: config.appid,
      secret: config.secret,
      code: '', // wx.login
      grant_type: 'authorization_code',
      // 使用以上参数 调用api接口获取 openid
      openid: '',
      session_key: '',
      userInfo: {},
      webState:'250'
    }
  },

  components: {
    navbar
  },
  async onLoad () {
    //
    this.owner = mpvue.getStorageSync('ownerId')
    const webState = await wx.request({
      url: config.host + '/Wx/GetWebState?hans=9527',  
    })
    this.webState = webState
    console.log('webState', this.webState);
    //
    // 检查 openid
    this.openid = mpvue.getStorageSync('openid')
    console.log('openid:',this.openid)
    if ( !this.openid ) {
      const login = await wx.login()
      this.code = login.code
      const code2session = await wx.request({
        url: config.host + '/Wx/Code2session',
        data: {
          'appid': this.appid,
          'secret': this.secret,
          'code': this.code,
          'grant_type': this.grant_type
        },
        method: 'get'
      })
      console.log('openid2', code2session.openid);
      this.openid = code2session.openid
      mpvue.setStorageSync('openid', code2session.openid)
      this.session_key = code2session.session_key
      // 查找数据库中的 owner
      const owner = await wx.request({
        url: config.host + '/Wx/getWxOwner',
        data: {
          'openid': this.openid,
        },
        method: 'get'
      })
      if (owner) {
        this.owner = code2session.owner
        mpvue.setStorageSync('ownerId', owner)
        console.log('OWNER', owner)
      }

    }
    // 查看用户信息 缓存
    let user = mpvue.getStorageSync('userInfo')
    this.userInfo = user
    console.log('this.userInfo:',this.userInfo)
    if (!user) {
      // 获取 setting
      const setting = await wx.getSetting()
      // 是否 授权
      if (setting.authSetting['scope.userInfo']) {
        const getUserInfo = await wx.getUserInfo()
        console.log(getUserInfo.userInfo)
        // 缓存 userInfo     
        mpvue.setStorageSync('userInfo', getUserInfo.userInfo)
        this.userInfo = getUserInfo.userInfo
        console.log('用户已经授权过')
        showLoading('正在登录。。。')
        const loginState = await wx.request({
          url: config.host + '/Wx/Savelogin',
          data: {
            'openid': this.openid,
            'session_key': this.session_key,
            'owner': this.owner,
            'useravatarurl':this.userInfo.avatarUrl,
            'usernickname':this.userInfo.nickName,
            'usercity':this.userInfo.city,
            'usercountry':this.userInfo.country,
            'usergender':this.userInfo.gender,
            'userprovince':this.userInfo.province
          },
          method: 'get'
        })
        console.log('loginState', loginState)
        showSuccess('登录成功')
        console.log(5);

      } else {
        console.log('用户还未授权过')
        showLoading('未授权登录', 500)
      }
    } else {
      // 获取 setting
      const setting = await wx.getSetting()
      // 是否 授权
      if (setting.authSetting['scope.userInfo']) {
      console.log('已登录')
      }else{
        mpvue.setStorageSync('userInfo', '')
        console.log('已清除授权')
        let page = getCurrentPages().pop()
        page.onLoad()
      }
    }
  },
  methods: {
    getUserInfo1 () {
      console.log('click事件首先触发')
      // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
      // console.log(wx.canIUse('button.open-type.getUserInfo'))
      if (mpvue.canIUse('button.open-type.getUserInfo')) {
        // 用户版本可用
      } else {
        console.log('请升级微信版本')
      }
    },
    bindGetUserInfo (e) {
      if (e.mp.detail.rawData) {
        // 用户按了允许授权按钮
        console.log('用户按了允许授权按钮')
        // 刷新页面
        // console.log(getCurrentPages()) 
        
        let page = getCurrentPages().pop()
        // page.onShow()
        page.onLoad()
      } else {
        // 用户按了拒绝按钮
        console.log('用户按了拒绝按钮')
      }
    },
    nav_to (item) {
      if (item.text === '邀请人' || item.text === '邀请码') {
        mpvue.navigateTo({ url: item.nav })
      } else {
        // mpvue.navigateTo({ url: item.nav })
        com.tos('相关功能暂时不可用') // showToast
      }
    },
    async nav_to_process(){
      // 获取 setting
      const setting = await wx.getSetting()
      console.log(setting);
      // 是否 授权
      if (setting.authSetting['scope.userInfo']) {
        this.$store.commit('processTypeChange', 0)
        mpvue.navigateTo({ url: '/pages/process/main'  })
      }else{
        com.tos('您还没有登录，点击上方按钮进行授权')
      }
      console.log('跳转到进程');
    },
    async tap (i) {
      // 获取 setting
      const setting = await wx.getSetting()
      console.log(setting);
      // 是否 授权
      if (setting.authSetting['scope.userInfo']) {
        let url = '/pages/process/main'
        switch (i.text) {
          case '已投递':
            this.$store.commit('processTypeChange', 0)
            mpvue.navigateTo({ url })
            break
          case '待面试':
            this.$store.commit('processTypeChange', 1)
            mpvue.navigateTo({ url })
            break
          case 'offer':
            this.$store.commit('processTypeChange', 2)
            mpvue.navigateTo({ url })
            break
        }
      }else{
        com.tos('您还没有登录，点击上方按钮进行授权')
      }

    }
  }
}
</script>
<style lang="wxss">
page{
  height: 100%;
  background-color: white;
}
</style>

<style scoped>

text {
  font-size: 36rpx;
  color: white;
}
.top{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items:center;
  height: 360rpx;
  background: linear-gradient(#0fbcf9, #7cdcff);
  box-shadow: rgba(9, 133, 227, 0.459) 30rpx 10rpx 50rpx 1rpx ;
  margin-top: -1rpx;
  border-radius:0 0 200rpx 200rpx;
}
.user {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items:center;
  height: 220rpx;
  /* background-color: rgb(215, 255, 249); */
}

.avatar{
  overflow:hidden;
  border-radius: 50%;
  width: 130rpx;
  height: 130rpx;
  margin-left: 20rpx;
  margin-right: 20rpx;
}
.name{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: #FFFFFF;
}
.name open-data{
  font-size: 18px;
}
.name button{
  margin-left: 30rpx;
  width: 140rpx;
  height: 40rpx;
  margin: 0;
  display: flex;
  justify-content:center;
  text-align: center;
  font-size: 13px;
}

.user text{
  font-size: 18px;
}
.name button{
  display:flex;
  align-items:center;
  font-family :"PingFangSC-Regular";
  font-size: 13px;
  color: white;
  width: 140rpx;
  height: 40rpx;
  border-radius: 20rpx;
  background-color:rgba(0,0,0,0.3);

}
.top_bo{
  height: 50rpx;
  width: 100%;

}


.middle {
  height: 100%;
  padding: 10rpx 0;
  /* background-color: #0fbcf9; */
}

/* 电商订单 我的工具 */
.orders,.tools{
  height: 300rpx;
  margin: 20rpx 10rpx;
  border-radius: 30rpx;
  /* border: 1px solid #74b9ff; */
 box-shadow: rgba(77, 178, 255, 0.301) 20rpx 10rpx 30rpx 1rpx ;
  /* box-shadow: 3rpx 3rpx 10rpx rgba(75, 207, 250, 0.5); */

  background-color: white;
}

.Titel{
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  height: 100rpx;
  padding: 0 30rpx;
}
.Titel img{
  width: 46rpx;
  height: 46rpx;
}
.Line{
  width:100%;
  height: 2rpx;
  background-color: #eee;
}
.Btns{
  height: 200rpx;
  display: flex;
  justify-content:space-around;
  align-items:center;
}
.Btn{
  display:flex;
  flex-direction:column;
  align-items:center;
  /* background-color: rgb(175, 255, 243); */
}
.Btn img{
  width: 80rpx;
  height: 80rpx;
}
.Btn text{
  font-size: 13px;
  color: #202020;
}


.zaixainkefu{
  border-radius: 0;
  margin: 0;
  width: 80rpx;
  height: 120rpx;
  line-height: 1.3em;
}
.zaixainkefu img{
  width: 80rpx;
  height: 80rpx;
}
.loginBt{
  margin: 0;
  color: white;
  font-size: 16px;
  background-color: #00c3ff;
  height: 60rpx;
  width: 160rpx;
  line-height: 60rpx;
  border-radius: 10rpx;
}
</style>
