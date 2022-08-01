import {defineComponent,inject,Ref} from 'vue'
import { Close,StarFilled,Message} from "@element-plus/icons-vue";
import './scroll.less'
import { handlerDateDurationCurrent } from '@/utils/utils'
import router from '@/router';
export default defineComponent({
    name: 'scroll',
    setup(){
        const articleList = inject<Ref<Array<any>>>('articleList') 
        
        const spliceItem = (index:number) => {
            articleList?.value.splice(index,1)
        }
        const goDetails = (id) => {
            router.push(`/details/${id}`)
        }
        return () => (
            <div class="content-scroll">
                {
                  articleList?.value?.map((item,index) => (
                        
                        <div onClick={()=>goDetails(item.id)} >
                        <div class="content-scroll-item">
                        <el-icon onClick={()=>spliceItem(index)} class="icon-close"><Close/></el-icon>
                        <div class="content-scroll-item-info">
                            <span class="content-scroll-item-info-username">{item.user_name}</span>
                            <span class="content-scroll-item-info-timer">{handlerDateDurationCurrent(item.create_time)}</span>
                            <span class="content-scroll-item-info-category">前端</span>
                        </div>
                        <div class="content-scroll-item-content">
                            <div class="content-scroll-item-content-left">
                                <div class="content-scroll-item-content-left-title">
                                    <h2>{item.article_topic}</h2>
                                </div>
                                <div class="content-scroll-item-content-left-content">
                                    {item.article_abstract}
                                </div>
                                <div class="content-scroll-item-content-left-status">
                                    <span>
                                        <el-icon><StarFilled/></el-icon>
                                        <span>2.5k</span>
                                    </span>
                                    <span>
                                        <el-icon><Message/></el-icon>
                                        <span>100</span>
                                    </span>
    
                                </div>
                            </div>
                            { item.article_image_url ? 
                                <div class="content-scroll-item-content-right">
                                    <img src={item.article_image_url} />
                                </div>
                                : ''
                             }
                        </div>
                        </div>
                    </div>
                    ))
                  }
            </div>
        )
    }
})