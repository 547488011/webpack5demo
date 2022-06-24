import { App } from 'vue'
import 'element-plus/dist/index.css'
import {
    ElForm, ElCard, ElFormItem, ElInput, ElButton, ElCheckbox, ElLink
} from 'element-plus'

const components = [
    ElForm, ElCard, ElFormItem, ElInput, ElButton, ElCheckbox, ElLink
]


export default function (app: App): void {
    for (const component of components){
        app.component(component.name,component)
    }
}