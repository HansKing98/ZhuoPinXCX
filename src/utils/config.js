const serverUrl = 'https://wxapp.ichuqu.top/'
const serverUrlCDN = 'https://cdn.ichuqu.top/res/MMXH/'
var config = {
  serverUrl: serverUrl,
  serverUrlDb: serverUrl + 'mmxh/db/',
  serverUrlCDN: serverUrlCDN,
  logOn: true,
  indexBanner: serverUrlCDN + 'banner/',
  // 支付参数设置
  appId: 'wx8e154947836556b9',
  notifyUrl: serverUrl + 'order/wx/unifiedorder'
}
module.exports = config
