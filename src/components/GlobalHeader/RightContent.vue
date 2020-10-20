<template>
  <div :class="wrpCls">
    <span class="ant-pro-global-header-index-action">
      <a-badge class="notice-badge" count="12">
        <a-icon :class="['header-notice-icon']" type="bell" style="font-size: 16px;padding: 4px;" />
      </a-badge>
    </span>
    <avatar-dropdown :menu="showMenu" :current-user="currentUser" :class="prefixCls" />
    <span
      class="ant-pro-global-header-index-action"
      v-show="!isMobile"
      @click="eventFullscreen"
    >
      <a-tooltip placement="bottom">
        <template slot="title">
          <span>浏览器全屏</span>
        </template>
        <a-icon :type="isFullScreen ? 'fullscreen-exit' : 'fullscreen'" />
      </a-tooltip>
    </span>

    <select-lang :class="prefixCls" />
  </div>
</template>

<script>
import AvatarDropdown from './AvatarDropdown'
import SelectLang from '@/components/SelectLang'

export default {
  name: 'RightContent',
  components: {
    AvatarDropdown,
    SelectLang
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action'
    },
    isMobile: {
      type: Boolean,
      default: () => false
    },
    topMenu: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showMenu: true,
      currentUser: {},
      isFullScreen: false
    }
  },
  computed: {
    wrpCls() {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${this.isMobile || !this.topMenu ? 'light' : this.theme}`]: true
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.currentUser = {
        name: this.$store.state.user.name || 'Serati Ma',
        avatar:
          this.$store.state.user.avatar ||
          'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
      }
    }, 500)
  },
  methods: {
    eventFullscreen() {
      if (this.isFullScreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        }

        this.isFullScreen = false
      } else {
        var element = document.documentElement
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen()
        }

        this.isFullScreen = true
      }
    }
  }
}
</script>
