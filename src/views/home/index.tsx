import { defineComponent} from 'vue'
import Header from './header'
import './css/index.less'

export default defineComponent({
    name:'home',
    setup(){
        return ()=>(
            <div class="home">
                <Header/>
            </div>
        )
    }
})