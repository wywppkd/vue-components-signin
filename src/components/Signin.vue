<template>
  <div class="signin">
    <div class="signin-modal">
      <!-- 获取验证码 -->
      <div class="getCode" v-show="signinType=='getCode'">
        <div class="close iconfont icon-close" @click="hideSingin" v-if="showClose"></div>
        <div class="title"><p class="horline">注册/登录</p></div>
        <div class="tip"><span v-show="inputTel.length === 11 && !(/^1[3456789]\d{9}$/.test(this.inputTel))">请输入正确的手机号</span></div>
        <div class="input border-bottom-thin" :class="{'font-bold':inputTel>0}">{{inputTel>0?inputTel:'请输入手机号'}}
          <span class="cursor"></span>
        </div>
        <button class="btn-next" @click="getCode" :disabled="!(/^1[3456789]\d{9}$/.test(this.inputTel))">下一步</button>
      </div>
      <!-- 输入验证码 -->
      <div class="sendCode" v-show="signinType=='sendCode'">
        <div class="close iconfont icon-close" @click="hideSingin" v-if="showClose"></div>
        <div class="icon-back icon-left" @click="signinType='getCode'"></div>
        <div class="title"><p class="horline">输入验证码</p></div>
        <div class="tip">验证码将发送至{{inputTel}}</div>
        <button class="btn-resend" v-show="seconds>0 && seconds<60">{{seconds}}s后重发</button>
        <button class="btn-resend-enabled" @click="getCode" v-show="seconds===0 || seconds===60">重新获取</button>
        <div class="items">
          <span :class="{active:veriCode.length===0}">{{veriCode[0]}}</span>
          <span :class="{active:veriCode.length===1}">{{veriCode[1]}}</span>
          <span :class="{active:veriCode.length===2}">{{veriCode[2]}}</span>
          <span :class="{active:veriCode.length===3}">{{veriCode[3]}}</span>
        </div>
      </div>
    </div>
    <van-number-keyboard
      :show="showKeyboard"
      extra-key="清空"
      delete-button-text="删除"
      @input="onInput"
      @delete="onDelete"
    />
  </div>
</template>
<script>
export default {
  props: ['showClose'], // showClose控制关闭按钮
  data () {
    return {
      inputTel: '', // 手机号
      signinType: 'getCode', // 输入状态
      seconds: 59, // 读秒
      veriCode: [], // 验证码
      timer: '', // 定时器
      showKeyboard: false
    }
  },
  created () {
    console.log('>>>>>>>>>>>')
    setTimeout(() => {
      this.showKeyboard = true
    }, 500)
  },
  methods: {
    // 读秒
    setTimer () {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.seconds--
        if (this.seconds === 0) {
          clearInterval(this.timer)
          this.seconds = 60
        }
      }, 1000)
    },
    // 获取验证码
    getCode () {
      console.log('111')
      setTimeout(() => {
        const retCode = 1111// 1111成功,2222时间限制,3333失败
        if (retCode === 1111) {
          this.setTimer()
          this.signinType = 'sendCode'
        } else if (retCode === 2222) {
          this.seconds = 43
          this.setTimer()
          this.signinType = 'sendCode'
        } else {
          this.$toast.fail('获取验证码失败，请重试')
        }
      }, 1000)
    },
    hideSingin () {
      this.$bus.$emit('hideSingin')
    },
    sendCode () {
      setTimeout(() => {
        this.$bus.$emit('hideSingin')
        this.$toast.success('登录成功')
      }, 2000)
    },
    // 数字键盘
    onInput (value) {
      console.log(value)
      // 清空
      if (value === '清空') {
        if (this.signinType === 'getCode') {
          this.inputTel = ''
        } else if (this.signinType === 'sendCode') {
          this.veriCode = []
        }
        return
      }
      // 数字
      if (this.signinType === 'getCode') {
        this.inputTel = (this.inputTel + value).substring(0, 11)
      } else if (this.signinType === 'sendCode') {
        this.veriCode.push(value)
        if (this.veriCode.length === 4) {
          this.sendCode()
          this.$toast({
            message: '验证中...'
          })
        }
      }
    },
    onDelete () {
      // 删除
      if (this.signinType === 'getCode') {
        this.inputTel = this.inputTel.substr(0, this.inputTel.length - 1)
      } else if (this.signinType === 'sendCode') {
        this.veriCode.pop()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@keyframes blink {
  50% {
    background: #108ee9;
  }
}
.signin-modal{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(37, 38, 45, .4);
  // background-color: rgba(37, 38, 45, .5);
  .getCode,.sendCode{
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translateX(-50%);
    width: 630px;
    height: 500px;
    border-radius: 10px;
    background-color: #fff;
    font-size: 36px;
    .close{
      position: absolute;
      right: 30px;
      top: 30px;
      width: 60px;
      height: 60px;
    }
    .title{
      height: 36px;
      padding-top: 40px;
      font-size: 36px;
      font-weight: 700;
      line-height: 36px;
      color: #070707;
    }
    .tip{
      height: 30px;
      padding-top: 50px;
      text-align: center;
      line-height: 30px;
      color: #999;
    }
  }
  .getCode{
    .tip{
      color: #e70012;
    }
    .input{
      width: 530px;
      height: 66px;
      line-height: 66px;
      padding-top: 88px;
      margin: 0 auto;
      position: relative;
      .cursor{
        position: absolute;
        bottom: 15px;
        width: 4px;
        height: 40px;
        animation: 1s blink infinite;
      }
    }
    .btn-next{
      width: 530px;
      height: 88px;
      margin-top: 73px;
      border-radius: 44px;
      line-height: 88px;
      font-size: 36px;
      font-weight: 700;
      background-color: $themeColor;
      color: #fff;
    }
  }
  .sendCode{
    .icon-back{
      position: absolute;
      left: 40px;
      width: 60px;
      height: 110px;
    }
    .btn-resend,.btn-resend-enabled{
      padding:0 30px;
      height: 80px;
      margin-top: 60px;
      border-radius: 40px;
      border: 1px solid #3988ff;
      background: #fff;
      font-size: 24px;
      font-weight: 500;
      line-height: 40px;
      color: $themeColor;
    }
    .btn-resend-enabled{
      background-color: $themeColor;
      color: #fff;
      font-weight: 500;
      font-size: 36px;
    }
    .items{
      padding-top: 72px;
      width: 472px;
      height: 88px;
      margin: 0 auto;
      span{
        float: left;
        width: 88px;
        height: 88px;
        box-sizing: border-box;
        border: 1px solid #999;
        margin-right: 40px;
        font-size: 36px;
        line-height: 88px;
      }
      span:last-child{
        margin-right: 0;
      }
      span.active{
        border-color: #3988ff;
      }
    }
  }
}
</style>
