import { defineComponent } from 'vue'
import HeaderNav from '../../../components/nav/nav'
import HeaderList from './list/list'
import './index.less'
export default defineComponent({
    name: "",
    setup() {
        return () => (
            <div class="header">
              <HeaderNav/>  
              <HeaderList/>
            </div>
        )
    }
})