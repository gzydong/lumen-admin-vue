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
            :dropdown-style="{ maxHeight: '600px', overflow: 'auto' }"
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
import { createPermission, editRole } from '@/api/manage'

// 表单字段
const fields = ['id', 'type', 'route', 'rule_name']

let meTree = [
  {
    id: 1,
    pid: 0,
    type: 1,
    route: 'admin',
    display_name: '控制台',
    description: null,
    created_at: null,
    updated_at: null,
    key: 1
  },
  {
    id: 2,
    pid: 0,
    type: 0,
    route: '',
    display_name: '权限管理',
    description: null,
    created_at: null,
    updated_at: null,
    key: 2,
    children: [
      {
        id: 3,
        pid: 2,
        type: 1,
        route: 'admin/rbac/admin-page',
        display_name: '管理员管理',
        description: null,
        created_at: null,
        updated_at: null,
        key: 3,
        children: [
          {
            id: 6,
            pid: 3,
            type: 2,
            route: 'admin/rbac/get-admin-api',
            display_name: '查看管理员数据',
            description: null,
            created_at: null,
            updated_at: null,
            key: 6
          },
          {
            id: 7,
            pid: 3,
            type: 2,
            route: 'admin/rbac/reset-admin-pwd',
            display_name: '重置密码',
            description: null,
            created_at: null,
            updated_at: null,
            key: 7
          },
          {
            id: 8,
            pid: 3,
            type: 2,
            route: 'admin/rbac/chage-admin-status-api',
            display_name: '修改状态',
            description: null,
            created_at: null,
            updated_at: null,
            key: 8
          },
          {
            id: 36,
            pid: 3,
            type: 2,
            route: 'admin/rbac/give-role-api',
            display_name: '分配管理员角色',
            description: null,
            created_at: null,
            updated_at: null,
            key: 36
          }
        ]
      },
      {
        id: 4,
        pid: 2,
        type: 1,
        route: 'admin/rbac/role-page',
        display_name: '角色管理',
        description: null,
        created_at: null,
        updated_at: null,
        key: 4,
        children: [
          {
            id: 9,
            pid: 4,
            type: 2,
            route: 'admin/rbac/get-role-api',
            display_name: '查看角色数据',
            description: null,
            created_at: null,
            updated_at: null,
            key: 9
          },
          {
            id: 37,
            pid: 4,
            type: 2,
            route: 'admin/rbac/add-role-api',
            display_name: '添加/编辑角色',
            description: null,
            created_at: null,
            updated_at: null,
            key: 37
          },
          {
            id: 38,
            pid: 4,
            type: 2,
            route: 'admin/rbac/give-permissions-api',
            display_name: '分配角色权限',
            description: null,
            created_at: null,
            updated_at: null,
            key: 38
          },
          {
            id: 39,
            pid: 4,
            type: 2,
            route: 'admin/rbac/chage-role-status-api',
            display_name: '修改角色状态',
            description: null,
            created_at: null,
            updated_at: null,
            key: 39
          }
        ]
      },
      {
        id: 5,
        pid: 2,
        type: 1,
        route: 'admin/rbac/permissions-page',
        display_name: '规则管理',
        description: null,
        created_at: null,
        updated_at: null,
        key: 5,
        children: [
          {
            id: 40,
            pid: 5,
            type: 2,
            route: 'admin/rbac/edit-permissions-api',
            display_name: '添加规则',
            description: null,
            created_at: null,
            updated_at: null,
            key: 40
          }
        ]
      }
    ]
  },
  {
    id: 41,
    pid: 46,
    type: 0,
    route: '无',
    display_name: '微信管理',
    description: null,
    created_at: null,
    updated_at: null,
    key: 41,
    children: [
      {
        id: 42,
        pid: 41,
        type: 0,
        route: 'admin/wechat/wx-conf-page',
        display_name: '微信配置设置',
        description: null,
        created_at: null,
        updated_at: null,
        key: 42,
        children: [
          {
            id: 43,
            pid: 42,
            type: 0,
            route: 'admin/wechat/wx-conf-api',
            display_name: '编辑微信配置参数',
            description: null,
            created_at: null,
            updated_at: null,
            key: 43
          }
        ]
      },
      {
        id: 44,
        pid: 41,
        type: 0,
        route: 'admin/wechat/menu-page',
        display_name: '公众号菜单设置',
        description: null,
        created_at: null,
        updated_at: null,
        key: 44,
        children: [
          {
            id: 45,
            pid: 44,
            type: 0,
            route: 'admin/wechat/wx-publish-menu-api',
            display_name: '编辑公众号菜单',
            description: null,
            created_at: null,
            updated_at: null,
            key: 45
          }
        ]
      }
    ]
  },
  {
    id: 59,
    pid: 0,
    type: 0,
    route: '空',
    display_name: '用户管理',
    description: null,
    created_at: null,
    updated_at: null,
    key: 59,
    children: [
      {
        id: 67,
        pid: 59,
        type: 0,
        route: 'admin/view/user-manage-page',
        display_name: '用户列表',
        description: null,
        created_at: null,
        updated_at: null,
        key: 67,
        children: [
          {
            id: 70,
            pid: 67,
            type: 0,
            route: 'admin/api/get-userlist-api',
            display_name: '查看用户数据',
            description: null,
            created_at: null,
            updated_at: null,
            key: 70
          },
          {
            id: 71,
            pid: 67,
            type: 0,
            route: 'admin/api/edit-user-api',
            display_name: '修改用户信息',
            description: null,
            created_at: null,
            updated_at: null,
            key: 71
          }
        ]
      },
      {
        id: 68,
        pid: 59,
        type: 0,
        route: 'admin/view/user_level-mange-page',
        display_name: '会员等级',
        description: null,
        created_at: null,
        updated_at: null,
        key: 68,
        children: [
          {
            id: 69,
            pid: 68,
            type: 0,
            route: 'admin/api/get-userLevel-api',
            display_name: '查看会员等级信息',
            description: null,
            created_at: null,
            updated_at: null,
            key: 69
          },
          {
            id: 72,
            pid: 68,
            type: 0,
            route: 'admin/api/edit-userLevel-api',
            display_name: '添加/编辑会员等级信息',
            description: null,
            created_at: null,
            updated_at: null,
            key: 72
          }
        ]
      }
    ]
  }
]

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
      loading: false,
      form: this.$form.createForm(this),
      parent_id: undefined,
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
      }
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
      createPermission(values)
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
      editRole(values)
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
