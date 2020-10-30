<template>
  <div>
    <a-button type="primary" @click="showDrawer"> <a-icon type="plus" /> New account </a-button>
    <a-drawer
      title="分配角色权限"
      :width="560"
      :visible="visible"
      :body-style="{ height: 'calc(100% - 55px)', padding: '0' }"
      @close="onClose"
    >
      <a-layout style="height: 100%;background:none">
        <a-layout-content style="overflow: auto;">
          <div style="height: 1200px;background:red;"></div>
        </a-layout-content>
        <a-layout-footer style="height: 55px;border-top: 1px solid #e8e8e8;text-align:right;padding:10px;">
          <a-button style="marginRight: 8px" @click="onClose">
            取消
          </a-button>
          <a-button type="primary" @click="onClose">
            立即分配
          </a-button>
        </a-layout-footer>
      </a-layout>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      visible: false
    }
  },
  methods: {
    showDrawer() {
      this.visible = true
    },
    onClose() {
      this.visible = false
    }
  }
}
</script>
