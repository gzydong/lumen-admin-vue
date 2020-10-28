<template>
  <div class="fixed-body">
    <div class="login-main">
      <div class="explain">
        <div class="login-aside-doc">
          <div class="login-aside-title">欢迎来到 LumenCMS</div>
          <div class="login-aside-desc">LumenCMS 是一个极简易开发的后台管理系统。采用了前后端分离开发模式。</div>
        </div>
        <login-aside-svg />
      </div>

      <div class="login-formbox">
        <div class="login-title">LumenCMS 管理系统</div>
        <div class="login-sub-title">欢迎来到 LumenCMS，请登录！</div>
        <a-form id="formLogin" ref="formLogin" :form="form" @submit="handleSubmit">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="请输入登录账号"
              v-decorator="[
                'username',
                {
                  rules: [{ required: true, message: '请输入帐户名' }],
                  validateTrigger: 'change',
                  initialValue: 'admin'
                }
              ]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input-password
              size="large"
              placeholder="请输入密码"
              v-decorator="[
                'password',
                {
                  rules: [{ required: true, message: '请输入密码' }],
                  validateTrigger: 'blur',
                  initialValue: 'admin888'
                }
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input-password>
          </a-form-item>

          <a-form-item>
            <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">记住登录</a-checkbox>
            <a-button type="link" style="float: right; padding-right: 0" @click="forgetPassword">忘记密码?</a-button>
          </a-form-item>

          <a-form-item style="margin-top: 24px">
            <a-button
              size="large"
              type="primary"
              htmlType="submit"
              class="login-button"
              :loading="state.loginBtn"
              :disabled="state.loginBtn"
              >确定</a-button
            >
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import { LoginAsideSvg } from '@/core/icons'

export default {
  components: {
    LoginAsideSvg
  },
  data() {
    return {
      form: this.$form.createForm(this),
      state: {
        loginBtn: false
      }
    }
  },
  methods: {
    ...mapActions(['Login']),

    // 表单提交事件
    handleSubmit(e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        Login
      } = this

      state.loginBtn = true

      validateFields(
        ['username', 'password'],
        {
          force: true
        },
        (err, values) => {
          if (!err) {
            const loginParams = {
              ...values
            }

            delete loginParams.username
            loginParams['username'] = values.username
            loginParams.password = values.password

            Login(loginParams)
              .then(res => {
                if (res.code == 200) {
                  this.loginSuccess(res)
                } else {
                  this.$notification['info']({
                    message: '登录提示',
                    description: res.message,
                    duration: 4
                  })
                }
              })
              .catch(err => {
                this.requestFailed(err)
              })
              .finally(() => {
                state.loginBtn = false
              })
          } else {
            setTimeout(() => {
              state.loginBtn = false
            }, 600)
          }
        }
      )
    },
    loginSuccess(res) {
      this.$router.push({ path: '/' })
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      }, 1000)
    },
    requestFailed(err) {
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
    },

    forgetPassword() {
      this.$notification.info({
        message: '温馨提示',
        description: `忘记密码？请联系管理员重置登录密码...`
      })
    }
  }
}
</script>

<style lang="less" scoped type="text/less">
.fixed-body {
  width: 100%;
  min-height: 100%;
  height: 100%;
  background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
  background-color: #f0f2f5;
  background-size: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-main {
    height: 560px;
    max-width: 900px;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    border-radius: 0px 4px 4px 0px;
    box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.08);
    transition: 0.2s ease-in-out;
    display: flex;
    flex-direction: row;

    .explain {
      height: 560px;
      text-align: right;
      padding-left: 0;
      padding-right: 0;
      background: linear-gradient(314deg, rgba(82, 114, 244, 1) 0%, rgba(0, 170, 231, 1) 100%) rgba(0, 170, 231, 0.65);
      background-color: rgba(0, 170, 231, 0.65);
      background-blend-mode: saturation;
      border-radius: 4px 0px 0px 4px;
      box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.08);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      flex-basis: 55%;
      flex-shrink: 0;

      .login-aside-doc {
        .login-aside-title {
          text-align: center;
          line-height: 48px;
          font-size: 32px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          margin-bottom: 12px;
        }

        .login-aside-desc {
          text-align: center;
          line-height: 18px;
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          margin-left: 82px;
          margin-right: 81px;
        }
      }
    }

    .login-formbox {
      flex: 1 auto;
      padding: 80px 20px 20px 20px;

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

      button.login-button {
        padding: 0 15px;
        font-size: 16px;
        height: 40px;
        width: 100%;
      }
    }
  }
}

@media screen and (max-width: 950px) {
  .fixed-body .login-main {
    width: 560px;

    .explain {
      display: none;
    }
  }
}

@media screen and (max-width: 560px) {
  .fixed-body .login-main {
    width: 95%;
  }
}

@media screen and (max-width: 400px) {
  .fixed-body .login-main {
    width: 100%;
    height: 100%;

    .login-formbox {
      padding-top: 100px;
    }
  }
}
</style>
