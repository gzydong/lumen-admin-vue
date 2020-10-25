import store from '@/store';
import storage from 'store';
import {
  ACCESS_TOKEN,
  APP_LANGUAGE,
  TOGGLE_CONTENT_WIDTH,
  TOGGLE_FIXED_HEADER,
  TOGGLE_FIXED_SIDEBAR,
  TOGGLE_HIDE_HEADER,
  TOGGLE_LAYOUT,
  TOGGLE_NAV_THEME,
  TOGGLE_WEAK,
  TOGGLE_COLOR,
  ADMIN_INFO
} from '@/store/mutation-types';

import defaultSettings from '@/config/defaultSettings';

/**
 * 项目初始化函数
 *
 * @export
 */
export default function Initializer() {
  // 读取APP配置
  store.commit(TOGGLE_LAYOUT, storage.get(TOGGLE_LAYOUT, defaultSettings.layout));
  store.commit(TOGGLE_FIXED_HEADER, storage.get(TOGGLE_FIXED_HEADER, defaultSettings.fixedHeader));
  store.commit(TOGGLE_FIXED_SIDEBAR, storage.get(TOGGLE_FIXED_SIDEBAR, defaultSettings.fixSiderbar));
  store.commit(TOGGLE_CONTENT_WIDTH, storage.get(TOGGLE_CONTENT_WIDTH, defaultSettings.contentWidth));
  store.commit(TOGGLE_HIDE_HEADER, storage.get(TOGGLE_HIDE_HEADER, defaultSettings.autoHideHeader));
  store.commit(TOGGLE_NAV_THEME, storage.get(TOGGLE_NAV_THEME, defaultSettings.navTheme));
  store.commit(TOGGLE_WEAK, storage.get(TOGGLE_WEAK, defaultSettings.colorWeak));
  store.commit(TOGGLE_COLOR, storage.get(TOGGLE_COLOR, defaultSettings.primaryColor));

  // 读取授权信息
  store.commit('SET_TOKEN', storage.get(ACCESS_TOKEN));

  // 读取用户信息
  let adminInfo = storage.get(ADMIN_INFO);
  if (adminInfo) {
    store.commit('SET_NAME', adminInfo.username);
    store.commit('SET_AVATAR', adminInfo.avatar);
  }

  // 初始化设置默认语言
  store.dispatch('setLang', storage.get(APP_LANGUAGE, 'zh-CN'));
}