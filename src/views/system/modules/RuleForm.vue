<template>
  <a-modal
    :title="model ? '编辑权限' : '添加权限'"
    :width="550"
    :visible="visible"
    :confirmLoading="loading"
    :okText="model ? '立即编辑' : '立即添加'"
    cancelText="取消"
    @ok="submit"
    @cancel="cancel"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <a-form-item v-show="false">
          <a-input v-decorator="['id']" />
        </a-form-item>
        <a-form-item label="父级菜单">
          <a-tree-select
            v-decorator="['parent_id']"
            :dropdown-style="{ maxHeight: '500px', overflow: 'auto' }"
            placeholder="默认为顶级栏目"
            allow-clear
            tree-default-expand-all
            :tree-data="tree"
            :replaceFields="{ children: 'children', title: 'title', key: 'key', value: 'id' }"
          >
          </a-tree-select>
        </a-form-item>
        <a-form-item label="菜单类型">
          <a-radio-group v-decorator="['type', { rules: [{ required: true, message: '权限类型必选！' }] }]">
            <a-radio-button value="0">目录</a-radio-button>
            <a-radio-button value="1">菜单</a-radio-button>
            <a-radio-button value="2">权限</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="菜单标题">
          <a-input
            placeholder="请填写菜单标题"
            v-decorator="['title', { rules: [{ required: true, message: '权限名称不能为空！' }] }]"
          />
        </a-form-item>
        <a-form-item label="权限标识">
          <a-input placeholder="请填写权限标识" v-decorator="['perms', { rules: [] }]" />
        </a-form-item>
        <a-form-item label="路由地址">
          <a-input placeholder="请填写路由地址" v-decorator="['path', { rules: [] }]" />
        </a-form-item>

        <a-form-item label="组件地址">
          <a-input placeholder="请填写组件地址" v-decorator="['component', { rules: [] }]" />
        </a-form-item>

        <a-form-item label="是否隐藏">
          <a-radio-group v-decorator="['hidden', { rules: [{ required: true, message: '是否隐藏必选！' }] }]">
            <a-radio-button value="0">否</a-radio-button>
            <a-radio-button value="1">是</a-radio-button>
          </a-radio-group>
        </a-form-item>

        <a-form-item label="是否外链">
          <a-radio-group v-decorator="['is_frame', { rules: [{ required: true, message: '是否外链必选！' }] }]">
            <a-radio-button value="0">否</a-radio-button>
            <a-radio-button value="1">是</a-radio-button>
          </a-radio-group>
        </a-form-item>

        <a-form-item label="菜单排序">
          <a-input-number placeholder="非必填项" v-decorator="['sort']" :min="0" :max="9999" style="width:100%" />
        </a-form-item>

        <a-form-item label="菜单图标">
          <a-input-search placeholder="非必填项" v-decorator="['icon']">
            <a-button slot="enterButton" type="primary">
              <a-icon type="search" />
            </a-button>
          </a-input-search>
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
const fields = ['id', 'parent_id', 'type', 'title', 'path', 'component', 'perms', 'icon', 'sort', 'hidden', 'is_frame']

export default {
  name: 'RuleForm',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    model: {
      type: Object,
      default: null
    },
    tree: {
      type: Array,
      default: []
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
      form: this.$form.createForm(this, { name: 'rule_from', onValuesChange(props, values) {} }),
      parent_id: undefined
    }
  },
  watch: {
    model() {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    }
  },
  created() {
    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))
  },
  methods: {
    submit() {
      this.loading = true
      let _this = this
      this.form.validateFields((errors, values) => {
        if (!errors) {
          values.parent_id = values.parent_id == undefined ? 0 : values.parent_id
          values.icon = values.icon == undefined ? '' : values.icon
          values.sort = values.sort == undefined ? '0' : values.sort

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
      ServeCreatePerms(values)
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
      ServeEditPerms(values)
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
