export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome() {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader(callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE() {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate(id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

/**
 * 生成树结构 json 数据
 * 
 * @param {*} data 
 */
export function formatTree(data) {
  let cloneData = JSON.parse(JSON.stringify(data)) // 对源数据深度克隆
  let tree = cloneData.filter((father) => { //循环所有项
    let branchArr = cloneData.filter((child) => {
      return father.id == child.pid //返回每一项的子级数组
    });

    if (branchArr.length > 0) {
      father.children = branchArr; //如果存在子级，则给父级添加一个children属性，并赋值
    }

    return father.pid == 0; //返回第一层
  });

  return tree
}

/**
 * 递归获取Tree所有父节点
 * 
 * @param {*} perms 
 */
export const getTreePids = (perms) => {
  let arr = []
  perms.forEach(perm => {
    if (perm.parent_id > 0) {
      arr.push(perm.parent_id)
    }

    if (perm.children) {
      arr.push(...getTreePids(perm.children))
    }
  })

  return arr
}


/**
 * 数组去重
 * 
 * @param {Array} arr 
 */
export const uniqueArr = (arr) => {
  if (Array.hasOwnProperty('from')) {
    return Array.from(new Set(arr));
  } else {
    var n = {},
      r = [];
    for (var i = 0; i < arr.length; i++) {
      if (!n[arr[i]]) {
        n[arr[i]] = true;
        r.push(arr[i]);
      }
    }
    return r;
  }
}