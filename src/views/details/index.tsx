import { defineComponent,onMounted,ref,nextTick,onBeforeUnmount } from "vue";
import HeaderNav from "@/components/nav/nav";
import { getDetails } from '@/api/details'
import { useRouter } from 'vue-router'
import { userEditor } from "@/hooks/use_editor";
import { Viewer } from "@bytemd/vue-next";
import Comment from './components/comment'
import { toToc } from '@/utils/utils'
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
        let currentScroll = 0
        let beforIndex = 9999
        const directoryList = ref()
        const detilsInformation = ref()
        const listHeight:number[] = []
        const ulRef = ref()
        let fixed = ref(false)
        let targetList:HTMLElement[] = []
        const linkList = document.getElementsByName('link')
        const getTitleHeight =  () => {
            let titlelist:HTMLElement[] = Array.from((viewerRef.value.markdownBody as Element).getElementsByClassName('toc-title')) as HTMLElement[]
            titlelist.forEach((item:HTMLElement,index) => {
                listHeight.push(item.offsetTop)
            })
            if (titlelist.length < 1) return
            listHeight.push(2 * (titlelist[titlelist.length - 1].offsetTop))
        }
        const getCataloglist =  () => {
             targetList =Array.from((ulRef.value as Element).getElementsByClassName('catalog-list')) as HTMLElement[]
        }
        const handleScroll = () => {
            beforIndex = 999
            currentScroll = window.pageYOffset
            fixed.value = currentScroll > 150 ? true : false
            for (let i = 0;i < listHeight.length - 1;i++) {
                let currentHeight =  listHeight[i] - 20
                let afterHeight = listHeight[i+1]  - 20
                if (currentScroll >= currentHeight && currentScroll < afterHeight ) {
                   const item:Element = document.getElementsByClassName("toc-link-#"+i)[0] as Element
                   linkList.forEach((list:Element) => {
                     let top: number = 0 
                     top = i > 7 ? -44 * (i - 7) : 0
                     targetList[0].style.marginTop = `${top} px`
                     item === list ? list.classList.add('active') : list.classList.remove('active')
                  })
                }
            }
            
        }
        const handleHerf = (index:number) => {
            if (beforIndex === index) return
            const anchorElementTop = document.getElementById(''+index)?.offsetTop || 0
            const beforeElementTop = document.getElementById('' + beforIndex)?.offsetTop || 0
            const differenceTop = anchorElementTop - beforeElementTop 
            const linkElement = document.getElementsByClassName("toc-link-#"+index)[0]
            linkList.forEach((item:Element) => {
                linkElement === item ? item.classList.add('active') : item.classList.remove('active')
            })
            if(anchorElementTop) {
                nextTick(() => {
                    const elTop =  anchorElementTop - 20 
                    // 计算向上滚动还是向下滚动
                    let scrollTop = currentScroll >= beforeElementTop ? elTop - currentScroll  : (differenceTop || elTop)
                    
                    window.scrollBy({
                        top:scrollTop,
                        left: 0
                        // behavior: 'smooth'
                    })
                    currentScroll
                })
            }
            beforIndex = index
        }
        window.handleHerf = handleHerf
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
        const generateDirectory = async () => {
           const htmlStr = viewerRef.value.markdownBody.innerHTML
            const tocs:string[] = htmlStr.match(/<[hH][1-6]>.*?<\/[hH][1-6]>/g)
            tocs.forEach((item: string, index: number) => {
                let _toc = `<div class='toc-title' id='${index}'>${item} </div>`
                viewerRef.value.markdownBody.innerHTML = viewerRef.value.markdownBody.innerHTML.replace(item, _toc)
            })
            directoryList.value = toToc(tocs)

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