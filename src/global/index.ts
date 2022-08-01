import {App} from 'vue'
import registerElement from './register-element'
import InfiniteScroll from "element-plus"
export default function globalRegister(app: App): void {
    app.use(registerElement)
    app.use(InfiniteScroll)
  }