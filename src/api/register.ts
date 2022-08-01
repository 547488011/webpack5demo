import request from "@/utils/request";
export const register = (data) => {
    return request({
        url: '/api/register',
        method: 'post',
        data
    })
}