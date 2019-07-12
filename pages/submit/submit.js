// pages/form/checker.js
var graceChecker = require("../../graceUI/jsTools/graceChecker.js");
Page({
  data: {
    genderIndex: 0,
    gender: ['请选择', '男', '女'],
    dateValue: "请选择"
  },
  onLoad: function (options) {

  },
  bindPickerChange: function (e) {
    console.log(e);
    this.setData({ genderIndex: e.detail.value });
  },
  bindDateChange: function (e) {
    this.setData({ dateValue: e.detail.value });
  },
  formSubmit: function (e) {
    //定义表单规则
    var rule = [
      { name: "nickname", checkType: "string", checkRule: "1,3", errorMsg: "姓名应为1-3个字符" },
      { name: "gender", checkType: "in", checkRule: "男,女", errorMsg: "请选择性别" },
      { name: "bd", checkType: "notsame", checkRule: "请选择", errorMsg: "请选择生日" },
      { name: "aihao", checkType: "notnull", checkRule: "", errorMsg: "请选择爱好" },
      { name: "email", checkType: "email", checkRule: "", errorMsg: "请填写您的邮箱" }
    ];
    //进行表单检查
    var formData = e.detail.value;
    var checkRes = graceChecker.check(formData, rule);
    if (checkRes) {
      wx.showToast({ title: "验证通过!", icon: "none" });
    } else {
      wx.showToast({ title: graceChecker.error, icon: "none" });
    }
  }
})