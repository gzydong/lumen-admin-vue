<template>
  <a-modal
    :title="model ? '编辑权限' : '添加权限'"
    :width="550"
    :visible="visible"
    :confirmLoading="loading"
    okText="立即添加"
    cancelText="取消"
    @ok="ok"
    @cancel="cancel"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <a-form-item v-show="false">
          <a-input v-decorator="['id', { rules: [] }]" placeholder="ID" />
        </a-form-item>
        <a-form-item label="父级权限">
          <a-tree-select
            show-search
            style="width: 100%"
            v-model="parent_id"
            :dropdown-style="{ maxHeight: '500px', overflow: 'auto' }"
            placeholder="不选择默认为顶级栏目"
            allow-clear
            tree-default-expand-all
            :tree-data="tree"
            :replaceFields="{ children: 'children', title: 'rule_name', key: 'key', value: 'id' }"
          >
          </a-tree-select>
        </a-form-item>
        <a-form-item label="权限类型">
          <a-radio-group v-decorator="['type', { rules: [{ required: true, message: '权限类型必选！' }] }]">
            <a-radio-button value="0">目录</a-radio-button>
            <a-radio-button value="1">菜单</a-radio-button>
            <a-radio-button value="2">权限</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="权限名称">
          <a-input
            placeholder="请填写权限名称"
            v-decorator="['rule_name', { rules: [{ required: true, message: '权限字符不能为空！' }] }]"
          />
        </a-form-item>
        <a-form-item label="权限路由">
          <a-input
            placeholder="请填写权限路由"
            v-decorator="['route', { rules: [{ required: true, message: '权限路由不能为空！' }] }]"
            @keyup.native.enter="ok"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import Vue from 'vue'
import { TreeSelect } from 'ant-design-vue'
Vue.use(TreeSelect)

import pick from 'lodash.pick'

import { ServeCreatePerms, ServeEditPerms } from '@/api/rbac'

// 表单字段
const fields = ['id', 'type', 'route', 'rule_name']

export default {
  name: 'RuleForm',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    model: {
      type: Object,
      default: null,
    },
    tree: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      loading: false,
      form: this.$form.createForm(this),
      parent_id: undefined,
      formLayout: {
        labelCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 7,
          },
        },
        wrapperCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 13,
          },
        },
      },
    }
  },
  watch: {
    model() {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    },
  },
  created() {
    // 防止表单未注册
    fields.forEach((v) => this.form.getFieldDecorator(v))
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

    setParentId(parent_id) {
      this.parent_id = parent_id
    },
    add(values) {
      values.parent_id = this.parent_id == undefined ? 0 : this.parent_id
      ServeCreatePerms(values)
        .then((res) => {
          this.loading = false
          if (res.code == 200) {
            this.$message.success('角色添加成功...')
            this.$emit('success')
          } else {
            this.$message.info('角色添加失败...')
          }
        })
        .catch((err) => {
          this.$message.error('网络异常,请稍后再试...')
          this.loading = false
        })
    },

    edit(values) {
      values.role_id = values.id
      ServeEditPerms(values)
        .then((res) => {
          this.loading = false
          if (res.code == 200) {
            this.$message.success('角色编辑成功...')
            this.$emit('success')
          } else {
            this.$message.info('角色编辑失败...')
          }
        })
        .catch((err) => {
          this.$message.error('网络异常,请稍后再试...')
          this.loading = false
        })
    },
  },
}
</script>
