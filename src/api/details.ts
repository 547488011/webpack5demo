
import request from "@/utils/request";

export const getDetails = (articleId:String) => {
    return request({
        url:'/api/getDetails',
        method:'get',
        params:{articleId:articleId}
    })
}