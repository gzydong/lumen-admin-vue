<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">
        <a-form layout="vertical" :form="form">
          <a-form-item label="原始密码">
            <a-input
              type="password"
              placeholder="请填写原始登录密码"
              v-decorator="[
                'old_password',
                {
                  rules: [
                    {
                      required: true,
                      message: '旧密码不能为空！'
                    }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item label="设置新密码">
            <a-input
              type="password"
              placeholder="请设置新的登录密码"
              v-decorator="[
                'password',
                {
                  rules: [
                    {
                      required: true,
                      message: '请设置新的登录密码!'
                    },
                    {
                      min: 6,
                      message: '密码最小6位数!'
                    }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item label="确认新密码">
            <a-input
              type="password"
              placeholder="请确认新的登录密码"
              v-decorator="[
                'password2',
                {
                  rules: [
                    {
                      required: true,
                      message: '确认密码不能为空！'
                    },
                    { validator: compareToFirstPassword }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" :loading="loading" @click="submit">修改密码</a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ServeUpdatePassword } from '@/api/admin'

export default {
  data() {
    return {
      form: this.$form.createForm(this),
      loading: false
    }
  },
  methods: {
    // 确认密码验证事件
    compareToFirstPassword(rule, value, callback) {
      if (value && value !== this.form.getFieldValue('password')) {
        callback('您输入的两个密码不一致！')
      } else {
        callback()
      }
    },

    submit() {
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.saveDetail(values)
        }
      })
    },

    // 保存信息
    saveDetail(data) {
      this.loading = true
      ServeUpdatePassword(data)
        .then(res => {
          if (res.code == 200) {
            this.$message.success('密码更新成功...')
            this.form.resetFields()
          } else {
            this.$message.error('原始密码填写错误...')
          }
        })
        .catch(err => {
          this.$message.error('网络异常，请稍后再试...')
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
.avatar-upload-wrapper {
  height: 200px;
  width: 100%;
}

.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img,
  .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
