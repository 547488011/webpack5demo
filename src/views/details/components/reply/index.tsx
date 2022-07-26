import { defineComponent,PropType,ref,nextTick } from 'vue'
import { ReplyItem } from '@/views/details/type'
import './reply.less'
import type { InputInstance } from 'element-plus'
import { Comment } from '@element-plus/icons-vue'
export default defineComponent({
    name:'Reply',
    props: {
        replyList:{
            type: Array as PropType<Array<ReplyItem>>,
            default: () => []
        }
    },
    setup(props) {
        const activeReply = ref(false)
        console.log(props.replyList);
        
        const textareaRef = ref<InputInstance>()
        const handleActiveReply = (textareaEl?:InputInstance) => {
            nextTick(() => textareaEl?.focus());
            activeReply.value = !activeReply.value
        }
        return () => (
            props.replyList.map((item) => (
                <div class="reply-box">
                    <div class="reply-box-portrait">
                        <el-avatar
                        src="https://p6-passport.byteacctimg.com/img/user-avatar/e4e77b17f384d5c51b9138ee9bb0581c~300x300.image"
                        />
                    </div>
                    <div class="reply-box-info">
                        <div class="reply-box-info-reply">
                            <div class="reply-box-info-reply-title">
                                <div class="reply-box-info-reply-title-name">
                                {item.name}
                                {item?.replyName && <span><span class="reply">回复</span>{item.replyName}</span> }
                                </div>
                                <div>三分钟前</div>
                            </div>
                            <div class="reply-box-info-reply-content">
                                { item.content }
                                { item?.quotedContent && 
                                <div class="parent-wrapper">
                                    <div>“</div>
                                    <div class="parent-content"> { item?.quotedContent }</div>
                                    <div>”</div>
                                   
                                </div>
                                }
                            </div>
                            <div class="reply-box-info-reply-operation">  
                                {activeReply.value? 
                                    <span class="reply-box-info-reply-operation-content active">
                                        <el-icon><Comment /></el-icon>
                                    <span onClick={() =>handleActiveReply()} >取消回复</span></span>: 
                                    <span class="reply-box-info-reply-operation-content">
                                        <el-icon><Comment /></el-icon>
                                        <span onClick={() => handleActiveReply(textareaRef.value)} >回复</span>
                                    </span> 
                                }
                            </div>
                           
                        </div>
                        <div v-show={activeReply.value} class="reply-box-info-textarea">
                                <el-input ref={textareaRef} autosize={{minRows: 3, maxRows: 10 }} placeholder="输入评论" type="textarea" />
                                <el-button type="primary">发布评论</el-button>
                        </div>
                    </div>
                </div>
            ))
            
        )
    }
})