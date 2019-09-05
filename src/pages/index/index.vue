<template>
  <div>
    <navbar title='畅校园' :btL=false></navbar>
    <div v-if="webState==250">
      <swiper :images='images'></swiper>
      <div class="xiaoli">
        <img src="http://hr.test.getkin.cn/Uploads/images/xl/xiaoli2018-2-0.jpg" alt="">
      </div>
    </div>
    <div v-else class="show">
      <swiper :images='images'></swiper>
      <div class="jobs">
        <div class="" v-for="(item, index) in positions" :key="index" @click="goNav_intojob($event)" @tap='tap(item)'>
              <img v-if="item.state === '0'" class="overdue" src="/static/icon/overdue.png" alt="已停止">
              <div v-else class="overdue"></div>
          <div class="job">
              <img :src="item.url" alt="" mode='aspectFill'>
              <div class="detail">
                  <div class="firstline">
                      <div :class="item.state==='1'?'position':'position_ov'">{{item.positionname}}</div>
                      <div :class="item.state==='1'?'salary':'salary_ov'">{{item.salary}}</div>
                  </div>
                  <div class="seceondline">{{item.position}}</div>
                  <div class="thirdline">
                    <div>{{item.education}}</div>
                    <div>{{item.jobexperience}}</div>
                    <div>{{item.ability}}</div>                
                  </div>
                  <div class="company">{{item.customername}}</div>
              </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import navbar from '@/components/navbar'
import swiper from '@/components/swiper'
import bt from '@/components/bt'
import wx from '@/utils/wx'
import config from '@/config'

export default {
  async created () {
    const webState = await wx.request({
      url: config.host + '/Wx/GetWebState?hans=9527'
    })
    this.webState = webState
    mpvue.setStorageSync('webState', webState)
    console.log('webState', this.webState)
  },
  data () {
    return {
      webState: '',
      images: [
        { url: '/static/images/banner/banner1.jpg' },
        { url: '/static/images/banner/banner2.jpg' }
      ],
      positions: {}
    }
  },
  props: {

  },
  components: {
    navbar, swiper, bt
  },
  methods: {
    goNav_intojob (e) {
      mpvue.navigateTo({ url: '/pages/index/intoJob/main' })
    },
    tap (e) {
      // 收到 e 为选中的职位
      // 改变全局变量' jpbSelected '
      // console.log('eee', e);

      this.$store.commit('jobChange', e)
    }
  },
  async onLoad () {
    //

    //
    this.$httpWX.get({
      url: '/GetPosition',
      header: {
        'Content-type': 'application/json' // 默认值
      }
    }).then(res => {
      // let detail = res
      // var regex1 = /\((.+?)\)/g;  // () 小括号
      // var regex2 = /\[(.+?)\]/g;  // [] 中括号
      // var regex3 = /\{(.+?)\}/g; // {} 花括号，大括号

      // // 切片
      // let detailMatch = detail.match(/\[(.+?)\]/g)[0]
      // let detailMatchJSON = JSON.parse(detailMatch)
      // this.positions =  detailMatchJSON

      this.positions = res
      console.log('职位列表', this.positions)
    })
  }
}
</script>

<style lang="wxss">
page{
  background-color: #ecf9f7;
}
</style>

<style>
.xiaoli img{
  width: 100%;
  height: 1200rpx;
}
/* 金刚区 */
.show{
  height: 220rpx;
  position: relative;
  margin-top: -40rpx;
}
.jobs{
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  align-items:center;
  background-color: white;
  border-radius: 40rpx;
  height: 100hv;
}
.job{
  /* margin-top: -150rpx; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 94%;
  height: 270rpx;
  background-color: white;
  margin: -150rpx 0 10rpx 10rpx;
  border-radius: 30rpx;
  padding: 0 10rpx;
  /* border: 1px solid #74b9ff; */
  /* box-shadow: 3rpx 3rpx 10rpx rgba(75, 207, 250, 0.5); */
 box-shadow: rgba(77, 178, 255, 0.301) 20rpx 10rpx 30rpx 1rpx ;

}
img{
  width: 250rpx;
  height: 250rpx;
  border-radius: 20rpx;
}
.detail{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* background-color: rgb(230, 255, 227); */
  width: 420rpx;
  height: 230rpx;
  padding: 10rpx;
}
.firstline{
  display: flex;
  justify-content: space-between;
}
.seceondline{
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #6e6e6e;
}
.thirdline{
  width: 65%;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #6e6e6e;
}
.position {
  font-size: 18px;
  color: #0984e3;
  border-bottom: 2px solid #74b9ff;
  /* background-color: #d7ffff; */
}
.position_ov {
  font-size: 18px;
  color: #bbbbbb;
  border-bottom: 2px solid #bbbbbb;
  /* background-color: #d7ffff; */
}
.salary{
  color: #ff4d4d;
  font-size: 15px;
  font-weight: bold;
}
.salary_ov{
  color: #bbbbbb;
  font-size: 15px;
  font-weight: bold;
}
.company{
  font-size: 13px;
  color: #6e6e6e;
}
.overdue{
  margin: 0 100rpx 0 500rpx;
  position: relative;
  width: 160rpx;
  height: 160rpx;
  /* float: right; */
  z-index: 1;
}
</style>
