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
        <div class="ordernum">档案编号：{{i.bianhao}}</div>
        <div class="detail">
          <p>{{i.zhuangtai}}</p>
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
    // orders: Array,
    // emptyText: String
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
.order .detail{
  position:relative;
  display: flex;
  align-items:center;
  justify-content: center;
  height: 220rpx;
  /* background-color: rgb(255, 164, 164); */
}
.detail-img{
  /* position:absolute;
  left: 0; */
  width: 100%;

  display: flex;
}
.detail-img img{
  width: 160rpx;
  height: 160rpx;
  border-radius: 10rpx;
  margin-right: 10rpx;
}
.detail-price-num{
  position:absolute;
  right: 0;
  box-shadow: -3rpx 0 16rpx -13rpx rgba(0,0,0);
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items:flex-end;
  width: 170rpx;
  height: 218rpx;
  /* background-color: rgb(255, 201, 201); */
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
