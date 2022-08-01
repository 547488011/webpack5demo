import { defineComponent,ref,computed ,Ref,inject,onMounted} from 'vue'
import './nav.less'
import localCache from '@/utils/cache'
import logo from '@/assets/img/logo.svg';
import search from '@/assets/img/search.svg';
import activeSearch from '@/assets/img/search-active.svg'
import { useRouter } from 'vue-router'
import {EditPen,View,ArrowDown} from '@element-plus/icons-vue'
export default defineComponent({
    name: "header_nav",
    setup() {
        const router = useRouter()
        const active = ref(false)
        const goTo = (path:string) => {
            router.push(path)
        }
        const userPortrait = localCache.getCache('imgUrl')
        
        const name:Ref<string|undefined> = ref()
        const fixedStatus = inject<Ref<boolean>>('fixedStatus')
        const setParams = inject('setParams') as Function
        const hanleSearch = () => {
            const location = router.options.history.location
            const obj = {
                str: name.value,
                watchTime: Date.now()
            }
            setParams && setParams(obj)
            location.includes('details') && router.push(`/home?query=${name.value}`)
        }
        const renderDrop = (isIcon=true)=>{
            return isIcon? (
                <el-dropdown-menu>
                    <el-dropdown-item onClick={()=>goTo('/editor')} icon={EditPen}>写文章</el-dropdown-item>
                    <el-dropdown-item icon={View}>发沸点</el-dropdown-item>
                </el-dropdown-menu>
            ):(
                <el-dropdown-menu>
                    <el-dropdown-item >文章</el-dropdown-item>
                    <el-dropdown-item >沸点</el-dropdown-item>
                </el-dropdown-menu>
            )
        }
        onMounted(() =>{
          const query = router.currentRoute.value.query?.query as string
          if(query) {
            name.value = query
            const obj = {
                str: name.value,
                watchTime: Date.now()
            }
            setParams && setParams(obj)
          }
         
        })
        const activeObj = computed(()=>{
            return {
                class: !active.value?'header-nav-right-container-search-form':'header-nav-right-container-search-active-form',
                placeholder: !active.value?'探索稀土掘金':'搜索文章/小册/标签/用户',
                search: !active.value ? search : activeSearch
            }
        })
        return () => (
            <div class="header-nav-box">
                 <div class={['header-nav', {'visible':!fixedStatus?.value}]}>
                <div class="header-nav-left">
                    <a href="/" class="logo">
                        <img src={logo} alt="" />
                    </a>
                <div class="header-nav-left-drop">
                    <el-dropdown v-slots={{dropdown:renderDrop(false)}}>
                        <span class={["el-dropdown-link",'drop-font']}>
                        <span class="header-nav-left-drop-home" onClick={()=>goTo('/home')} >首页</span><el-icon class="el-icon--right"><ArrowDown /></el-icon>
                        </span>
                    </el-dropdown>
                </div>
                   
               </div> 
               <div class="header-nav-right">
                   <div class="header-nav-right-container">
                    <div class="header-nav-right-container-search">
                            <el-form class={[activeObj.value.class,'form-transition']}>
                                <el-input v-model={name.value} onBlur={()=>{active.value = false}} onFocus={()=>{active.value= true}} placeholder={activeObj.value.placeholder} type="text" >
                                </el-input>
                                <div class="search-icon-container" onMousedown={hanleSearch}>
                                <img class="search-icon"  src={activeObj.value.search} alt="搜索" />
                                </div>
                            </el-form>
                        
                        </div>
                        <div class='header-nav-right-container-down'>
                        <transition name="drop">
                            <el-dropdown v-slots={{dropdown:renderDrop}} v-show= {!active.value} size="default" trigger="click" split-button type="primary">
                                创作者中心
                            </el-dropdown>
                        </transition>
                        </div>
                   </div>
                   
                    <div class="header-nav-right-user">
                    <el-avatar
                            src={userPortrait}
                        />
                    </div>
               </div>
            </div>
        </div>
        )
    }
})