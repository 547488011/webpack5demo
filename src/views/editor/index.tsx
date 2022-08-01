import { defineComponent ,ref,reactive} from "vue";
import { Editor } from "@bytemd/vue-next";
import { userEditor } from "@/hooks/use_editor";
import type { FormInstance } from 'element-plus'
import {rules} from './config/form_Rule'
import  "./editor.less";
import { Delete, Plus} from '@element-plus/icons-vue'
import LocalCache from '@/utils/cache'
import { defaultImg } from '@/const/default'
import { addArticle } from '@/api/editor'
import type { UploadFile } from 'element-plus'
import { ElMessage } from 'element-plus'
import router from "@/router";

export default defineComponent({
    name: 'byEditor',
    components: {
        Editor
    },
    setup() {
        const ruleFormRef = ref<FormInstance>();
        const list = ['后端','前端','Android','iOS','人工智能','开发工具','代码人生','阅读']
        const ruleForm = reactive({
            articleTypeId:0,
            imgUrl:'',
            abstract:''
        })
        const { editorConfig,handleChange,uploadImage ,zh_Hans} = userEditor()
        const input = ref<string>()
        const dialogVisible = ref(false)
        
        const publishButton = () => {
            if(!input.value) {
                ElMessage.error('请输入文章标题')
                return 
            }
            dialogVisible.value = true
        }
        const dialogClose = () => {
            dialogVisible.value = false
        }

        const handleRemove = (file:UploadFile) => {
            return true
        }
        
        const handleSuccess = (res) => {
            ruleForm.imgUrl = res.data
            
        }

        const addAbstract = async() => {
            const formEl = ruleFormRef.value;
            if(!formEl){
                return
            }
            await formEl.validate(async(valid)=>{
                if(!valid){
                    return false
                }
                const resData = {
                    ...ruleForm,
                    userId:LocalCache.getCache('userId') as number,
                    title:input.value as string,
                    content: editorConfig.value
                }
                 await addArticle(resData);
                dialogClose();
                formEl.resetFields();
                setTimeout(()=>{
                    router.push('/home')
                },400)
            })
        }

        const renderFooter = () => (
            <span class="dialog-footer">
            <el-button onClick= {dialogClose} >取消</el-button>
            <el-button onClick={addAbstract} type="primary">确认并发布</el-button>
            </span>
        );
        const renderFile = ({file}) => (
            <div>
                 <img class="el-upload-list__item-thumbnail" src={file.url} alt="" />
                <span class="el-upload-list__item-actions">
                    <span
                        class="el-upload-list__item-delete"
                        onClick={()=> handleRemove(file)}
                    >
                        <el-icon><Delete /></el-icon>
                    </span>
                </span>
            </div>
        )
        return () => (
            <div class="markdow-editor">
                <div class="markdow-editor-header">
                    <div class="left-box"></div>
                   <div class="input-box"> 
                       <el-input v-model={input.value} maxlength="20" placeholder="输入文章标题..." />
                    </div>
                    <div class="right-box"> 
                      
                        <el-button color="#1d7dfa" onClick={publishButton} >发布</el-button>
                        <el-avatar
                            src={LocalCache.getCache('imgUrl') || defaultImg}
                        />
                    </div>
                </div>
                <div>
                   <editor
                   value={editorConfig.value}
                   plugins={editorConfig.plugins}
                   locale={zh_Hans}
                   uploadImages={uploadImage}
                   onChange={handleChange}/>
                </div>
                <div>
                <el-dialog
                v-model={dialogVisible.value}
                    title="发布文章"
                    width="50%"
                    v-slots={{footer:renderFooter()}}
                >
                <el-form
                ref={ruleFormRef}
                model={ruleForm}
                label-width="120px"
                rules={rules}
                status-icon
                >
                    <el-form-item label="文章类型:" prop="type">
                        <el-radio-group v-model={ruleForm.articleTypeId}>
                        {list.map((item,index) => (
                                <el-radio border label={index}>{item}</el-radio>
                        ))}
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="文章摘要:" prop="abstract">
                    <el-input maxlength="100" show-word-limit v-model={ruleForm.abstract} type="textarea" />
                    </el-form-item>
                    <el-form-item label="文章封面:" prop="imgUrl">
                        <el-upload
                        on-success={handleSuccess}
                        v-slots={{file:renderFile}} 
                        action="http://localhost:3000/api/uploadImg" 
                        limit={1} 
                        list-type="picture-card" 
                        name="image" >
                            <el-icon><Plus /></el-icon>
                            <div>上传封面</div>
                        </el-upload>
                    </el-form-item>
                </el-form>
                </el-dialog>
                </div>
               
            </div>
        )
    }
}) 