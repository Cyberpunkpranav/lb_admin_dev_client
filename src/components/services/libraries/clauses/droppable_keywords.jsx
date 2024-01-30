import React from 'react'
import { useDrop } from 'react-dnd'

const Droppable_keywords = (props) => {
  const [{isOver},drop] = useDrop({
    accept:"keyword",
    drop:(item)=>keyword(item.id,item.keyword,item.inactive_keywords,item.prefix,item.suffix),
    collect:(monitor)=>({
      isOver: !!monitor.isOver()
    })
  })
  const keyword=(id,keyword,inactive_keywords,prefix,suffix)=>{
    props.setclause((item)=>{
        const keywordsArray = Array.isArray(item.keywords)
        ? item.keywords
        : [];
        const updatedClause = {...item,keywords: [...keywordsArray, {id:id,keyword:keyword,inactive_keywords:inactive_keywords,prefix:prefix,suffix:suffix}]}
        return updatedClause
    })
  }
  const Keyword_Color = ()=>{
    const arr =  ['blue1 text-blue1','blue2 text-blue2','blue3 text-blue3','blue4 text-blue4','blue5 text-blue5','blue6 text-blue6','blue7 text-blue7','blue8 text-blue8','greendark text-greendark','greenmain text-greenmain','greenlight text-greenlight','reddark text-reddark','redmain text-redmain','redlight text-redlight','orangedark text-orangedark','orangemain text-orangemain','orangelight text-orangelight','transparentorange2 text-transparentorange2','transparentred2 text-transparentred2','transparentgreen2 text-transparentgreen2']
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex]
  }
  return (
    <div className='d-flex ps-4 rounded-4 border-one border-dashed border-blue1 py-2 text-center cursor-drop' ref={drop}>
    {
      props.Data!==undefined&&props.Data!==null&&props.Data.keywords!==undefined&&props.Data.keywords!==null?(
        props.Data.keywords!==null&& props.Data.keywords.map((data)=>(
          <button className={`p-0 py-1 px-3 rounded-pill me-3 bg-white border-one border-dashed border-${Keyword_Color()} d-inline align-items-center`}>
          {data.keyword}
          </button>
        ))
      ):(<p className='text-center text-gray2 fw-normal text-wrap p-0 m-0 '>drag & drop keywords here from above to add in {props.clause_name.toLowerCase()} clauses</p>)

    }
    </div>
  )
}

export default Droppable_keywords