import store from '@/store'
import net from '@/utils/request'
import tools from '@/utils'
let theModuleName = 'utils/common'
export default {
  log (e) {
    console.log(e)
  },
  err (e) {
    console.error(e)
  },
  tos (msg) {
    mpvue.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    })
  },
  errHandle (e) {
    console.log(theModuleName, 'errHandle', e)
    let code = e.data.err.code
    let msg = '失败:'
    if (code) {
      code === 11000 && (msg += '已有该记录')
    } else {
      msg += e.data.errMsg
    }
    this.tos(msg)
  },
  loading (msg, mask) {
    mpvue.showLoading({
      title: msg,
      mask: mask
    })
  },
  clone (e) {
    return JSON.parse(JSON.stringify(e))
  },
  navDetail (goods) {
    store.commit('goodsChange', goods)
    const url = '/pages/goods-detail/main'
    mpvue.navigateTo({ url })
  },
  hCorrect () {
    let h = 0
    let model = store.state.systemInfo.model
    model === 'iPhone 5' && (h = 34)
    model === 'iPhone 6' && (h = 14)
    model === 'iPhone 7' && (h = 14)
    model === 'iPhone X' && (h = 14)
    model === 'iPhone XS Max' && (h = 14)
    model.indexOf('Nexus') > -1 && (h = 18)
    return h
  },
  freight (sumGoods) {
    let freight = 9
    if (sumGoods <= 20) {

    } else if (sumGoods <= 30) {
      freight = 4
    } else if (sumGoods <= 38) {
      freight = 2
    } else if (sumGoods > 38) {
      freight = 0
    }
    return freight
  },
  //  选地址 以及权限处理
  addr () {
    return new Promise((resolve, reject) => {
      mpvue.authorize({
        scope: 'scope.address',
        success (res) {
          console.log(res)
          mpvue.chooseAddress({
            success (res) {
              delete res.errMsg
              console.log(res)
              resolve(res)
            },
            fail (err) {
              console.error(err)
              reject(err)
            }
          })
        },
        fail (err) {
          reject(err)
          console.error(err)
          mpvue.showModal({
            title: '权限被拒绝',
            content: '请在设置页面打开授权，点击按钮"确定"跳转',
            success (res) {
              if (res.confirm) {
                mpvue.openSetting()
              }
            }
          })
        }
      })
    })
  },
  // 创建订单
  async reateOrder (listGoods) {
    try {
      let addr = await this.addr()
      this.loading('创建订单', true)
      let orderId = addr.postalCode + Date.now().toString().substr(2)
      let sumGoods = 0
      for (let i of listGoods) {
        sumGoods = tools.accAdd(tools.accMul(i.prc[0].prc, i.num || 1), sumGoods)
      }
      let freight = this.freight(sumGoods)
      let prc = {
        sumGoods: sumGoods,
        freight: freight,
        sum: tools.accAdd(freight, sumGoods)
      }
      // console.log(store.state.agencyId)
      await net.db({
        _id: orderId,
        listGoods: listGoods,
        agencyId: store.state.agencyId,
        prc: prc,
        msg: '',
        logistics: 0,
        receiver: addr
      }, 'order/add')
      mpvue.hideLoading()
      store.commit('orderTypeChange', 1)
      let url = '/pages/order/main'
      mpvue.navigateTo({url})
    } catch (err) {
      this.tos('创建错误')
    }
  },
  pay (e) {
    let that = this
    mpvue.requestPayment({
      timeStamp: e.timeStamp,
      nonceStr: e.nonceStr,
      package: 'prepay_id=' + e.prepayId,
      signType: 'MD5',
      paySign: e.paySign,
      success (res) {
        that.log([theModuleName, 'pay success', res])
        if (res.errMsg === 'requestPayment:ok') {
          // let where = {
          //   _id: e.outTradeNo
          // }
          // mpvue.showLoading()
          // request.db(where, 'pay').then(res => {
          // }).catch(err => {
          //   mpvue.hideLoading()
          //   that.err([theModuleName, 'pay orderUpdate', err])
          //   that.toast('系统出错，请务必联系客服')
          // })
          // mpvue.hideLoading()
        }
      },
      fail (err) {
        console.log(err)
        that.err([theModuleName, 'pay fail', err])
      },
      complete (res) {
        mpvue.hideLoading()
        that.log([theModuleName, 'pay complete', res])
      }
    })
  }
}
