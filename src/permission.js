import router from './router';
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
    if (to.path === loginRoutePath) {
      next(defaultRoutePath);
      NProgress.done();
    } else {
      const redirect = decodeURIComponent(from.query.redirect || to.path)
      if (to.path === redirect) {
        next()
      } else {
        next({
          path: redirect
        })
      }
    }
  } else {
    // 在免登录名单，直接进入
    if (allowList.includes(to.name)) {
      next()
    } else {
      next({
        path: loginRoutePath,
        query: {
          redirect: to.fullPath
        }
      });
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});