import Vuex from 'vuex'
import Vue from 'vue'
// import state from './states'
// import mutations from './mutations'
// import actions from './actions'
import common from '@/utils/common'
import net from '@/utils/request'
Vue.use(Vuex)
let theModuleName = 'store/index.js'
// 将这个利用vuex创建的仓库导出
export default new Vuex.Store({
  // state:state,
  // actions:actions,
  // mutations:mutations
  state: {
    // 设备信息
    systemInfo: mpvue.getSystemInfoSync(),
    openId: null,
    agencyId: 2,
    agency: null,
    orderType: 0,
    // tabSelected: 0,
    stars: [],
    starAllChecked: false,
    carts: [],
    cartAllChecked: false,
    selectedGoods: null,
    selectedType: null,
    selectedJob: {
      customername: '渤海石油平台',
      id: '62',
      owner: '1',
      people: '3',
      positionname: '泥浆工程师',
      salary: '12k-17k',
      state: '0',
      url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2327677210,43854317&fm=26&gp=0.jpg'
    },
    selectedOwnerId:1,
    selectedPosId:0,
  },
  mutations: {
    // tabChange (state, idx) {
    //   common.log([theModuleName, 'tabChange', state, 'idx', idx])
    //   state.tabSelected = parseInt(idx)
    // },
    orderTypeChange (state, idx) {
      common.log([theModuleName, 'orderTypeChange', state, 'idx', idx])
      state.orderType = parseInt(idx)
    },
    goodsChange (state, goods) {
      common.log([theModuleName, 'selectGoods', state, 'goods:', goods])
      state.selectedGoods = goods
    },
    typeChange (state, type) {
      common.log([theModuleName, 'selectType', state, 'type:', type])
      state.selectedType = type
    },
    // n e w 。。。
    jobChange (state, type) {
      common.log([theModuleName, 'selectJob', state, 'type:', type])
      state.selectedJob = type
    },
    // ownerIdChange (state, type) {
    //   common.log([theModuleName, 'selectownerId', state, 'type:', type])
    //   state.selectedOwnerId = type
    // },
    posIdChange (state, type) {
      common.log([theModuleName, 'selectposId', state, 'type:', type])
      state.selectedPosId = type
    },
    // 收藏
    star (state, star) {
      common.log([theModuleName, 'star', state, 'star:', star])
      // let goods = state.selectedGoods
      if (star) {
        for (let i of state.stars) {
          if (i === state.selectedGoods) {
            state.selectedGoods.star = star
            return
          }
        }
        net.db(state.selectedGoods, 'star/add').then(res => {
          if (res.errMsg === 'OK') {
            state.selectedGoods.star = star
            state.stars.push(state.selectedGoods)
          }
        })
      } else {
        for (let i in state.stars) {
          if (state.stars[i] === state.selectedGoods) {
            net.db(state.selectedGoods, 'star/del').then(res => {
              if (res.errMsg === 'OK') {
                state.stars.splice(i)
                state.selectedGoods.star = star
              }
            })
          }
        }
      }
    },
    addToStars (state, goods) {
      common.log([theModuleName, 'addToStars', state, 'goods:', goods])
      for (let i of state.stars) {
        if (i === goods) {
          return
        }
      }
      state.stars.push(goods)
    },
    delFromStar (state, goodss) {
      common.log([theModuleName, 'delFromStar', state, 'goodss:', goodss])
      net.db({list: goodss}, 'star/del').then(res => {
        if (res.all) {
          for (let i in state.carts) {
            state.stars[i].checked && state.stars.splice(i, 1)
          }
        } else {
          for (let i of res.data.data) {
            for (let m in state.stars) {
              i._id === state.stars[m]._id && state.stars.splice(m, 1)
            }
          }
        }
      })
    },
    starChecked (state, obj) {
      common.log([theModuleName, 'starChecked', state, 'obj:', obj])
      state.stars[obj.idx].checked = obj.checked
    },
    starAllChecked (state, checked) {
      common.log([theModuleName, 'starAllChecked', state, 'checked:', checked])
      let flag = !!checked

      state.starAllChecked = flag
      for (let i of state.stars) {
        i.checked = flag
      }
    },
    // 购物车
    addToCart (state, goods) {
      common.log([theModuleName, 'addToCart', state, 'goods:', goods])
      for (let i of state.carts) {
        if (i === goods) {
          return i.num++
        }
      }
      goods.num || (goods.num = 1)
      // goods.checked = true
      net.db(goods, 'cart/add').then(res => {
        if (res.errMsg === 'OK') {
          state.carts.push(goods)
          this.commit('cartChecked', {idx: state.carts.length, checked: true})
        }
      })
    },
    delFromCart (state, goodss) {
      common.log([theModuleName, 'delFromCart', state, 'goodss:', goodss])
      net.db({list: goodss}, 'cart/del').then(res => {
        if (res.all) {
          console.log(1)
          for (let i in state.carts) {
            console.log(2)
            state.carts[i].checked && state.carts.splice(i, 1)
          }
        } else {
          console.log(3)
          for (let i of res.data.data) {
            for (let m in state.carts) {
              i._id === state.carts[m]._id && state.carts.splice(m, 1)
            }
          }
        }
      })
    },
    cartChecked (state, obj) {
      // common.log([theModuleName, 'cartChecked', state, 'obj:', obj])
      state.carts[obj.idx].checked = obj.checked
    },
    cartAllChecked (state, checked) {
      common.log([theModuleName, 'cartAllChecked', state, 'checked:', checked])
      let flag = !!checked
      state.cartAllChecked = flag
      for (let i of state.carts) {
        i.checked = flag
      }
    },
    cartNumAdd (state, idx) {
      common.log([theModuleName, 'cartNumAdd', state, 'idx:', idx])
      state.carts[idx].num++
    },
    cartNumLess (state, idx) {
      common.log([theModuleName, 'cartNumAdd', state, 'idx:', idx])
      if (state.carts[idx].num > 1) {
        state.carts[idx].num--
      } else {
        state.carts[idx].num = 1
        common.tos('数量不能小于1')
      }
    },
    cartNumChange (state, obj) {
      common.log([theModuleName, 'cartNumChange', state, 'obj:', obj])
      let num = parseInt(obj.v)
      num < 1 && (num = 1)
      num > 9999 && (num = 9999)
      state.carts[obj.idx].num = num
    }
  },
  getters: {
    getSystemInfo: (state, getters) => {
      if (!state.systemInfo) {
        state.systemInfo = mpvue.getSystemInfoSync()
      }
      return state.systemInfo
    },
    getCarts: (state, getters) => {
      if (!state.carts) {
        common.log([theModuleName, 'getCarts', '请配置网络请求动作'])
      }
      return state.carts
    }
  }
})
