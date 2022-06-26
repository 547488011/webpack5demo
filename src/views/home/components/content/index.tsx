import {defineComponent,ref} from 'vue'
import Scroll from '../scroll'
import './content.less'
export default defineComponent({
    name: 'HomeContent',
    setup(){
        const list = ['推荐','最新','热榜']
        const active = ref(0)
        const seletdItem = (index:number) => {
            active.value = index
        }
        return () => (
            <div class="home-content">
                <div class="home-content-header">
                    <ul>
                        {list.map((item,index) => (
                            <li onClick={(e)=>{seletdItem(index)}} class={['home-content-header-item',{'active':active.value===index}]}>{item}</li>
                        ))}
                    </ul>
                </div>
                <Scroll/>
            </div>
        )
    }
})