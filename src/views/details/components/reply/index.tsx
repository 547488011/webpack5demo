import { defineComponent,PropType,ref,nextTick } from 'vue'
import { ReplyItem } from '@/views/details/type'
import './reply.less'
import type { InputInstance } from 'element-plus'
import { defaultImg } from '@/const/default'
import { handlerDateDurationCurrent } from '@/utils/utils'
import { Comment } from '@element-plus/icons-vue'
import { addReply } from '@/api/details'
import LocalCache from '@/utils/cache'
export default defineComponent({
    name:'Reply',
    props: {
        replyList:{
            type: Array as PropType<Array<ReplyItem>>,
            default: () => []
        },
        onComment: {
            type: Function,
            default: ():void => {}
        }
    },
    setup(props,{ emit }) {
        nextTick(() => {
            props?.replyList.map(item => ({
                ...item,
                isShow: false
            }))
        })
        const addReplyContent = ref()
        const textareaRef = ref<InputInstance>()
        const handleActiveReply = (index,textareaEl?:InputInstance) => {
            nextTick(() => textareaEl?.focus());
            const item = props.replyList[index]
            item.isShow = !item.isShow
        }
        const addReplyFun = async (commentId,toUserId,toReplyId) => {
            const addObj = {
                commentId,
                toReplyId,
                content:addReplyContent.value,
                toUserId:toUserId ?? null,
                userId:LocalCache.getCache('userId') || ''
            }
            await addReply(addObj)
            emit('comment')
        }
        return () => (
            props.replyList.map((item,index) => (
                <div class="reply-box">
                    <div class="reply-box-portrait">
                        <el-avatar
                        src={item?.image_url || defaultImg}
                        />
                    </div>
                    <div class="reply-box-info">
                        <div class="reply-box-info-reply">
                            <div class="reply-box-info-reply-title">
                                <div class="reply-box-info-reply-title-name">
                                {item.fromUsername}
                                {item?.toUsername && <span><span class="reply">回复</span>{item.toUsername}</span> }
                                </div>
                                <div>{ handlerDateDurationCurrent(item.create_time) }</div>
                            </div>
                            <div class="reply-box-info-reply-content">
                                { item.content }
                                { item?.reContent && 
                                <div class="parent-wrapper">
                                    <div>“</div>
                                    <div class="parent-content"> { item?.reContent }</div>
                                    <div>”</div>
                                   
                                </div>
                                }
                            </div>
                            <div class="reply-box-info-reply-operation">  
                                {item?.isShow? 
                                    <span class="reply-box-info-reply-operation-content active">
                                        <el-icon><Comment /></el-icon>
                                    <span onClick={() =>handleActiveReply(index)} >取消回复</span></span>: 
                                    <span class="reply-box-info-reply-operation-content">
                                        <el-icon><Comment /></el-icon>
                                        <span onClick={() => handleActiveReply(index,textareaRef.value)} >回复</span>
                                    </span> 
                                }
                            </div>
                           
                        </div>
                        <div v-show={item?.isShow} class="reply-box-info-textarea">
                                <el-input v-model={addReplyContent.value} ref={textareaRef} autosize={{minRows: 3, maxRows: 10 }} placeholder="输入评论" type="textarea" />
                                <el-button disabled={!addReplyContent.value} onClick={() => addReplyFun(item.comment_id,item.to_uid,item.id) } type="primary">发布评论</el-button>
                        </div>
                    </div>
                </div>
            ))
            
        )
    }
})