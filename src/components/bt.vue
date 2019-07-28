<template>
  <button
    :form-type="formType"
    @tap="tapBt"
    :disabled="disable"
    :open-type="openType"
    :id="id"
    :class="type"
    :style="{height: height, 'line-height': height, 'border-radius':height, width: width, 'font-size': fontSize, margin: margin}"
  >{{text}}</button>
</template>

<script>
// import common from '@/utils/common'
// let theModuleName = 'components/bt'
export default {
  props: {
    text: {
      type: String,
      default: '确定'
    },
    id: String,
    type: String,
    width: {
      type: String,
      default: '120rpx'
    },
    height: {
      type: String,
      default: '50rpx'
    },
    formType: String,
    openType: String,
    tapBt: Function,
    disable: {
      type: Boolean,
      default: false
    },
    fontSize: {
      type: String,
      default: '13px'
    },
    margin: String
  },
  methods: {}
}
</script>

<style>
button {
  color: #353535;
  background-color: #fff;
  /*box-shadow: 0 2px 10px 0 rgba(0,0,0,0.20);*/
  border-radius: 50%;
  font-family: PingFangSC-Regular;
  font-size: 13px;
  letter-spacing: 0;
  text-align: center;
  padding: 0;
  flex-shrink: 0;
}
/* .button-hover {
} */
button::after {
  border: 0;
}
button.primary {
  color: #fff;
  background: #0fbcf9;
}
button.white {
  color: #ff4666;
  background: #fff;
  border: #ff4666 solid 1rpx;
}
button.cart {
  color:  #FFFFFF;
  background: rgb(235, 167, 206);
}
button.radio {
  color: #202020;
  width: 150rpx;
  height: 50rpx;
  background: #EEFAF8;
  border-radius: 25rpx;
}
button.radio_act {
  color: #202020;
  width: 150rpx;
  height: 50rpx;
  background: #FFEDF0 ;
  border: #FF4666 solid 2rpx;
  border-radius: 25rpx;
}
</style>
