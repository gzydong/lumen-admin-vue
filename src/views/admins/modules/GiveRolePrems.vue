<template>
  <a-modal
    title="分配角色权限"
    :visible="visible"
    :confirmLoading="loading"
    okText="立即分配"
    cancelText="取消"
    @ok="ok"
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
          <div class="tree-box">
            <a-tree
              v-model="checkedKeys"
              checkable
              :tree-data="treeData"
              :auto-expand-parent="true"
              :blockNode="true"
              :defaultExpandAll="true"
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

import { formatTree } from '@/utils/util'
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
      loading: false,
      form: this.$form.createForm(this),
      checkedKeys: [],
      treeData: []
    }
  },
  watch: {
    model() {
      this.model && this.form.setFieldsValue(pick(this.model, fields))

      this.resetTree()
      ServeGetRolePerms({
        role_id: this.model.id
      }).then(res => {
        if (res.code == 200) {
          this.treeData = formatTree(res.data.permissions)
          this.checkedKeys = res.data.role_perms
        }
      })
    }
  },
  created() {
    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))
  },
  methods: {
    ok() {
      this.form.validateFields((err, values) => {
        if (!err) {
          values.perms = this.checkedKeys
          this.submit(values)
        }
      })
    },
    cancel() {
      this.loading = false
      this.resetTree()
      this.$emit('close')
    },
    submit(data) {
      console.log(data)
      this.loading = true
      ServeGiveRolePerms({
        role_id: data.id,
        permissions: data.perms.join(',')
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
