<template>
  <a-modal
    title="分配角色与权限"
    :visible="visible"
    :confirmLoading="loading"
    okText="立即分配"
    cancelText="取消"
    @ok="submit"
    @cancel="cancel"
  >
    <a-spin :spinning="loading" tip="权限信息加载中...">
      <a-form :form="form" v-bind="formLayout">
        <a-form-item v-show="false">
          <a-input v-decorator="['admin_id']" />
        </a-form-item>
        <a-form-item label="登录账号">
          <a-input v-decorator="['admin_name']" disabled style="background: none;" />
        </a-form-item>
        <a-form-item label="分配角色">
          <a-select placeholder="选择角色(非必选)" v-decorator="['role_id']" :allowClear="true">
            <a-select-option v-for="role in roles" :value="role.id" :key="role.id">
              {{ role.display_name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="独立权限">
          <div class="tree-box" v-if="treeData">
            <a-tree
              v-model="checkedKeys"
              checkable
              :tree-data="treeData"
              :blockNode="true"
              :checkStrictly="false"
              @check="onCheck"
            />
          </div>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { ServeGetRolePerms, ServeGiveRolePerms, ServeGetAdminPerms, ServeGiveAdminPerms } from '@/api/rbac'
import { formatTree, uniqueArr } from '@/utils/util'

// 表单字段
const fields = ['admin_id', 'admin_name', 'role_id']

export default {
  name: 'GiveRolePrems',
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
      form: this.$form.createForm(this),
      checkedKeys: [],
      halfCheckedKeys: [],
      treeData: [],
      pids: [],
      roles: [],
      roleValue: 0
    }
  },
  watch: {
    model() {
      this.form.resetFields()
      this.model && this.form.setFieldsValue(pick(this.model, fields))
      this.resetTree()
      this.loadTree()
    }
  },
  created() {
    fields.forEach(v => this.form.getFieldDecorator(v))
  },
  methods: {
    submit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.toSubmit(values)
        }
      })
    },
    cancel() {
      this.loading = false
      this.resetTree()
      this.$emit('close')
    },
    toSubmit(values) {
      let permissions = [...this.checkedKeys, this.halfCheckedKeys].join(',')
      this.loading = true
      ServeGiveAdminPerms({
        admin_id: values.admin_id,
        role_id: values.role_id || 0,
        permissions
      })
        .then(res => {
          if (res.code == 200) {
            this.$message.success('角色分配权限成功...')
            this.$emit('close')
          } else {
            this.$message.error('角色分配权限失败...')
          }
        })
        .catch(err => {
          this.$message.error('网络异常,请稍后再试...')
        })
        .finally(() => {
          this.loading = false
        })
    },

    // 清空权限数据
    resetTree() {
      this.checkedKeys = []
      this.treeData = []
    },

    onCheck(checkedKeys, info) {
      this.halfCheckedKeys = info.halfCheckedKeys
    },

    // 加载权限信息
    loadTree() {
      ServeGetAdminPerms({
        admin_id: this.model.admin_id
      }).then(res => {
        if (res.code == 200) {
          let result = res.data
          let prems = result.perms

          let admin_perms = result.admin_perms
          this.treeData = formatTree(prems)

          this.roles = result.roles
          if (result.role_id > 0) {
            this.form.setFieldsValue({
              role_id: result.role_id
            })
          }

          prems.forEach(value => {
            if (value.pid > 0) {
              this.pids.push(value.pid)
            }
          })

          let pids = uniqueArr(this.pids)
          admin_perms.forEach(val => {
            if (pids.indexOf(val) >= 0) {
              this.halfCheckedKeys.push(val)
            } else {
              this.checkedKeys.push(val)
            }
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.tree-box {
  border: 1px solid #d9d9d9;
  border-radius: 2px;
}
</style>
