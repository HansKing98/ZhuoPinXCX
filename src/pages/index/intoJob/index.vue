<template>
  <div>
    <navbar title='畅校园' :btL=false></navbar>
    <div class="pos_detail">
      <div class="fistline">
        <div class="position">{{position.positionname}}</div>
        <div class="salary">{{position.salary}}</div>
      </div>
      <div class="secondline">
        <div class="sec_left">
          <div>{{position.customername}}</div>
          <div class="three">
            <div class="biaoshi"><img src="/static/images/intoJob/time.png" alt=""><text>{{position.jobexperience}}</text></div>
            <div class="biaoshi"><img src="/static/images/intoJob/education.png" alt=""><text>{{position.education}}</text></div>
            <div class="biaoshi"><img src="/static/images/intoJob/jobtype.png" alt=""><text>{{position.jobtype}}</text></div>
          </div>
        </div>
        <div class="sec_right">
          <img :src="position.url" alt="" mode='aspectFill'>
        </div>
      </div>

      <div class="place_time"></div>
      <div class="place">
        <img src="/static/images/intoJob/position.png" alt="" mode='aspectFill'>
        <div>{{position.position}}</div>
      </div>
    </div>

    <div class="pos_describe">
      <div class="pos_title">
        <img src="/static/images/intoJob/pos_title.png" alt="">
        <div>职位描述</div>
        <div class="Line"></div>
      </div>
      <div class="pos_xiangqing"> 
        <!-- <p>id：{{position.id}}</p> -->
        <!-- <p>职位：{{position.positionname}}</p> -->
        <!-- <p>客户：{{position.customername}}</p> -->
        <p>工作性质：{{position.jobtype}}</p>
        <!-- <p>工作地址：{{position.position}}</p> -->
        <p>最低学历：{{position.education}}</p> 
        <p>工作年限/经验:{{position.jobexperience}}</p> 
        <p>所需技能：{{position.ability}}</p>
        <p>薪资：{{position.salary}}</p>
        <p>需要人数：{{position.people}}</p>
        <text>详情：{{position.detail}}</text>
      </div>
    </div>

    <footer>
      <button open-type='share' class="share"><img src="/static/images/intoJob/share.png" alt=""></button>
      <button class="send" @click="goNav_job($event)">投递简历</button>
    </footer>

  </div>
</template>

<script>
import navbar from '@/components/navbar'
import bt from '@/components/bt'
import com from '@/utils/common'
import wx from '@/utils/wx'
import { delay } from 'q';

export default {
  data () {
    return {
      position: {},
      ownerId:'',
      positionId: ''

    }
  },
  components: {
    navbar, bt
  },
  methods: {
    async goNav_job (e) {
      // 获取 setting
      const setting = await wx.getSetting()
        console.log(setting);
      // 是否 授权
      if (setting.authSetting['scope.userInfo']) {
        mpvue.navigateTo({ url: '/pages/form/main' })
      }else{
        com.tos('您还没有登录，跳转到 我的 页面进行授权')
        
        setTimeout(() => {
          console.log('停留了1s')
          mpvue.switchTab({
            url: '/pages/my/main',   //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
          })
        }, 1500)

      }
    }
  },
  // 页面分享配置
  onShareAppMessage(options) {
      console.log('invDatahans',this.invDatahans);
      console.log('ownerId',this.ownerId);
      console.log('position.id',this.position.id);
      console.log('positionId',this.positionId);
      
  　　// 设置菜单中的转发按钮触发转发事件时的转发内容
  　　var shareObj = {
  　　　　title: this.invDatahans.name + "邀请你投递简历！",        // 默认是小程序的名称(可以写slogan等)
  　　　　path: "pages/index/intoJob/main?ownerId=" + this.ownerId +"&positionId=" + this.positionId,        // 默认是当前页面，必须是以‘/’开头的完整路径
  　　　　imageUrl: "",     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
  　　　　success: function(res){
  　　　　　　// 转发成功之后的回调
  　　　　　　if(res.errMsg == 'shareAppMessage:ok'){
              console.log();
              
  　　　　　　}
  　　　　},
  　　　　fail: function(){
  　　　　　　// 转发失败之后的回调
  　　　　　　if(res.errMsg == 'shareAppMessage:fail cancel'){
  　　　　　　　　// 用户取消转发
  　　　　　　}else if(res.errMsg == 'shareAppMessage:fail'){
  　　　　　　　　// 转发失败，其中 detail message 为详细失败信息
  　　　　　　}
  　　　　},
  　　　　complete (){
  　　　　　　// 转发结束之后的回调（转发成不成功都会执行）
  　　　　}
  　　}
  　　// 来自页面内的按钮的转发
  　　if( options.from == 'button' ){
        // console.log( options )
        // var eData = options.target.dataset;
        // console.log( eData.name );     // shareBtn
        // 此处可以修改 shareObj 中的内容
        // shareObj.path = '/pages/btnname/btnname?btn_name='+eData.name;
  　　}
  　　// 返回shareObj
  　　return shareObj;
  },
  async onLoad (options) {
    console.log('onLoad-options',options)                // ok
    if (options.positionId) {
      this.ownerId = options.ownerId
      this.positionId = options.positionId
    } else {
      this.ownerId = mpvue.getStorageSync('ownerId')
      // 传入职位相关信息
      if (this.$store.state.selectedJob) {
        this.position = this.$store.state.selectedJob
      }
      this.positionId = this.position.id
      console.log('2', this.positionId);
    }

    mpvue.setStorageSync('positionId', this.positionId)
    // 根据 positionId 获取 position 详细数据
    var that = this
    this.$httpWX.get({
      url: '/GetPositionById',
      data:{
        id: this.positionId
      },
      header: {
        'Content-type': 'application/json' // 默认值
      }
    }).then(res => {
      that.position = res
      this.position = res
    })
    // 获取邀请人姓名
    this.$httpWX.post({
      url: '/GetName',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        owner: 78
        // owner: this.ownerId
      }
    }).then(res => {
      // let detail = res
      // let detailMatch = detail.match(/\{[^\}]+\}/)[0]
      // let detailMatchJSON = JSON.parse(detailMatch)
      // this.invDatahans = detailMatchJSON
      // console.log('rea', res)
      this.invDatahans = res
    })
    console.log('invDatahans:',invDatahans);
  },
  created () {

  }
}
</script>

<style lang="wxss">
page{
  background-color: #f5f5f5;
  color: #202020;
  font-size: 18px;
}
</style>

<style>
.pos_detail{
  background-color: white;
  padding: 30rpx;
  margin-bottom: 10rpx;
}
.fistline{
  display: flex;
  justify-content: space-between;
}
.secondline{
  display: flex;
  justify-content: space-between;
  color: #6e6e6e;
}
.sec_left{
  font-size: 14px;
  margin-top: 40rpx;
}
.three{
  margin: 10rpx 0;
  display: flex;
  align-items: center;
}
.biaoshi {
  display: flex;
  align-items: center;
  margin: 5rpx 20rpx 5rpx 0; 
}
.three img{
  width: 40rpx;
  height: 40rpx;
}
.sec_right img{
  width: 150rpx;
  height: 150rpx;
  border-radius: 10rpx;
}
.pos_detail .position{
  font-weight:bold;
  font-size: 20px;
}
.salary{
  font-weight: 500;
  color: #ff4d4d;
  font-size: 18px;
  /* line-height: 3em; */
}
.place_time{
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e6e6e6;
  font-size: 14px;
  line-height: 2em;
}
.place{
  display: flex;
  align-items: center;
  margin-top: 30rpx;
  color: #505050;
  font-size: 15px;
}
.place img{
  margin-right: 20rpx;
  width: 50rpx;
  height: 50rpx;
}

/*  */

.pos_describe{
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight:bold;
  background-color: white;
  padding: 30rpx;
  color: #585858;
}
.pos_title{
  padding-bottom: 10rpx;
  /* flex-direction: row; */
  justify-content: space-around;
  display: flex;
  align-items: center;
  font-size: 16px;
  /* border-bottom: 1px solid #74b9ff; */
}
.pos_title img{
  width: 50rpx;
  height: 50rpx;
}
.Line{
  width: 70%;
  height: 2rpx;
  background-color: #e7e7e7;
}
.pos_xiangqing{
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 100rpx;
}


footer {
  background-color: white;
  position: fixed;
  height: 100rpx;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: darkgrey 10px 10px 30px 5px ;
}
.share{
 /* background-color: #0984e3; */
 width: 140rpx;
 height: 80rpx;
 color: white; 
 flex-direction: column;
 display: flex;
 align-items: center;
 justify-content: center;
 border-radius: 40rpx;
 box-shadow: rgba(214, 214, 214, 0.459) 10rpx 10rpx 50rpx 1rpx ;
}
.share img{
  width: 70rpx;
  height: 70rpx;
}
.send{
 background-color: #d63031;
 width: 400rpx;
 height: 80rpx;
 color: white;
 display: flex;
 align-items: center;
 justify-content: center;
 border-radius: 40rpx;
 box-shadow: rgba(214, 48, 48, 0.418) 10rpx 10rpx 50rpx 1rpx ;
}
</style>
