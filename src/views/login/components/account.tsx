import { defineComponent,reactive,ref } from 'vue'
import localCache from '@/utils/cache'
import type { FormInstance } from 'element-plus'
import LocalCache from '@/utils/cache'
import {rules} from '../config/account-config'
import { login } from "@/api/login"
import './css/account.less'
import router from '@/router'
export default defineComponent({
    setup(){
        const isKeepPassword = ref(true)
        const account = reactive({
            username: localCache.getCache('name') ?? '',
            password: localCache.getCache('password') ?? ''
        })
        
        const formRef = ref<FormInstance>();
        // 点击登入
        const handleLogin = ()=>{
            const formEl = formRef.value
            if(!formEl) return 
            formEl.validate( async (vaild)=>{
                if(vaild){
                    // 验证通过
                const data = await login(account)
                data[0]['user_name'] && LocalCache.setCache('username',data[0]['user_name']);
                setTimeout(()=>{
                    router.push('/home')
                },400)
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
                                <el-input v-model={account.username }/>
                            </el-form-Item>
                            <el-form-Item label="密码" prop="password">
                                <el-input v-model={account.password } showPassword />
                            </el-form-Item>
                       </el-form>
                       <div class="account-control">
                            <el-checkbox v-model={isKeepPassword.value}>记住密码</el-checkbox>
                            <el-link type="primary" >忘记密码</el-link>
                       </div>
                       <el-button type="primary" class="login-btn" onClick={handleLogin} >立即登入</el-button>
                    </el-card>
                    
            </div>
        )
    }
})