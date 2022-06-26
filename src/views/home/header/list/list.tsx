import { defineComponent,ref } from 'vue'
import  './list.less'

export default defineComponent({
    name: "header_list",
    setup() {
        const list = ['综合','后端','前端','Android','iOS','人工智能','开发工具','代码人生','阅读']
        const active = ref(0)
        const handleItem = (index:number)=>{
            active.value = index
        }
        return () => (
            <div class="header-list">
                <ul class="header-list-container">
                  {list.map((item,index) => (
                    <li onClick={(e)=>{handleItem(index)}} class={["header-list-container-item",{"active":active.value===index}]}>{item}</li>
                  ))}
                </ul>
            </div>
        )
    }
})