<template>
  <div>
    <navbar title='表单提交'></navbar>
    <div class="card">
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
          <input name="idcard" placeholder="身份证" />
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
          <input name="phone" placeholder="手机号码" />
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
          <bt
            formType="submit"
            text="提交"
            type="cart"
            width="400rpx"
            height="80rpx"
            margin="0 0 0 0"
          ></bt>
          <!-- <button formType="reset">重置</button> -->
        </div>
      </form>

    </div>
  </div>
</template>

<script>
import navbar from '@/components/navbar'
import bt from "@/components/bt";

export default {
  data () {
    return {
      sex: [
        {name: '男', value: '男'},
        {name: '女', value: '女'}
      ],
      sexChoose:''
    }
  },
  components: {
    navbar, bt
  },
  methods: {
    formSubmit: function (e) {
        wx.request({
          url: 'http://hr.test.getkin.cn/Wx/ResumeAdd', //  数据传到的地址
          data: {
            'name': e.mp.detail.value.name,
            'sex': e.mp.detail.value.sex,
            'nation': e.mp.detail.value.nation,
            'idcard':  e.mp.detail.value.idcard,
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
            'intro': e.mp.detail.value.intro,
          },//传入的数据
          method: 'POST',
          header: {// 设置请求的 header
            'content-type': 'application/x-www-form-urlencoded'   //这是传输方式为post的写法 ； 如果是get 则是'Content-Type': 'application/json'
          },
          success: function (res) {
            console.log('e',e)

            console.log(JSON.stringify(res.data))
            wx.showModal({      //提交成功 ，弹框
              content: '提交成功',
              success: function (res) {
                console.log('res',res)
                if (res.confirm) {   //如果点击弹框的确认则进行下面的操作
                  // wx.navigateTo({
                  //   url: '../orderlist/orderlist',
                  // })
                }
              }
            })

          }
        })
    },
    radioChange: function (e) {
      console.log('e',e);
      this.sexChoose = e.mp.detail.value ;
    },
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

<style scoped>
.card {
  width: 690rpx;
  height: 100vh;
  margin: 50rpx 30rpx;
  background-color: white;
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
</style>
