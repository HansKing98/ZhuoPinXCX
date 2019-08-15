// showToast工具库函数

export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}

export function showLoading (text) {
  wx.showToast({
    title: text,
    icon: 'loading'
  })
}
