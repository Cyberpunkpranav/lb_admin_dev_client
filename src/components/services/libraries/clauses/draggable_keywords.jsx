import React from 'react'
import { useDrag } from 'react-dnd';

const Draggable_keywords = (props) => {
    const [{isDragging},drag ] = useDrag(()=>({
        type:"keyword",
        item:{id:props.id,keyword:props.keyword,inactive_keywords:props.inactive_keywords,prefix:props.prefix,suffix:props.suffix},
        collect:(monitor)=>({
          isDragging: !!monitor.isDragging()
        })
      }))
      const Keyword_Color = ()=>{
        const arr =  ['blue1 text-blue1','blue2 text-blue2','blue3 text-blue3','blue4 text-blue4','blue5 text-blue5','blue6 text-blue6','blue7 text-blue7','blue8 text-blue8','greendark text-greendark','greenmain text-greenmain','greenlight text-greenlight','reddark text-reddark','redmain text-redmain','redlight text-redlight','orangedark text-orangedark','orangemain text-orangemain','orangelight text-orangelight','transparentorange2 text-transparentorange2','transparentred2 text-transparentred2','transparentgreen2 text-transparentgreen2']
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex]
      }
  return (
    <button ref={drag} className={`rounded-pill border-one border-dashed border-${Keyword_Color()} py-1 px-3 col-auto me-2 bg-white cursor-drag`}>{props.keyword?props.keyword:""}</button>
  )
}

export default Draggable_keywords