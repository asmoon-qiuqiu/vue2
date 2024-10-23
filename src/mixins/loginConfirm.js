import { Dialog } from 'vant'
export default {
  methods: {
    loginConfirm () {
      // 判断token是否存在
      // 不存在弹对话框，存在继续操作
      if (!this.$store.getters.token) {
        Dialog.confirm({
          title: '温馨提示',
          message: '请先进行登录',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'

        })
          .then(() => {
            // 希望登录后跳转回登陆页面
            // this.$router.fullPath(包含查询参数)
            this.$router.replace({
              path: '/login',
              query: {
                backurl: this.$route.fullPath
              }
            })
          })
          .catch(() => { })
        return true
      }
      return false
    }
  }

}
