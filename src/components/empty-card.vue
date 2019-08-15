<template>
        <div class="empty">
          <img :src="img" mode='aspectFit'>
          <text>{{text}}</text>
          <bt :text='bt_text' type='primary' :tapBt='tap' :id='id' width='270rpx' height='80rpx' fontSize='18px' margin='0 0 100rpx 0' ></bt>
        </div>
</template>

<script>
import bt from '@/components/bt'
export default {
  components: {
    bt
  },
  props: {
    text: {
      type: String,
      default: '亲，您还没有投递简历哦~~'
    },
    bt_text: {
      type: String,
      default: '去投简历'
    },
    img: {
      type: String,
      default: '/static/images/cart/empty.png'
    },
    id: String
  },
  data () {
    return {
    }
  },
  methods: {
    tap (e) {
      switch (e.currentTarget.id) {
        case 'buy':
          mpvue.switchTab({
            url: '/pages/buy/main'
          })
          break
        case 'order':
          mpvue.switchTab({
            url: '/pages/index/main'
          })
          break
      }
    }
  }
}
</script>

<style>
/* empty卡片 */
.empty{
  display: flex;
  flex-direction: column;
  justify-content:space-around;
  align-items:center;
  height: 750rpx;
  /* background-color: rgb(255, 189, 189); */
  font-size: 15px;
  color: #202020;
}
.empty img {
  /*width: auto;*/
  margin-top: 160rpx;
  height: 200rpx;
  width: 200rpx;
}
</style>
