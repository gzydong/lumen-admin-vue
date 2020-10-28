<template>
  <a-modal
    :title="model ? '编辑角色' : '添加角色'"
    :width="550"
    :visible="visible"
    :confirmLoading="loading"
    :okText="model ? '立即编辑' : '立即添加'"
    cancelText="取消"
    @ok="ok"
    @cancel="cancel"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <a-form-item v-show="false">
          <a-input v-decorator="['id', { rules: [] }]" placeholder="ID" />
        </a-form-item>
        <a-form-item label="权限字符">
          <a-input
            placeholder="请填写权限字符 (建议英文字母)"
            v-decorator="['name', { rules: [{ required: true, message: '权限字符不能为空！' }] }]"
          />
        </a-form-item>
        <a-form-item label="角色名称">
          <a-input
            placeholder="请填写角色名称"
            v-decorator="['display_name', { rules: [{ required: true, message: '角色名称不能为空！' }] }]"
            @keyup.native.enter="ok"
          />
        </a-form-item>
        <a-form-item label="角色描述">
          <a-input
            placeholder="请填写角色描述(非必填)"
            v-decorator="['description']"
            @keyup.native.enter="ok"
            type="textarea"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { ServeCreateRole, ServeEditRole } from '@/api/rbac'

// 表单字段
const fields = ['id', 'name', 'display_name', 'description']

export default {
  name: 'EditRole',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    model: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      formLayout: {
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
      },
      loading: false,
      form: this.$form.createForm(this)
    }
  },
  watch: {
    model() {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    }
  },
  created() {
    fields.forEach(v => this.form.getFieldDecorator(v))
  },
  methods: {
    ok() {
      this.loading = true
      let _this = this
      this.form.validateFields((errors, values) => {
        if (!errors) {
          if (values.id > 0) {
            _this.edit(values)
          } else {
            _this.add(values)
          }
        } else {
          this.loading = false
        }
      })
    },
    cancel() {
      this.$emit('cancel')
    },

    add(values) {
      ServeCreateRole(values)
        .then(res => {
          this.loading = false
          if (res.code == 200) {
            this.$message.success('角色添加成功...')
            this.$emit('success')
          } else {
            this.$message.info('角色添加失败...')
          }
        })
        .catch(err => {
          this.$message.error('网络异常,请稍后再试...')
          this.loading = false
        })
    },

    edit(values) {
      values.role_id = values.id
      ServeEditRole(values)
        .then(res => {
          this.loading = false
          if (res.code == 200) {
            this.$message.success('角色编辑成功...')
            this.$emit('success')
          } else {
            this.$message.info('角色编辑失败...')
          }
        })
        .catch(err => {
          this.$message.error('网络异常,请稍后再试...')
          this.loading = false
        })
    }
  }
}
</script>
