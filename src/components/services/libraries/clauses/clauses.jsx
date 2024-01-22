import React, { useState,useEffect } from 'react'
import { Get_Clauses,Get_clause_count } from '../../../../api/get_apis'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { decryptNumber,decryptString } from '../../../../security/crypto'
import Pagination from '../../../extras/pagination'
import toast from 'react-hot-toast'
import Notiflix from 'notiflix'

const Clauses = () => {
  const encrypted_user_id = Cookies.get('user_id')
  const encrypted_role = Cookies.get('role')
  const user_id = decryptNumber(encrypted_user_id)
  const role  =decryptString(encrypted_role)
  const [data,setdata] = useState({
    user_id:role =='master admin'?0:user_id,
    search:'',
    limit:10,
    offset:0
  })
  const max_count = 10
  const [loading,setloading] = useState(false)
  const [clauses,setclauses] = useState([])
  const [total_count,settotal_count] = useState('')

  const fetch = async(Data)=>{
    setloading(true)
    if (Data == undefined || Data.selected == undefined) {
      const Data =  await Get_Clauses(data.user_id,data.limit,data.offset,data.search)
      setclauses(Data.data.data)
      setloading(false)
    }else{
      const clause =  await Get_Clauses(data.user_id,data.limit,Data.selected*max_count,data.search)
      setclauses(clause.data.data)
      setloading(false)
    }

  }
  useEffect(()=>{
    fetch()
  },[])
  const Get_count = async()=>{
    const data = await Get_clause_count()
    if(data.data.status == true){
      settotal_count(data.data.data)
    }else{
      toast.error(data.data.message)
    }
  }
  useEffect(()=>{
    Get_count()
  },[])
  return (
    <div className="container mt-4">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><Link to="/">Home</Link></li>
        <li class="breadcrumb-item active" aria-current="page">Clauses</li>
      </ol>
    </nav>
  <section>
    {
    loading ? (
      <div className="loader">
      <div className="container d-flex align-items-center">
      <strong role="status">Loading...</strong>
      <div className="spinner-border ms-auto" aria-hidden="true"></div>
    </div>
    </div>
    ):(
      <section className='container-fluid clausesection m-0 p-0 px-2 position-relative mt-4' style={{minHeight:'80vh'}}>
        <div className="d-flex align-items-center">
          <div className="col-auto p-0 m-0">
          <h4 className='text-start p-0 m-0 fw-normal'>Clauses</h4>
          </div>
          <div className='col-auto p-0 m-0 ms-3 mt-1'>
          <Link to='./new' className='p-0 m-0'><i class='bx bxs-plus-circle fs-4 text-dark' ></i></Link>
          </div>
        </div>
      <div className="d-flex justify-content-end position-relative mt-4">
        <div className="col-auto p-0 m-0 position-relative">
        <input className=' w-100 rounded-2 bg-blue13 px-2 py-2 ' placeholder='clause name...' value={data.search?data.search:''} onChange={(e)=>setdata(prevState=>({...prevState,search:e.target.value}))}/>
        <i class='bx cursor-pointer bg-blue5 rounded-3 text-white bx-search position-absolute end-0 top-0 px-2 py-2 mt-1 me-1 ' onClick={()=>fetch()} ></i>
        {/* <button className='btn p-0 m-0 position-absolute end-0 top-0 mt-1 me-1' onClick={()=>fetch()}><img className='icons img-fluid' alt='...' src={process.env.PUBLIC_URL+'/images/search.png'}/></button> */}
        </div>
      </div>

          {
            clauses!==undefined && clauses.length!==0 ?(
              <table className='table w-100 mt-4 align-middle'>
              <thead>
                <tr>
                  <th className='fw-normal'>Update</th>
                  <th className='fw-normal'>more</th>
                </tr>
              </thead>
              <tbody>
                {
              clauses.map((data)=>(
                <tr>
                <td><Link to={`update/${data.id}`} className="text-decoration-none link" href="#">{data.clause_name}</Link></td>
                <td className=''><><div className="dropdown d-inline ">
                  <i class='bx bx-menu fs-4' role="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
                  <ul className="dropdown-menu border-0 shadow">
                    <li><Link to={`update/${data.id}`} className="dropdown-item border-bottom" href="#">Update</Link></li>
                    {
                      data.status == 0 ? (
                        <li><div className="dropdown-item border-bottom">Enable</div></li>
                      ):(
                        <li><div className="dropdown-item border-bottom">Disable</div></li>
                      )
                    }
                    <li><div className="dropdown-item">Delete</div></li>
                  </ul>
                </div></></td>
              </tr>
              ))
              }
              </tbody>
              </table>
            ):(
              <tr className='container d-flex justify-content-center align-items-center text-gray2 fw-semibold'>No Clauses found</tr>
            )
          }

    </section>
    )
  }
    <Pagination total_count={total_count} max_count={10} pages_display={3} pges_range_display={4} Fetch={fetch}/>
  </section>
  </div>
  ) 
}

export default Clauses