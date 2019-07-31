<template>
  <div>
    <navbar title='我的' :btL=false></navbar>

    <div class="top">
            <div class="user">
                <button class="avatar"  @tap='tapEvent' id="icon">
                  <open-data type="userAvatarUrl" ></open-data>
                </button>
                <div class="name">
                <open-data type="userNickName" ></open-data>
                </div>
            </div>
            <div class="top_bo"></div>
    </div>
    <div class="middle">
      <div class="orders">
        <div class="Titel">所有进程</div>
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
          <div class="Btn" v-for="(item, index) in mores" :key="index" @click="tap(item)">
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
// let theModuleName = 'pages/my'
export default {
  data () {
    return {
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      USERavatarUrl: 'http://pic41.nipic.com/20140508/18609517_112216473140_2.jpg',
      USERnickName: '授权登录',
      orders: [
        { text: '已投递', url: '/static/images/my/ytd.png' },
        { text: '已查阅', url: '/static/images/my/ycy.png' },
        { text: '待面试', url: '/static/images/my/dms.png' },
        { text: '面试完成', url: '/static/images/my/mswc.png' }
      ],
      mores: [
        { text: '线上简历', url: '/static/images/my/upload.png' },
        { text: '简历附件', url: '/static/images/my/resume.png' },
        { text: '客服', url: '/static/images/my/mswcact.png' }
      ]
    }
  },

  components: {
    navbar
  },
  onShow () {

  },
  methods: {
    onLoad: function () {
      // 查看是否授权
      mpvue.getSetting({
        success (res) {
          console.log('res', res)
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            mpvue.getUserInfo({
              success: function (res) {
                console.log(res.userInfo)
              },
              fail: function (res) {
                console.log('fail', res.userInfo)
              }
            })
          }
        }
      })
    },
    bindGetUserInfo (e) {
      console.log(e.mp.detail.userInfo)
      let userInfo = e.mp.detail.userInfo
      this.USERavatarUrl = userInfo.avatarUrl
      this.USERnickName = userInfo.nickName
    },
    tap (i) {
      let url = '/pages/order/main'
      switch (i.text) {
        case '待付款':
          this.$store.commit('orderTypeChange', 1)
          mpvue.navigateTo({ url })
          break
        case '待发货':
          this.$store.commit('orderTypeChange', 2)
          mpvue.navigateTo({ url })
          break
        case '待收货':
          this.$store.commit('orderTypeChange', 3)
          mpvue.navigateTo({ url })
          break
        case '全部订单':
          this.$store.commit('orderTypeChange', 0)
          mpvue.navigateTo({ url })
          break
        case '收货地':
          com.addr()
          break
        case '收藏夹':
          url = '/pages/my/star/main'
          mpvue.navigateTo({ url })
          break
        case '找客服':
          mpvue.makePhoneCall({
            phoneNumber: '18522133769'
          })
          break
      }
    }
  },

  created () {
    // let app = getApp()
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
  margin-left: 30rpx;
  margin-right: 20rpx;
}
.name{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  color: #FFFFFF;
}
.name open-data{
  font-size: 18px;
}
.name button{
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
  font-size: 15px;
  padding: 30rpx;
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

</style>
