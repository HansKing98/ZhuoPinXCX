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
        <!-- <div>1.{{position.positionname}}：（初级/中级550/高级850）要求有工作经验大专学历。初级泥浆工程师要求本科学历 石油工程专业应届毕业生均可。</div>
        <div>2.固井操作手：要求中专以上学历，35岁以下身体健康</div>
        <div>3.测井工程师（初级）：要求本科学历 石油工程专业应届毕业生均可。</div>
        <div>4.定向井工程师（初级）：要求本科学历 石油工程专业应届毕业生均可。 </div>
        <div>报名电话：13072293163，13072291062</div>
        <div>简历投递：1444987229@.qq.com</div>
        <div>面试地点：天津塘沽</div>
        <div>工作地点：渤海石油平台。</div>
        <div>待遇：六险一金，一年3000防暑降温费，从平台下来后回家的来回路费报销，食宿全包（吃的非常好，住宿有空调；海上石油平台上有免费的洗衣房，健身房、台球室等娱乐设施）。</div>
        <div>————————————</div>
        <div>1. {{position.positionname}}：（初级/中级550/高级850）要求有工作经验大专学历。初级泥浆工程师要求本科学历 石油工程专业应届毕业生均可。</div>
        <div>2.固井操作手：要求中专以上学历，35岁以下身体健康</div>
        <div>3.测井工程师（初级）：要求本科学历 石油工程专业应届毕业生均可。</div>
        <div>4.定向井工程师（初级）：要求本科学历 石油工程专业应届毕业生均可。 </div>
        <div>报名电话：13072293163，13072291062</div>
        <div>简历投递：1444987229@.qq.com</div>
        <div>面试地点：天津塘沽</div>
        <div>工作地点：渤海石油平台。</div>
        <div>待遇：六险一金，一年3000防暑降温费，从平台下来后回家的来回路费报销，食宿全包（吃的非常好，住宿有空调；海上石油平台上有免费的洗衣房，健身房、台球室等娱乐设施）。</div>
        <div>————————————</div> -->
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

export default {
  data () {
    return {
      position: {}
    }
  },
  components: {
    navbar, bt
  },
  methods: {
    goNav_job (e) {
      mpvue.navigateTo({ url: '/pages/form/main' })
    }
  },
  onLoad () {
    // console.log('121', this.$store.state.selectedJob); // ok
    this.position = this.$store.state.selectedJob
    // console.log(this.position)
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
