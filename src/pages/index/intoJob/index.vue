<template>
  <div>
    <navbar title='职位详情'></navbar>

    <div class="pos_detail">
      <div class="position">{{position.positionname}}</div>
      <div class="salary">{{position.salary}}</div>
      <div class="place_time">
        <div class="place">天津市/滨海新区/天河科技园</div>
        <div class="sendtime">5分钟前</div>
      </div>
      <div></div>
    </div>

    <div class="company_area">
      <div class="company">
        <img :src="position.url" alt="" mode='aspectFill'>
        <div class="com_detail">
          <div class="com_name">{{position.customername}}</div>
          <div>20-99人|国营</div>
          <div>钻井/石油/技术/互联网</div>
        </div>
      </div>
      <div class="com_position">
          地址：天津市天津市滨海新区天河科技园5号楼-5601室-10卓聘网络科技有限公司
      </div>
    </div>

    <div class="pos_describe">
      <div class="pos_title">
        <img src="/static/images/intoJob/pos_title.png" alt="">
        <div>职位描述</div>
      </div>
      <div class="pos_xiangqing"> 
        <p>职位：{{position.positionname}}</p>
        <p>薪资：{{position.salary}}</p>
        <p>需要人数：{{position.people}}</p>
        <p></p> 
        <p>暂未填写其他详细信息</p> 
        <p>详情请电话联系</p> 
      </div>
    </div>

    <footer>
      <button open-type='share' class="share">分享</button>
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
  　　var that = this;
      console.log(that.owner);
      console.log(that.position.id);
      
  　　// 设置菜单中的转发按钮触发转发事件时的转发内容
  　　var shareObj = {
  　　　　title: "刘彤邀请你投递简历刘彤邀请你投递简刘彤邀请你投递简刘彤邀请你投递简",        // 默认是小程序的名称(可以写slogan等)
  　　　　path: "pages/index/intoJob/main?ownerId=" + "78" +"&positonId=" + that.position.id,        // 默认是当前页面，必须是以‘/’开头的完整路径
  　　　　imageUrl: '',     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
  　　　　success: function(res){
  　　　　　　// 转发成功之后的回调
  　　　　　　if(res.errMsg == 'shareAppMessage:ok'){
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

    // console.log(this.position)
    if (options.positonId) {
      this.ownerId = options.ownerId
      this.positionId = options.positionId

    } else {
      this.ownerId = mpvue.getStorageSync('ownerId')
      // 传入职位相关信息
      this.position = this.$store.state.selectedJob
      this.positionId = this.position.id

    }
    // 根据 positionId 获取 position 详细数据
    this.$httpWX.get({
      url: '/GetPositionById',
      data:{
        id: this.positionId
      },
      header: {
        'Content-type': 'application/json' // 默认值
      }
    }).then(res => {
      this.position = res
      console.log('职位详情', this.position)
    })

    // 
    console.log('ownerId', this.ownerId);
    console.log('position', this.position);
    console.log('positionId', this.positionId);

    // 获取邀请人姓名
    this.$httpWX.post({
      url: '/GetName',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        owner: this.ownerId
      }
    }).then(res => {
      // let detail = res
      // let detailMatch = detail.match(/\{[^\}]+\}/)[0]
      // let detailMatchJSON = JSON.parse(detailMatch)
      // this.invDatahans = detailMatchJSON
      // console.log('rea', res)
      this.invDatahans = res
      console.log('invDatahans', this.invDatahans)
    })
    console.log('invDatahans',invDatahans);
    

  },
  created () {

  }
}
</script>

<style lang="wxss">
page{
  background-color: #c3e1ff;
  color: #202020;
  font-size: 18px;
}
</style>

<style>
.pos_detail{
  background-color: white;
  padding: 30rpx;
  margin-bottom: 10rpx;

    /* position: fixed;
    height: 50px;
    left: 0;
    right: 0;
    top: 150rpx; */
}
.pos_detail .position{
  font-weight:bold;
  font-size: 20px;
}
.salary{
  font-weight: 500;
  color: #ff7675;
  font-size: 14px;
  line-height: 3em;
}
.place_time{
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #74b9ff;
  font-size: 14px;
  line-height: 2em;
}

/*  */
.company_area{
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-bottom: 10rpx;
}
.company{
  display: flex;
  height: 160rpx;
  padding: 10rpx 30rpx;
  border-bottom: 1px solid #74b9ff;
}
.company img{
  width: 160rpx;
  height: 160rpx;
  border-radius: 20rpx;
}
.com_detail{
  margin: 10rpx 40rpx;
  display: flex;
  flex-direction: column;
  justify-content:space-between;
  font-size: 12px;
  color: #636e72;
}
.com_name{
  font-size: 16px;
  font-weight: 600;
  color: #202020;
}
.com_position{
  padding: 30rpx;
  font-size: 14px;
}



.pos_describe{
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight:bold;
  background-color: white;
  padding: 20rpx;
}
.pos_title{
  padding-bottom: 10rpx;
  flex-direction: row;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #74b9ff;
}
.pos_title img{
  width: 40rpx;
  height: 40rpx;
  margin-right: 14rpx;
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
 background-color: #0984e3;
 width: 140rpx;
 height: 80rpx;
 color: white; 
 display: flex;
 align-items: center;
 justify-content: center;
 border-radius: 40rpx;
 box-shadow: rgba(9, 133, 227, 0.459) 10rpx 10rpx 50rpx 1rpx ;
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
