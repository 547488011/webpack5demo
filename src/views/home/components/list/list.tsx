import { defineComponent,ref,inject,Ref,onMounted } from 'vue'
import { getTypeList } from '@/api/home'

import  './list.less'

export default defineComponent({
    name: "header_list",
    setup() {
        const list = ref([{name:'综合',value:0}])
        const active = ref(0)
        const fixedStatus = inject<Ref<boolean>>('fixedStatus')
        const setParams = inject('setParams') as Function
        const handleItem = (index:number,value:number)=>{
            active.value = index
            const obj = {
                typeId: value
            }
            setParams(obj)
        }
        const getlist = async() => {
            const res =  await getTypeList() as any
            console.log(res)
            const resList = res?.map((item) => ({
                name:item['type_name'],
                value:item.id
            }))
            list.value.push(...resList)
        }
        onMounted(() => {
            getlist()
        })
        return () => (
            <div class={["header-list",{'top':fixedStatus?.value}]}>
                <ul class="header-list-container">
                  {list.value.map((item,index) => (
                    <li onClick={(e)=>{handleItem(index,item.value)}} class={["header-list-container-item",{"active":active.value===index}]}>{item.name}</li>
                  ))}
                </ul>
            </div>
        )
    }
})