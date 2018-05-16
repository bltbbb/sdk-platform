import axios from 'axios'
import qs from 'qs'
import Cookies from 'js-cookie'
import { message } from 'antd'
import history from './history'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = 'http://192.168.1.21:9999';
// axios.defaults.baseURL = 'http://47.104.74.197:9999';
axios.defaults.baseURL = process.env.BASE_URL;

//POST传参序列化
axios.interceptors.request.use((config) => {
  var token = Cookies.get('sdk-cookie')
  if(token){
    config.headers.adoptToken = token;
  }

  if(config.method  === 'post'){
    if(config.headers.shouldQs !== false){
      config.data = qs.stringify(config.data);
    }
  }
  if(config.method  === 'put'){
    if(config.headers.shouldQs !== false){
      config.data = qs.stringify(config.data);
    }
  }
  return config;
},(error) =>{
  this.$message("错误的传参");
  return Promise.reject(error);
});
//code状态码200判断
axios.interceptors.response.use((res) =>{
  if(res.status !== 200){
    return Promise.reject(res);
  }
  if(res.data.status === 1){
    Cookies.remove('sdk-cookie')
    history.push('/Login');
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  message.destroy();
  message.error("接口异常");
  return Promise.reject(error);
});
export default axios;
