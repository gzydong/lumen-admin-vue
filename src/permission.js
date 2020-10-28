import router from './router';
import store from './store'
import storage from 'store';
import NProgress from 'nprogress';
import '@/components/NProgress/nprogress.less';

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

// 免登录白名单
const allowList = ['login'];

// 登录页面地址
const loginRoutePath = '/login';

// 登录后默认跳转页面
const defaultRoutePath = '/index';


router.beforeEach((to, from, next) => {
  NProgress.start();

  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`));

  // 判断是否登录
  if (storage.get(ACCESS_TOKEN)) {
    // 已登录且要跳转的页面是登录页
    if (to.path === loginRoutePath) {
      next(defaultRoutePath);
      NProgress.done();
    } else {
      if (store.getters.addRouters.length == 0) {
        store.dispatch('GenerateRoutes').then(() => {
          router.addRoutes(store.getters.addRouters)
          const redirect = decodeURIComponent(from.query.redirect || to.path)
          if (to.path === redirect) {
            next({...to,replace: true})
          } else {
            next({path: redirect})
          }
        })
      } else {
        next();
      }
    }
  } else {
    // 在免登录名单，直接进入
    if (allowList.includes(to.name)) {
      next();
    } else {
      // 否则全部重定向到登录页
      next(`${loginRoutePath}?redirect=${to.fullPath}`)
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});