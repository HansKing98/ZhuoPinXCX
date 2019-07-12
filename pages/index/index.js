var graceChecker = require("../../graceUI/jsTools/graceChecker.js");
Page({
  data: {
    anniu: '投递简历',
    tijiaoanniu:'提交',
    showModalStatus: false,
    genderIndex: 0,
    gender: ['请选择', '男', '女'],
    dateValue: "请选择",
    EducationIndex:0,
    Education: ['请选择', '大学专科', '大学本科', '中专毕业'],
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });

    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;

    // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停
    animation.translateY(700).step();

    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画：Y轴不偏移，停
      animation.translateY(0).step()
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })

      //关闭抽屉
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示抽屉
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },

  bindPickerChangegender: function (e) {
    console.log(e);
    this.setData({ genderIndex: e.detail.value });
  },
  bindPickerChangeEducation: function (e) {
    console.log(e);
    this.setData({ EducationIndex: e.detail.value });
  },
  bindDateChange: function (e) {
    this.setData({ dateValue: e.detail.value });
  },
  formSubmit: function (e) {
    //定义表单规则
    var rule = [
      { name: "nickname", checkType: "string", checkRule: "1,3", errorMsg: "姓名应为1-3个字符" },
      { name: "gender", checkType: "in", checkRule: "男,女", errorMsg: "请选择性别" },
      { name: "Education", checkType: "in", checkRule: "大学专科, 大学本科, 中专毕业", errorMsg: "请选择学历" },
      { name: "bd", checkType: "notsame", checkRule: "请选择", errorMsg: "请选择生日" },
      { name: "intro", checkType: "notnull", checkRule: "", errorMsg: "请填写自我介绍" },
      { name: "email", checkType: "email", checkRule: "", errorMsg: "请正确填写您的邮箱" },
      { name: "phone", checkType: "string", checkRule: "11", errorMsg: "请正确填写您的联系方式" }
    ];
    //进行表单检查
    var formData = e.detail.value;
    var checkRes = graceChecker.check(formData, rule);
    if (checkRes) {
      wx.showToast({ title: "提交成功!", icon: "none" });
      this.setData({ anniu: "简历投递完成"});
      this.setData({ tijiaoanniu: "重新提交" });
      // console.log(e.detail);
      this.setData({ nickname: e.detail.value.nickname });
      this.setData({ major: e.detail.value.major });
      this.setData({ intro: e.detail.value.intro });
      this.setData({ email: e.detail.value.email });
      this.setData({ phone: e.detail.value.phone });
      this.setData({ showModalStatus: false });

    } else {
      wx.showToast({ title: graceChecker.error, icon: "none" });
    }

    // wx.request({
    //   url: 'http://hr.test.getkin.cn/Wx/ResumeAdd',
    //   data: {
    //     'name': e.detail.value.nickname,
    //     'sex': '男',
    //     'education': e.detail.value.Education,
    //     'major': e.detail.value.major,
    //     'age': 19,
    //     'intro': e.detail.value.intro,
    //     'email': 'email',
    //     'phone': e.detail.value.phone,
    //     'addTime':1561633108,

    //     // 'name':'王昊',
    //     // 'email':'66',
    //     // 'age':'19',
    //     // 'phone':'66',
    //     // "qq":"",
    //     // "wechat":"",
    //     // 'dingding' :"",
    //     // 'intro':'',
    //     // 'addTime' : '1561633108',
    //     // 'pic':'/Uploads/images /',
    //     // 'sex':'男',
    //     // 'education' :'去',
    //     // 'major':'a'
    //   },
      
    //   method: 'POST',
    //   header: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'cookie': 'PHPSESSID=9kvc5uc515j5u5kmnln8cbgi21'
    //   },
    //   success: function (res) {
    //     // console.log(formData);
    //     // console.log(res.data)
    //     console.log(data);
    //   }
    // }),


      wx.request({

        url: 'http://hr.test.getkin.cn/Wx/ResumeAdd', //  数据传到的地址

        data: {
          'name': e.detail.value.nickname,
          'sex': e.detail.value.gender,
          'education': e.detail.value.Education,
          'major': e.detail.value.major,
          'age': 19,
          'intro': e.detail.value.intro,
          'email': e.detail.value.email,
          'phone': e.detail.value.phone,
        },//传入的数据

        method: 'POST',

        header: {// 设置请求的 header

          'content-type': 'application/x-www-form-urlencoded'   //这是传输方式为post的写法 ； 如果是get 则是'Content-Type': 'application/json'

        },

        success: function (res) {

          console.log(JSON.stringify(res.data))

          wx.showModal({      //提交成功 ，弹框

            content: '提交成功',

            success: function (res) {
              console.log(res)

              if (res.confirm) {   //如果点击弹框的确认则进行下面的操作

                // wx.navigateTo({

                //   url: '../orderlist/orderlist',

                // })

              }

            }

          })

        }
      })
  }
})