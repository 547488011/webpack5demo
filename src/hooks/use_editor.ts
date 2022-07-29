
import { reactive } from 'vue'
import gfm from "@bytemd/plugin-gfm";
import gemoji from "@bytemd/plugin-gemoji";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import highlight from '@bytemd/plugin-highlight';
import {uploadImg} from '@/api/editor' 
import zh_Hans from "@/views/editor/zh-en.json";
export function userEditor() {
    const editorConfig = reactive ({
        value: '',
        plugins: [
            gfm(),gemoji(),mediumZoom(),highlight()
        ],
    })
    const handleChange = (v:string) => {
        editorConfig.value = v
    }
    const uploadImage = async (files:Array<File>) => {
        const formData = new FormData()
        formData.append('image',files[0])
        const data = await uploadImg(formData)    
        return [{
            title: '',
            url:data
        }]
    }

    return {
        handleChange,
        editorConfig,
        uploadImage,
        zh_Hans
    }
}