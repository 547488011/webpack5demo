import { defineComponent,ref,reactive } from 'vue'
import type { UploadFile,FormInstance } from 'element-plus'
import { Delete, Plus} from '@element-plus/icons-vue'

import { rules } from '../../config/account-config'
import { registeForm } from '../type'
import { useUploadImg } from '@/hooks/use_upload_Img'
export default defineComponent({
    name:'registeDialog',
    props: {    
      dialogVisible:{
          type:Boolean,
          default:false
      }
    },
    setup(props,{emit}){
        const ruleFormRef = ref<FormInstance>()
        const dialogClose = () => {
            emit('dialogClose')
        }
        const {fileList,handleRemove,handleSuccess,actionUrl} = useUploadImg()
        const registeForm:registeForm = reactive({
            usename:'',
            imgUrl:'',
            password:''
        })
        const registeFunc = () => {

        }
        const renderFooter = () => (
            <span class="dialog-footer">
            <el-button onClick= {dialogClose} >取消</el-button>
            <el-button onClick={registeFunc} type="primary">立即注册</el-button>
            </span>
        );
        const renderFile = ({file}) => (
            <div>
                <img class="el-upload-list__item-thumbnail" src={file.url} alt="" />
                <span class="el-upload-list__item-actions">
                    <span
                        class="el-upload-list__item-delete"
                        onClick={handleRemove}
                    >
                        <el-icon><Delete /></el-icon>
                    </span>
                </span>
            </div>
        )
        return () => (
            <div>
                <el-dialog
                v-model={props.dialogVisible}
                title="注册账号"
                width="50%"
                v-slots={{footer:renderFooter()}}
                >
                 <el-form
                    ref={ruleFormRef}
                    model={registeForm}
                    label-width="120px"
                    rules={rules}
                    status-icon
                >
                    <el-form-item label="账号:" prop="username">
                    <el-input v-model={registeForm.usename}  />
                    </el-form-item>
                    <el-form-item label="密码:" prop="password">
                    <el-input v-model={registeForm.password} showPassword/>
                    </el-form-item>
                    <el-form-item label="文章封面:" prop="imgUrl">
                        <el-upload
                        v-model:file-list={fileList.value}
                        on-success={(res)=>handleSuccess(res,registeForm)}
                        v-slots={{file:renderFile}} 
                        action={actionUrl}
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
        )
    }
})