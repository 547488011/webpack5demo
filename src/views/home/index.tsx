import { defineComponent,ref,onMounted,onBeforeUnmount,provide} from 'vue'
import Header from './header'
import Main from './main'
import './css/index.less'

export default defineComponent({
    name:'home',
    setup(){
        const scrollTopFixedStatus = ref(false)
        provide('fixedStatus',scrollTopFixedStatus);
        const handleScroll = () => {
            window.addEventListener('scroll',() =>{
                console.log(window.scrollY)
                if(window.scrollY > 280) {
                    scrollTopFixedStatus.value = true
                }else {
                    scrollTopFixedStatus.value = false
                }
                
            })
        }
        onMounted(()=>{
            handleScroll()
        })
        onBeforeUnmount(() => {
            window.removeEventListener('scroll', () => {});
        })
        return ()=>(
            <div class="home">
                <Header/>
                <Main/>
                <el-backtop /> 
            </div>
        )
    }
})