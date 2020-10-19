<template>
  <page-header-wrapper :title="false">
    <a-card :bordered="false">
      <div class="table-operator">
        <a-button type="primary" icon="sync" @click="handleRefresh"></a-button>
        <a-button type="primary" icon="plus" @click="handleAdd">添加</a-button>
      </div>

      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        :showPagination="false"
        :scroll="{ x: 1200 }"
      >
        <span slot="type" slot-scope="text">
          <a-badge v-if="text == 0" count="目录" :number-style="{ backgroundColor: '#1890ff' }" />
          <a-badge v-else-if="text == 1" count="菜单" :number-style="{ backgroundColor: '#52c41a' }" />
          <a-badge v-else="text == 2" count="权限" :number-style="{ backgroundColor: 'rgb(189, 193, 188)' }" />
        </span>

        <span slot="action" slot-scope="text, record">
          <template v-if="record.type != 2">
            <a @click="handleInsert(record)">新增</a>
            <a-divider type="vertical" />
          </template>

          <a @click="handleEdit(record)">编辑</a>

          <template v-if="record.type == 2">
            <a-divider type="vertical" />
            <a @click="showConfirm(record)">删除</a>
          </template>
        </span>
      </s-table>

      <!-- 创建角色及编辑角色窗口 -->
      <rule-form
        ref="createModal"
        :visible="createModal.visible"
        :model="createModal.model"
        :tree="treeData"
        @cancel="handleCancel"
        @success="handleOk"
      />
    </a-card>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { getRoleList, deleteRole, getPermissions } from '@/api/manage'

import RuleForm from './modules/RuleForm'
import { formatTree, uniqueArr } from '@/utils/util'

const columns = [
  {
    title: '权限名称',
    dataIndex: 'rule_name'
  },
  {
    title: '权限路由',
    dataIndex: 'route'
  },
  {
    title: '权限类型',
    dataIndex: 'type',
    width: '150px',
    align: 'center',
    scopedSlots: {
      customRender: 'type'
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '180px',
    align: 'right',
    scopedSlots: {
      customRender: 'action'
    }
  }
]

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    RuleForm
  },
  data() {
    this.columns = columns
    let _this = this
    return {
      // 查询参数
      queryParam: {},

      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const data = Object.assign({}, parameter, this.queryParam)
        return getPermissions(data).then(res => {
          res.data.rows.map(row => {
            row.key = row.id
            row.pid = row.parent_id
            return row
          })

          res.data.rows = formatTree(res.data.rows)

          _this.treeData = res.data.rows

          console.log(res.data)

          return res.data
        })
      },

      // 创建角色弹出层
      createModal: {
        model: null,
        visible: false
      },

      treeData: [],
    }
  },
  methods: {
    formatData(data){
      console.log(data)

    },

    handleAdd() {
      this.$refs.createModal.form.resetFields()
      this.createModal.visible = true
      this.createModal.model = null
    },
    handleInsert(record) {
      this.$refs.createModal.form.resetFields()
      this.createModal.visible = true
      this.$refs.createModal.setParentId(record.id)
    },
    handleRefresh() {
      this.$refs.table.refresh()
    },
    handleEdit(record) {
      this.createModal.visible = true
      this.createModal.model = {
        id: record.id,
        parent_id: record.parent_id,
        type: record.type,
        route: record.route,
        rule_name: record.rule_name
      }
    },
    handleOk() {
      this.createModal.visible = false
      this.$refs.table.refresh(true)
      this.$refs.createModal.form.resetFields()
    },
    handleCancel() {
      this.createModal.visible = false
      this.$refs.createModal.form.resetFields()
    },
    showConfirm(data) {
      let _this = this
      this.$confirm({
        title: '确定删除该条角色信息吗？',
        content: h => <div style="color:red;">删除后不可恢复</div>,
        onOk() {
          return deleteRole({
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
    },
  }
}
</script>
