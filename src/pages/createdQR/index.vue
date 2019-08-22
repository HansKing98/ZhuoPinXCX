<template>
  <div>
    <navbar title='邀请码'></navbar>

    <div class="top">
      <div class="inviteNumber">{{ownerId}}</div>
      <div class="inviteDetail">
        <div>邀请人：{{owner}}</div>
        <!-- <div>职位：{{posId}}</div> -->
      </div>
      <img :src="url" alt="" bindlongpress="saveImage">
    </div>
    <div class="bottom">
      <div class="card">
        <div class="cardin">
          <div>1. 以上为生成的邀请码，请核查信息 </div>
          <div>2. 邀请码职位信息可为空</div>
          <div>3. 邀请码职位公司信息可为空</div>
          <div class="red">4. 截屏并将邀请码发送到朋友圈</div>
          <div class="red">5. 点击二维码编辑邀请信息</div>
        </div>
        <p>下方进行邀请人id修改</p>
        <div class="changhOwner">
          <input class="ownerInput" type="123" :value="ownerId" @input="ownerChangeTem($event)">
          <button class="ownerbt" @click="ownerChange">确定</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import navbar from '@/components/navbar'
import bt from '@/components/bt'
import config from '@/config'
import wx from '@/utils/wx'

export default {
  data () {
    return {
      id: 1,
      url: 'http://qr.topscan.com/api.php?text=https://open.weixin.qq.com/sns/getexpappinfo?appid=wx9217cccd75825cff%26path=pages%2Finvite%2Fmain.html%3Fowner%3D'+ 1 +'#wechat-redirect',
      posId: null,
      ownerId: null,
      position: {},
      owner:'',


      appid: config.appid,
      secret: config.secret,
      access_token:''
    }
  },
  components: {
    navbar, bt
  },
  methods: {
    saveImg(e){
        let url = e.currentTarget.dataset.url;
        wx.saveImageToPhotosAlbum({
            filePath:url,
            success(res) { 
              console.log(res);
            },
            fail(res){
              console.log(res);
            }
          })
    },
    ownerChangeTem(e){
      console.log(e.mp.detail.value);
      this.temownerId = e.mp.detail.value
    },
    ownerChange(){
      this.ownerId = this.temownerId
      mpvue.setStorageSync('ownerId', this.temownerId)
      let page = getCurrentPages().pop()
      page.onLoad()
    }
  },
  async onLoad (e) {
    // get access_token
    const getAccessToken = await wx.request({
      url: config.host + '/Wx/getAccessToken',
      data: {
        'appid': this.appid,
        'secret': this.secret,
      },
      method: 'get'
    })
    this.access_token = getAccessToken.access_token
    console.log('TOKEN : ', this.access_token);
    //get QRcode
    const getQRcode = await wx.request({
      url: config.host + '/Wx/getUnlimitedT',  
      data: { 
        'access_token': getAccessToken.access_token,
        'scene': '78',
        'page': 'pages/invite/main',
      },
      method: 'get'
    })
    console.log('QRcode : ', getQRcode);


    // this.posId = this.$store.state.selectedPosId
    // this.ownerId = this.$store.state.selectedOwnerId
    // this.posId = 63
    // this.ownerId = 43
    this.ownerId = mpvue.getStorageSync('ownerId')
    console.log('1owner:', this.ownerId);
  
    this.url = 'http://qr.topscan.com/api.php?text=https://open.weixin.qq.com/sns/getexpappinfo?appid=wx9217cccd75825cff%26path=pages%2Finvite%2Fmain.html%3Fowner%3D'+ this.ownerId +'#wechat-redirect'
    console.log(this.url);

    this.$httpWX.post({
      url: '/GetPosById',
      header: {
        'Content-type': 'application/json' // 默认值
      },
      data: {
        id : this.posId
      }
    }).then(res => {
      console.log(res);
      this.position = res
      console.log('职位信息', this.positions)
    })

    this.$httpWX.post({
      url: '/GetName',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        owner: this.ownerId
      }
    }).then(res => {
      if (res.name) {
        this.owner = res.name
      } else {
        this.owner = '无'
      }
      console.log('owner', this.owner)
    })

  },
  created () {
    // let app = getApp()
  }
}
</script>

<style lang="wxss">
page{
  background-color: white;
  font-size: 18px;
}
</style>

<style>
img{
  width: 300rpx;
  height: 300rpx;
}

.top{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items:center;
  height: 40vh;
  background: linear-gradient(#0fbcf9, #7cdcff);
  box-shadow: rgba(9, 133, 227, 0.459) 30rpx 10rpx 50rpx 1rpx ;
  margin-top: -1rpx;
  border-radius:0 0 200rpx 200rpx;
  padding-bottom: 50rpx;
  color: white;
}
.inviteNumber{

}
.inviteDetail{

}
.bottom{
  display: flex;
  align-items: flex-end;
  height: 45vh;
  /* background-color: #0fbcf9; */
}
.bottom .card{
  border-radius: 30% 30% 0 0;
  width: 100%;
  height: 90%;
  background: linear-gradient(#ffffff, #ffffff);
  box-shadow: rgba(9, 133, 227, 0.089) 30rpx -30rpx 30rpx 1rpx ;
  font-size: 14px;
  line-height: 1.5em;
  color: rgb(66, 66, 66);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cardin{
  display: flex;
  flex-direction: column;
  padding-top: 100rpx;
  width: 500rpx;
  height: 300rpx;
}
.red{
  color: #ff4757;
}
.changhOwner{
  display: flex;
  margin:20rpx;
}
.ownerInput{
  width: 100rpx;
  height: 50rpx;
  border-radius: 10rpx;
  background-color: #eaf9ff;
  padding-left: 30rpx;
}
.ownerbt{
 background-color: #d63031;
 width: 80rpx;
 height: 50rpx;
 line-height: 50rpx;
 color: white;
 display: flex;
 align-items: center;
 justify-content: center;
 border-radius: 40rpx;
 margin-left: 20rpx;
 box-shadow: rgba(214, 48, 48, 0.418) 10rpx 10rpx 50rpx 1rpx ;
}
</style>
