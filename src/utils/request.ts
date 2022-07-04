import axios,{ AxiosRequestConfig,AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus'

const isDev = process.env.NODE_ENV === 'development'

const request = axios.create({
    baseURL: isDev?'http://localhost:3000/':'',//todo 生产环境待添加
    timeout: 30000
})

// 拦截器
request.interceptors.request.use((config: AxiosRequestConfig) => {
    if (config.headers) {
        // todo token待添加
    }
    return config
},(err) => {
    return Promise.reject(err)
})

request.interceptors.response.use((response: AxiosResponse) => {
    const { status,data } = response
    if(status === 200 && data?.code === 0){
        data.msg && ElMessage.success(data.msg)
        return data.data
    }else if(status === 401) {
        // todo 删除token 跳转登入页面
    }
},(err) => {
    const msg = err.response.data.msg
    ElMessage.error(msg)
    return Promise.reject(err)
})

export default request;