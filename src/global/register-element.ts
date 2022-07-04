import { App } from 'vue'
import 'element-plus/dist/index.css'
import {
    ElForm, ElCard, ElFormItem, ElInput, ElButton, ElCheckbox, ElLink,ElDropdown, ElAvatar, ElDropdownMenu, ElDropdownItem, ElIcon, ElBacktop
} from 'element-plus';

const components = [
     ElBacktop,ElIcon,ElForm, ElCard, ElFormItem, ElInput, ElButton, ElCheckbox, ElLink,ElDropdown,ElAvatar,ElDropdownMenu,ElDropdownItem
]


export default function (app: App): void {
    for (const component of components){
        app.component(component.name,component)
    }
}