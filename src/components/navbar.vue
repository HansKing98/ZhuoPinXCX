<template>
  <div class="title">
    <text>{{title}}</text>
  </div>
</template>

<script>
import appJson from '@/app.json'
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
  }
}
</script>

<style>
.title {
  display: flex;
  padding: 40rpx 0 0 0;
  width: 100%;
  height: 88rpx;
  justify-content: center;
  align-items: center;
  background-color: #02d5b7;
  font-size: 36rpx;
  color: white;
}
</style>
