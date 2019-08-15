<template>
    <div v-if="!orders.length">
    <!-- <div v-if="0"> -->
      <emptyCard 
      :text="emptyText"
      img = '/static/icon/noProgress.png'
      id='order'
      ></emptyCard>
    </div>
    <div v-else class="orders">
      <div class="order" v-for="(i, idx) in orders" :key="idx">
        <div class="ordernum">档案时间：{{i.addtime}}</div>
        <div class="detail">
          <div class="intro">
            <h1>{{i.name}}</h1>
            <p>{{i.intro}}</p>
          </div>
          <div class="status">
            <div v-if="i.status<5"><div class="statu bt1">已投递</div></div>
            <div v-else-if="i.status<7"><div class="statu bt5">待面试</div></div>
            <div v-else><div class="statu bt7">offer</div></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import navbar from '@/components/navbar'
import bt from '@/components/bt'
import emptyCard from '@/components/empty-card'
import net from '@/utils/request'
import com from '@/utils/common'
export default {
  props: {
    orders: Array,
    emptyText: String
  },
  data () {
    return {
      bianhao:'246786525678xx96',
      orders:[{
        bianhao:'21333213832162783',
        zhuangtai:'已投递'
      }, {
        bianhao:'21333213832162788',
        zhuangtai:'已投递'
      }, {
        bianhao:'21333213832162789',
        zhuangtai:'已经录取'
      }, {
        bianhao:'21333213832162798',
        zhuangtai:'已投递'
      }, {
        bianhao:'21333213832162798',
        zhuangtai:'已投递'
      }, {
        bianhao:'21333213832162798',
        zhuangtai:'已投递'
      }, {
        bianhao:'21333213832162798',
        zhuangtai:'已投递'
      }],
      orders:[]
    }
  },
  components: {
    navbar, bt, emptyCard
  },
  methods: {

  }
}
</script>

<style>
.orders{
  display: flex;
  /* flex-direction:column; */
  flex-wrap: wrap;
  justify-content: center;
  /* background-color: rgb(170, 255, 239); */
  overflow-y: scroll;
  height: 80vh;
}
.order{
  display: flex;
  flex-direction:column;
  justify-content:space-between;
  width: 90%;
  height: 300rpx;
  margin-top: 20rpx;
  padding: 0 30rpx;
  border-radius: 30rpx;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(77, 178, 255, 0.29) 10rpx 10rpx 30rpx 1rpx ;
}
.order .ordernum{
  display: flex;
  align-items:flex-end;
  height: 72rpx;
  font-size: 15px;
  /* background-color: rgb(170, 215, 255); */
}
.detail{
  display: flex;
  align-items: center;
  height: 240rpx;
  /* background-color: #8deaff; */
  margin-left: 50rpx;
}
.detail .intro{
  height: 190rpx;
  width: 80%;
  font-size: 14px;
  color: #666666;
  /* background-color: #0abde3; */
}
.intro h1{
  font-size: 16px;
  color: #3a3a3a;
  font-weight: bold;
  margin: 10rpx 20rpx;
}
.intro p{
  margin-left: 40rpx;
}
.detail .status{
  width: 20%;
}
.statu{
display: flex;
justify-content: center;
height: 80rpx;
line-height: 80rpx;
border-radius: 10rpx;
color: white;
}
.bt1{
  background-color: #0abde3;
  box-shadow: rgba(60, 202, 245, 0.418) 8rpx 8rpx 30rpx 1rpx ;
}
.bt5{
  background-color: #686de0;
  box-shadow: rgba(182, 93, 255, 0.418) 8rpx 8rpx 30rpx 1rpx ;
}
.bt7{
  background-color: #ee5253;
  box-shadow: rgba(214, 48, 48, 0.418) 8rpx 8rpx 30rpx 1rpx ;
}

.price{
  color: #202020;
  margin: 10rpx;
}
.num{
  color: #999999;
  margin: 10rpx;
}
.order .Btns{
  display: flex;
  flex-direction:row;
  height: 108rpx;
  font-size: 13px;
  /* background-color: rgb(179, 220, 255); */
}
</style>
