import React from 'react'
import { useDrop } from 'react-dnd'

const Droppable_Inactive_scenerois = (props) => {
  const [{isOver},drop] = useDrop({
    accept:"keyword",
    drop:(item)=>keyword(item.keyword),
    collect:(monitor)=>({
      isOver: !!monitor.isOver()
    })
  })
  const keyword=(keyword)=>{
    const updatedClauseAlt = props.clause_alt.map((item) => {
      const inactiveSceneriosArray = Array.isArray(item.inactive_scenerios)
      ? item.inactive_scenerios
      : [];
      return {
        ...item,
        inactive_scenerios: [...inactiveSceneriosArray, keyword],
      };
    });
    props.setclause_alt(updatedClauseAlt);
  }
  return (
    <div className='d-flex justify-content-start rounded-4 text-center py-3 cursor-drop' ref={drop}>
    {
      props.Data!==undefined&&props.Data!==null&&props.Data.inactive_scenerios!==null?(
        props.Data.inactive_scenerios!==null&& props.Data.inactive_scenerios.map((inactive_scenerio)=>(
          <button className='btn me-3 bg-transparentred2 text-reddark'>{inactive_scenerio}</button>
        ))
      ):(<div className='text-center text-gray3 fw-semibold '>drag & drop keywords as inactive scenerios from above to add here</div>)

    }
    </div>
  )
}

export default Droppable_Inactive_scenerois