import { defineComponent} from 'vue'
import Header from './header'
import Main from './main'
import './css/index.less'

export default defineComponent({
    name:'home',
    setup(){
        return ()=>(
            <div class="home">
                <Header/>
                <Main/>
            </div>
        )
    }
})