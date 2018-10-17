"use strict";

import Vue from 'vue';
import axios from "axios";
import router from "../router";
import { Toast } from 'vant';
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: "http://giot.kjxt.tech:3000", // process.env.baseURL || process.env.apiUrl ||
  timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
      // console.log(response.data );
      if(response.data && response.data.code === -1 && response.data.msg.indexOf('token失效')>=0){
          router.replace('/login');
          return Promise.reject('token time out');
          Toast.fail('登录超时！');
      } else if(response.data && response.data.code === -2){
          localStorage.clear();
          router.replace('/login');
          return Promise.reject('该账号在其它设备登录，强迫下线！');
          Toast('该账号在其它设备登录，强迫下线！');
      } else  {
          return response;
      }
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin);

export default Plugin;
