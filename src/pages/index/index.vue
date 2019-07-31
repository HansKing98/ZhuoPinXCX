<template>
  <div>
    <navbar title='畅校园' :btL=false></navbar>
    <swiper :images='images'></swiper>

    <div class="show">
      <div class="jobs">
        <div class="job" v-for="(item, index) in positions" :key="index" @click="goNav_intojob($event)" @tap='tap(item)'>
          <img :src="item.url" alt="" mode='aspectFill'>
          <div class="detail">
            <div class="company">{{item.customername}}</div>
            <div class="position">{{item.positionname}}</div>
            <div class="salary_people">
              <div class="salary">
                薪资:<text>{{item.salary}}</text> 
              </div>
              <div class="people">
                人数:<text>{{item.people}}</text>
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
  onLoad () {
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
  },
  created () {

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
.company{
  width: 50%;
  color: #0984e3;
  border-bottom: 2px solid #74b9ff;
  /* background-color: #d7ffff; */
}
/* .position{
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
