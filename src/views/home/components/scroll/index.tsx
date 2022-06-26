import {defineComponent} from 'vue'
import { Close,StarFilled,Message} from "@element-plus/icons-vue";
import './scroll.less'
export default defineComponent({
    name: 'scroll',
    setup(){
        return () => (
            <div class="content-scroll">
              <div>
              <div class="content-scroll-item">
                    <el-icon class="icon-close"><Close/></el-icon>
                    <div class="content-scroll-item-info">
                        <span class="content-scroll-item-info-username">前端胖头鱼</span>
                        <span class="content-scroll-item-info-timer">2月前</span>
                        <span class="content-scroll-item-info-category">前端</span>
                    </div>
                    <div class="content-scroll-item-content">
                        <div class="content-scroll-item-content-left">
                            <div class="content-scroll-item-content-left-title">
                                <h2>历时一个月，2.6W字！50+Vue经典面试题源码级详解，你值得收藏！</h2>
                            </div>
                            <div class="content-scroll-item-content-left-content">
                                你知道吗，如果你们公司向用户提供了上传功能，那可能这已经成为了黑产赚钱的摇篮，一个一个非法视频通过你们的CDN在用户之间传递，消耗着资源（每1GB可都是要钱的！），甚至可能还会有法务风险！
                            </div>
                            <div class="content-scroll-item-content-left-status">
                                <span>
                                    <el-icon><StarFilled/></el-icon>
                                    <span>2.5k</span>
                                </span>
                                <span>
                                    <el-icon><Message/></el-icon>
                                    <span>100</span>
                                </span>

                            </div>
                        </div>
                        <div class="content-scroll-item-content-right">
                            <img/>
                        </div>
                    </div>

                </div>
              </div>
            </div>
        )
    }
})