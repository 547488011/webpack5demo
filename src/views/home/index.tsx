import { defineComponent,ref,onMounted,onBeforeUnmount,provide,reactive,watch} from 'vue'
import Header from './header'
import Main from './main'
import { getArticleList } from '@/api/home'
import './css/index.less'

export interface getParamsType {
    page:number,
    str?:string,
    typeId?:number,
    orderByName?:string
    watchTime?: number
}

export default defineComponent({
    name:'home',
    setup(){
        const getParams:getParamsType = reactive({
            page:1,
            str:'',
            typeId:0,
            orderByName:'',
            watchTime:0 //用来有些条件需要每次都触发查询的参赛，没有实际意义
        })
        const articleList = ref([])
        const setParams = (newVal={}) => {
            Object.assign(getParams,newVal)
        }
        const scrollTopFixedStatus = ref(false)
        provide('fixedStatus',scrollTopFixedStatus);
        provide('articleList',articleList);
        provide('setParams',setParams)
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
        const getList = async () => {
            const res = await getArticleList(getParams)
            articleList.value = res as any
            
        }
        watch(()=>getParams,() => {
            getList()
        },
        {deep:true}
        )
        onMounted(()=>{
            handleScroll()
            getList()
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