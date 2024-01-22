import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Get_Acts } from '../../../../api/get_apis'
import { Delete_act } from '../../../../api/delete_apis'
import { Switch_Act } from '../../../../api/post_apis'
import Notiflix from 'notiflix'
import toast from 'react-hot-toast'
import { encryptID } from '../../../../security/crypto'

const Acts = () => {
  const [data,setdata] = useState([])
  const [req,setreq] = useState({
    search:''
  })
  const fetch = async()=>{
  const response =  await Get_Acts(req)
    if(response.data){
      setdata(response.data.data)
    }
  }
  useEffect(()=>{
    fetch()
  },[])
  async function Switch_status(id,status){
    const data = await Switch_Act(id,status)
    if(data.data.status == true){
      toast.success(data.data.message)
      fetch()
    }
    if(data.data.status == false){
      toast.error(data.data.message)
    }
  }
  async function delete_act(id){
    const data = await Delete_act(id)
    if(data.data.status==true){
      toast.success(data.data.message)
      fetch()
    }else{
      toast.error(data.data.message)
    }
  }
  const confirmmessage = (id) => {
    Notiflix.Confirm.show(
      `Delete act`,
      `Are you sure you want to delete this act `,
      "Yes",
      "No",
      () => {
        delete_act(id);
      },
      () => {
        return 0;
      },
      {}
    );
  }
  const clearInput =()=>{
    if(req.search.length==0){
      fetch()
    }
  }


  return (
      <section className='container-fluid position-relative mt-4'>
      <Link to='../Admin' className='position-absolute start-0 ms-lg-5 top-0'><img className='icons img-fluid' src={process.env.PUBLIC_URL+'/images/back.png'}/></Link>
      <h4 className='text-center fw-semibold'>Acts</h4>
        <div className="container position-relative mt-4">
        <div className="row justify-content-center">
        <div className="col-lg-5 col-10 p-0 m-0 position-relative">
        <input className='form-control' placeholder='search acts..' value={req.search?req.search:''} onBlur={()=>{clearInput()}} onChange={(e)=>setreq(prevState=>({...prevState,search:e.target.value}))}/>
        <button className='btn p-0 m-0 position-absolute end-0 top-0 mt-1 me-1' onClick={()=>fetch()}><img className='icons img-fluid' alt='...' src={process.env.PUBLIC_URL+'/images/search.png'}/></button>
        </div>
        <div className="col-auto position-absolute top-0 end-0">
        <Link to='./new' className=' btn btn-blue1 text-white'>+ New Act </Link>
        </div>
        </div>
        </div>
      <main className="container mt-5">
      {
      data && data.length>0?(     
                    data.map((data,i)=>(
                      <div className="card my-4 position-relative">
                      <div className="card-body">
                        <h5 className="card-title">{data.act}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">{data.act_number} Of {data.act_year}</h6>
                        <h6 className="card-subtitle mb-2 text-body-secondary">amendment: {data.amendment}</h6>
                        <p className="card-text">{data.description}</p>
                        <Link to={`${data.act}`} state={{data}} className=" text-decoration-none">View Act</Link>
                        <div className=" position-absolute top-0 end-0 "><div className="dropdown">
                      <button className="btn p-0 m-0 me-1 mt-1" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src={process.env.PUBLIC_URL+'/images/settings.png'} className='img-fluid icons'/>
                      </button>      
                      <ul className="dropdown-menu">
                        <li><Link to={`update/${data.id}`} className="dropdown-item" href="#">Update</Link></li>
                        {
                          data.status == 0 ? (
                            <li onClick={()=>{Switch_status(data.id,1)}}><div className="dropdown-item">Enable</div></li>
                          ):(
                            <li onClick={()=>{Switch_status(data.id,0)}}><div className="dropdown-item">Disable</div></li>
                          )
                        }
                        <li onClick={()=>confirmmessage(data.id)}><div className="dropdown-item">Delete</div></li>
                      </ul>
                    </div></div>
                      </div>
                    </div>
                    ))
        

      ):(<></>)
      }
      </main>
      </section>
  )

}

export default Acts