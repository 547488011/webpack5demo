import {defineComponent} from 'vue'
import { AlarmClock } from "@element-plus/icons-vue";
import downImg from "@/assets/img/download.png";
import './aside.less'
export default defineComponent({
    name: 'HomeAside',
    setup(){
        return () => (
            <div class="home-aside">
                <div class="home-aside-date">
                    <div class="home-aside-date-title">
                        <el-icon>
                            <AlarmClock/>
                        </el-icon>
                        <span>下午好</span>
                    </div>
                    <div class="home-aside-date-msg">
                        <p>点亮你在社区的每一天</p>
                    </div>
                </div>
                <div class="home-aside-down">
                    <div class="home-aside-down-img">
                        <img src={downImg} alt="下载" />
                    </div>
                    <div class="home-aside-down-describe">
                        <h2>下载稀土掘金APP</h2>
                        <p>一个帮助开发者成长的社区</p>
                    </div>
                </div>
            </div>
        )
    }
})