<template>
  <div>
    <navbar title='首页'></navbar>
    <swiper :images='images'></swiper>
    <!-- 金刚区 -->
    <div class="show">
      <div class="jobs">
        <div class="job" v-for="(item, index) in jobs" :key="index">
          <img :src="item.image" alt="">
          <div class="detail">
            <div class="company">{{item.name}}</div>
            <div class="position">{{item.position}}</div>
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
import bt from "@/components/bt";

export default {
  data () {
    return {
      images: [
        { url: 'https://ww3.sinaimg.cn/bmiddle/836923c4gy1g57fnjjlxwj22c0340hdt.jpg' },
        { url: 'https://ww4.sinaimg.cn/bmiddle/87b1226cly1g57fmojxpxj24mo334b2n.jpg' },
      ],
      jobs:[{
      image:'http://img4.imgtn.bdimg.com/it/u=1884062997,2204223769&fm=26&gp=0.jpg',
      name:'立方石油有限公司',
      position:'长期从事石油相关工作，就职于海上石油平台，年薪10w',
      salary:'12k-17k',
      people:5
    },{
      image:'http://img4.imgtn.bdimg.com/it/u=1884062997,2204223769&fm=26&gp=0.jpg',
      name:'立方石油有限公司',
      position:'长期从事石油相关工作，就职于海上石油平台，年薪10w',
      salary:'12k-17k',
      people:15
    },{
      image:'http://img4.imgtn.bdimg.com/it/u=1884062997,2204223769&fm=26&gp=0.jpg',
      name:'立方石油有限公司',
      position:'长期从事石油相关工作，就职于海上石油平台，年薪10w',
      salary:'12k-17k',
      people:13
    },{
      image:'http://img4.imgtn.bdimg.com/it/u=1884062997,2204223769&fm=26&gp=0.jpg',
      name:'立方石油有限公司',
      position:'长期从事石油相关工作，就职于海上石油平台，年薪10w',
      salary:'12k-17k',
      people:15
    },{
      image:'http://img4.imgtn.bdimg.com/it/u=1884062997,2204223769&fm=26&gp=0.jpg',
      name:'立方石油有限公司',
      position:'长期从事石油相关工作，就职于海上石油平台，年薪10w',
      salary:'12k-17k',
      people:15
    },{
      image:'http://img4.imgtn.bdimg.com/it/u=1884062997,2204223769&fm=26&gp=0.jpg',
      name:'立方石油有限公司',
      position:'长期从事石油相关工作，就职于海上石油平台，年薪10w',
      salary:'12k-17k',
      people:15
    }]
    }
  },
  props: {

  },
  components: {
    navbar, swiper, bt
  },
  methods: {

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
  box-shadow: 3rpx 3rpx 10rpx #81ecec;
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
  color: #02d5b7;
  /* background-color: #d7ffff; */
}
.position{
  /* background-color: #75ffff; */
}
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
