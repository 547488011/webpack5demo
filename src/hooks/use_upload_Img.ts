import {ref} from 'vue'

interface FromObj {
    imgUrl?: string,
    [x:string]:any
}

export function useUploadImg(){
    const fileList = ref([])
    const actionUrl = 'http://localhost:3000/api/uploadImg'
    const handleRemove = () => {
        console.log(fileList.value)
        fileList.value = []
    }
    const handleSuccess = (res,fromObj:FromObj) => {
        if(!fromObj.imgUrl) return
        fromObj.imgUrl = res.data
    }
    
    return {
        fileList,actionUrl,handleRemove,handleSuccess
    }
}