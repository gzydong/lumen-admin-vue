<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">
        <a-form layout="vertical" :form="form">
          <a-form-item label="登录账号">
            <a-input disabled="disabled" v-model="username" style="background: none" />
          </a-form-item>
          <a-form-item label="昵称">
            <a-input placeholder="给自己起个名字" v-decorator="['nickname']" />
          </a-form-item>
          <a-form-item label="电子邮件" :required="false">
            <a-input
              placeholder="exp@admin.com"
              v-decorator="[
                'email',
                {
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!'
                    }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item label="个人简介(预留)">
            <a-textarea
              rows="4"
              placeholder="填写个人简介(非必填)..."
              v-decorator="[
                'profile',
                {
                  rules: [
                    {
                      max: 180,
                      message: '个人简介控制在180个字符以内...'
                    }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" :loading="loading" @click="submit">更新基本信息</a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <div class="ant-upload-preview" @click="$refs.modal.edit(1)">
          <a-icon type="cloud-upload-o" class="upload-icon" />
          <div class="mask">
            <a-icon type="plus" />
          </div>
          <img :src="option.img" />
        </div>
      </a-col>
    </a-row>

    <avatar-modal ref="modal" @ok="setavatar" />
  </div>
</template>

<script>
import AvatarModal from './AvatarModal'

import { ServeGetAdminDetail, ServeUpdateAdminDetail } from '@/api/admin'
import pick from 'lodash.pick'
export default {
  components: {
    AvatarModal
  },
  data() {
    return {
      form: this.$form.createForm(this),
      loading: false,
      username: '',
      option: {
        img: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
      }
    }
  },
  created() {
    const fields = ['nickname', 'email', 'profile']

    ServeGetAdminDetail()
      .then(res => {
        if (res.code == 200) {
          let result = res.data
          this.username = result.username
          this.form.setFieldsValue(pick(result, fields))
        }
      })
      .catch(err => {
        this.$message.error('网络异常，请稍后再试...')
      })
  },
  methods: {
    setavatar(url) {
      this.option.img = url
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
      data.avatar = ''
      ServeUpdateAdminDetail(data)
        .then(res => {
          if (res.code == 200) {
            this.$message.success('信息更新成功...')
          } else {
            this.$message.error('信息更新失败...')
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
