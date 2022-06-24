import { defineComponent,reactive,ref } from 'vue'
import localCache from '@/utils/cache'
import type { FormInstance } from 'element-plus'
import {rules} from '../config/account-config'
import './css/account.less'
export default defineComponent({
    setup(){
        const isKeepPassword = ref(true)
        const account = reactive({
            name: localCache.getCache('name') ?? '',
            password: localCache.getCache('password') ?? ''
        })
        
        const formRef = ref<FormInstance>();
        // 点击登入
        const login = ()=>{
            const formEl = formRef.value
            if(!formEl) return 
            formEl.validate((vaild)=>{
                if(vaild){
                    // 验证通过
                }else {
                    return false
                }
            })
        }
        return ()=>(
            <div class="login-account">
                    <h1 class="title">文档编辑系统</h1>
                    <el-card class="box-card">
                       <el-form rules={rules} model={account} ref={formRef} label-width="60px">
                            <el-form-Item label="账号" prop="name">
                                <el-input v-model={account.name }/>
                            </el-form-Item>
                            <el-form-Item label="密码" prop="password">
                                <el-input v-model={account.password } showPassword />
                            </el-form-Item>
                       </el-form>
                       <div class="account-control">
                            <el-checkbox v-model={isKeepPassword.value}>记住密码</el-checkbox>
                            <el-link type="primary" >忘记密码</el-link>
                       </div>
                       <el-button type="primary" class="login-btn" onClick={login} >立即登入</el-button>
                    </el-card>
                    
            </div>
        )
    }
})