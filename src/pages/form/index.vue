<template>
  <div>
    <navbar title='简历投递'></navbar>
    <div class="card">

      <div class="pos_detail">
        <div class="position">{{position.positionname}}</div>
        <div class="salary">{{position.salary}}</div>
        <div class="place_time">
          <div class="place">{{position.position}}</div>
          <div class="sendtime">5分钟前</div>
        </div>
        <div></div>
      </div>

      <form @submit.prevent="formSubmit" >
      <!-- <form bindsubmit="formSubmit">  -->

        <div class="section"> 
          <div class="section__title"> <a style="color:red">*</a> 姓名</div>
          <input :class="focusType=='name'?'inpfocus':'inp'" @focus='changeFocus("name")' @blur='npFocus' name="name" :value="formCache.name"/>
        </div>

        <div class="section" >
          <div class="section__title"> <a style="color:red">*</a> 性别</div>
          <radio-group class="radio-group" @change="radioChange" >
              <label class="radio" v-for="(item, index) in sex" :key="index">
                  <radio :value="item.name"/>{{item.value}}
              </label>
          </radio-group>
        </div>

        <div class="secintor"> 
            <div class="section__title">上传简历附件</div>
            <div class="wenjian" @click="chooseFile">
              <div v-if="fileType === 'upload'">
                <img :src="uploadsrc" alt="">
              </div>
              <div v-else-if="fileType === 'doc'">
                <img :src="docsrc" alt="">
              </div>
              <div v-else>
                <img :src="pdfsrc" alt="">
              </div>
              <div class="uploadremind">
                <div v-if="fileType === 'upload'">请先到微信将要上传的附件</div>
                <div v-if="fileType === 'upload'">分享到文件传输助手</div>
                <div style="color:#ff7675">{{fileName}}</div>
              </div>
            </div>
            <div class="remindmsg">*重复上传将进行附件覆盖</div>
            <!-- <button @click="uploadFile" class="uplaoadbt">上传按钮</button>  -->
        </div>

        <div class="section"> 
          <div class="section__title"> <a style="color:red">*</a> 民族</div>
          <input :class="focusType=='nation'?'inpfocus':'inp'" @focus='changeFocus("nation")' @blur='npFocus' name="nation" :value="formCache.nation"/>
        </div>

        <div class="section"> 
          <div class="section__title"><a style="color:red">*</a>出生日期</div>
          <picker class="auth-pick-tip" mode="date" :value="birthdate" @change="birthPick">
            <div v-if="!birthdate.length">请选择生日</div>
            <view>
              {{birthdate}}
            </view>
          </picker>
        </div>

        <div class="section"> 
          <div class="section__title"><a style="color:red">*</a>身份证号码</div>
          <input :class="focusType=='idcard'?'inpfocus':'inp'" @focus='changeFocus("idcard")' @blur='npFocus' name="idcard" type="idcard" :value="formCache.idcard"/>
        </div>

        <div class="section"> 
          <div class="section__title"><a style="color:red">*</a>毕业院校</div>
          <input :class="focusType=='school'?'inpfocus':'inp'" @focus='changeFocus("school")' @blur='npFocus' name="school" :value="formCache.school"/>
        </div>

        <div class="section"> 
          <div class="section__title"><a style="color:red">*</a>最高学历</div>
          <input :class="focusType=='education'?'inpfocus':'inp'" @focus='changeFocus("education")' @blur='npFocus' name="education" :value="formCache.education"/>
        </div>

        <div class="section"> 
          <div class="section__title"><a style="color:red">*</a>专业</div>
          <input :class="focusType=='major'?'inpfocus':'inp'" @focus='changeFocus("major")' @blur='npFocus' name="major" :value="formCache.major"/>
        </div>

        <div class="section"> 
          <div class="section__title"><a style="color:red">*</a>毕业时间</div>
          <picker class="auth-pick-tip" mode="date" :value="graduationtime" @change="graTimePick">
            <div v-if="!graduationtime.length">请选择毕业时间</div>
            <view>
              {{graduationtime}}
            </view>
          </picker>
        </div>

        <div class="section"> 
          <div class="section__title"><a style="color:red">*</a>英语水平</div>
          <input :class="focusType=='englishlevel'?'inpfocus':'inp'" @focus='changeFocus("englishlevel")' @blur='npFocus' name="englishlevel" :value="formCache.englishlevel"/>
        </div>

        <div class="section"> 
              <div class="section__title"><a style="color:red">*</a>居住地</div>
              <picker class="auth-pick-tip" mode="region" :value="region1" :custom-item="customItem" @change="region1Pick">
                <div v-if="!region1.length">请选择区域</div>
                <view v-else>
                  {{region1[0]}}，{{region1[1]}}，{{region1[2]}}
                </view>
              </picker>
        </div>

        <div class="section"> 
              <div class="section__title">户籍所在地</div>
              <picker class="auth-pick-tip" mode="region" :value="region2" :custom-item="customItem" @change="region2Pick">
                <div v-if="!region2.length">请选择区域</div>
                <view v-else>
                  {{region2[0]}}，{{region2[1]}}，{{region2[2]}}
                </view>
              </picker>
        </div>

        <div class="section"> 
          <div class="section__title"><a style="color:red">*</a>手机号码</div>
          <input :class="focusType=='phone'?'inpfocus':'inp'" @focus='changeFocus("phone")' @blur='npFocus' name="phone" type="number" :value="formCache.phone"/>
        </div>

        <div class="section"> 
          <div class="section__title"><a style="color:red">*</a>邮箱</div>
          <input :class="focusType=='email'?'inpfocus':'inp'" @focus='changeFocus("email")' @blur='npFocus' name="email" :value="formCache.email"/>
        </div>

        <div class="section"> 
          <div class="section__title">微信号</div>
          <input :class="focusType=='wechat'?'inpfocus':'inp'" @focus='changeFocus("wechat")' @blur='npFocus' name="wechat" :value="formCache.wechat"/>
        </div>

        <div class="section"> 
          <div class="section__title">QQ号</div>
          <input :class="focusType=='qq'?'inpfocus':'inp'" @focus='changeFocus("qq")' @blur='npFocus' name="qq" :value="formCache.qq"/>
        </div>



        <div class="secintor"> 
          <div class="section__title"><a style="color:red">*</a>个人介绍</div>
          <textarea class="intro" :class="focusType=='intro'?'inpfocus':'inp'" @focus='changeFocus("intro")' @blur='npFocus' name="intro" maxlength=-1 :value="formCache.intro"/>
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
import config from '@/config'
import WxValidate from '@/utils/WxValidate.js'
import {
  showSuccess,
  showLoading
} from '@/utils/showToast'

export default {
  data () {
    return {
      sex: [
        {name: '男', value: '男'},
        {name: '女', value: '女'}
      ],
      sexChoose: '',
      position: {},
      birthdate: '',
      graduationtime: '',
      region1: [],
      region2: [],
      customItem: '全部',
      focusType: '',
      fileName: '*点击上传附件',
      filePath: '',
      tempFilePaths: '',
      fileType: 'upload',
      uploadsrc: '/static/icon/Fileupload.png',
      docsrc: '/static/icon/doc.png',
      pdfsrc: '/static/icon/pdf.png',
      formCache: {}
    }
  },
  components: {
    navbar
  },
  onLoad () {
    this.initValidate()
    // console.log('121', this.$store.state.selectedJob); // ok
    this.position = this.$store.state.selectedJob
    this.openid = mpvue.getStorageSync('openid')
    console.log('openid', this.openid)
    this.owner = mpvue.getStorageSync('ownerId')
    console.log('owner', this.owner)
    this.positionId = mpvue.getStorageSync('positionId')
    console.log('positionId', this.positionId)
    this.formCache = mpvue.getStorageSync('formCache')
    console.log('formcache', this.formCache)
    // 表单读取缓存数据
    if (this.formCache) {
      this.birthdate = this.formCache.birthdate
      this.graduationtime = this.formCache.graduationtime
      this.region1 = this.formCache.liveplace
      this.region2 = this.formCache.birthplace
    }
    console.log(this.position)
  },
  methods: {
    //报错 
    showModal(error) {
      wx.showModal({
        content: error.msg,
        showCancel: false,
      })
    },
    //验证函数
    initValidate(e) {
      console.log('eeee',e);
      
      const rules = {
        name: {
          required: true,
          minlength: 2
        },
        idcard: {
          idcard: true,
          minlength: 18
        },
        school: {
          required: true,
          minlength: 2
        },
        education:{
          required: true,
          minlength: 2
        },
        // 开始没写
        englishlevel: {
          required: true,
          minlength: 2
        },
        phone: {
          tel: true,
          minlength: 11
        },
        email: {
          email: true,
          minlength: 2
        },
        intro: {
          required: true,
          minlength: 15
        }
      }

      const messages = {
        name: {
          required: '请填写姓名',
          minlength:'请输入正确的名字'
        },
        school: {
          required: '请填写毕业院校',
          minlength:'请输入正确的学校名字'
        },
        education:{
          required: '请填写最高学历',
          minlength:'请输入正确的最高学历'
        },
        major: {
          required: '请填写专业名称',
          minlength:'请输入正确的专业名称'
        },
        englishlevel: {
          required: '请填写英语水平',
          minlength:'请输入正确的英语水平等级'
        },
        phone: {
          minlength: '请输入11位的手机号'
        },
        email: {
          minlength: '请输入有效的电子邮件地址'
        },
        intro: {
          required: '请填写自我介绍',
          minlength:'请输入至少15字的自我介绍'
        },

      }
      this.WxValidate = new WxValidate(rules, messages)
    },
    chooseFile: function () {
      var that = this
      mpvue.chooseMessageFile({
        count: 1,
        type: 'file',
        success (res) {
          // console.log('res',res);

          if (res.tempFiles[0]) {
            that.fileName = res.tempFiles[0].name
            that.filePath = res.tempFiles[0].path
            const tempFilePaths = res.tempFiles[0].path
            var thatat = that
            mpvue.uploadFile({
              url: config.host + '/Wx/uploadifyUser', // 仅为示例，非真实的接口地址
              filePath: tempFilePaths,
              name: 'file',
              formData: {
                'user': 'test'
              },
              success (res) {
                console.log('fileres', res)
                const data = res.data
                // do something
                console.log('filedata', data)
                // 判断文件格式
                if (data.indexOf('.pdf') !== -1) {
                  thatat.fileType = 'pdf'
                } else {
                  if (data.indexOf('.doc') !== -1) {
                    thatat.fileType = 'doc'
                  } else {
                    thatat.fileType = 'upload'
                  }
                }

                thatat.tempFilePaths = JSON.parse(data)
                showSuccess('上传成功')
              }
            })
          } else {
            showLoading('文件未下载,重新选择')
          }
        }
      })
      console.log('this.filename', this.filename)
      console.log('this.webFileName', this.tempFilePaths)
    },
    uploadFile () {
      // 调试按钮使用
      console.log('this.fileName', this.fileName)
      console.log('this.filePath', this.filePath)
      console.log('this.webFileName', typeof (this.tempFilePaths))
      console.log('this.webFileName', this.tempFilePaths.filename)
      console.log('this.fileType', this.fileType)

      var that = this
      // mpvue.request({
      //   url: config.host + '/Wx/uploadifyUser', // 数据传到的地址
      //   data: {
      //     'name': e.mp.detail.value.name,
      //     'sex': this.sexChoose,
      //   }, // 传入的数据
      //   method: 'POST',
      //   header: {// 设置请求的 header
      //     'content-type': 'application/x-www-form-urlencoded' // 这是传输方式为post的写法 ； 如果是get 则是'Content-Type': 'application/json'
      //   },
      //   success: function (res) {
      //     console.log('上传', res)
      //     that.webFileName = res.filename
      //   }
      // })
      //
      //
      //

      //
    },
    changeFocus: function (type) {
      console.log('Focus-name', type)
      this.focusType = type
    },
    npFocus: function () {
      this.focusType = ''
    },
    // itemPick: function (e, value) {
    //   console.log( region2+ 'd选择改变，携带值为', e.mp.detail.value)
    //   this.value = e.mp.detail.value
    // },
    graTimePick: function (e) {
      console.log('birthPick发送选择改变，携带值为', e.mp.detail.value)
      this.graduationtime = e.mp.detail.value
      console.log(this.graduationtime)
    },
    birthPick: function (e) {
      console.log('birthPick发送选择改变，携带值为', e.mp.detail.value)
      this.birthdate = e.mp.detail.value
      console.log(this.birthdate)
    },
    region1Pick: function (e) {
      console.log('picker1发送选择改变，携带值为', e.mp.detail.value)
      this.region1 = e.mp.detail.value
    },
    region2Pick: function (e) {
      console.log('picker2发送选择改变，携带值为', e.mp.detail.value)
      this.region2 = e.mp.detail.value
    },
    formSubmit: function (e) {
      console.log('form', e)
      // 设置缓存
      this.formCache ={
        'name': e.mp.detail.value.name,
        'sex': this.sexChoose,
        'birthdate': this.birthdate,
        'nation': e.mp.detail.value.nation,
        'idcard': e.mp.detail.value.idcard,
        'school': e.mp.detail.value.school,
        'education': e.mp.detail.value.education,
        'major': e.mp.detail.value.major,
        'graduationtime': this.graduationtime,
        'englishlevel': e.mp.detail.value.englishlevel,
        'liveplace': this.region1,
        'birthplace': this.region2,
        'email': e.mp.detail.value.email,
        'phone': e.mp.detail.value.phone,
        'wechat': e.mp.detail.value.wechat,
        'qq': e.mp.detail.value.qq,
        'intro': e.mp.detail.value.intro,
        'sources': this.tempFilePaths.filename,
        'wxuser': this.openid,
        'owner': this.owner,
        'positionId': this.positionId
      }
      mpvue.setStorageSync('formCache', this.formCache)
      // 设置缓存
      const params = e.mp.detail.value
      if (!this.WxValidate.checkForm(params)) {
        const error = this.WxValidate.errorList[0]
        this.showModal(error)
        return false
      }

      // 
      // if (e.mp.detail.value.idcard.length == 18) {
        var that =this
        mpvue.request({
          url: config.host + '/Wx/ResumeAdd', // 数据传到的地址
          data: that.formCache, // 传入的数据
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
      // } else {
      //   mpvue.showToast({
      //     title: '请输入完整身份证好吗',
      //     icon: 'loading'
      //   })
      // }
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
  flex-direction: column;
  justify-items: flex-start;
  justify-content: space-around;
  height: 130rpx;
  margin: 10rpx 30rpx;
  background-color: rgb(255, 255, 255);
  border-radius: 5rpx;
}
.section__title{
  display: flex;
  width: 200rpx;
  font-weight: bold;
  /* background-color: rgb(167, 167, 253); */
}
.section input,picker{
  display: flex;
  align-items: center;
  border-radius: 5rpx;
  height: 50rpx;
  padding-left: 10rpx;
}
.secintor{
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  justify-content: space-around;
  height: 400rpx;
  margin: 10rpx 30rpx;
  background-color: rgb(255, 255, 255);
  border-radius: 5rpx;
}
.intro{
  border-radius: 5rpx;
  width: 90%;
  padding-left: 10rpx;
  padding-top: 10rpx;
  height: 330rpx;
}
picker{
  border:1px solid #8f8f8f;
}
picker div{
  color: #8f8f8f;
}
.inp{
  border:1px solid #8f8f8f;
}
.inpfocus{
  border:1px solid #4184ff;
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
.wenjian{
  /* color: white; */
  display: flex;

  align-items: center;
  width: 600rpx;
  height: 300rpx;
  background-color: #0fbaf90c;
  border-radius: 30rpx;
  padding-left: 20rpx;
}
.wenjian img{
  width: 150rpx;
  height: 150rpx;
}
.uplaoadbt{
  color: white;
  width: 300rpx;
  height: 75rpx;
  border-radius: 30rpx;
  background-color: #0fbcf9;  
}
.uploadremind{
  display: flex;
  flex-direction: column;
  padding: 20rpx;
  width: 430rpx;
}
.remindmsg{
  color: #cecece;
  font-size: 12px;
}
</style>
