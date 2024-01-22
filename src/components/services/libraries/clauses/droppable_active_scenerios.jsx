import React from 'react'
import { useDrop } from 'react-dnd'

const Droppable_Active_scenerois = (props) => {
  const [{isOver},drop] = useDrop({
    accept:"keyword",
    drop:(item)=>keyword(item.keyword),
    collect:(monitor)=>({
      isOver: !!monitor.isOver()
    })
  })
  const keyword=(keyword)=>{
    const updatedClauseAlt = props.clause_alt.map((item) => {
      const activeSceneriosArray = Array.isArray(item.active_scenerios)
      ? item.active_scenerios
      : [];
      return {
        ...item,
        active_scenerios: [...activeSceneriosArray, keyword],
      };
    });
    props.setclause_alt(updatedClauseAlt);
  }
  return (
    <div className='d-flex justify-content-start rounded-4 text-center py-3 cursor-drop' ref={drop}>
    {
      props.Data!==undefined&&props.Data!==null&&props.Data.active_scenerios!==null?(
        props.Data.active_scenerios!==null&& props.Data.active_scenerios.map((active_scenerio)=>(
          <button className='btn me-3 bg-transparentgreen2 text-greendark'>{active_scenerio}</button>
        ))
      ):(<div className='text-center text-gray3 fw-semibold '>drag & drop keywords as active scenerios from above to add here</div>)

    }
    </div>
  )
}

export default Droppable_Active_scenerois