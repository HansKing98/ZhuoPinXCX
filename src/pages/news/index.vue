<template>
  <div>
    <navbar title='畅热点' :btL=false></navbar>
    <div class="page">
      <div class="card">
        <div class="top">
          <div>畅热点-校企新闻资讯</div>
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
      }]
    }
  },
  components: {
    navbar, bt
  },
  methods: {

  },
  onLoad () {
    this.$httpWX.post({
      url: '/GetName',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        owner: '43'
      }
    }).then(res => {
      let detail = res
      let detailMatch = detail.match(/\{[^ }]+\}/)[0]
      let detailMatchJSON = JSON.parse(detailMatch)
      this.invDatahans = detailMatchJSON
      console.log(this.invDatahans)
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
  height: 400rpx
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
</style>
