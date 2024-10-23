<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="picUrl" @click="getPicCode" :src="picUrl" alt="">
        </div>
        <div class="form-item">
          <input v-model="msgCode" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getSmsCode">
            {{second===totalSecond? '获取验证码' : second + `秒后重新发送`}}
          </button>
        </div>
      </div>

      <div  @click="login" class="login-btn">登录</div>
    </div>
  </div>
</template>

<script>
import { codeLogin, getMsgCode, getPicCode } from '@/api/login'
export default {
  name: 'LoginPage',
  data () {
    return {
      picUrl: '', // 图形验证码地址
      picKey: '',
      picCode: '', // 图形验证码
      mobile: '', // 手机号
      msgCode: '', // 短信验证码
      totalSecond: 60, // 总秒数
      second: 60, // 倒计时的秒数
      timer: null // 定时器 id
    }
  },
  async created () {
    this.getPicCode()
  },
  methods: {
  // 获取图形验证码
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64
      this.picKey = key
    },
    // 判断是否通过校验
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    // 获取短信验证码&倒计时
    async getSmsCode () {
      // 没有通过返回
      if (!this.validFn()) {
        return
      }
      // 当前没有定时器开着，且second和totalSecond一致开始倒计时
      if (!this.timer && this.second === this.totalSecond) {
        // 发送验证码请求
        // 响应非200，抛出promise错误，await只会等待正确的响应
        await getMsgCode(this.picCode, this.picKey, this.mobile)
        this.$toast('发送成功，请注意查收')
        // 开启倒计时
        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null // 重置定时器id
            this.second = this.totalSecond // 归位
          }
        }, 1000)
      }
    },
    async login () {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的短信验证码')
        return
      }
      const res = await codeLogin(this.mobile, this.msgCode)
      this.$store.commit('user/setUserInfo', res.data) // 保存登录信息
      console.log(res)
      this.$toast('登录成功')
      const url = this.$route.query.backurl || '/'
      this.$router.replace(url)
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
