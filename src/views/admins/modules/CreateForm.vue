<template>
  <a-modal title="创建管理员" :width="550" :visible="visible" :confirmLoading="loading" okText="立即添加" cancelText="取消" @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }">
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-item v-show="model && model.id > 0" label="主键ID">
          <a-input v-decorator="['id', { initialValue: 0 }]" disabled />
        </a-form-item>
        <a-form-item label="登录账号">
          <a-input placeholder="请填写登录账号" v-decorator="['username', {rules: [{required: true, message: '登录账号不能为空！'}]}]" />
        </a-form-item>
        <a-form-item label="登录密码">
          <a-input placeholder="请填写登录密码" v-decorator="['password', {rules: [{required: true,  message: '密码不能为空！'}]}]" />
        </a-form-item>
        <a-form-item label="确认密码">
          <a-input placeholder="请填写确认密码" v-decorator="['password2', {rules: [{required: true, message: '确认密码不能为空！'}]}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import pick from 'lodash.pick'

  // 表单字段
  const fields = [, 'id','username','password','password2']

  export default {
    props: {
      visible: {
        type: Boolean,
        required: true
      },
      loading: {
        type: Boolean,
        default: () => false
      },
      model: {
        type: Object,
        default: () => null
      }
    },
    data() {
      this.formLayout = {
        labelCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 7
          }
        },
        wrapperCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 13
          }
        }
      }
      return {
        form: this.$form.createForm(this)
      }
    },
    created() {
      // 防止表单未注册
      fields.forEach(v => this.form.getFieldDecorator(v))

      // 当 model 发生改变时，为表单设置值
      this.$watch('model', () => {
        this.model && this.form.setFieldsValue(pick(this.model, fields))
      })
    }
  }
</script>