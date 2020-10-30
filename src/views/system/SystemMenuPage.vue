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
        :defaultExpandedRowKeys="expandedRowKeys"
        :scroll="{ x: 1200 }"
      >
        <span slot="icon" slot-scope="text">
          <span v-if="text"><a-icon :type="text"/></span>
          <span v-else>-</span>
        </span>

        <span slot="type" slot-scope="text">
          <a-badge v-if="text == 0" count="目录" :number-style="{ backgroundColor: '#1890ff', borderRadius: '3px' }" />
          <a-badge
            v-else-if="text == 1"
            count="菜单"
            :number-style="{ backgroundColor: '#52c41a', borderRadius: '3px' }"
          />
          <a-badge
            v-else="text == 2"
            count="权限"
            :number-style="{ backgroundColor: 'rgb(189, 193, 188)', borderRadius: '3px' }"
          />
        </span>

        <span slot="hidden" slot-scope="text">
          <a-button v-if="text == 1" type="link" style="padding: 0"> 是 </a-button>
          <span v-if="text == 0">否</span>
        </span>

        <span slot="is_frame" slot-scope="text">
          <a-button v-if="text == 1" type="link" style="padding: 0"> 是 </a-button>
          <span v-if="text == 0">否</span>
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="handleInsert(record)" :disabled="record.type == 2">新增</a>
          <a-divider type="vertical" />
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
  name: 'SystemMenuPage',
  components: {
    RuleForm
  },
  data() {
    return {
      columns: [
        {
          title: '菜单名称',
          dataIndex: 'title'
        },
        {
          title: '权限标识',
          dataIndex: 'perms',
          customRender: text => (text == '' ? '-' : text)
        },
        {
          title: '路由地址',
          dataIndex: 'path',
          customRender: text => (text == '' ? '-' : text)
        },
        {
          title: '组件名称',
          dataIndex: 'component',
          customRender: text => (text == '' ? '-' : text)
        },
        {
          title: '图标',
          dataIndex: 'icon',
          width: '80px',
          align: 'center',
          scopedSlots: {
            customRender: 'icon'
          }
        },
        {
          title: '排序',
          dataIndex: 'sort',
          width: '80px',
          align: 'center'
        },
        {
          title: '隐藏',
          dataIndex: 'hidden',
          width: '60px',
          align: 'center',
          scopedSlots: {
            customRender: 'hidden'
          }
        },
        {
          title: '外链',
          dataIndex: 'is_frame',
          width: '60px',
          align: 'center',
          scopedSlots: {
            customRender: 'is_frame'
          }
        },
        {
          title: '权限类型',
          dataIndex: 'type',
          width: '120px',
          align: 'center',
          scopedSlots: {
            customRender: 'type'
          }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '155px',
          align: 'center',
          scopedSlots: {
            customRender: 'action'
          }
        }
      ],
      expandedRowKeys: [],

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
      let _this = this

      let arr = []
      data.rows.map(row => {
        row.key = row.id
        row.pid = row.parent_id
        if (row.parent_id > 0) {
          arr.push(row.parent_id)
        }

        return row
      })

      // 清空展开的行
      this.expandedRowKeys.splice(0, this.expandedRowKeys.length)
      this.expandedRowKeys.push(...uniqueArr(arr))

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
      record.parent_id = record.parent_id == 0 ? null : record.parent_id.toString()
      record.type = record.type.toString()
      record.hidden = record.hidden.toString()
      record.is_frame = record.is_frame.toString()
      this.formModal.model = { ...record }

      this.formModal.visible = true
    },

    // 节点新增权限事件
    handleInsert(record) {
      this.formModal.model = {
        parent_id: record.id.toString()
      }

      this.formModal.visible = true
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