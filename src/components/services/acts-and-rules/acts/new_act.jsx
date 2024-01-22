import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Add_act } from '../../../../api/post_apis'
import toast from 'react-hot-toast'
const NewAct = () => {
  const navigate = useNavigate()
  const [req,setreq] = useState({
    act:'',
    description:'',
    act_number:'',
    act_year:'',
    amendment:'',
    status:1
  })
  const postdata = async()=>{
    const res = await Add_act(req)
    if(res.data!==undefined&& res.data.status == true){
      toast.success(res.data.message)
      setreq({
        act:'',
        description:'',
        act_number:'',
        act_year:'',
        amendment:'',
        status:1
      })
      setTimeout(()=>{
        window.history.back()
      },1000)
    }else{
      toast.error(res.data.message)
    }
  }
  const handleCheckboxChange = () => {
    // Toggle the status when the checkbox is clicked
    req.status == 0 
    ?setreq(prevStatus => ({...prevStatus , status:1})) 
    :setreq(prevStatus => ({...prevStatus , status:0}));
  };
  return (
    <div className={`container mt-4 position-relative`}>
    <Link to='../Admin/acts'><img src={process.env.PUBLIC_URL+'/images/back.png'} className='img-fluid icons'/></Link>
    <h5 className='text-center'> New Act</h5>
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
      <button className ='btn bg-blue1 text-white' onClick={()=>postdata()}>Create</button>
    </div>
  </div>
  )
}

export default NewAct