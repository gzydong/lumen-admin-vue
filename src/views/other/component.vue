<template>
  <div>
    <a-card :bordered="false" style="min-height:50px;">
      <h3 class="an-h3">Ellipsis 文本自动省略号 <a href="https://pro.antdv.com/components/ellipsis">使用文档</a></h3>
      <a-divider />
      <ellipsis :length="100" tooltip>
        There were injuries alleged in three cases in 2015, and a fourth incident in September, according to the safety
        recall report. After meeting with US regulators in October, the firm decided to issue a voluntary recall.
      </ellipsis>
    </a-card>

    <a-card :bordered="false" style="min-height:50px;" class="mt-5">
      <h3 class="an-h3">NumberInfo 数据文本 <a href="https://pro.antdv.com/components/number-info">使用文档</a></h3>
      <a-divider />
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

    <a-card :bordered="false" style="min-height:50px;" class="mt-5">
      <h3 class="an-h3">Trend 趋势标记 <a href="https://pro.antdv.com/components/trend">使用文档</a></h3>
      <a-divider />
      <trend flag="up">5%</trend>
      <a-divider />
      <trend flag="up">
        <span slot="term">工资</span>
        5%
      </trend>
    </a-card>

    <a-card :bordered="false" style="min-height:50px;" class="mt-5">
      <h3 class="an-h3">ArticleListContent <a href="https://pro.antdv.com/components/icon-selector">使用文档</a></h3>
      <a-divider />
      <article-list-content
        description="在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。"
        owner="Jock"
        avatar="https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png"
        href="https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png"
        updateAt="2009-08-04 10:06:00"
      />
    </a-card>
  </div>
</template>

<script>
import { Ellipsis, NumberInfo, Trend, ArticleListContent } from '@/components'

export default {
  name: 'ComponentList',
  components: {
    Ellipsis,
    NumberInfo,
    Trend,
    ArticleListContent
  },
  data() {
    return {

    }
  },

  methods: {

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
</style>
