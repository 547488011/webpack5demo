import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import "highlight.js/styles/vs2015.css"
// 引入markDown主题样式
// import  "github-markdown-css/github-markdown.css";
import 'juejin-markdown-themes/dist/juejin.css'
// 引入编辑器基本样式
import 'bytemd/dist/index.css';
export default defineComponent({
    setup() {
        return () => <RouterView/>
    }
})