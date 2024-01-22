import Cookies from 'js-cookie'
import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import '../css/dashboard.css'
const Dashboard = () => {
    const activitylog_ref = useRef(null)
    const designation = Cookies.get('designation')

  return (
    <div className="container mt-4" style={{minHeight:'100vh'}}>
            <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><Link to="/Admin/dashboard">Home</Link></li>
      </ol>
      </nav>
        <div className="d-flex justify-content-between">
        <div className="col-11">
        <div className="row p-0 m-0">
        <div className="col-4">
        <div className="card border-0 shadow-sm bg-blue13 p-2">
        <h5 className='text-blue1 fw-normal'>Users</h5>
        <h4>10</h4>
        </div>
 
        </div>
        <div className="col-4">
        <div className="card border-0 shadow-sm bg-blue13 p-2">
         <h5 className='text-blue1 fw-normal'>Clauses</h5>   
         <h4>10</h4>
         </div>
        </div>
        <div className="col-4">
        <div className="card border-0 shadow-sm bg-blue13 p-2">
        <h5 className='text-blue1 fw-normal'>Blogs</h5>
        <h4>13</h4>
        </div>
        </div>
        </div>
        </div>
        <div className="col-1 d-flex align-items-center justify-content-end ">
            <div className="row gy-2">
            <div className="col-12">
            <div className="dialogue_parent">
            <i class='bx bx-line-chart cursor-pointer fs-1 rounded-circle p-2 bg-blue13 shadow-sm text-blue1 activitylog_opener' onClick={()=>activitylog_ref.current.style.width='40%'}></i>
            <div className='dialogue text-end'>Activity logs</div>
            </div>
            </div>
            <div className="col-12 ">
            <div className="dialogue_parent">
            <i class='bx bx-line-chart cursor-pointer fs-1 rounded-circle p-2 shadow-sm bg-transparentgreen1  border-primary text-blue1 activitylog_opener' onClick={()=>activitylog_ref.current.style.width='40%'}></i>
            <div className='dialogue text-end'>Activity</div>
            </div>
            </div>
            </div>
        </div>
        </div>
    <div ref={activitylog_ref} className="position-absolute end-0 activitylog_slider overflow-hidden top-0 bg-white border-1 border-start" style={{minHeight:"100vh",width:'0'}}>
    <div className="d-flex mb-3 mt-3 ms-2 cursor-pointer" onClick={()=>activitylog_ref.current.style.width='0'}>
    <i class='bx bx-line-chart fs-4 text-blue1'></i><span>Activity logs</span>
    </div>
    <div className='activitylog cursor-pointer justify-content-around align-items-center py-2 px-4 d-flex'>
    <div className="col-10">
    <p className='p-0 m-0'>Signup by <span className='text-greenlight'>Pranav Sharma</span></p>
    <p className='d-inline'>at</p> <small className='d-inline text-blue1'>20 jan 2023</small> <p className='d-inline'>on</p> <small className='d-inline'>5:00pm</small>
    </div>
    <div className="col-2">
    <i class='bx bx-right-arrow-alt text-blue1 fs-4 activitylog_icon'></i>
    </div>
  
    </div>
    </div>

    </div>
  )
}

export default Dashboard