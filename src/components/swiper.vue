<template>
  <swiper
    class="swiper-box"
    :indicator-dots="indicatorDots"
    :indicatorColor="indicatorColor"
    :indicatorActiveColor="indicatorActiveColor"
    :autoplay="autoplay"
    :interval="interval"
    :duration="duration"
  >
    <block v-for="(item, index) in images" :key="index" >
      <swiper-item>
        <image :src="item.url" class="slide-image" mode="aspectFill" />
      </swiper-item>
    </block>
  </swiper>
</template>

<script>
let theModuleName = "components/swiper";
export default {
  props: {
    images: Array,
    height: {
      type: String,
      default: '400rpx'
    },
  },
  data() {
    return {
      indicatorColor: "rgba(255,255,255,0.5)",
      indicatorActiveColor: "rgba(255,255,255,1)",
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 500
    };
  }
};
</script>

<style>
.swiper-box {
  background: #eee;
  height: 400rpx !important;
}
/*wx隐藏类*/
.swiper-box .wx-swiper-dots.wx-swiper-dots-horizontal {
  margin-bottom: 30rpx;
  /*background: #000;*/
}
/*点样式*/
.swiper-box .wx-swiper-dot {
  width: 12rpx;
  height: 12rpx;
  display: inline-flex;
  justify-content: space-between;
}
.swiper-box .wx-swiper-dot::before {
  content: "";
  flex-grow: 1;
  width: 12rpx;
  height: 12rpx;
  border-radius: 6rpx;
  background: rgba(255, 255, 255, 0.5);
}
/*选中点样式*/
.swiper-box .wx-swiper-dot-active {
  width: 24rpx;
}
/*选中点样式*/
.swiper-box .wx-swiper-dot-active::before {
  background: #fff;
}
image {
  height: 100%;
  width: 100%;
}
</style>
