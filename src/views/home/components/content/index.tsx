import {defineComponent,ref,inject} from 'vue'
import Scroll from '../scroll'
import './content.less'
export default defineComponent({
    name: 'HomeContent',
    setup(){
        const list = [{name:'推荐',value:'default'},{name:'最新',value:'count'},{name:'热榜',value:'time'}]
        const active = ref(0)
        const setParams = inject('setParams') as Function
        const seletdItem = (index:number,value:string) => {
            active.value = index
            const obj = {
                orderByName : value
            }
            setParams(obj)
        }
        return () => (
            <div class="home-content">
                <div class="home-content-header">
                    <ul>
                        {list.map((item,index) => (
                            <li onClick={(e)=>{seletdItem(index,item.value)}} class={['home-content-header-item',{'active':active.value===index}]}>{item.name}</li>
                        ))}
                    </ul>
                </div>
                <Scroll/>
            </div>
        )
    }
})