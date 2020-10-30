// with polyfills
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/';
import i18n from './locales';
import ProLayout, {
  PageHeaderWrapper
} from '@ant-design-vue/pro-layout';

import {
  STable
} from '@/components'

import themePluginConfig from '../config/themePluginConfig';

import bootstrap from './core/bootstrap';
import './core/lazy_use'; // use lazy load components
import './permission'; // permission control
import './utils/filter'; // global filter
import './global.less'; // global style

Vue.config.productionTip = false;

// use pro-layout components
Vue.component('pro-layout', ProLayout);
Vue.component('page-container', PageHeaderWrapper);
Vue.component('page-header-wrapper', PageHeaderWrapper);
Vue.component('s-table', STable);

window.umi_plugin_ant_themeVar = themePluginConfig.theme;

// 权限指令
Vue.directive('action', {
  inserted: function (el, binding, vnode) {

    // 检测是否有权限
    if (!store.getters.perms.some(perm => perm == binding.arg)) {
      el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
    }
  }
});

new Vue({
  router,
  store,
  i18n,
  // init localstorage, vuex
  created: bootstrap,
  render: h => h(App)
}).$mount('#app');