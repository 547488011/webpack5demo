import { ref,nextTick,Ref } from 'vue'

    let targetList:HTMLElement[] = [] 
    let currentScroll = 0 // 页面当前滚动位置
    let beforIndex = 9999 // 判断目录的上一次点击的index，初始值不能为第一个link的下标，不然第一次点击内容不会滚动
    const listHeight:number[] = [] // 渲染器所生成的每个标题距顶部位置数组
    let fixed = ref(false) // 目录是否fixed
    let linkList ; // 目录的每个子标签（li）
    const resetBeforIndex = () => {
        beforIndex = 9999
    }
export function useDirectory(viewerRef:Ref<any>,ulRef:Ref<any>,directoryList:Ref<any>){
    const generateDirectory =  () => {
        const htmlStr = viewerRef.value.markdownBody.innerHTML
         const tocs:string[] = htmlStr.match(/<[hH][1-6]>.*?<\/[hH][1-6]>/g)
         tocs.forEach((item: string, index: number) => {
             let _toc = `<div class='toc-title' id='${index}'>${item} </div>`
             viewerRef.value.markdownBody.innerHTML = viewerRef.value.markdownBody.innerHTML.replace(item, _toc)
         })
         directoryList.value = toToc(tocs)
     }
    const handleScroll = () => {
        resetBeforIndex()
        currentScroll = window.pageYOffset
        fixed.value = currentScroll > 150 ? true : false
        for (let i = 0;i < listHeight.length - 1;i++) {
            let currentHeight =  listHeight[i] - 20
            let afterHeight = listHeight[i+1]  - 20
            if (currentScroll >= currentHeight && currentScroll < afterHeight ) {
               const item:Element = document.getElementsByClassName("toc-link-#"+i)[0] as Element
               linkList =  document.getElementsByName('link')
               linkList.forEach((list:Element) => {
                 let top: number = 0 
                 top = i > 7 ? -44 * (i - 7) : 0
                 targetList[0].style.marginTop = `${top} px`
                 item === list ? list.classList.add('active') : list.classList.remove('active')
              })
            }
        }
        
    }

    const getTitleHeight =  () => {
        let titlelist:HTMLElement[] = Array.from((viewerRef.value.markdownBody as Element).getElementsByClassName('toc-title')) as HTMLElement[]
        titlelist.forEach((item:HTMLElement) => {
            listHeight.push(item.offsetTop)
        })
        if (titlelist.length < 1) return
        listHeight.push(2 * (titlelist[titlelist.length - 1].offsetTop))
    }
    const getCataloglist =  () => {
         targetList =Array.from((ulRef.value as Element).getElementsByClassName('catalog-list')) as HTMLElement[]
    }
    return {
        generateDirectory,
        handleScroll,
        getTitleHeight,
        getCataloglist,
        fixed
    }
}
// 目录的点击事件
const handleHerf = (index:number) => {
    if (beforIndex === index) return
    const anchorElementTop = document.getElementById(''+index)?.offsetTop || 0
    const beforeElementTop = document.getElementById('' + beforIndex)?.offsetTop || 0
    const differenceTop = anchorElementTop - beforeElementTop 
    const linkElement = document.getElementsByClassName("toc-link-#"+index)[0]
    linkList.forEach((item:Element) => {
        linkElement === item ? item.classList.add('active') : item.classList.remove('active')
    })
    if(anchorElementTop) {
        nextTick(() => {
            const elTop =  anchorElementTop - 20 
            // 计算向上滚动还是向下滚动
            let scrollTop = currentScroll >= beforeElementTop ? elTop - currentScroll  : (differenceTop || elTop)
            
            window.scrollBy({
                top:scrollTop,
                left: 0
                // behavior: 'smooth'
            })
            currentScroll
        })
    }
    beforIndex = index
}

window.handleHerf = handleHerf
// 标签转换目录
function toToc(data: string[]) {
    let levelStack: string[] = []
    let result:string = ''
    const resObj = {isUlHtml: false ,liList:[]} 
    const addStartUL = () => { result += '<ul class="catalog-list">'; }
    const addEndUL = () => { result += '</ul>\n'; }
    const addLI = (index: number, itemText: string) => { result += `<li><a onclick="handleHerf(${index})" name="link"  class="toc-link-#${index}"> ${itemText} </a></li>\n`; }
    data.forEach(function (item: any, index: number) {
      let itemText: string = item.replace(/<[^>]+>/g, '')  // 匹配h标签的文字
      let itemLabel: string = item.match(/<\w+?>/)[0]  // 匹配h?标签<h?>
      let levelIndex: number = levelStack.indexOf(itemLabel) // 判断数组里有无<h?>
      // 没有找到相应<h?>标签，则将新增ul、li
      if (levelIndex === -1) {
        levelStack.unshift(itemLabel)
        addStartUL()
        addLI(index, itemText)
      }
      // 找到了相应<h?>标签，并且在栈顶的位置则直接将li放在此ul下
      else if (levelIndex === 0) {
        addLI(index, itemText)
      }
      // 找到了相应<h?>标签，但是不在栈顶位置，需要将之前的所有<h?>出栈并且打上闭合标签，最后新增li
      else {
        while (levelIndex--) {
          levelStack.shift()
          addEndUL()
        }
        addLI(index, itemText)
      }
    })
    // 如果栈中还有<h?>，全部出栈打上闭合标签
    while (levelStack.length) {
      levelStack.shift()
      addEndUL()
    }
    

    
    return result
  }