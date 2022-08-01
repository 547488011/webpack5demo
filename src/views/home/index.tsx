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
            watchTime:0 //用来有些场景需要每次都触发查询的参赛，没有实际意义
        })
        const articleList = ref<Array<any>>([])
        const setParams = (newVal={}) => {
            Object.assign(getParams,newVal)
        }
        const scrollTopFixedStatus = ref(false)
        provide('fixedStatus',scrollTopFixedStatus);
        provide('articleList',articleList);
        provide('setParams',setParams)
        const handleScroll = () => {
            window.addEventListener('scroll',() =>{
                let clientHeight = document.body.clientHeight
                const scrollHeight = document.documentElement.scrollHeight;
                console.log(clientHeight);
                
                if(window.scrollY > 280 ) {
                    scrollTopFixedStatus.value = true
                    if(window.scrollY + clientHeight >= scrollHeight) {
                        nextPage()
                    }
                }else {
                    scrollTopFixedStatus.value = false
                }
                
            })
        }
        const getList = async () => {
            const res = await getArticleList(getParams)
            articleList.value = res as any
        }
        const nextPage = async () => {
            getParams.page++ 
            const res:any[] = await getArticleList(getParams) as any
            articleList.value.push(...res)
        }
        watch(
        ()=>[
            getParams.str,
            getParams.orderByName,
            getParams.typeId,
            getParams.watchTime],
        () => {
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
        const load = () => {
          console.log(222);
          
        }
        return ()=>(
            <div  class="home">
                <Header/>
                <Main />
                <el-backtop /> 
            </div>
        )
    }
})