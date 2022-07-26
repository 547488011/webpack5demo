
import request from "@/utils/request";

interface addArticleParams {
    content:string,
    title:string,
    articleTypeId:number,
    abstract:string,
    userId:number,
    imgUrl?:string
}

export const  uploadImg = (formData: FormData)=>{
    return request({
       url:'/api/uploadImg',
       headers:{
        ['content-type']:'multipart/form-data'
       },
       method: 'post',
       data:formData
    })
}
export const addArticle = (data:addArticleParams) => {
    return request({
        url:'/api/addArticle',
        method:'post',
        data
    })
}