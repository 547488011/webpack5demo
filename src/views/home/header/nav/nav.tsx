import { defineComponent } from 'vue'
import './nav.less'
import logo from '@/assets/img/logo.svg';
export default defineComponent({
    name: "header_nav",
    setup() {

        return () => (
            <div class="header-nav">
                <a href="/" class="logo">
                    <img src={logo} alt="" />
                </a>
            </div>
        )
    }
})