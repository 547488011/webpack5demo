import { defineComponent } from 'vue'
import classes from './list.module.less'

export default defineComponent({
    name: "header_list",
    setup() {
        return () => (
            <div class={classes['header-list']}></div>
        )
    }
})