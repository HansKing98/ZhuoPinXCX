<template>
  <div>
    <navbar title='邀请码'></navbar>

    <div class="top">
      <div class="inviteNumber">8z9a12o</div>
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
      </div>
    </div>

  </div>
</template>

<script>
import navbar from '@/components/navbar'
import bt from '@/components/bt'

export default {
  data () {
    return {
      id: 1,
      url: 'http://qr.topscan.com/api.php?text=https://open.weixin.qq.com/sns/getexpappinfo?appid=wx9217cccd75825cff%26path=pages%2Finvite%2Fmain.html%3Fowner%3D'+ 43 +'#wechat-redirect',
      posId: null,
      ownerId: null,
      position: {},
      owner:{}
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
    }
  },
  onLoad (e) {
    this.posId = this.$store.state.selectedPosId
    this.ownerId = this.$store.state.selectedOwnerId
    this.posId = 63
    this.ownerId = 43
    
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
      this.owner = res.name
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
</style>
