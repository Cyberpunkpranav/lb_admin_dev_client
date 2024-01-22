import React,{useState} from 'react'
import CK_Editor  from '../../../../../text_editor/ck_editor' 
import { Update_Subsection } from '../../../../../api/update_apis'
import toast from 'react-hot-toast'
import { encryptID } from '../../../../../security/crypto'
import Notiflix from 'notiflix'
import { useLocation,useNavigate } from 'react-router-dom'
const UpdateSubSection = () => {
    const navigate = useNavigate()
    const {state} = useLocation()
    const {Data} = state || {}
    if(!Data){
      toast.error('please choose subsection correctly to update')
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    }
    const [update_subsection_data,setupdate_subsection_data] = useState({
        act_id:Data!==undefined?Data.act_id:'',
        chapter_id:Data!==undefined?Data.chapter_id:'',
        section_id:Data!==undefined?Data.section_id:'',
        subsection_number:Data!==undefined?Data.subsection_number:'',
        content:Data!==undefined?Data.subsection:''
      })
      const Update_subsection = async()=>{
        const res  = await Update_Subsection(Data.id,update_subsection_data)
        if(res.data.status==true){
          toast.success(res.data.message)
          setTimeout(() => {
            window.history.back()
          }, 1000);
        }else{
          toast.error(res.data.message)
        }
      }
      const confirm_Updatesubsection = () => {
        Notiflix.Confirm.show(
          `Update subsection`,
          `Are you sure you want to update this subsection `,
          "Yes",
          "No",
          () => {
            Update_subsection();
          },
          () => {
            return 0;
          },
          {}
        );
      }
  return (
          <div className="container mt-5">
                <h5 className='text-center'>Update Subsection</h5>
    
                      <div className="row">
                        <div className="col-12">
                        <div className="col-2">
                        <label htmlFor="subsection_number">Subsection Number </label>
                        <input type="text" name='subsection_number' className='form-control' value={update_subsection_data.subsection_number} onChange={(e)=>{setupdate_subsection_data(prevState=>({...prevState,subsection_number:e.target.value}))}} />
                        </div>
                        </div>
                        <div className="col-12">
                        <div className="col-10">
                          <label htmlFor="subsection">Subsection</label>
                          <CK_Editor data={update_subsection_data.content!==undefined?update_subsection_data.content:''} setdata={setupdate_subsection_data}/>
                        </div>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-auto">
                                <button className='btn btn-blue13 text-blue1' onClick={()=>confirm_Updatesubsection()}>Done</button>
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

export default UpdateSubSection