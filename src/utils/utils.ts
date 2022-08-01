export const handlerDateDurationCurrent = (time:string) => {
  if(!time) return
  const oldDate = new Date(time)
  const newDate = new Date()
  const timeDifference = Math.abs(newDate.getTime() - oldDate.getTime())
  const days = timeDifference / (24 * 60 * 60 * 1000) 
  const hours = days * 24
  const isYear = (days / 365) > 1
  const isMonth = (days / 30) > 1
  if(isYear) return  Math.floor(days / 365) +'年前'
  if(isMonth) return Math.floor(days / 30) + '月前'
  if(days >= 1) return Math.floor(days) + '天前'
  if(hours >= 1) return Math.floor(hours) + '小时前'
  console.log(days,'day');
  
  console.log(hours,'hu')
  
  return Math.floor(hours * 60) + '分钟前'
}