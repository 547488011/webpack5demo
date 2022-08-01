export interface ReplyItem {
    id: string;
    name: string;
    toUsername: string;
    to_uid: string;
    isShow?: boolean;
    userId: string;
    reContent: string;
    from_id: string;
    image_url: string;
    replyName?: string;
    content: string;
    comment_id: string;
    fromUsername: string;
    create_time: string;
    to_content: string
}

declare global {  //设置全局属性
    interface Window {  //window对象属性
        handleHerf: Function;   //加入对象
    }
  }
