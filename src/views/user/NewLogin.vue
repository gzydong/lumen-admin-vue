<template>
  <div class="bag-body" style="display: flex;align-items: center;justify-content: center;width: 100%;height: 100%;">
    <div class="login-main">
      <a-row>
        <a-col :span="12" class="bag"
          style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
          <div class="login-aside-doc">
            <div class="login-aside-title">欢迎来到 LumenCMS</div>
            <div class="login-aside-desc">LumenCMS 是一个极简易开发的后台管理系统。采用了前后端分离开发模式。</div>
          </div>
          <logo-svg />
        </a-col>
        <a-col :span="12" style="padding: 80px 30px 30px 30px; ">
          <div class="login-title">LumenCMS后台管理系统</div>
          <div class="login-sub-title">欢迎来到 LumenCMS，请登录！</div>
          <a-form id="formLogin" class="user-layout-login" ref="formLogin" :form="form" @submit="handleSubmit">
            <a-form-item>
              <a-input size="large" type="text" placeholder="请输入登录账号"
                v-decorator="['username',{rules: [{ required: true, message: '请输入帐户名' }], validateTrigger: 'change',initialValue: 'admin'}]">
                <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
              </a-input>
            </a-form-item>

            <a-form-item>
              <a-input-password size="large" placeholder="请输入密码"
                v-decorator="['password',{rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur',initialValue: 'admin888'}]">
                <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
              </a-input-password>
            </a-form-item>

            <a-form-item>
              <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">自动登录</a-checkbox>
              <a-button type="link" style="float: right;padding-right: 0;">忘记密码?</a-button>
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
  import {
    mapActions
  } from 'vuex'

  import {
    timeFix
  } from '@/utils/util'

  import LogoSvg from '@/assets/login-aside.svg?inline'

  export default {
    components: {
      LogoSvg
    },
    data() {
      return {
        form: this.$form.createForm(this),
        state: {
          loginBtn: false,
          smsSendBtn: false
        }
      }
    },
    created() {},
    methods: {
      ...mapActions(['Login', 'Logout']),

      // 表单提交事件
      handleSubmit(e) {
        e.preventDefault()
        const {
          form: {
            validateFields
          },
          state,
          Login
        } = this

        state.loginBtn = true

        validateFields(['username', 'password'], {
          force: true
        }, (err, values) => {
          if (!err) {
            console.log('login form', values)
            const loginParams = {
              ...values
            }

            delete loginParams.username
            loginParams['username'] = values.username
            loginParams.password = values.password
            Login(loginParams)
              .then((res) => this.loginSuccess(res))
              .catch(err => this.requestFailed(err))
              .finally(() => {
                state.loginBtn = false
              })
          } else {
            setTimeout(() => {
              state.loginBtn = false
            }, 600);
          }
        })
      },
      loginSuccess(res) {
        this.$router.push({
          path: '/dashboard/analysis'
        });

        // 延迟 1 秒显示欢迎信息
        setTimeout(() => {
          this.$notification.success({
            message: '欢迎',
            description: `${timeFix()}，欢迎回来`
          })
        }, 1000);
      },
      requestFailed(err) {
        this.$notification['error']({
          message: '错误',
          description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
          duration: 4
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  .bag-body {
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url(/assets/background.a568162c.svg) no-repeat 50%;
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