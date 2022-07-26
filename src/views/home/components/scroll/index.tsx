import {defineComponent,inject,Ref} from 'vue'
import { Close,StarFilled,Message} from "@element-plus/icons-vue";
import './scroll.less'
import router from '@/router';
export default defineComponent({
    name: 'scroll',
    setup(){
        const articleList = inject<Ref<Array<any>>>('articleList') 
        const handlerDateDurationCurrent = (time:string) => {
            const oldDate = new Date(time)
            const newDate = new Date()
            const timeDifference = Math.abs(newDate.getTime() - oldDate.getTime())
            const days = timeDifference / (24 * 60 * 60 * 1000) 
            const hours = Math.floor(days * 24)
            const isYear = (days / 365) > 1
            const isMonth = (days / 30) > 1
            if(isYear) return  Math.floor(days / 365) +'年前'
            if(isMonth) return Math.floor(days / 30) + '月前'
            if(days >= 1) return Math.floor(days) + '天前'
            if(hours >= 1) return hours + '小时前'
            console.log(hours);
            console.log(days);
            
            return Math.floor(hours * 60) + '分钟前'
        }
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