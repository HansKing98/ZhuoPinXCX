<template>
  <div>
    <navbar title='邀请码'></navbar>

    <div class="top">
      <div class="inviteNumber">inviter {{ownerId}}</div>
      <div class="inviteDetail">
        <div>邀请人：{{owner}}</div>
        <!-- <div>职位：{{posId}}</div> -->
      </div>
      <img :src="url" alt="" bindlongpress="saveImage">
    </div>
    <div class="bottom">
      <div class="card">
        <div class="cardin" v-if="webState==250">
          <div>1. 以上为生成的邀请码，请核查信息 </div>
          <div>2. 邀请同学加入畅校园</div>
          <div>3. 课程表功能稍后更新</div>
          <div class="red">4. 截屏并将邀请码发送到朋友圈</div>
          <div class="red">5. 赶快邀请同学加入畅校园小程序吧</div>
        </div>
        <div class="cardin" v-else>
          <div>1. 以上为生成的邀请码，请核查信息 </div>
          <div>2. 邀请码职位信息可为空</div>
          <div>3. 邀请码职位公司信息可为空</div>
          <div class="red">4. 截屏并将邀请码发送到朋友圈</div>
          <div class="red">5. 点击二维码编辑邀请信息</div>
        </div>
        <p>下方进行邀请人id修改</p>
        <div class="changhOwner">
          <input class="ownerInput" type="123" :value="ownerId" :placeholder="ownerId" @input="ownerChangeTem($event)">
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
      url: '',
      posId: null,
      ownerId: null,
      position: {},
      owner:'',


      appid: config.appid,
      secret: config.secret,
      access_token:'',
      webState:''
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
        console.log('键入', e.mp.detail.value);
        this.temownerId = e.mp.detail.value
        console.log('temownerId', this.temownerId);
    },
    ownerChange(){
      if (this.temownerId) {
        this.ownerId = this.temownerId
        console.log('tem t.ownerId', this.ownerId);
        mpvue.setStorageSync('ownerId', this.ownerId)

      } else {
        console.log('no tem t.ownerId', this.ownerId);
        mpvue.setStorageSync('ownerId', this.ownerId)

      }
      let page = getCurrentPages().pop()
      page.onLoad()
    }
  },
  async created () {
    this.ownerId = mpvue.getStorageSync('ownerId')
    console.log('ownerId',ownerId);
    this.url= config.host + '/Uploads/images/QR/owner'+ this.ownerId +'.png'
  },
  async onLoad (e) {
    this.url= config.host + '/Uploads/images/QR/owner1.png'
    const webState = await wx.request({
      url: config.host + '/Wx/GetWebState?hans=9527',  
    })
    this.webState = webState
    console.log('webState', this.webState);

    this.ownerId = mpvue.getStorageSync('ownerId')
    console.log('t.ownerId',this.ownerId);
    // 查看图片是否存在
    // 这一步在 iphone 端报错了
    // 这一步在 iphone 端报错了
    // const QRcode = await wx.request({
    //   url: config.host + '/Uploads/images/QR/owner'+ this.ownerId +'.png',  
    // })
    // 这一步在 iphone 端报错了
    // 这一步在 iphone 端报错了

    // bug 修复
    const QRcode = config.host + '/Uploads/images/QR/owner'+ this.ownerId +'.png'



    console.log('QRcode',QRcode);
    console.log('QRcode.l',QRcode.length);
    
    // QRcode.length < 300 返回的不是小程序码
    if (QRcode.length < 300) {
      // 服务器无此小程序码 下面生成
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
          'scene': this.ownerId,
          'page': 'pages/invite/main',
        },
        method: 'get'
      })
      console.log('QRcode : ', getQRcode);
      console.log('小程序码储存成功');
      this.url= config.host + '/Uploads/images/QR/owner'+ this.ownerId +'.png'
      console.log('小程序码调用成功');
    }else{
      // 小程序码已存在 下面调用
      // 暂时不用这里 在上一步直接生成
      this.url= config.host + '/Uploads/images/QR/owner'+ this.ownerId +'.png'
      console.log('小程序码调用。。。');
      console.log('t.ownerId', this.ownerId);
      console.log('小程序码url', this.url);
      
    }
  
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
  border-radius: 10%;
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
