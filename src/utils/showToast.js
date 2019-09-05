// showToast工具库函数

export function showSuccess (text, duration) {
  if (duration) {
    var dur = duration
  } else {
    var dur = 1500
  }
  wx.showToast({
    title: text,
    icon: 'success',
    duration: dur
  })
}

export function showLoading (text, duration) {
  if (duration) {
    var dur = duration
  } else {
    var dur = 1500
  }
  wx.showToast({
    title: text,
    icon: 'loading',
    duration: dur
  })
}
