export interface ReplyItem {
    id: string;
    type: number;
    name: string;
    replyName?: string;
    content: string,
    quotedContent?: string
}
declare global {  //设置全局属性
    interface Window {  //window对象属性
        handleHerf: Function;   //加入对象
    }
  }