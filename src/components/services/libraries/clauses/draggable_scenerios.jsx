import React from 'react'
import { useDrag } from 'react-dnd';

const Draggable_scenerios = (props) => {
    const [{isDragging},drag ] = useDrag(()=>({
        type:"keyword",
        item:{keyword:props.scenerio},
        collect:(monitor)=>({
          isDragging: !!monitor.isDragging()
        })
      }))
      const handleScenerioChange = (index, value) => {
        props.setclause((prevData) => {
          const updatedScenerios = [...prevData.scenerios];
          updatedScenerios[index] = value;
          return { ...prevData, scenerios: updatedScenerios };
        });
      };
  return (
    <span ref={drag} className='py-3 cursor-drag'>
    <input className='border-bottom text-black' onChange={(e)=>handleScenerioChange(props.index,e.target.value)} value={props.scenerio?props.scenerio:""}/>
    </span>
  )
}

export default Draggable_scenerios