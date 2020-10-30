<template>
  <a-modal
    title="分配角色权限"
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
          <a-input v-decorator="['id']" />
        </a-form-item>
        <a-form-item label="角色名称">
          <a-input v-decorator="['display_name']" disabled style="background: none;" />
        </a-form-item>
        <a-form-item label="角色权限">
          <div class="tree-box" v-if="treeData">
            <a-tree
              v-model="checkedKeys"
              checkable
              :tree-data="treeData"
              :blockNode="true"
              :checkStrictly="false"
              @check="onCheck"
              :replaceFields="{ children: 'children', title: 'title', key: 'id', value: 'id' }"
            />
          </div>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { ServeGetRolePerms, ServeGiveRolePerms } from '@/api/rbac'
import { formatTree, uniqueArr, getTreePids } from '@/utils/util'

// 表单字段
const fields = ['id', 'display_name']

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
      treeData: []
    }
  },
  watch: {
    model() {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
      this.resetTree()
      this.loadTree()
    }
  },
  created() {
    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))
  },
  methods: {
    submit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.toSubmit(values.id)
        }
      })
    },
    cancel() {
      this.loading = false
      this.resetTree()
      this.$emit('close')
    },
    toSubmit(role_id) {
      let permissions = [...this.checkedKeys, this.halfCheckedKeys].join(',')
      this.loading = true
      ServeGiveRolePerms({
        role_id,
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
    resetTree() {
      this.checkedKeys = []
      this.treeData = []
    },
    onCheck(checkedKeys, info) {
      this.halfCheckedKeys = info.halfCheckedKeys
    },
    loadTree() {
      ServeGetRolePerms({
        role_id: this.model.id
      }).then(res => {
        if (res.code == 200) {
          const { permissions, role_perms } = res.data
          let pids = uniqueArr(getTreePids(permissions))

          this.treeData = permissions
          role_perms.forEach(val => {
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
