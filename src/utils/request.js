import axios from 'axios';
import store from '@/store';
import storage from 'store';
import notification from 'ant-design-vue/es/notification';

import {
  ACCESS_TOKEN
} from '@/store/mutation-types'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,

  // 请求超时时间
  timeout: 8000,
});

/**
 * 异常拦截处理器
 * 
 * @param {*} error 
 */
const errorHandler = (error) => {
  // 判断是否是响应错误信息
  if (error.response) {
    const data = error.response.data;

    // 从 localstorage 获取 token
    const token = storage.get(ACCESS_TOKEN);

    if (error.response.status === 403) {
      notification.error({
        key: "Forbidden",
        message: 'Forbidden',
        description: data.message
      });
    } else if (error.response.status === 401) {
      notification.warning({
        key: 'Unauthorized',
        message: '授权提示',
        description: '授权登录已失效，请重新登录！'
      });

      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        });
      }
    }
  }

  return Promise.reject(error);
}

// 请求拦截器
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN);
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config
}, errorHandler);

// 响应拦截器
request.interceptors.response.use((response) => {
  return response.data;
}, errorHandler);

/**
 * 发送 get 请求
 * @param {string} url
 * @param {object} data
 * @param {object} options
 * @returns {Promise<any>}
 */
export const get = (url, data = {}, options = {}) => {
  return request({
    url,
    params: data,
    method: 'get',
    ...options
  });
}

/**
 * 发送 post 请求
 * @param {string} url
 * @param {object} data
 * @param {object} options
 * @returns {Promise<any>}
 */
export const post = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'post',
    data: data,
    ...options
  });
}