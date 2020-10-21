<template>
  <page-header-wrapper :title="false">
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item label="登录账号">
                <a-input v-model="queryParam.username" />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="状态">
                <a-select v-model="queryParam.status" placeholder="默认(全部)" default-value="0">
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

      <!-- 表格操作 -->
      <div class="table-operator">
        <a-button type="primary" icon="sync" @click="handleRefresh"></a-button>
        <a-button type="primary" icon="plus" @click="handleAdd">添加</a-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay">
            <a-menu-item key="2"> <a-icon type="check-circle" />启用</a-menu-item>
            <a-menu-item key="1"> <a-icon type="stop" />禁用</a-menu-item>
            <a-menu-item key="1"> <a-icon type="delete" />删除</a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            批量操作
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div>

      <!-- Table 模板配置 -->
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        :alert="true"
        :rowSelection="rowSelection"
        :showPagination="true"
        :scroll="{ x: 1200 }"
      >
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleSub(record)">分配权限</a>
            <a-divider type="vertical" />
            <a @click="handleResetPassword(record)">重置密码</a>
          </template>
        </span>
      </s-table>

      <!-- 创建管理员窗口 -->
      <admin-form
        ref="createModal"
        :visible="createAdmin.visible"
        :model="createAdmin.model"
        @cancel="() => (this.createAdmin.visible = false)"
        @success="handleAddOk"
      />

      <!-- 重置密码窗口 -->
      <reset-password-from
        ref="passwordModal"
        :visible="passwordModal.visible"
        :model="passwordModal.model"
        @cancel="() => (this.passwordModal.visible = false)"
      />

      <!-- 分配管理员角色及权限窗口 -->
      <give-admin-role-prems
        ref="giveAdminRoleModal"
        :visible="giveAdminRolePremsModal.visible"
        :model="giveAdminRolePremsModal.model"
        @close="() => (this.giveAdminRolePremsModal.visible = false)"
      />
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { ServeGetAdmins } from '@/api/user'

import AdminForm from './modules/AdminForm'
import ResetPasswordFrom from './modules/ResetPasswordFrom'
import GiveAdminRolePrems from './modules/GiveAdminRolePrems'

const statusMap = {
  0: {
    status: 'default',
    text: '已禁用'
  },
  10: {
    status: 'processing',
    text: '正常'
  }
}

export default {
  name: 'TableList',
  components: {
    AdminForm,
    ResetPasswordFrom,
    GiveAdminRolePrems
  },
  data() {
    return {
      columns: [
        {
          title: '登录账号',
          dataIndex: 'username'
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          customRender: (text, record, index) => {
            return text == '' ? '-' : text
          }
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: {
            customRender: 'status'
          }
        },
        {
          title: '创建时间',
          dataIndex: 'created_at',
          align: 'center',
          sorter: true
        },
        {
          title: '最后登录时间',
          dataIndex: 'last_login_time',
          sorter: true,
          align: 'center'
        },
        {
          title: '最后登录IP',
          dataIndex: 'last_login_ip',
          align: 'center',
          customRender: (text, record, index) => {
            return text == '' ? '-' : text
          }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '200px',
          align: 'right',
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
        return ServeGetAdmins(data).then(res => {
          return res.data
        })
      },
      selectedRowKeys: [],
      selectedRows: [],

      // 创建管理员模块
      createAdmin: {
        visible: false,
        model: null
      },

      // 修改密码模块
      passwordModal: {
        visible: false,
        model: null
      },

      // 分配角色权限弹出层
      giveAdminRolePremsModal: {
        model: null,
        visible: false
      }
    }
  },
  filters: {
    statusFilter(type) {
      return statusMap[type].text
    },
    statusTypeFilter(type) {
      return statusMap[type].status
    }
  },
  computed: {
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  methods: {
    handleAdd() {
      this.createAdmin.visible = true
      this.createAdmin.model = {
        id: 0,
        username: '',
        password: '',
        password2: ''
      }
    },
    handleAddOk() {
      this.createAdmin.visible = false
      this.queryParam = {}
      this.$refs.table.refresh(true)
    },
    handleRefresh() {
      this.$refs.table.refresh()
    },
    handleResetPassword(record) {
      this.passwordModal.visible = true
      this.passwordModal.model = {
        id: record.id,
        username: record.username,
        password: '',
        password2: ''
      }
    },
    handleSub(record) {
      this.giveAdminRolePremsModal.visible = true
      this.giveAdminRolePremsModal.model = {
        admin_id: record.id,
        admin_name: record.username
      }
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>
