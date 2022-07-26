import request from "@/utils/request";

export const getArticleList = (params) => {
    return request({
        url:'/api/getArticleList',
        method:'get',
        params
    })
} 

export const getTypeList = () => {
    return request({
        url: '/api/getTypeList',
        method: 'get'
    })
}