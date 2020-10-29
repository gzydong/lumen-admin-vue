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
        <a-button type="primary" icon="plus" @click="handleAddAdmin">添加</a-button>
      </div>

      <!-- Table 模板配置 -->
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        :showPagination="true"
        :showPageJump="true"
        :alert="true"
        :scroll="{ x: 1200 }"
        :rowSelection="rowSelection"
      >
        <template slot="statusTitle">
          状态
          <a-tooltip title="【禁用】状态不能进行登录">
            <a-icon type="question-circle" />
          </a-tooltip>
        </template>

        <span slot="status" slot-scope="text, record">
          {{ text | statusFilter }}
          <a @click="updateStatus(record)">[修改]</a>
        </span>

        <span slot="action" slot-scope="text, record">
          <span v-action:system:user:edit>
            <a>编辑</a>
            <a-divider type="vertical" />
          </span>

          <a-dropdown placement="bottomCenter" :trigger="['click']">
            <a-menu slot="overlay">
              <a-menu-item @click="handleGiveAdminRole(record)" v-action:system:user:give-role
                ><a>分配权限</a></a-menu-item
              >
              <a-menu-item @click="handleResetPassword(record)" v-action:system:user:change-password
                ><a>设置密码</a></a-menu-item
              >
              <a-menu-item @click="deleteConfirm(record)" v-action:system:user:delete><a>删除账号</a></a-menu-item>
            </a-menu>
            <a>更多 <a-icon type="down"/></a>
          </a-dropdown>
        </span>
      </s-table>

      <!-- 创建管理员窗口 -->
      <admin-form
        ref="createModal"
        :visible="createAdmin.visible"
        :model="createAdmin.model"
        @cancel="() => (this.createAdmin.visible = false)"
        @success="addSuccessCallback"
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

    <!-- fixed footer toolbar -->
    <footer-tool-bar :is-mobile="isMobile" extra="扩展信息提示" v-show="selectedRows.length > 0">
      <a-button type="primary">批量删除({{ selectedRows.length }})</a-button>
    </footer-tool-bar>
  </page-header-wrapper>
</template>

<script>
import { ServeGetAdmins, ServeDeleteAdmin, ServeUpdateAdminStatus } from '@/api/admin'

import AdminForm from './modules/AdminForm'
import ResetPasswordFrom from './modules/ResetPasswordFrom'
import GiveAdminRolePrems from './modules/GiveAdminRolePrems'
import FooterToolBar from '@/components/FooterToolbar'
import { deviceMixin } from '@/store/device-mixin'

const statusMap = {
  0: {
    status: 'default',
    text: '禁用'
  },
  10: {
    status: 'processing',
    text: '正常'
  }
}

export default {
  name: 'SystemUserPage',
  mixins: [deviceMixin],
  components: {
    AdminForm,
    ResetPasswordFrom,
    GiveAdminRolePrems,
    FooterToolBar
  },
  data() {
    return {
      columns: [
        {
          title: '登录账号',
          dataIndex: 'username'
        },
        {
          title: '昵称',
          dataIndex: 'nickname',
          customRender: text => (text == '' ? '-' : text)
        },
        {
          title: '邮箱地址',
          dataIndex: 'email',
          customRender: text => (text == '' ? '-' : text)
        },
        {
          dataIndex: 'status',
          slots: { title: 'statusTitle' },
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
          customRender: text => (text == '' ? '-' : text)
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
      },

      selectedRowKeys: [],
      selectedRows: []
    }
  },
  filters: {
    statusFilter(type) {
      return statusMap[type].text
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
    // 表格刷新
    handleRefresh() {
      this.$refs.table.refresh()
    },

    // 添加管理员
    handleAddAdmin() {
      this.createAdmin.visible = true
      this.createAdmin.model = {
        id: 0,
        username: '',
        password: '',
        password2: ''
      }
    },

    // 添加管理员成功回调事件
    addSuccessCallback() {
      this.createAdmin.visible = false
      this.queryParam = {}
      this.$refs.table.refresh(true)
    },

    // 修改管理员密码
    handleResetPassword(record) {
      this.passwordModal.visible = true
      this.passwordModal.model = {
        id: record.id,
        username: record.username,
        password: '',
        password2: ''
      }
    },

    // 分配管理员角色
    handleGiveAdminRole(record) {
      this.giveAdminRolePremsModal.visible = true
      this.giveAdminRolePremsModal.model = {
        admin_id: record.id,
        admin_name: record.username
      }
    },

    // 修改管理员状态
    updateStatus(data) {
      let _this = this

      let title = ''
      let status = 0
      if (data.status == 10) {
        title = `确认要修改 [${data.username}] 账号状态为 【禁用】吗？`
        status = 1
      } else {
        title = `确认要修改 [${data.username}] 账号状态为 【正常】吗？`
        status = 0
      }

      this.$confirm({
        title,
        onOk() {
          return ServeUpdateAdminStatus({
            admin_id: data.id,
            status
          })
            .then(res => {
              if (res.code == 200) {
                _this.$message.success('管理员状态已成功修改...')
                _this.handleRefresh()
              } else {
                _this.$message.error('管理员状态修改失败...')
              }
            })
            .catch(err => {
              _this.$message.error('网络异常，请稍后再试...')
            })
        }
      })
    },

    // 删除管理员
    deleteConfirm(data) {
      let _this = this
      this.$confirm({
        title: `您确定要删除[${data.username}]这个账号吗？`,
        okText: '立即删除',
        onOk() {
          return ServeDeleteAdmin({
            admin_id: data.id
          })
            .then(res => {
              if (res.code == 200) {
                _this.$message.success(` [${data.username}] 账号已删除...`)
                _this.handleRefresh()
              } else {
                _this.$message.error(` [${data.username}] 账号删除失败...`)
              }
            })
            .catch(err => {
              _this.$message.error('网络异常，请稍后再试...')
            })
        }
      })
    },

    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>
