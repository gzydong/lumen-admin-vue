import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import momentCN from 'moment/locale/zh-cn'

const components = {
  antLocale: antd,
  momentName: 'zh-cn',
  momentLocale: momentCN
}

const locale = {
  'message': '-',
  'menu.home': '主页',
  'menu.dashboard': '仪表盘',
  'menu.dashboard.analysis': '分析页',
  'menu.dashboard.monitor': '监控页',
  'menu.dashboard.workplace': '工作台',

  'layouts.usermenu.dialog.title': '温馨提示',
  'layouts.usermenu.dialog.content': '您确定要退出登录吗？',

  'app.setting.pagestyle': '整体风格设置',
  'app.setting.pagestyle.light': '亮色菜单风格',
  'app.setting.pagestyle.dark': '暗色菜单风格',
  'app.setting.pagestyle.realdark': 'RealDark style',
  'app.setting.themecolor': '主题色',
  'app.setting.navigationmode': '导航模式',
  'app.setting.content-width': '内容区域宽度',
  'app.setting.fixedheader': '固定Header',
  'app.setting.fixedsidebar': '固定侧边栏',

  'app.setting.sidemenu': '侧边导航',
  'app.setting.topmenu': '顶部导航',
  'app.setting.content-width.fixed': '定宽',
  'app.setting.content-width.fluid': '流式',
  'app.setting.othersettings': '其它设置',
  'app.setting.weakmode': '色弱模式',
  'app.setting.copy': '复制设置',
  'app.setting.loading': 'Loading theme',
  'app.setting.copyinfo': '复制成功，请替换defaultSettings 在 src/models/setting.js 文件中',
  'app.setting.production.hint': '设置面板仅在开发环境中显示，请手动修改'
}

export default {
  ...components,
  ...locale
}