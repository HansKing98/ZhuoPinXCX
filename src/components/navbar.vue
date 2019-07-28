<template>
  <div>
    <div class="title" :style="{'padding-top': top}">
        <div class="bt-back" v-if='btL' @tap='tap'>
          <img src="/static/icon/back.png">
        </div>
        <div id="nav-title">{{title}}</div>
        <div id="edit" v-if='btR' @tap='tapBtR'>编辑</div>
    </div>
    <div class="placeholder-navbar" :style="{'padding-top': top}"></div>
  </div>
</template>

<script>
import appJson from '@/app.json'
// let theModuleName = 'components/navbar'
export default {
  props: {
    // 在app.json中配置
    title: {
      type: String,
      default: appJson.window.navigationBarTitleText
    },
    btL: {
      type: Boolean,
      default: true
    },
    btR: {
      type: Boolean,
      default: false
    },
    tapBtR: Function
  },
  data () {
    return {
      top: this.$store.getters.getSystemInfo.statusBarHeight + 'px'
    }
  },
  methods: {
    tap (e) {
      mpvue.navigateBack({delta: 1})
    }
  },

  onLoad (q) {

  }
}
</script>

<style>
.title {
  position: fixed;
  z-index: 10;
  display: flex;
  width: 100%;
  height: 88rpx;
  justify-content: center;
  align-items: center;
  background-color: #0fbcf9;
  letter-spacing: 0;
  text-align: center;

  color: #FFFFFF;
}
#nav-title{
  font-size: 36rpx;
  font-family: PingFangSC-Medium;
  font-size: 18px;
}

.bt-back{
  display: flex;
  align-items: center;
  position: absolute;
  left: 0rpx;
  bottom: 0;
  height: 88rpx;
  width: 88rpx;
}
.bt-back img{
  margin-left: 21rpx;
  height: 56rpx;
  width: 38rpx;
}
#edit{
  /*margin-left: 61rpx;*/
  right: 220rpx;
  font-family: PingFangSC-Regular;
  font-size: 13px;
  float: right;
  position: absolute;
}
.placeholder-navbar{
  height: 88rpx;
  width: 100vw;
}
</style>
