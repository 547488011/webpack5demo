import { defineComponent,ref,nextTick,onMounted,watch,toRefs} from 'vue'
import './comment.less'
import type { InputInstance } from 'element-plus'
import { getCommentList } from '@/api/details'
import LocalCache from '@/utils/cache'
import { useRouter } from 'vue-router'
import { defaultImg } from '@/const/default'
import { handlerDateDurationCurrent } from '@/utils/utils'
import { Comment } from '@element-plus/icons-vue'
import { addComment,addReply } from '@/api/details'
import Reply from '../reply'
export default defineComponent({
    name: 'comment', 
    components: {
        Reply
    },
    setup() {
        const router = useRouter()
        const articleId = router.currentRoute.value.params.id as string
        const textareaRef = ref<InputInstance>()
       
        const addContent = ref()
        const addReplyContent = ref()
        const commentList = ref()
        const getComment = async() => {
            const res  = await getCommentList(articleId)
            commentList.value = res[0]?.map(item => (
                {
                    ...item,
                    isShow:false
                }
            ))
            for(const item of commentList.value) {
                toRefs(item)
            }
        }
        const handleActiveReply = (index,textareaEl?:InputInstance) => {
            const item =commentList.value[index]
            textareaEl?.focus()
            item.isShow = !item.isShow
        }
        const addCom = async() => {
            const addObj = {
                abstractId:articleId,
                commentContent:addContent.value,
                userId:LocalCache.getCache('userId') || ''
            }
            const res = await addComment(addObj)
            getComment()
        }
        const addReplyFun = async (commentId,toUserId,toReplyId = null) => {
            const addObj = {
                commentId,
                toReplyId,
                content:addReplyContent.value,
                toUserId,
                userId:LocalCache.getCache('userId') || ''
            }
            const res = await addReply(addObj)
            getComment()
        }
        onMounted(() => {
            nextTick(() => {
                getComment()
            })
        })
        return () => (
         <div class="comment"> 
                <h2>评论</h2>
             <div class="comment-form" >
                <el-avatar
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                />
                <div class="comment-form-textarea">
                    <el-input v-model={addContent.value} autosize={{minRows: 3, maxRows: 10 }} placeholder="输入评论" type="textarea" />
                    <el-button disabled={!addContent.value} onClick={addCom} type="primary">发布评论</el-button>
                </div>
                
             </div>
             <div class="comment-list">
                 <h2>全部评论</h2>
                 {commentList.value?.map((item,index) => (
                      <div class="comment-list-item"> 
                      <div class="comment-list-item-portrait">
                      <el-avatar
                              src={item?.image_url || defaultImg}
                      />
                      </div>
                      <div class="comment-list-item-info">
                          <div class="comment-list-item-info-title">
                             <div class="comment-list-item-info-title-name">{item?.commentUsername}</div>
                              <div>{handlerDateDurationCurrent(item?.create_time)}</div>
                          </div>
                          <div class="comment-list-item-info-content">{item?.comment_content}</div>
                          <div class="comment-list-item-info-reply">
                              {item?.isShow? 
                                  <span class="reply-content active">
                                      <el-icon><Comment /></el-icon>
                                  <span onClick={() =>handleActiveReply(index)} >取消回复</span></span> : 
                                  <span class="reply-content">
                                      <el-icon><Comment /></el-icon>
                                      <span onClick={() => handleActiveReply(index,textareaRef.value)} >回复</span>
                                  </span> 
                              }
                          </div>
                          <div v-show={item?.isShow} class="comment-list-item-info-textarea">
                              <el-input v-model={addReplyContent.value} ref={textareaRef} autosize={{minRows: 3, maxRows: 10 }} placeholder="输入评论" type="textarea" />
                              <el-button onClick={() => addReplyFun(item.id,item.userId)}  disabled={!addReplyContent.value} type="primary">发布评论</el-button>
                          </div>
                          <Reply  replyList={item?.replyList || []} onComment={getComment} />
                      </div>
                   </div>
                 ))}
                
             </div>
         </div>
        )
    }
})