import { defineComponent,onMounted,ref,nextTick,onBeforeUnmount } from "vue";
import HeaderNav from "@/components/nav/nav";
import { getDetails } from '@/api/details'
import { useRouter } from 'vue-router'
import moment from 'moment'
import { useDirectory  } from '@/hooks/use_directory'
import { userEditor } from "@/hooks/use_editor";
import { Viewer } from "@bytemd/vue-next";
import { defaultImg } from '@/const/default'
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
        const formatTime = (time:string) => {
            return moment(time).format('YYYY年MM月DD日 hh:mm:ss')
        }
        const getDetailsFn = async(articleId:string) => {
            const res = await getDetails(articleId) as any
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
                                    <img src={detilsInformation.value?.image_url ?? defaultImg} alt="" />
                                </div>
                                <div class="user-info">
                                    <a href="">
                                        <span>
                                            {detilsInformation.value?.user_name}
                                        </span>
                                    </a>
                                    <div class="user-info-meta">
                                        <span>{formatTime(detilsInformation.value?.create_time)}</span>
                                        {/* <span> ·&nbsp;&nbsp;阅读943</span> */}
                                    </div>
                                </div>
                            </div>
                            {detilsInformation.value?.article_image_url && <div class="details-main-content-header-imgage">
                                <img src={detilsInformation.value?.article_image_url} alt="" />
                            </div> }
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