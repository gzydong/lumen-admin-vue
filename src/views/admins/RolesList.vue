<template>
  <page-header-wrapper :title="false">
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="角色名"">
                  <a-input v-model=" queryParam.username" placeholder="" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="状态">
                <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">正常</a-select-option>
                  <a-select-option value="2">已禁用</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div class="table-operator">
        <a-button type="primary" icon="sync" @click="handleRefresh"></a-button>
        <a-button type="primary" icon="plus" @click="handleAdd">添加</a-button>
        <a-dropdown v-action:edit v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay">
            <a-menu-item key="1">
              <a-icon type="delete" />删除</a-menu-item>
            <!-- lock | unlock -->
            <a-menu-item key="2">
              <a-icon type="lock" />锁定</a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            批量操作
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div>

      <s-table ref="table" size="default" rowKey="id" :columns="columns" :data="loadData" :alert="true"
        :rowSelection="rowSelection" :showPagination="true" :scroll="{ x: 1200 }">

        <span slot="action" slot-scope="text, record">
          <template>
            <a>编辑</a>
            <a-divider type="vertical" />
            <a>分配权限</a>
          </template>
        </span>
      </s-table>

      <create-form ref="createModal" :visible="visible" :loading="confirmLoading" :model="mdl" @cancel="handleCancel"
        @ok="handleOk" />
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import moment from 'moment'
  import {
    STable,
    Ellipsis
  } from '@/components'
  import {
    getRoleList
  } from '@/api/manage'

  import CreateForm from './modules/CreateForm'

  const columns = [{
      title: '角色名称',
      dataIndex: 'display_name',
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
      width: '150px',
      align: 'center',
      // fixed: 'right',
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
      CreateForm
    },
    data() {
      this.columns = columns
      return {
        // create model
        visible: false,
        confirmLoading: false,
        mdl: null,
        // 查询参数
        queryParam: {},
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          const requestParameters = Object.assign({}, parameter, this.queryParam);
          return getRoleList(requestParameters).then(res => {
            this.localLoading = false
            return res.data
          });
        },
        selectedRowKeys: [],
        selectedRows: []
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
        this.mdl = null
        this.visible = true
      },
      handleRefresh() {
        this.$refs.table.refresh()
      },
      handleEdit(record) {
        this.visible = true
        this.mdl = {
          ...record
        }
      },
      handleOk() {
        const form = this.$refs.createModal.form
        this.confirmLoading = true
        form.validateFields((errors, values) => {
          if (!errors) {
            console.log('values', values)
            if (values.id > 0) {
              // 修改 e.g.
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve()
                }, 1000)
              }).then(res => {
                this.visible = false
                this.confirmLoading = false
                // 重置表单数据
                form.resetFields()
                // 刷新表格
                this.$refs.table.refresh()

                this.$message.info('修改成功')
              })
            } else {
              // 新增
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve()
                }, 1000)
              }).then(res => {
                this.visible = false
                this.confirmLoading = false
                // 重置表单数据
                form.resetFields()
                // 刷新表格
                this.$refs.table.refresh()

                this.$message.info('新增成功')
              })
            }
          } else {
            this.confirmLoading = false
          }
        })
      },
      handleCancel() {
        this.visible = false

        const form = this.$refs.createModal.form
        form.resetFields() // 清理表单数据（可不做）
      },
      onSelectChange(selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      }
    }
  }
</script>