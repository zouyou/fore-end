import axios from 'axios';
import { Message } from 'element-ui';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.API_ROOT, // api的base_url 读取config配置文件
  timeout: 20000                 // 请求超时时间
});

const downloadUrl = url => {
  let iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = url;
  iframe.onload = function () {
    document.body.removeChild(iframe);
  }
  document.body.appendChild(iframe);
}

// request拦截器
service.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json; charset=utf-8';
  let userallInfo = JSON.parse(sessionStorage.getItem("zsylocalInfo"));
  if (userallInfo) {
    var token = userallInfo.data.userInfoDto.token;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  console.log(error);
  return Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
  response => {
    // 处理附件
    if (response.headers && (response.headers['content-type'] === 'application/x-msdownload' || response.headers['content-type'] === 'application/octet-stream')) {
      downloadUrl(response.request.responseURL)
      return;
    }
    const res = response.data;
    if (res.status !== 200) {
      Message({ showClose: true, message: res.message, type: 'warning', duration: 3 * 1000 });
      return Promise.reject({ message: res.message });
    } else {
      if (response.config.method == "post")
        Message({ showClose: true, message: "操作成功！", type: 'success', duration: 3 * 1000 });
      return res;
    }
  },
  error => {
    var errorArray = [{ key: "Network Error", val: "服务器连接失败,请检查服务器程序是否启动！" }];
    var errorMsg = error.message;
    for (var item in errorArray) {
      if (errorArray[item].key == error.message) {
        errorMsg = errorArray[item].val;
        break;
      }
    }
    Message({ showClose: true, message: errorMsg, type: 'error', duration: 3 * 1000 });
    return Promise.reject(error);
  }
)
export default service;