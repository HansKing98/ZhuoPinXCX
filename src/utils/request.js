import store from '@/store'
import common from '@/utils/common'
const config = require('./config')
let theModuleName = 'request.js'
export default {
  async unifiedpay (body, outTradeNo, totalFee) {
    common.loading('准备支付', true)
    try {
      return (await this.post({
        appId: config.appId,
        openId: store.state.openId,
        body: body,
        outTradeNo: outTradeNo,
        totalFee: totalFee * 100
      }, config.serverUrl + 'pay/unifiedpay'))
    } catch (err) {
      common.err([theModuleName, 'pay.err', err.data])
      if (err.data.data.errCodeDes === '该订单已支付' || err.data.data.errCode === 'ORDERPAID') {
        this.setOrder({payed: true})
        // common.tos('订单已支付, 请联系客服')
      } else {
        common.tos('支付出错,' + err.data.errMsg)
      }
      throw err.data
    }
  },
  async getCarts (where) {
    try {
      return (await this.db(where, 'cart/get')).data[0].list
    } catch (err) {
      common.err([theModuleName, 'getCarts.err', err])
      return []
    }
  },
  async setOrder (body) {
    try {
      let res = await this.db(body, 'order/set')
      return res.data
    } catch (err) {
      return common.err([theModuleName, 'setOrder.err', err])
    }
  },
  async delOrder (list) {
    try {
      let res = await this.db({ids: list}, 'order/del')
      return res
    } catch (err) {
      return common.err([theModuleName, 'setOrder.err', err])
    }
  },
  async getOrder (where) {
    where.sort = '-_id'
    where.visible = true
    try {
      let res = await this.db(where, 'order/get')
      return res.data
    } catch (err) {
      common.err([theModuleName, 'err', err])
      return []
    }
  },
  async getGoods (where) {
    try {
      let res = await this.db(where, 'goods/get')
      for (let i of res.data) {
        // 图片路径处理
        let img = config.serverUrlCDN + i.img
        i.img = {}
        i.img.img = img
        i.img.img_350 = img + '/suo_350.jpg'
        i.img.swiper = [
          {url: img + '/poster_1.jpg'},
          {url: img + '/poster_2.jpg'},
          {url: img + '/poster_3.jpg'}
        ]
        i.num || (i.num = 1)
      }
      return res.data
    } catch (err) {
      common.err([theModuleName, 'err', err])
      return []
    }
  },
  async getScene (where) {
    try {
      let res = await this.db(where, 'scene/get')
      return res.data
    } catch (err) {
      common.err([theModuleName, 'getScene.err', err])
      return []
    }
  },
  async getType (where) {
    try {
      let res = await this.db(where, 'type/get')
      for (let m in res.data) {
        let i = res.data[m]
        i.idx = m
        i.img = config.serverUrlCDN + i.img
        i.imgIcon = config.serverUrlCDN + i.img + '_icon.jpg'
      }
      return res.data
    } catch (err) {
      common.err([theModuleName, 'err', err])
      return []
    }
  },
  //  数据库访问用
  request (where, url, method) {
    return this.net(where, url, method)
  },
  db (where, url) {
    // where.openId = getApp().globalData.userInfo.openId
    return this.post(where, config.serverUrlDb + url)
  },
  get (where, url) {
    return this.net(where, url, 'GET')
  },
  post (where, url) {
    return this.net(where, url, 'POST')
  },
  net (where, url, method) {
    where.openId = store.state.openId
    common.log([theModuleName, '发起网络请求', where, url])
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        header: {
          'Content-type': 'application/json' // 默认值
        },
        method: method,
        data: where,
        success (res) {
          // if (res.data.errMsg === 'OK' || (res.errMsg === 'request:ok' && res.statusCode === 200)) {
          if (res.data.errMsg === 'OK') {
            resolve(res.data)
            common.log([theModuleName, 'success and resolve', res])
          } else {
            reject(res)
            common.err([theModuleName, 'success but reject', res])
          }
        },
        fail (err) {
          reject(err)
          common.err([theModuleName, 'err', err])
        }
      })
    })
  }
}
