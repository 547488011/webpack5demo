import { defineComponent} from 'vue'
import Account from '@/views/login/components/account'
import './css/index.less'

export default defineComponent({
    name: 'login',
    setup(){
        return ()=>(
            <div class="login">
                <Account/>
            </div>
        )
    }
})