import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Update_section } from '../../../../../api/update_apis'
import { decryptID } from '../../../../../security/crypto'
import Notiflix from 'notiflix'
import toast from 'react-hot-toast'

const Update_Section = (props) => {
  const navigate = useNavigate()

  const [req,setreq] = useState({
      act_id:props.act_id,
      chapter_id:props.chapter_id,
      section_number:props.section_number,
      notified_date:props.notified_date,
      section:props.section
    })
    
    const post = async()=>{
      const res = await Update_section(props.id,req)
      if(res.data.status==true){
          toast.success(res.data.message)
          setTimeout(()=>{
            window.location.reload()
          },1000)
      }else{
        toast.error(res.data.message)
      }
    }
    const confirmmessage = () => {
      Notiflix.Confirm.show(
        `Update Section`,
        `Are you sure you want to update this section `,
        "Yes",
        "No",
        () => {
          post();
        },
        () => {
          return 0;
        },
        {}
      );
    }
  return (
    <section className='py-4'>
        <div className="container">
        <h5 className='text-center p-0 m-0'>Update Section</h5>
        </div>
        <div className="container mt-3">
        <div className="row justify-content-center g-4">
          <div className="col-10">
          <label htmlFor="section_number">Notified date</label>
            <input type='date' className='form-control' name='section_number' value={req.notified_date?req.notified_date:""} onChange={(e)=>{setreq(prevState=>({...prevState,notified_date:e.target.value}))}}/>
          </div>
          <div className="col-10">
          <label htmlFor="section_number">Section number</label>
            <input className='form-control' name='section_number' value={req.section_number?req.section_number:""} onChange={(e)=>{setreq(prevState=>({...prevState,section_number:e.target.value}))}}/>
          </div>
          <div className="col-10">
          <label htmlFor="section">Section</label>
            <textarea className='form-control' name='section' value={req.section?req.section:''} onChange={(e)=>{setreq(prevState=>({...prevState,section:e.target.value}))}}/>
          </div>
          <div className="col-10 mt-3">
          <button className=' btn btn-blue1 text-white' onClick={()=>{confirmmessage()}}>Update</button>
          </div>
        </div>
        </div>
   
    </section>

  )
}


export default Update_Section