
import request from "@/utils/request";

export const getDetails = (articleId:String) => {
    return request({
        url:'/api/getDetails',
        method:'get',
        params:{articleId:articleId}
    })
}
export const getCommentList = (articleId:String) => {
    return request({
        url:'/api/getCommentList',
        method:'get',
        params:{articleId:articleId}
    })
}

export const addReply = (data) => {
    return request({
        url: '/api/addReply',
        method: 'post',
        data
    })
}
export const addComment = (data) => {
    return request({
        url: '/api/addComment',
        method: 'post',
        data
    })
}
