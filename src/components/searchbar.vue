<template>
  <div class="search">
      <div class="input" value="搜一搜鲜花" @tap='tapInput'>
        <img src="/static/icon/search.png">
        <div>搜一搜</div>
      </div>
  </div>
</template>

<script>
import appJson from '@/app.json'
import com from '@/utils/common'
let theModuleName = 'components/navbar'

export default {
  props: {
    // 在app.json中配置
    title: {
      type: String,
      default: appJson.window.navigationBarTitleText
    }
  },
  data () {
    return {
    }
  },
  methods: {
    tapInput (e) {
      com.log([theModuleName, 'tapInput', e])
    }
  }
}
</script>

<style>
.search {
  display: flex;
  width: 100%;
  height: 98rpx;
  justify-content: center;
  align-items: center;
  background-color: #02d5b7;
}

.input {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 62rpx;
  margin: 9rpx 40rpx;
  background-color: white;
  border-radius: 31rpx;
  font-size: 13px;
  color: #c4c4c4;
}
.input img{
  margin-right: 4rpx;
  width: 50rpx;
  height: 50rpx;
}
</style>
