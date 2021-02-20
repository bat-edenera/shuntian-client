import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/shared/store";
const baseURL = process.env.VUE_APP_BASEURL;

axios.defaults.headers.post['Content-Type'] = 'application/json';
const $http = axios.create({
  baseURL: baseURL,
  timeout: 1000000000000
});

$http.interceptors.request.use(
  async config => {
    NProgress.start();
    // if (store.getters.isLogin) {
    //   config.headers['Authorization'] = store.state.token;
    // }
    return config;
  },

  err => {
    Promise.reject(err);
  }
);

$http.interceptors.response.use(
  response => {
    NProgress.done();
    if (response.status == '200' || response.data.statusCode == '200') {
      if (response.request.responseType == 'blob') {
        return response.data;
      } else {
        return response.data.result
      }
    } else {
      store.dispatch("pushMessage", response.data.message);
      return Promise.reject(response.data);
    }
  },
  err => {
    NProgress.done();
    if (err.__CANCEL__) {
      if (err.message.cached) {
        return Promise.resolve(err.message.data);
      }
    } else {
      store.dispatch("pushMessage", "网络超时，请稍后重试");
      return Promise.reject(err);
    }
  }
);

export default $http;
