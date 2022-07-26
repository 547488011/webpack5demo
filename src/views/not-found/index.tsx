import { defineComponent } from 'vue'
import './not_found.less'
export default defineComponent({
    name:'NotFound',
    setup() {
        return () => (
            <div class="not-found">
                <h2>404 Not Found</h2>
            </div>
        )
    }
})