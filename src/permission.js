import router from './router'
import storage from 'store'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style

import {
  setDocumentTitle,
  domTitle
} from '@/utils/domUtil';

import {
  ACCESS_TOKEN
} from '@/store/mutation-types';
import {
  i18nRender
} from '@/locales';

NProgress.configure({
  showSpinner: false
});

const allowList = ['login']; // 免登录白名单
const loginRoutePath = '/login';

// 登录后默认跳转页面
const defaultRoutePath = '/index';

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`))

  // 判断是否登录
  if (storage.get(ACCESS_TOKEN)) {
    if (to.path === loginRoutePath) {
      next(defaultRoutePath);
      NProgress.done();
    } else {
      next();
    }
  } else {
    // 在免登录名单，直接进入
    if (allowList.includes(to.name)) {
      next()
    } else {
      next(loginRoutePath);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
})