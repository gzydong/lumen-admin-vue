<template>
  <div>
    <a-card :bordered="false" style="text-align: center;">
      <h3 style="font-size:20px;">框架自定义组件 - 使用案例</h3>
      <p></p>
      <p>
        相关文档 <a href="https://www.antdv.com/docs/vue/introduce-cn/">Ant Design of Vue</a> 或
        <a href="https://pro.antdv.com/docs/getting-started">Ant Design Pro</a>
      </p>
    </a-card>

    <a-card :bordered="false" title="Ellipsis 文本自动省略号 使用文档" class="mt-5">
      <ellipsis :length="100" tooltip>
        There were injuries alleged in three cases in 2015, and a fourth incident in September, according to the safety
        recall report. After meeting with US regulators in October, the firm decided to issue a voluntary recall.
      </ellipsis>
    </a-card>

    <a-card :bordered="false" class="mt-5" title="NumberInfo 数据文本">
      <number-info
        :sub-title="
          () => {
            return '上周访问量'
          }
        "
        :total="12321"
        status="up"
        :sub-total="17.1"
      ></number-info>
    </a-card>

    <a-card :bordered="false" class="mt-5" title="Trend 趋势标记">
      <trend flag="up">5%</trend>
      <a-divider />
      <trend flag="up">
        <span slot="term">工资</span>
        5%
      </trend>
    </a-card>

    <a-card :bordered="false" class="mt-5" title="ArticleListContent">
      <article-list-content
        description="在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。"
        owner="Jock"
        avatar="https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png"
        href="https://gw.alipayobjects.com"
        updateAt="2009-08-04 10:06:00"
      />
    </a-card>

    <a-card :bordered="false" class="mt-5" title="AvatarList 头像列表">
      <avatar-list size="small" :max-length="2">
        <avatar-list-item
          v-for="(member, i) in members"
          :key="`avatar-${i}`"
          :src="member.avatar"
          :tips="member.name"
        />
      </avatar-list>
    </a-card>

    <a-card :bordered="false" class="mt-5" title="TagSelect">
      <tag-select>
        <tag-select-option value="Category1">类目一</tag-select-option>
        <tag-select-option value="Category2">类目二</tag-select-option>
        <tag-select-option value="Category3">类目三</tag-select-option>
        <tag-select-option value="Category4">类目四</tag-select-option>
        <tag-select-option value="Category5">类目五</tag-select-option>
        <tag-select-option value="Category6">类目六</tag-select-option>
        <tag-select-option value="Category7">类目七</tag-select-option>
        <tag-select-option value="Category8">类目八</tag-select-option>
        <tag-select-option value="Category9">类目九</tag-select-option>
        <tag-select-option value="Category10">类目十</tag-select-option>
      </tag-select>
    </a-card>

    <a-card :bordered="false" class="mt-5" title="StandardFormRow">
      <standard-form-row title="所属类目" block style="padding-bottom: 11px;">
        <a-form-item>
          <tag-select>
            <tag-select-option value="Category1">类目一</tag-select-option>
            <tag-select-option value="Category2">类目二</tag-select-option>
            <tag-select-option value="Category3">类目三</tag-select-option>
            <tag-select-option value="Category4">类目四</tag-select-option>
            <tag-select-option value="Category5">类目五</tag-select-option>
            <tag-select-option value="Category6">类目六</tag-select-option>
            <tag-select-option value="Category7">类目七</tag-select-option>
            <tag-select-option value="Category8">类目八</tag-select-option>
            <tag-select-option value="Category9">类目九</tag-select-option>
            <tag-select-option value="Category10">类目十</tag-select-option>
          </tag-select>
        </a-form-item>
      </standard-form-row>

      <standard-form-row title="其它选项" grid last>
        <a-row>
          <a-col :lg="8" :md="10" :sm="10" :xs="24">
            <a-form-item :wrapper-col="{ sm: { span: 16 }, xs: { span: 24 } }" label="作者">
              <a-select
                style="max-width: 200px; width: 100%;"
                mode="multiple"
                placeholder="不限"
                v-decorator="['author']"
              >
                <a-select-option value="lisa">王昭君</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :lg="8" :md="10" :sm="10" :xs="24">
            <a-form-item :wrapper-col="{ sm: { span: 16 }, xs: { span: 24 } }" label="好评度">
              <a-select style="max-width: 200px; width: 100%;" placeholder="不限" v-decorator="['rate']">
                <a-select-option value="good">优秀</a-select-option>
                <a-select-option value="normal">普通</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :lg="8" :md="10" :sm="10" :xs="24">
            <a-form-item :wrapper-col="{ sm: { span: 16 }, xs: { span: 24 } }" label="好评度">
              <a-select style="max-width: 200px; width: 100%;" placeholder="不限" v-decorator="['rate']">
                <a-select-option value="good">优秀</a-select-option>
                <a-select-option value="normal">普通</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :lg="8" :md="10" :sm="10" :xs="24">
            <a-form-item :wrapper-col="{ sm: { span: 16 }, xs: { span: 24 } }" label="好评度">
              <a-select style="max-width: 200px; width: 100%;" placeholder="不限" v-decorator="['rate']">
                <a-select-option value="good">优秀</a-select-option>
                <a-select-option value="normal">普通</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </standard-form-row>
    </a-card>

    <a-card :bordered="false" class="mt-5" title="STree">
      <s-tree
        :dataSource="orgTree"
        :openKeys.sync="openKeys"
        :search="true"
        @click="handleClick"
        @add="handleAdd"
        @titleClick="handleTitleClick"
      ></s-tree>
    </a-card>

    <a-card :bordered="false" class="mt-5" title="PageLoading">
      <a-button @click="handleOpenLoading" style="margin-right: 16px;">打开遮罩(5s 自动关闭)</a-button>
      <a-button @click="handleOpenLoadingCustomTip">打开遮罩(自定义提示语)</a-button>
    </a-card>
  </div>
</template>

<script>
import { Ellipsis, NumberInfo, Trend, ArticleListContent, TagSelect, StandardFormRow, AvatarList } from '@/components'
import STree from '@/components/Tree/Tree'

const TagSelectOption = TagSelect.Option
const AvatarListItem = AvatarList.Item

export default {
  name: 'ComponentList',
  components: {
    Ellipsis,
    NumberInfo,
    Trend,
    ArticleListContent,
    AvatarList,
    AvatarListItem,
    TagSelect,
    TagSelectOption,
    StandardFormRow,
    STree
  },
  data() {
    return {
      members: [
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
          name: '曲丽丽',
          id: 'member1'
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
          name: '王昭君',
          id: 'member2'
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
          name: '董娜娜',
          id: 'member3'
        }
      ],

      openKeys: ['key-01'],
      orgTree: [
        {
          key: 'key-01',
          title: '研发中心',
          icon: 'mail',
          children: [
            {
              key: 'key-01-01',
              title: '后端组',
              icon: null,
              group: true,
              children: [
                {
                  key: 'key-01-01-01',
                  title: 'JAVA',
                  icon: null
                },
                {
                  key: 'key-01-01-02',
                  title: 'PHP',
                  icon: null
                },
                {
                  key: 'key-01-01-03',
                  title: 'Golang',
                  icon: null
                }
              ]
            },
            {
              key: 'key-01-02',
              title: '前端组',
              icon: null,
              group: true,
              children: [
                {
                  key: 'key-01-02-01',
                  title: 'React',
                  icon: null
                },
                {
                  key: 'key-01-02-02',
                  title: 'Vue',
                  icon: null
                },
                {
                  key: 'key-01-02-03',
                  title: 'Angular',
                  icon: null
                }
              ]
            }
          ]
        },
        {
          key: 'key-02',
          title: '财务部',
          icon: 'dollar',
          children: [
            {
              key: 'key-02-01',
              title: '会计核算',
              icon: null
            },
            {
              key: 'key-02-02',
              title: '成本控制',
              icon: null
            },
            {
              key: 'key-02-03',
              title: '内部控制',
              icon: null,
              children: [
                {
                  key: 'key-02-03-01',
                  title: '财务制度建设',
                  icon: null
                },
                {
                  key: 'key-02-03-02',
                  title: '会计核算',
                  icon: null
                }
              ]
            }
          ]
        }
      ]
    }
  },
  created() {},
  methods: {
    handleClick(e) {},
    handleAdd(item) {
      console.log('add button, item', item)
      this.$message.info(`提示：你点了 ${item.key} - ${item.title} `)
    },
    handleTitleClick(item) {
      console.log('handleTitleClick', item)
    },

    handleOpenLoading() {
      this.$loading.show()
      setTimeout(() => {
        this.$loading.hide()
      }, 5000)
    },
    handleOpenLoadingCustomTip() {
      this.$loading.show({ tip: '自定义提示语' })
      setTimeout(() => {
        this.$loading.hide()
      }, 5000)
    }
  }
}
</script>

<style lang="less" scope>
.an-h3 {
  margin-bottom: 10px;
}

.mt-5 {
  margin: 10px 0;
}

.default-tag-select-option {
  cursor: pointer;
}
</style>
