import React,{useState} from 'react'
import { useLocation } from 'react-router-dom'
import { Add_Clause } from '../../../../../api/post_apis'
import toast from 'react-hot-toast'
import Notiflix from 'notiflix'
import CK_Editor from '../../../../../text_editor/ck_editor'
const New_clauses = () => {
const {state} = useLocation()
if(state==undefined || state.Data ==undefined){
  window.history.back()
}
const [newclause_data ,setnewclause_data] = useState({
  act_id: state.Data.act_id,
  chapter_id:state.Data.chapter_id,
  section_id:state.Data.section_id,
  subsection_id:state.Data.id,
  clause_number:'',
  content:''
})
const Save_clause = async()=>{
  const res  = await Add_Clause(newclause_data)
  if(res.data.status==true){
    toast.success(res.data.message)
    setTimeout(()=>{
      window.history.back()
    },1000)
  }else{
    toast.error(res.data.message)
  }
}
const confirm_Newclause = () => {
  Notiflix.Confirm.show(
    `Save Clause`,
    `Are you sure you want to save this clause `,
    "Yes",
    "No",
    () => {
      Save_clause();
    },
    () => {
      return 0;
    },
    {}
  );
}
  return (
    <div className="container mt-5">
    <div className="row">
    <div className="col-12">
      <label htmlFor="subsection_number">Clause Number </label>
      <input type="text" name='subsection_number' className='form-control' value={newclause_data.clause_number} onChange={(e)=>{setnewclause_data(prevState=>({...prevState,clause_number:e.target.value}))}} />
      </div>
      <div className="col-12">
        <label htmlFor="subsection">Clause</label>
        <CK_Editor data={newclause_data.content!==undefined?newclause_data.content:''} setdata={setnewclause_data}/>
      </div>
      <div className="col-12">
        <div className="row">
          <div className="col-auto">
            <button className='btn btn-blue13 text-blue1' onClick={()=>confirm_Newclause()}>Done</button>
          </div>
          <div className="col-auto">
            <button className='btn btn-white text-black' onClick={()=>window.location.reload()}>cancel</button>
          </div>
        </div>
      </div>
    </div>
    </div>

  )
}

export default New_clauses