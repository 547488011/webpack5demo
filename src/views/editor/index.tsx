import { defineComponent ,ref,reactive} from "vue";
import { Editor } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import zh_Hans from "./zh-en.json";
import  "./editor.less";
import 'bytemd/dist/index.css';
export default defineComponent({
    name: 'byEditor',
    components: {
        Editor
    },
    setup() {
        const editorConfig = reactive ({
            value: '',
            plugins: [
                gfm()
            ]
        })

        const handleChange = (v) => {
            editorConfig.value = v
            
        }

        const input = ref()
        return () => (
            <div class="markdow-editor">
                <div class="markdow-editor-header">
                    <div class="left-box"></div>
                   <div class="input-box"> 
                       <el-input v-model={input.value} maxlength="80" placeholder="输入文章标题..." />
                    </div>
                    <div class="right-box"> 
                        <div>保存成功</div>
                        <el-button color="#1d7dfa" plain>草稿箱</el-button>
                        <el-button color="#1d7dfa" >发布</el-button>
                        <el-avatar
                            src="https://p6-passport.byteacctimg.com/img/user-avatar/e4e77b17f384d5c51b9138ee9bb0581c~300x300.image"
                        />
                    </div>
                </div>
                <div >
                   <editor
                   value={editorConfig.value}
                   plugins={editorConfig.plugins}
                   locale={zh_Hans}
                   onChange={handleChange}/>
                </div>
            </div>
        )
    }
}) 