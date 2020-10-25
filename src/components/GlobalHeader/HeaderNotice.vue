<template>
  <a-dropdown :trigger="['click']" v-model="show" placement="bottomCenter" @visibleChange="visibleChange">
    <div slot="overlay">
      <a-spin :spinning="loading">
        <a-tabs class="dropdown-tabs" :tabBarStyle="{ textAlign: 'center' }" :style="{ width: '330px' }">
          <a-tab-pane tab="通知(4)" key="1">
            <a-list class="tab-pane">
              <a-list-item v-for="(notice, idx) in notices" :key="idx">
                <a-list-item-meta :title="notice.title" :description="notice.description" />
              </a-list-item>
            </a-list>
            <div class="notice-list-bottomBar">
              <div>清空消息</div>
              <div>查看更多</div>
            </div>
          </a-tab-pane>
          <a-tab-pane tab="消息(8)" key="2">
            <a-list class="tab-pane">
              <a-list class="tab-pane">
                <a-list-item v-for="(notice, idx) in notices" :key="idx">
                  <a-list-item-meta :title="notice.title" :description="notice.description" />
                </a-list-item>
              </a-list>
              <div class="notice-list-bottomBar">
                <div>清空消息</div>
                <div>查看更多</div>
              </div>
            </a-list>
          </a-tab-pane>
          <a-tab-pane tab="待办(4)" key="3">
            <a-list class="tab-pane"></a-list>
          </a-tab-pane>
        </a-tabs>
      </a-spin>
    </div>
    <span class="header-notice">
      <a-badge class="notice-badge" count="12">
        <a-icon class="header-notice-icon" type="bell" />
      </a-badge>
    </span>
  </a-dropdown>
</template>

<script>
export default {
  name: 'HeaderNotice',
  data() {
    return {
      loading: false,
      show: false,

      notices: [
        {
          title: '任务名称',
          description: '任务需要在 2017-01-12 20:00 前启动'
        },
        {
          title: '第三方紧急代码变更',
          description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务'
        },
        {
          title: '信息安全考试',
          description: '指派竹尔于 2017-01-09 前完成更新并发布'
        },
        {
          title: 'ABCD 版本发布',
          description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务'
        }
      ]
    }
  },
  computed: {},
  methods: {
    visibleChange(visible) {
      if (visible) {
        this.loading = true

        setTimeout(() => {
          this.loading = false
        }, 1000)
      }
    }
  }
}
</script>

<style lang="less" scope>
.header-notice {
  display: inline-block;
  transition: all 0.3s;
  span {
    vertical-align: initial;
  }
  .notice-badge {
    color: inherit;
    .header-notice-icon {
      font-size: 16px;
      padding: 4px;
    }
  }
}

.ant-dropdown-content {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.dropdown-tabs {
  border-radius: 4px;
  .tab-pane {
    min-height: 250px;
  }

  .ant-list-item {
    padding: 10px 20px;
    border-bottom-color: #f0f0f0;

    .ant-list-item-meta-title {
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
      font-size: 14px;
      line-height: 1.5715;
    }

    .ant-list-item-meta-description {
      font-size: 13px;
    }

    &:hover {
      background: #e6f7ff;
    }
  }
}

.notice-list-bottomBar {
  height: 46px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 46px;
  text-align: center;
  border-top: 1px solid #f0f0f0;
  border-radius: 0 0 2px 2px;
  transition: all 0.3s;

  div {
    display: inline-block;
    width: 50%;
    cursor: pointer;
    transition: all 0.3s;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:hover {
      color: #1890ff;
    }
  }

  div:not(:only-child):last-child {
    border-left: 1px solid #f0f0f0;
  }
}
</style>
