import React, { useState } from 'react'
import { Add_section } from '../../../../../api/post_apis'
import Notiflix from 'notiflix'
import toast from 'react-hot-toast'

const New_Section = (props) => {

  const [req,setreq] = useState({
      act_id:props.act_id,
      chapter_id:props.chapter_id,
      section_number:'',
      notified_date:'',
      section:''
    })
    
    const post = async()=>{
      const res = await Add_section(req)
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
        `Are you sure you want to add this section `,
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
        <h5 className='text-center p-0 m-0'>New Section</h5>
        </div>
        <div className="container mt-3">
        <div className="row justify-content-center g-4">
          <div className="col-10">
          <label htmlFor="section_number">Notified date</label>
            <textarea type='date' className='border border-gray1 w-100 px-2 py-2' name='section_number' value={req.notified_date?req.notified_date:""} onChange={(e)=>{setreq(prevState=>({...prevState,notified_date:e.target.value}))}}/>
          </div>
          <div className="col-10">
          <label htmlFor="section_number">Section number</label>
            <textarea className='border border-gray1 w-100 px-2 py-2' name='section_number' value={req.section_number?req.section_number:""} onChange={(e)=>{setreq(prevState=>({...prevState,section_number:e.target.value}))}}/>
          </div>
          <div className="col-10">
          <label htmlFor="section">Section</label>
            <textarea className='border border-gray1 w-100 px-2 py-2' name='section' value={req.section?req.section:''} onChange={(e)=>{setreq(prevState=>({...prevState,section:e.target.value}))}}/>
          </div>
          <div className="col-10 mt-3">
          <button className=' btn btn-blue1 text-white' onClick={()=>{confirmmessage()}}>Save</button>
          </div>
        </div>
        </div>
   
    </section>

  )
}

export default New_Section