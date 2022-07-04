import request from "@/utils/request";
interface loginParams {
    username: string,
    password: string
}
export const login = (params:loginParams) => {
    return request({
        url: '/api/login',
        method: 'post',
        data: params
    })
}