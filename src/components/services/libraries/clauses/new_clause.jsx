import React ,{useState,useEffect, Fragment} from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import { Add_New_clause } from '../../../../api/post_apis'
import toast from 'react-hot-toast'

const New_clause = () => {
const navigate = useNavigate()
  const [data,setdata] = useState({
    search:'',
    limit:12,
    offset:0
  })
  const [reqdata1,setreqdata1]=  useState({
    clause_name:'',
    definition:'',
    rationale:''
  })
const postdata = async()=>{
  const data =  await Add_New_clause(reqdata1)
  if(data.data.status==true){
    toast.success(data.data.message)
    setreqdata1({
      clause_name:'',
      definition:''
    })
    setTimeout(()=>{
      navigate(`/Admin/services/libraries/clauses/update/${data.data.data.id}`)
    },1000)
  
  }else{
    toast.error(data.data.message)
  }
}

  return (
    <div className={`container mt-4 position-relative`}>
          <nav aria-label="breadcrumb position-sticky top-0 bg-white">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><Link to="/Admin/dashboard">Home</Link></li>
        <li class="breadcrumb-item"><Link to="/Admin/services/libraries/clauses">Clauses</Link></li>
        <li class="breadcrumb-item active" aria-current="page">Create clause</li>
      </ol>
      </nav>
      <div className="row g-3 mt-4">
      <div className="col-12">
      <div class="form__group field w-100">
      <input type="input" class="form__field w-100" value={reqdata1.clause_name?reqdata1.clause_name:""} onChange={(e)=>setreqdata1(prevState=>({...prevState,clause_name:e.target.value}))} placeholder="Type Clause Name here..." required />
      <label for="name" class="form__label"> Clause Name</label>
      </div>
        {/* <input className='bg-blue13 px-2 w-100 py-2 rounded-2' placeholder='Type name of the clause here...' value={reqdata1.clause_name?reqdata1.clause_name:""} onChange={(e)=>setreqdata1(prevState=>({...prevState,clause_name:e.target.value}))}/> */}
      </div>
      <div className="col-12">
      <div class="form__group field w-100">
      <input type="input" class="form__field w-100" value={reqdata1.definition?reqdata1.definition:""} onChange={(e)=>setreqdata1(prevState=>({...prevState,definition:e.target.value}))}placeholder="Type Clause Definition here..." required />
      <label for="name" class="form__label"> Clause Definition</label>
      </div>
      </div>
      <div className="col-12">
      <div class="form__group field w-100">
      <input type="input" class="form__field w-100" value={reqdata1.rationale?reqdata1.rationale:""}  onChange={(e)=>setreqdata1(prevState=>({...prevState,rationale:e.target.value}))} placeholder="Type Clause Definition here..." required />
      <label for="name" class="form__label">Purpose or Rationale of Clause</label>
      </div>
      </div>
      <div className="mt-4 d-flex align-items-center cursor-pointer" onClick={()=>postdata()}>
      <small className='text-blue1'>Create</small><i class='bx bx-chevrons-right text-blue1' ></i>
      </div>
      </div>

    </div>

  )
}

export default New_clause


