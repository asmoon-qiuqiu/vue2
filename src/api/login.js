import axios from '@/utils/request'

// 获取图形验证码
export const getPicCode = () => {
  return axios.get('/captcha/image')
}

// 获取短信验证码
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return axios.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

// 手机验证码登录
export const codeLogin = (mobile, smsCode) => {
  return axios.post('/passport/login', {
    form: {
      isParty: false,
      mobile,
      partyData: {},
      smsCode
    }
  })
}
