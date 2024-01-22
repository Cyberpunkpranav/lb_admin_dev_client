import React,{useState,useEffect} from 'react'
import { Add_subsection } from '../../../../../api/post_apis'
import CK_Editor  from '../../../../../text_editor/ck_editor' 
import { useLocation,useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Notiflix from 'notiflix'
const NewSubsection = () => {
  const {state}  = useLocation()
  const act_id = state!==undefined&&state.newsubsection_route_data!==undefined?state.newsubsection_route_data.act_id:''
  const chapter_id = state!==undefined&&state.newsubsection_route_data!==undefined?state.newsubsection_route_data.chapter_id:''
  const section_id = state!==undefined&&state.newsubsection_route_data!==undefined?state.newsubsection_route_data.section_id:''
  const [new_subsection_data,setnew_subsection_data] = useState({
    act_id:act_id,  
    chapter_id:chapter_id,
    section_id:section_id,
    subsection_number:'',
    content:''
  })  
  const Save_subsection = async()=>{
    const res  = await Add_subsection(new_subsection_data)
    if(res.data.status==true){
      toast.success(res.data.message)
      setTimeout(()=>{
        window.history.back()
      },1000)
    }else{
      toast.error(res.data.message)
    }
  }
  const confirm_Addsubsection = () => {
    Notiflix.Confirm.show(
      `Save subsection`,
      `Are you sure you want to save this subsection `,
      "Yes",
      "No",
      () => {
        Save_subsection();
      },
      () => {
        return 0;
      },
      {}
    );
  }
  return (
    <div className="container mt-5 position-relative">
    <div className="row">
    <div className="col-12">
    <div className="col-2">
    <label htmlFor="subsection_number">Subsection Number </label>
    <input type="text" name='subsection_number' className='form-control' value={new_subsection_data.subsection_number} onChange={(e)=>{setnew_subsection_data(prevState=>({...prevState,subsection_number:e.target.value}))}} />
    </div>
    </div>
    <div className="col-12">
    <div className="col-10">
      <label htmlFor="subsection">Subsection</label>
      <CK_Editor data={new_subsection_data.content!==undefined?new_subsection_data.content:''} setdata={setnew_subsection_data}/>
    </div>
    </div>
    <div className="col-12">
        <div className="row">
            <div className="col-auto">
            <button className='btn btn-blue13 text-blue1' onClick={()=>confirm_Addsubsection()}>Done</button>
            </div>
            <div className="col-auto">
            <button className='btn btn-white text-black' onClick={()=>{window.location.reload()}}>cancel</button>
            </div>
        </div>
    </div>
  </div>
  </div>
  )
}

export default NewSubsection