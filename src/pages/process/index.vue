<template>
  <div>
    <navbar title='简历进程'></navbar>
			<scroll-view :scroll-x="true">
				<div class="top">
					<div
					v-for="(tab, index) in types" :class="[typeIdx == index ? 'Line' : 'noLine']" 
					:id="index" 
					@tap="tabChange" 
					:key="index">
						{{tab.name}}
					</div>
				</div>
			</scroll-view>
      <swiper class="orders" :current="typeIdx" @change="swiperChange" :style='{height: height}'>
				<swiper-item >
          <Allorder :orders ='list0' emptyText='亲，您还没有投递简历哦。。。'></Allorder>
				</swiper-item>
				<swiper-item>
					<Allorder :orders ='list1' emptyText='耐心等待，面试通知马上来到。'></Allorder>
				</swiper-item>
				<swiper-item >
					<Allorder :orders ='list2' emptyText='面试过程怎么样，我和你一样期待这份offer呢。'></Allorder>
				</swiper-item>
			</swiper>
  </div>
</template>

<script>
import navbar from '@/components/navbar'
import bt from '@/components/bt'
import Allorder from './allprogress'
import config from '@/config'
import wx from '@/utils/wx'

export default {
  data () {
    return {
      typeIdx: 0,
      types: [
        { name: '全部', id: 'guanzhu', where: {} },
        { name: '待面试', id: 'tiyu', where: {payed: true, logistics: 1} },
        { name: 'offer', id: 'redian', where: {payed: true, logistics: 2} }
      ],
      list0: [],
      list1: [],
      list2: [],

    }
  },
  components: {
    navbar, bt, Allorder
  },
  methods: {
    tabChange: function (e) {
      this.typeIdx = e.target.id
      console.log(this.typeIdx);
      
    },
    swiperChange: function (e) {
      e.target.current === this.typeIdx || (this.typeIdx = e.target.current)
    }
  },
  onShow (e) {
    this.swiperChange({target: {current: this.$store.state.processType}})
  },
  async onLoad () {
    this.openid = mpvue.getStorageSync('openid')
    // this.ProStatus = '' 
    for (let i = 0; i < this.types.length; i++) {
      switch (i) {
        case 1:
          this.ProStatus = 5
          break;
        case 2:
          this.ProStatus = 7
          break;
        default:
          this.ProStatus = 0
          break;
      }
      const process = await wx.request({
        url: config.host + '/Wx/GetProcess',
        data: {
          'openid': this.openid,
          'status': this.ProStatus
        },
        method: 'get'
      })
      console.log('process' + i, process);
      this['list' + i] = process
      console.log('list' + i,  this['list' + i]);
    }

  },
  created () {

  }
}
</script>

<style lang="wxss">
page{
  background-color: #f3f3f3;
  color: #202020;
  font-size: 18px;
}
</style>

<style>
.top{
  display: flex;
  justify-content:space-around;
  align-items: center;
  height: 120rpx;
  border-radius: 0 0 30rpx 30rpx;
  background-color: #0fbcf9;
  margin-top: -1rpx;
}
.Line{
  width: 78rpx;
  height: 47rpx;
  /* background-color: rgb(255, 90, 72); */
  font-size: 13px;
  font-weight: bold;
  color: white;
  border-bottom: 8rpx solid #ffffff;
  text-align: center;
}

.noLine{
  width: 78rpx;
  height: 51rpx;
  /* background-color: rgb(255, 90, 72); */
  font-size: 13px;
  color: white;
  text-align: center;
}

</style>
