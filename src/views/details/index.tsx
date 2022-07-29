import { defineComponent,onMounted,ref,nextTick,onBeforeUnmount } from "vue";
import HeaderNav from "@/components/nav/nav";
import { getDetails } from '@/api/details'
import { useRouter } from 'vue-router'
import { useDirectory  } from '@/hooks/use_directory'
import { userEditor } from "@/hooks/use_editor";
import { Viewer } from "@bytemd/vue-next";
import Comment from './components/comment'
import './details.less'
export default defineComponent({
    name: "details",
    components: {
        Viewer,
        Comment
    },
    setup(){
        const { editorConfig,zh_Hans } = userEditor()
        const router = useRouter()
        const viewerRef = ref()
        const directoryList = ref()
        const detilsInformation = ref()
        const ulRef = ref()
        const { 
            generateDirectory,
            handleScroll,
            getTitleHeight,
            getCataloglist,
            fixed 
        } = useDirectory(viewerRef,ulRef,directoryList)
        onMounted(async() => {
            const articleId = router.currentRoute.value.params.id as string
            await getDetailsFn(articleId)
            window.addEventListener('scroll',handleScroll)
        })
        onBeforeUnmount(() => {
            window.removeEventListener('scroll', () => {});
        })
        const getDetailsFn = async(articleId:string) => {
            const res = await getDetails(articleId)
            detilsInformation.value = res[0]
            editorConfig.value = res[0].article_content
            nextTick( async()=> {
                await generateDirectory();
                getTitleHeight();
                getCataloglist();
            })

        }
        return () => (
            <div class="details">      
                <HeaderNav/>
               <div class="details-main">
                    <div class="details-main-content">
                        <div class="details-bg">                                            
                        <div class="details-main-content-header">
                            <h1>{ detilsInformation.value?.article_topic }</h1>
                            <div class="details-main-content-header-user">
                                <div class="user-image">
                                    <img src="https://p6-passport.byteacctimg.com/img/user-avatar/e4e77b17f384d5c51b9138ee9bb0581c~300x300.image" alt="" />
                                </div>
                                <div class="user-info">
                                    <a href="">
                                        <span>
                                            追_光_者
                                        </span>
                                    </a>
                                    <div class="user-info-meta">
                                        <span>2022年06月27日 20:34</span>
                                        <span> ·&nbsp;&nbsp;阅读943</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <viewer
                          value={ editorConfig.value }
                          tabindex="2"
                          ref={viewerRef}
                          sanitize="23"
                          plugins={editorConfig.plugins}
                          locale={zh_Hans}
                        />
                        </div>
                        <Comment/>
                    </div>
                    <div  class={["details-main-sider",{'list-fixed':fixed.value}]}>
                        <div class="details-main-sider-catalogue">
                            <h2>目录</h2>
                        </div>
                        <div ref={ulRef} class="details-main-sider-list" v-html={ directoryList.value }>

                        </div>
                    </div>
                    
               </div>
              
            </div>
        )
    }
})