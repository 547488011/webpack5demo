import {defineComponent} from 'vue'
import Aside from '@/views/home/components/aside'
import Content from '@/views/home/components/content'
import './main.less'
export default defineComponent({
    name: 'HomeMain',
    setup(){
        return () => (
            <div class="home-main">
                <div class="home-main-container">
                    <Content/>
                    <Aside/>
                </div>
            </div>
        )
    }
})