<template>
  <div>
    <navbar title='简历投递'></navbar>
    <div class="card">

      <div class="pos_detail">
        <div class="position">{{position.positionname}}</div>
        <div class="salary">{{position.salary}}</div>
        <div class="place_time">
          <div class="place">天津市/滨海新区/东疆湾</div>
          <div class="sendtime">5分钟前</div>
        </div>
        <div></div>
      </div>

      <form @submit.prevent="formSubmit">
      <!-- <form bindsubmit="formSubmit">  -->

        <div class="section"> 
          <div class="section__title">姓名</div>
          <input name="name" placeholder="姓名" />
        </div>

        <div class="section" >
          <radio-group class="radio-group" @submit.prevent="radioChange" >
              <div class="section__title">性别</div>
              <label class="radio" v-for="(item, index) in sex" :key="index">
                  <radio :value="item.name"/>{{item.value}}
              </label>
          </radio-group>
        </div>

        <div class="section"> 
          <div class="section__title">民族</div>
          <input name="nation" placeholder="民族" />
        </div>

        <div class="section"> 
          <div class="section__title">身份证号码</div>
          <input name="idcard" placeholder="身份证" type="idcard" />
        </div>

        <div class="section"> 
          <div class="section__title">毕业院校</div>
          <input name="school" placeholder="学校名称" />
        </div>

        <div class="section"> 
          <div class="section__title">最高学历</div>
          <input name="education" placeholder="最高学历" />
        </div>

        <div class="section"> 
          <div class="section__title">专业</div>
          <input name="major" placeholder="专业" />
        </div>

        <div class="section"> 
          <div class="section__title">毕业时间</div>
          <input name="graduationtime" placeholder="毕业时间" />
        </div>

        <div class="section"> 
          <div class="section__title">英语水平</div>
          <input name="englishlevel" placeholder="英语水平" />
        </div>

        <div class="section"> 
          <div class="section__title">居住地</div>
          <input name="liveplace" placeholder="居住地" />
        </div>

        <div class="section"> 
          <div class="section__title">户籍所在地</div>
          <input name="birthplace" placeholder="户籍" />
        </div>

        <div class="section"> 
          <div class="section__title">邮箱</div>
          <input name="email" placeholder="邮箱" />
        </div>

        <div class="section"> 
          <div class="section__title">手机号码</div>
          <input name="phone" placeholder="手机号码" type="number"/>
        </div>

        <div class="section"> 
          <div class="section__title">微信号</div>
          <input name="wechat" placeholder="微信号" />
        </div>

        <div class="section"> 
          <div class="section__title">QQ号</div>
          <input name="qq" placeholder="QQ号" />
        </div>

        <div class="section"> 
          <div class="section__title">个人介绍</div>
          <input name="intro" placeholder="个人介绍" />
        </div>

        <div class="btn-area">
          <button formType="submit" class="send">提交</button>
          <!-- <button formType="reset">重置</button> -->
        </div>
      </form>

    </div>
  </div>
</template>

<script>
import navbar from '@/components/navbar'
// import bt from '@/components/bt'

export default {
  data () {
    return {
      sex: [
        {name: '男', value: '男'},
        {name: '女', value: '女'}
      ],
      sexChoose: '',
      position: {}
    }
  },
  components: {
    navbar
  },
  onLoad () {
    // console.log('121', this.$store.state.selectedJob); // ok
    this.position = this.$store.state.selectedJob
    // console.log(this.position);
  },
  methods: {
    formSubmit: function (e) {
      mpvue.request({
        url: 'https://hr.test.getkin.cn/Wx/ResumeAdd', // 数据传到的地址
        data: {
          'name': e.mp.detail.value.name,
          'sex': e.mp.detail.value.sex,
          'nation': e.mp.detail.value.nation,
          'idcard': e.mp.detail.value.idcard,
          'school': e.mp.detail.value.school,
          'education': e.mp.detail.value.education,
          'major': e.mp.detail.value.major,
          'graduationtime': e.mp.detail.value.graduationtime,
          'englishlevel': e.mp.detail.value.englishlevel,
          'liveplace': e.mp.detail.value.liveplace,
          'birthplace': e.mp.detail.value.birthplace,
          'email': e.mp.detail.value.email,
          'phone': e.mp.detail.value.phone,
          'wechat': e.mp.detail.value.wechat,
          'qq': e.mp.detail.value.qq,
          'intro': e.mp.detail.value.intro
        }, // 传入的数据
        method: 'POST',
        header: {// 设置请求的 header
          'content-type': 'application/x-www-form-urlencoded' // 这是传输方式为post的写法 ； 如果是get 则是'Content-Type': 'application/json'
        },
        success: function (res) {
          // console.log('e', e)

          // console.log(JSON.stringify(res.data))
          mpvue.showModal({ // 提交成功 ，弹框
            title: '提示',
            content: '提交成功，确认返回',
            success: function (res) {
              // console.log('res', res)
              if (res.confirm) { // 如果点击弹框的确认则进行下面的操作
                console.log('用户点击确定')
                // 返回
                mpvue.navigateBack({delta: 1})
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      })
    },
    radioChange: function (e) {
      console.log('e', e)
      this.sexChoose = e.mp.detail.value
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style lang="wxss">
page{
  background-color: white;
  font-size: 14px;
}
</style>

<style>
.pos_detail{
  background-color: white;
  padding: 30rpx;
  margin-bottom: 10rpx;
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

.card {
  width: 690rpx;
  height: 100%;
  margin: 50rpx 30rpx;
  background-color: white;
  border-radius: 30rpx;
  box-shadow: 3rpx 3rpx 10rpx rgba(75, 207, 250, 0.3);
}
.section{
  display: flex;
  align-items:center;
  height: 100rpx;
  margin: 10rpx 30rpx;
  background-color: white;
  border-radius: 5rpx;
}
.section__title{
  width: 200rpx;
  /* background-color: rgb(167, 167, 253); */
}
.radio-group{
  display:flex;
  flex-direction: row;
}
.radio{
  margin: 0 20rpx;
}
.btn-area{
  display: flex;
  justify-content: center;
  margin: 50rpx
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
