<template>
  <div>
    <navbar title='首页' :btL=false></navbar>
    <swiper :images='images'></swiper>
    <!-- 金刚区 -->
    <div class="show">
      <div class="jobs">
        <div class="job" v-for="(item, index) in positions" :key="index" @click="goNav_job($event)">
          <img src="http://img4.imgtn.bdimg.com/it/u=1884062997,2204223769&fm=26&gp=0.jpg" alt="">
          <div class="detail">
            <div class="company">{{item.customername}}</div>
            <div class="position">{{item.positionname}}</div>
            <div class="salary_people">
              <div class="salary">
                薪资:<text>12k-17k</text> 
              </div>
              <div class="people">
                人数:<text>5</text>
              </div>
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

export default {
  data () {
    return {
      images: [
        { url: 'https://ww3.sinaimg.cn/bmiddle/836923c4gy1g57fnjjlxwj22c0340hdt.jpg' },
        { url: 'https://ww4.sinaimg.cn/bmiddle/87b1226cly1g57fmojxpxj24mo334b2n.jpg' }
      ],
      positions:{}
    }
  },
  props: {

  },
  components: {
    navbar, swiper, bt
  },
  methods: {
    goNav_job (i) {
      mpvue.navigateTo({ url: '/pages/form/main' })
    }
  },
  onLoad () {
    getInvite: {
      this.$httpWX.get({
        url: '/GetPosition',
        header: {
          'Content-type': 'application/json' // 默认值
        },
      }).then(res => {
        let detail = res
        // console.log(res)

        // var regex1 = /\((.+?)\)/g;  // () 小括号
        // var regex2 = /\[(.+?)\]/g;  // [] 中括号
        // var regex3 = /\{(.+?)\}/g; // {} 花括号，大括号

        let detailMatch = detail.match(/\[(.+?)\]/g)[0]
        let detailMatchJSON = JSON.parse(detailMatch)
        this.positions =  detailMatchJSON
        console.log('职位列表', this.positions)
      })
    }
  },
  created () {
    // let app = getApp()
  }
}
</script>

<style lang="wxss">
page{
  background-color: #ecf9f7;
}
</style>

<style>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 94%;
  height: 270rpx;
  background-color: white;
  margin: 10rpx 0;
  border-radius: 30rpx;
  padding: 0 10rpx;
  box-shadow: 3rpx 3rpx 10rpx rgba(75, 207, 250, 0.5);
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
/* .company{
  color: #02d5b7;
  background-color: #d7ffff;
}
.position{
  background-color: #75ffff;
} */
.salary_people{
  /* background-color: #d9ffff; */
  display:flex;
  justify-content: space-between;
  font-size: 13px;
}
.people{
  margin-right: 30rpx;
}
.salary_people text{
  color: #FF4666;
  font-size: 12px;
}
</style>
