import { defineComponent,ref,nextTick} from 'vue'
import './comment.less'
import type { InputInstance } from 'element-plus'
import { Comment } from '@element-plus/icons-vue'
import Reply from '../reply'
export default defineComponent({
    name: 'comment', 
    components: {
        Reply
    },
    setup() {
        const activeReply = ref(false)
        const textareaRef = ref<InputInstance>()
        const handleActiveReply = (textareaEl?:InputInstance) => {
            nextTick(() => textareaEl?.focus());
            activeReply.value = !activeReply.value
        }
        const replyList = [{
            id: '111',
            type: 2,
            name: '薄云飞',
            replyName: '烟熏三文鱼',
            content: '你的评论真棒',
            quotedContent: '人家真的是怕了，开头讲这是我个人的见解，结尾又讲了一边，就怕别人黑他'
        }]
        return () => (
         <div class="comment"> 
                <h2>评论</h2>
             <div class="comment-form" >
                <el-avatar
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                />
                <div class="comment-form-textarea">
                    <el-input autosize={{minRows: 3, maxRows: 10 }} placeholder="输入评论" type="textarea" />
                    <el-button type="primary">发布评论</el-button>
                </div>
               
             </div>
             <div class="comment-list">
                 <h2>全部评论</h2>
                 <div class="comment-list-item"> 
                    <div class="comment-list-item-portrait">
                    <el-avatar
                            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    />
                    </div>
                    <div class="comment-list-item-info">
                        <div class="comment-list-item-info-title">
                           <div class="comment-list-item-info-title-name">烟熏三文鱼</div>
                            <div>三分钟前</div>
                        </div>
                        <div class="comment-list-item-info-content">人家真的是怕了，开头讲这是我个人的见解，结尾又讲了一边，就怕别人黑他</div>
                        <div class="comment-list-item-info-reply">
                            {activeReply.value? 
                                <span class="reply-content active">
                                    <el-icon><Comment /></el-icon>
                                <span onClick={() =>handleActiveReply()} >取消回复</span></span>: 
                                <span class="reply-content">
                                    <el-icon><Comment /></el-icon>
                                    <span onClick={() => handleActiveReply(textareaRef.value)} >回复</span>
                                </span> 
                            }
                        </div>
                        <div v-show={activeReply.value} class="comment-list-item-info-textarea">
                            <el-input ref={textareaRef} autosize={{minRows: 3, maxRows: 10 }} placeholder="输入评论" type="textarea" />
                            <el-button type="primary">发布评论</el-button>
                        </div>
                        <Reply replyList={replyList} />
                    </div>
                 </div>
             </div>
         </div>
        )
    }
})