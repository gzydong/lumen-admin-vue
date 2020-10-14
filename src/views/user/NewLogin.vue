<template>
  <div class="bag-body" style="display: flex;align-items: center;justify-content: center;width: 100%;height: 100%;">
    <div class="login-main">
      <a-row>
        <a-col :span="12" class="bag">

        </a-col>
        <a-col :span="12" style="padding: 30px;">
          <div class="login-title">连接数据，重塑价值</div>
          <div class="login-sub-title">欢迎来到 LumenCMS，请登录！</div>
          <a-form id="formLogin" class="user-layout-login" ref="formLogin" :form="form" @submit="handleSubmit">
            <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;"
              message="账户或密码错误（admin/ant.design )" />
            <a-form-item>
              <a-input size="large" type="text" placeholder="账户: admin" v-decorator="[
                        'username',
                        {rules: [{ required: true, message: '请输入帐户名或邮箱地址' }, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}
                      ]">
                <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
              </a-input>
            </a-form-item>

            <a-form-item>
              <a-input-password size="large" placeholder="密码: admin or ant.design" v-decorator="[
                        'password',
                        {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
                      ]">
                <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
              </a-input-password>
            </a-form-item>

            <a-form-item>
              <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">自动登录</a-checkbox>
              <router-link :to="{ name: 'recover', params: { user: 'aaa'} }" class="forge-password"
                style="float: right;">
                忘记密码
              </router-link>
            </a-form-item>

            <a-form-item style="margin-top:24px">
              <a-button size="large" type="primary" htmlType="submit" class="login-button" :loading="state.loginBtn"
                :disabled="state.loginBtn">确定</a-button>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </div>

  </div>
</template>

<script>
  import md5 from 'md5'
  import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
  import {
    mapActions
  } from 'vuex'
  import {
    timeFix
  } from '@/utils/util'
  import {
    getSmsCaptcha,
    get2step
  } from '@/api/login'

  export default {
    components: {
      TwoStepCaptcha
    },
    data() {
      return {
        customActiveKey: 'tab1',
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        isLoginError: false,
        requiredTwoStepCaptcha: false,
        stepCaptchaVisible: false,
        form: this.$form.createForm(this),
        state: {
          time: 60,
          loginBtn: false,
          // login type: 0 email, 1 username, 2 telephone
          loginType: 0,
          smsSendBtn: false
        }
      }
    },
    created() {
      get2step({})
        .then(res => {
          this.requiredTwoStepCaptcha = res.result.stepCode
        })
        .catch(() => {
          this.requiredTwoStepCaptcha = false
        })
      // this.requiredTwoStepCaptcha = true
    },
    methods: {
      ...mapActions(['Login', 'Logout']),
      // handler
      handleUsernameOrEmail(rule, value, callback) {
        const {
          state
        } = this
        const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
        if (regex.test(value)) {
          state.loginType = 0
        } else {
          state.loginType = 1
        }
        callback()
      },
      handleTabClick(key) {
        this.customActiveKey = key
        // this.form.resetFields()
      },
      handleSubmit(e) {
        e.preventDefault()
        const {
          form: {
            validateFields
          },
          state,
          customActiveKey,
          Login
        } = this

        state.loginBtn = true

        const validateFieldsKey = customActiveKey === 'tab1' ? ['username', 'password'] : ['mobile', 'captcha']

        validateFields(validateFieldsKey, {
          force: true
        }, (err, values) => {
          if (!err) {
            console.log('login form', values)
            const loginParams = {
              ...values
            }
            delete loginParams.username
            loginParams[!state.loginType ? 'email' : 'username'] = values.username
            loginParams.password = md5(values.password)
            Login(loginParams)
              .then((res) => this.loginSuccess(res))
              .catch(err => this.requestFailed(err))
              .finally(() => {
                state.loginBtn = false
              })
          } else {
            setTimeout(() => {
              state.loginBtn = false
            }, 600)
          }
        })
      },
      getCaptcha(e) {
        e.preventDefault()
        const {
          form: {
            validateFields
          },
          state
        } = this

        validateFields(['mobile'], {
          force: true
        }, (err, values) => {
          if (!err) {
            state.smsSendBtn = true

            const interval = window.setInterval(() => {
              if (state.time-- <= 0) {
                state.time = 60
                state.smsSendBtn = false
                window.clearInterval(interval)
              }
            }, 1000)

            const hide = this.$message.loading('验证码发送中..', 0)
            getSmsCaptcha({
              mobile: values.mobile
            }).then(res => {
              setTimeout(hide, 2500)
              this.$notification['success']({
                message: '提示',
                description: '验证码获取成功，您的验证码为：' + res.result.captcha,
                duration: 8
              })
            }).catch(err => {
              setTimeout(hide, 1)
              clearInterval(interval)
              state.time = 60
              state.smsSendBtn = false
              this.requestFailed(err)
            })
          }
        })
      },
      stepCaptchaSuccess() {
        this.loginSuccess()
      },
      stepCaptchaCancel() {
        this.Logout().then(() => {
          this.loginBtn = false
          this.stepCaptchaVisible = false
        })
      },
      loginSuccess(res) {
        console.log(res)
        // check res.homePage define, set $router.push name res.homePage
        // Why not enter onComplete
        /*
        this.$router.push({ name: 'analysis' }, () => {
          console.log('onComplete')
          this.$notification.success({
            message: '欢迎',
            description: `${timeFix()}，欢迎回来`
          })
        })
        */
        this.$router.push({
          path: '/'
        })
        // 延迟 1 秒显示欢迎信息
        setTimeout(() => {
          this.$notification.success({
            message: '欢迎',
            description: `${timeFix()}，欢迎回来`
          })
        }, 1000)
        this.isLoginError = false
      },
      requestFailed(err) {
        this.isLoginError = true
        this.$notification['error']({
          message: '错误',
          description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
          duration: 4
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .bag-body {
    background: #f0f2f5 url(/assets/background.5825f033.svg) no-repeat 50%;
    background-size: 100%;
    position: relative;
  }

  .login-main {
    height: 560px;
    max-width: 900px;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    border-radius: 0px 4px 4px 0px;
    box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.08);

    .login-title {
      color: rgba(0, 170, 231, 1);
      font-size: 32px;
      font-weight: 400;
      line-height: 48px;
      margin-bottom: 12px;
      text-align: center;
    }

    .login-sub-title {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      margin-bottom: 64px;
      text-align: center;
    }
  }

  .bag {
    height: 560px;
    text-align: right;
    padding-left: 0;
    padding-right: 0;
    background: linear-gradient(314deg, rgba(82, 114, 244, 1) 0%, rgba(0, 170, 231, 1) 100%) rgba(0, 170, 231, 0.65);
    background-color: rgba(0, 170, 231, 0.65);
    background-blend-mode: saturation;
    border-radius: 4px 0px 0px 4px;
    box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.08);
  }

  .user-layout-login {
    label {
      font-size: 14px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .forge-password {
      font-size: 14px;
    }

    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;
    }
  }
</style>