<template>
  <page-header-wrapper :title="false">
    <a-card :bordered="false">
      <div class="table-operator">
        <a-button type="primary" icon="sync" @click="handleRefresh"></a-button>
        <a-button type="primary" icon="plus" @click="handleAddRule">添加</a-button>
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

          <a @click="handleEditRule(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="deleteConfirm(record)">删除</a>
        </span>
      </s-table>

      <!-- 创建角色及编辑角色窗口 -->
      <rule-form
        ref="formModal"
        :visible="formModal.visible"
        :model="formModal.model"
        :tree="treeData"
        @cancel="handleCancel"
        @success="handleSuccess"
      />
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { ServeGetPerms, ServeDeletePerms } from '@/api/rbac'

import RuleForm from './modules/RuleForm'
import { formatTree, uniqueArr } from '@/utils/util'

export default {
  name: 'TableList',
  components: {
    RuleForm
  },
  data() {
    return {
      columns: [
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
      ],

      // 查询参数
      queryParam: {},

      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const data = Object.assign({}, parameter, this.queryParam)
        return ServeGetPerms(data).then(res => {
          return this.formatData(res.data)
        })
      },

      // 创建角色弹出层
      formModal: {
        model: null,
        visible: false
      },

      // 权限树结构
      treeData: []
    }
  },
  methods: {
    // 处理表格数据
    formatData(data) {
      data.rows.map(row => {
        row.key = row.id
        row.pid = row.parent_id
        return row
      })

      this.treeData = data.rows = formatTree(data.rows)
      return data
    },

    // 刷新表格事件
    handleRefresh() {
      this.$refs.table.refresh()
    },

    // 添加权限事件
    handleAddRule() {
      this.$refs.formModal.form.resetFields()
      this.formModal.visible = true
      this.formModal.model = null
    },

    // 编辑权限事件
    handleEditRule(record) {
      this.formModal.visible = true
      this.formModal.model = {
        id: record.id,
        type: record.type.toString(),
        route: record.route,
        rule_name: record.rule_name
      }

      this.$refs.formModal.setParentId(record.parent_id == 0 ? null : record.parent_id)
    },

    // 节点新增权限事件
    handleInsert(record) {
      this.$refs.formModal.form.resetFields()
      this.formModal.visible = true
      this.$refs.formModal.setParentId(record.id)
    },

    // 表单编辑成功回调事件
    handleSuccess() {
      this.formModal.visible = false
      this.$refs.table.refresh()
      this.$refs.formModal.form.resetFields()
    },

    // 表单取消编辑回调事件
    handleCancel() {
      this.formModal.visible = false
      this.$refs.formModal.form.resetFields()
    },

    // 删除确认事件
    deleteConfirm(data) {
      let _this = this
      this.$confirm({
        title: '确定删除该条权限信息吗？',
        content: h => <div style="color:red;">删除后不可恢复</div>,
        onOk() {
          return ServeDeletePerms({
            id: data.id
          })
            .then(res => {
              if (res.code == 200) {
                _this.$message.success('权限删除成功...')
                _this.handleRefresh()
              } else {
                _this.$message.error('权限删除失败...')
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
