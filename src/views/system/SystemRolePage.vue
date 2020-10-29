<template>
  <page-header-wrapper :title="false">
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item label="角色名称">
                <a-input v-model="queryParam.rolename" placeholder="模糊查询" />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="状态">
                <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">正常</a-select-option>
                  <a-select-option value="2">已禁用</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => (this.queryParam = {})">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div class="table-operator">
        <a-button type="primary" icon="sync" @click="handleRefresh"></a-button>
        <a-button type="primary" icon="plus" @click="handleAddRole">添加</a-button>
      </div>

      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        :showPagination="true"
        :scroll="{ x: 1200 }"
      >
        <span slot="action" slot-scope="text, record">
          <a v-action:system:role:edit @click="handleEditRole(record)">编辑</a>
          <a-divider type="vertical" />
          <a v-action:system:role:give-perms @click="handleRolePrems(record)">分配权限</a>
          <a-divider type="vertical" />
          <a v-action:system:role:delete @click="deleteConfirm(record)">删除</a>
        </span>
      </s-table>

      <!-- 创建角色及编辑角色窗口 -->
      <create-form
        ref="createModal"
        :visible="createModal.visible"
        :model="createModal.model"
        @cancel="handleCancel"
        @success="addSuccessCallback"
      />

      <!-- 分配角色权限窗口 -->
      <give-role-prems
        ref="giveRoleModal"
        :visible="giveRolePremsModal.visible"
        :model="giveRolePremsModal.model"
        @close="() => (this.giveRolePremsModal.visible = false)"
      />
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { ServeGetRoles, ServeDeleteRole } from '@/api/rbac'
import CreateForm from './modules/EditRoleFrom'
import GiveRolePrems from './modules/GiveRolePrems'

export default {
  name: 'SystemRolePage',
  components: {
    CreateForm,
    GiveRolePrems
  },
  data() {
    return {
      // 表格栏目
      columns: [
        {
          title: '角色名称',
          dataIndex: 'display_name'
        },
        {
          title: '权限字符',
          dataIndex: 'name'
        },
        {
          title: '角色描述',
          dataIndex: 'description'
        },
        {
          title: '创建时间',
          dataIndex: 'created_at',
          align: 'center'
        },
        {
          title: '修改时间',
          dataIndex: 'updated_at',
          sorter: true,
          align: 'center'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '180px',
          align: 'center',
          scopedSlots: {
            customRender: 'action'
          }
        }
      ],

      // 查询参数
      queryParam: {},

      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const data = Object.assign({}, parameter, this.queryParam)
        return ServeGetRoles(data).then(res => {
          return res.data
        })
      },

      // 创建角色弹出层
      createModal: {
        model: null,
        visible: false
      },

      // 分配角色权限弹出层
      giveRolePremsModal: {
        model: null,
        visible: false
      }
    }
  },
  methods: {
    // 刷新表格数据
    handleRefresh() {
      this.$refs.table.refresh()
    },

    // 添加角色事件
    handleAddRole() {
      this.$refs.createModal.form.resetFields()
      this.createModal.visible = true
      this.createModal.model = null
    },

    // 编辑角色事件
    handleEditRole(record) {
      this.createModal.visible = true
      this.createModal.model = {
        description: record.description,
        display_name: record.display_name,
        id: record.id,
        name: record.name
      }
    },

    // 添加角色成功回调事件
    addSuccessCallback() {
      this.createModal.visible = false
      this.$refs.table.refresh(true)
      this.$refs.createModal.form.resetFields()
    },

    // 编辑角色取消事件
    handleCancel() {
      this.createModal.visible = false
      this.$refs.createModal.form.resetFields()
    },

    // 分配权限事件
    handleRolePrems(record) {
      this.giveRolePremsModal.visible = true
      this.giveRolePremsModal.model = {
        display_name: record.display_name,
        id: record.id
      }
    },

    // 删除确认事件
    deleteConfirm(data) {
      let _this = this
      this.$confirm({
        title: '确定删除该条角色信息吗？',
        content: h => <div style="color:red;">删除后不可恢复</div>,
        onOk() {
          return ServeDeleteRole({
            role_id: data.id
          })
            .then(res => {
              if (res.code == 200) {
                _this.$message.success('角色删除成功...')
                _this.handleRefresh()
              } else {
                _this.$message.error('角色删除失败...')
              }
            })
            .catch(err => {
              _this.$message.error('网络异常，请稍后再试...')
            })
        }
      })
    }
  }
}
</script>
