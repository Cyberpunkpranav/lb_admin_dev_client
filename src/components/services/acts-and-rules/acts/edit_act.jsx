import React,{useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Get_Act_by_Id } from '../../../../api/get_apis'
import { Update_acts } from '../../../../api/update_apis'
import toast from 'react-hot-toast'
const Edit_Act = () => {
    const {id} = useParams()
    const [req,setreq] = useState({
      act:'',
      description:'',
      act_number:'',
      act_year:'',
      amendment:'',
      status:''
    })
    const get_act = async()=>{
        const res  = await Get_Act_by_Id(id)
        if(res.data.length>0){
        setreq({
          act:res.data[0].act,
          description:res.data[0].description,
          act_number:res.data[0].act_number,
          act_year:res.data[0].act_year,
          amendment:res.data[0].amendment,
          status:1
        })
      }
    }
    useEffect(()=>{
      get_act()
    },[])

      const handleCheckboxChange = () => {
        req.status == 0 
        ?setreq(prevStatus => ({...prevStatus , status:1})) 
        :setreq(prevStatus => ({...prevStatus , status:0}));
      }
      const update_act=async()=>{
        const res = await Update_acts(id,req)
        if(res.data.status =true){
          toast.success(res.data.message)
          get_act()
        }else{
          toast.error(res.data.message)
        }
        console.log(res)
      }

  return (
    <div className={`container mt-4 position-relative`}>
    <Link to='../Admin/acts'><img src={process.env.PUBLIC_URL+'/images/back.png'} className='img-fluid icons'/></Link>
    <h5 className='text-center'> Update Act</h5>
    <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={req.status} onChange={handleCheckboxChange} />
                <label className="form-check-label">Show this blog in website</label>
                </div>
    <div className="col-12 mt-4">
    <label>Act</label>
    <textarea className='form-control' rows='2' value={req.act?req.act:""} onChange={(e)=>setreq(prevState=>({...prevState,act:e.target.value}))}/>
    </div>
    <div className="col-12 mt-4">
    <label>Description</label>
      <textarea className='form-control' rows='10' value={req.description?req.description:""} onChange={(e)=>setreq(prevState=>({...prevState,description:e.target.value}))}/>
    </div>
    <div className="row mt-4">
      <div className="col-auto">
        <label htmlFor="act_number">act_number</label>
        <input className='form-control' name='act_number' value={req.act_number?req.act_number:''} onChange={(e)=>setreq(prevState=>({...prevState,act_number:e.target.value}))}/>
      </div>
      <div className="col-auto">
        <label htmlFor="">act_year</label>
        <input type="text" name='act_year' className='form-control' value={req.act_year?req.act_year:''} onChange={(e)=>setreq(prevState=>({...prevState,act_year:e.target.value}))} />
      </div>
      <div className="col-auto">
      <label htmlFor="amendment">amendment</label>
      <input type="text" className='form-control' value={req.amendment?req.amendment:''} onChange={(e)=>setreq(prevState=>({...prevState,amendment:e.target.value}))} />
      </div>
    </div>
  
    <div className="col-12 mt-4">
      <button className ='btn bg-blue1 text-white' onClick={()=>update_act()}>Update</button>
    </div>
  </div>
  )
}

export default Edit_Act