
import { reactive } from 'vue'
import gfm from "@bytemd/plugin-gfm";
import gemoji from "@bytemd/plugin-gemoji";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import highlight from '@bytemd/plugin-highlight'
import zh_Hans from "@/views/editor/zh-en.json";
export function userEditor() {
    const editorConfig = reactive ({
        value: '',
        plugins: [
            gfm(),gemoji(),mediumZoom(),highlight()
        ],
    })
    const handleChange = (v) => {
        console.log(v);
        
        editorConfig.value = v
        
    }
    const uploadImage = async (files) => {
        console.log(files);
        
    }

    return {
        handleChange,
        editorConfig,
        uploadImage,
        zh_Hans
    }
}