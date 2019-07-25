<template>
  <div>
    <navbar title='展示'></navbar>
    <div class="page">
      <div class="card">
        <div class="top">
          <div>您的职位推荐人</div>
          <div>
            <img src="http://pic41.nipic.com/20140508/18609517_112216473140_2.jpg" alt="">
          </div>
          <div class="name">
            余尚坤
          </div>
        </div>
        <div class="bottom">
          <button>确认</button>
          <button>信息有误</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from '@/components/navbar'
import bt from "@/components/bt";

export default {
  data () {
    return {
      name :'邀请人'
    }
  },
  components: {
    navbar
  },
  methods: {

  },
  onLoad () {
    mpvue.request({
      url: 'http://hr.test.getkin.cn/Wx/GetName', //仅为示例，并非真实的接口地址
      method: "POST",
      data: {
        owner: '34'
      },
      dataType:JSON,
      header: {
        'content-type': "application/x-www-form-urlencoded" // 默认值
      },
      success (res) {
        console.log('原始', res)
        // console.log(array);
        
        // JSON.parse(res.data)
      }
    })
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
}
.top{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400rpx
}
.bottom{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 500rpx
}
img{
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
}
button{
  width: 300rpx;
  height: 70rpx;
  border-radius: 35rpx;
  margin-bottom: 20rpx;
  background-color: rgb(255, 255, 255);
}
</style>
