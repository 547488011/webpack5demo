import { defineComponent,ref,inject,Ref } from 'vue'
import  './list.less'

export default defineComponent({
    name: "header_list",
    setup() {
        const list = ['综合','后端','前端','Android','iOS','人工智能','开发工具','代码人生','阅读']
        const active = ref(0)
        const fixedStatus = inject<Ref<boolean>>('fixedStatus')
        const handleItem = (index:number)=>{
            active.value = index
        }
        return () => (
            <div class={["header-list",{'top':fixedStatus?.value}]}>
                <ul class="header-list-container">
                  {list.map((item,index) => (
                    <li onClick={(e)=>{handleItem(index)}} class={["header-list-container-item",{"active":active.value===index}]}>{item}</li>
                  ))}
                </ul>
            </div>
        )
    }
})