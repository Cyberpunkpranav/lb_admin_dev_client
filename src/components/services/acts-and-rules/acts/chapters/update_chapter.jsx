import React, {useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Update_chapter } from '../../../../../api/update_apis'
import toast from 'react-hot-toast'
import { decryptID } from '../../../../../security/crypto'
import Notiflix from 'notiflix'

const Update_Chapter = (props) => {
  const navigate = useNavigate()
  const [data,setdata] = useState({
    act_id:props.act_id,
    chapter_number:props.chapter_number,
    chapter_part:props.chapter_part,
    chapter:props.chapter
  })
  const post = async()=>{
    const res = await Update_chapter(props.id,data)
    if(res.data.status == true){
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
      `Update Chapter`,
      `Are you sure you want to update this chapter `,
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
    <section className="container-fluid position-relative mt-4">
      <div className="container mt-4">
        <div className="row mt-5 g-5">
          <div className="col-6">
            <label htmlFor="chapter_number">Chapter Number</label>
            <textarea placeholder='choose number to explain chapter' className='border border-gray1 w-100 px-2 py-2' name='chapter_number' value={data.chapter_number?data.chapter_number:""} onChange={(e)=>{setdata(prevState=>({...prevState,chapter_number:e.target.value}))}} />
          </div>
          <div className="col-6">
          <label htmlFor="chapter_part">Chapter part</label>
            <textarea className='border border-gray1 w-100 px-2 py-2' placeholder='choose number or alphabets to explain chapter part (if any)' name='chapter_part' value={data.chapter_part?data.chapter_part:""} onChange={(e)=>{setdata(prevState=>({...prevState,chapter_part:e.target.value}))}}  />
          </div>
          <div className="col-12">
            <label htmlFor="chapter">Chapter</label>
            <textarea className='border border-gray1 w-100 px-2 py-2' placeholder='type chapter title here..' name='chapter' value={data.chapter?data.chapter:""} onChange={(e)=>{setdata(prevState=>({...prevState,chapter:e.target.value}))}}/>
          </div>
          <div className="col-12">
            <button className='btn btn-blue1 text-white mt-4' onClick={()=>{confirmmessage()}}>Update Chapter</button>
          </div>
        </div>
      </div>
    </section>
  )
}



export default Update_Chapter