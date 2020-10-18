<template>
  <a-modal title="分配角色权限" :visible="visible" :confirmLoading="loading" okText="立即分配" cancelText="取消" @ok="ok"
    @cancel="cancel">
    <a-spin :spinning="loading" tip="权限信息加载中...">
      <a-form :form="form" v-bind="formLayout">
        <a-form-item v-show="false">
          <a-input v-decorator="['id']" />
        </a-form-item>
        <a-form-item label="角色名称">
          <a-input v-decorator="['username']" />
        </a-form-item>
        <a-form-item label="角色权限">
          <div class="tree-box">
            <a-tree v-model="checkedKeys" checkable :tree-data="treeData" />
          </div>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import pick from 'lodash.pick'
  import {
    createAdmin
  } from '@/api/manage'

  import {
    formatTree
  } from '@/utils/util'

  // 表单字段
  const fields = ['id', 'username', 'password', 'password2']

  let meTree = [{
    "id": 1,
    "pid": 0,
    "key": 1,
    "title": "控制台"
  }, {
    "id": 2,
    "pid": 0,
    "key": 2,
    "title": "权限管理"
  }, {
    "id": 3,
    "pid": 2,
    "key": 3,
    "title": "管理员管理"
  }, {
    "id": 4,
    "pid": 2,
    "key": 4,
    "title": "角色管理"
  }, {
    "id": 5,
    "pid": 2,
    "key": 5,
    "title": "规则管理"
  }, {
    "id": 6,
    "pid": 3,
    "key": 6,
    "title": "查看管理员数据"
  }, {
    "id": 7,
    "pid": 3,
    "key": 7,
    "title": "重置密码"
  }, {
    "id": 8,
    "pid": 3,
    "key": 8,
    "title": "修改状态"
  }, {
    "id": 9,
    "pid": 4,
    "key": 9,
    "title": "查看角色数据"
  }, {
    "id": 36,
    "pid": 3,
    "key": 36,
    "title": "分配管理员角色"
  }, {
    "id": 37,
    "pid": 4,
    "key": 37,
    "title": "添加\/编辑角色"
  }, {
    "id": 38,
    "pid": 4,
    "key": 38,
    "title": "分配角色权限"
  }, {
    "id": 39,
    "pid": 4,
    "key": 39,
    "title": "修改角色状态"
  }, {
    "id": 40,
    "pid": 5,
    "key": 40,
    "title": "添加规则"
  }, {
    "id": 41,
    "pid": 46,
    "key": 41,
    "title": "微信管理"
  }, {
    "id": 42,
    "pid": 41,
    "key": 42,
    "title": "微信配置设置"
  }, {
    "id": 43,
    "pid": 42,
    "key": 43,
    "title": "编辑微信配置参数"
  }, {
    "id": 44,
    "pid": 41,
    "key": 44,
    "title": "公众号菜单设置"
  }, {
    "id": 45,
    "pid": 44,
    "key": 45,
    "title": "编辑公众号菜单"
  }, {
    "id": 59,
    "pid": 0,
    "key": 59,
    "title": "用户管理"
  }, {
    "id": 67,
    "pid": 59,
    "key": 67,
    "title": "用户列表"
  }, {
    "id": 68,
    "pid": 59,
    "key": 68,
    "title": "会员等级"
  }, {
    "id": 69,
    "pid": 68,
    "key": 69,
    "title": "查看会员等级信息"
  }, {
    "id": 70,
    "pid": 67,
    "key": 70,
    "title": "查看用户数据"
  }, {
    "id": 71,
    "pid": 67,
    "key": 71,
    "title": "修改用户信息"
  }, {
    "id": 72,
    "pid": 68,
    "key": 72,
    "title": "添加\/编辑会员等级信息"
  }, {
    "id": 73,
    "pid": 0,
    "key": 73,
    "title": "卡券管理"
  }, {
    "id": 74,
    "pid": 73,
    "key": 74,
    "title": "卡券管理"
  }, {
    "id": 75,
    "pid": 74,
    "key": 75,
    "title": "修改等级"
  }, {
    "id": 76,
    "pid": 74,
    "key": 76,
    "title": "更新卡券数据"
  }, {
    "id": 77,
    "pid": 74,
    "key": 77,
    "title": "查看卡券管理数据"
  }, {
    "id": 78,
    "pid": 73,
    "key": 78,
    "title": "卡券统计报表"
  }, {
    "id": 79,
    "pid": 78,
    "key": 79,
    "title": "查看统计数据"
  }, {
    "id": 80,
    "pid": 78,
    "key": 80,
    "title": "更新统计数据"
  }, {
    "id": 81,
    "pid": 73,
    "key": 81,
    "title": "卡券领取记录"
  }, {
    "id": 82,
    "pid": 81,
    "key": 82,
    "title": "查看卡券领取数据"
  }, {
    "id": 83,
    "pid": 81,
    "key": 83,
    "title": "核销卡券"
  }, {
    "id": 84,
    "pid": 73,
    "key": 84,
    "title": "卡券核销查询"
  }, {
    "id": 85,
    "pid": 41,
    "key": 85,
    "title": "自定义回复设置"
  }, {
    "id": 86,
    "pid": 85,
    "key": 86,
    "title": "查看自定义回复数据"
  }, {
    "id": 87,
    "pid": 85,
    "key": 87,
    "title": "添加\/编辑自定义回复信息"
  }]

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
        expandedKeys: [],
        autoExpandParent: true,
        checkedKeys: [],
        selectedKeys: [],
        treeData: formatTree(meTree),
      }
    },
    methods: {
      ok() {
        this.loading = true
      },
      cancel() {
        this.$emit('cancel')
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