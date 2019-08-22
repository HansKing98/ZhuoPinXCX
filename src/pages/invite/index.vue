<template>
  <div>
    <navbar title='推荐人' :btL=false></navbar>
    <div class="page">
      <div class="card">

        <div class="top">
          <div>您的职位推荐人</div>
          <div class="head">
            <img :src="randomHead" alt="">
          </div>
          <div class="vip">专属猎头</div>
          <div class="name">
            {{invDatahans.name}}
          </div>
        </div>

        <div class="bottom">
          <button class="queren" @tap="goNav_Home($event)">确认</button>
          <!-- <button class="youwu">信息有误</button> -->
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
      invDatahans: [{
        name: '未获取',
        statu: '获取失败'
      }],
      owner : 0,
      randomNumber:'0',
      randomHead:'/static/images/head/head-'+ 0 +'.png'
    }
  },
  components: {
    navbar, bt
  },
  methods: {
    goNav_Home ($event) {
      mpvue.switchTab({ url: '/pages/index/main' })
    // },
    // inviteErr () {

    }
  },
  onLoad (e) {
    console.log('e', e);
    if (e.owner||e.scene) {
      console.log('传进来owner值了');
      if (e.owner) {
        this.ownerId = e.owner
      } else {
        this.ownerId = e.scene
      }
    }else{
      console.log('没传owner');
       this.ownerId = mpvue.getStorageSync('ownerId')
    }

    this.$httpWX.post({
      url: '/GetName',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        owner: this.ownerId
      }
    }).then(res => {
      // let detail = res
      // let detailMatch = detail.match(/\{[^\}]+\}/)[0]
      // let detailMatchJSON = JSON.parse(detailMatch)
      // this.invDatahans = detailMatchJSON
      // console.log('rea', res)
      this.invDatahans = res
      console.log('invDatahans', this.invDatahans)
    })
    // // 储存 owner
    // this.$store.commit('ownerIdChange', this.owner)

    // var hanskkk = this.ownerId
    // console.log('hanskkk', typeof(hanskkk))
    
      switch ( String( parseInt(this.ownerId) % 4 ) ) {
        case '0':
          this.randomNumber = '0'
          break
        case '1':
          this.randomNumber = '1'
          break
        case '2':
          this.randomNumber = '2'
          break
        case '3':
          this.randomNumber = '3'
          break
      }
      this.randomHead =  '/static/images/head/head-'+ this.randomNumber +'.png'
  },
  created () {

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
.page{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 900rpx;
  width: 670rpx;
  background-color: white;
  border-radius: 30rpx;
  margin: 20rpx 0;
  padding: 30rpx;
  /* box-shadow: 3rpx 3rpx 10rpx rgba(75, 207, 250, 0.3); */
}
.top{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 96%;
  height: 400rpx;
  border-radius: 20rpx;
  box-shadow: rgba(77, 178, 255, 0.575) 20rpx 10rpx 50rpx 10rpx ;
  margin-bottom: 50rpx;
}
.vip{
  font-size: 12px;
  color: #ee5253;
}
.bottom{
  display: flex;
  flex-direction: column;
  justify-content:space-around;
  align-items: center;
  height: 200rpx;
  
  font-weight: 400;
}
.head{
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;;
  border:1px solid #d2dae2;
}
.head img{
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
}
.bottom .queren{
  width: 300rpx;
  height: 80rpx;
  border-radius: 40rpx;
  background-color: #0fbcf9;
  color: white;
  font-size: 16px;
  box-shadow: rgba(77, 178, 255, 0.527) 20rpx 10rpx 30rpx 1rpx ;
  text-align: center;
}
.bottom .youwu{
  width: 300rpx;
  height: 80rpx;
  border-radius: 40rpx;
  border: 1px solid #ff6e66;
  color: #ff6e66;
  font-size: 16px;
  box-shadow: rgba(255, 77, 77, 0.301) 20rpx 10rpx 30rpx 1rpx ;
  text-align: center;
}
</style>
