import React, { useState,useEffect, Fragment } from 'react'
import { Link, useParams } from 'react-router-dom';
import {Get_Admin_user_by_Id,Get_Admin_user_by_RoleId,Get_Roles } from '../../api/get_apis';
import { Update_AdminUser } from '../../api/update_apis';
import Checkbox from '../elements/checkbox';
import Notiflix from 'notiflix';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

const Update_User = () => {
    const {id,role_id} = useParams()
    const [usequery,setusequery] = useState(false)
    const [data,setdata] = useState({})
    const [seniors,setseniors] = useState([])
    const [roles,setroles] = useState([])
    const fetch = async()=>{
    const Data = await Get_Admin_user_by_Id(id,role_id)     
    return Data.data
    }

    const { isLoading, isFetching, isError, data:user_data , error } = useQuery(
      { 
      queryKey: ["user",id],
       queryFn:fetch,
      }) 
      useEffect(()=>{
        if(user_data!==undefined){
          setdata(user_data.data)
          setusequery(true)
        }
      },[user_data])
 

  const Get_seniors = async()=>{
      const Data = await Get_Admin_user_by_RoleId(data.user_role.parent_role_id)
      return Data.data
}

  const { data:seniors_data } = useQuery(
    { 
    queryKey: ["user_seniors",id],
     queryFn:Get_seniors,
     enabled:usequery
    }) 
  useEffect(()=>{
    if(seniors_data!==undefined){
      setseniors(seniors_data.data)
    }
  },[seniors_data])

  const Roles = async()=>{
    const data = await Get_Roles()
    return data.data.data
  }

  const { data:roles_data } = useQuery(
    { 
    queryKey: ["roles"],
     queryFn:Roles,
    }) 
    useEffect(()=>{
      if(roles_data!==undefined){
        setroles(roles_data)
      }
    },[roles_data])

    const confirmmessage = (id) => {
        Notiflix.Confirm.show(
          `Update employee details`,
          `Are you surely want to update employee details `,
          "Yes",
          "No",
          () => {
            Save_Data();
          },
          () => {
            return 0;
          },
          {}
        );
      }
    const Save_Data = async()=>{
        const res = await Update_AdminUser(id,data)
        if(res.data.status==true){
            toast.success(res.data.message)
            fetch()
        }else{
            toast.error(res.data.message)

        }
    }
    function toggle_verification(verified){
        if(verified==1){
            setdata(prevState=>({...prevState,is_verified:1}))
        }
    }
    console.log(roles);
  return (
    <Fragment>
      {
      isFetching || isLoading ?(
        <span class="loader"><h4 className='mb-5 pb-3'>LegalBuddy</h4></span>
      ):(
        <div className="container mt-4">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><Link to="/Admin/dashboard">Home</Link></li>
            <li class="breadcrumb-item"><Link to="/Admin/users">Users</Link></li>
            <li class="breadcrumb-item active" aria-current="user">{data&&data.username?data.username:""}</li>
          </ol>
          </nav>
        <h4 className='mt-3 fw-normal text-dark mb-5'>Employee Details</h4>
        <Checkbox value={data!=undefined&&data.is_verified} title='Employee Verified' onChange={toggle_verification}/>
        <div className="row mt-3 p-0 m-0">
        <div className="col-12 ps-0">
          <div className="form__group field">
          <input type="input" className="form__field w-50" value={data&&data.email_id?data.email_id:""} onChange={(e)=>  setdata(prevState=>({...prevState,email_id:e.target.value}))} placeholder="Type emailID here..."   />
          <label for="name" className="form__label">Email ID</label>
          </div>
        </div>
        <div className="col-6 mt-3 ps-0">
          <div className="form__group field">
          <input type="input" className="form__field w-100" value={data&&data.username?data.username:""} onChange={(e)=>  setdata(prevState=>({...prevState,username:e.target.value}))} placeholder="Type Clause Name here..."   />
          <label for="name" className="form__label">Name</label>
          </div>
        </div>
        <div className="col-6 ps-0">
          <div className="form__group field">
          <input type="input" className="form__field w-100" value={data&&data.employee_id?data.employee_id:""} onChange={(e)=>  setdata(prevState=>({...prevState,employee_id:e.target.value}))} placeholder="Type employee id here..."    />
          <label for="name" className="form__label">Employee ID</label>
          </div>
        </div>
        <div className="col-6 ps-0 mt-3">
          <div className="form__group field">
          <input type="input" className="form__field w-100" value={data&&data.designation?data.designation:""} onChange={(e)=>  setdata(prevState=>({...prevState,designation:e.target.value}))} placeholder="Type designation here..."    />
          <label for="name" className="form__label">Designation</label>
          </div>
        </div>
        {
          data!=undefined&&data.role_id == 1 ? (
              <></>
          ):(
            <div className="col-6 ps-0 mt-3">
            <label for="name" className="form__label p-0 m-0 position-relative">Assigned Senior</label>
                <select className='form-control ps-0 w-50 border-0 border-bottom rounded-0' value={data!=undefined&&data.senior_user_id?data.senior_user_id:''} onChange={(e)=>  setdata(prevState=>({...prevState,senior_user_id:e.target.value}))}>
                        <option className='text-gray2' value="0">Assign senior</option>
                        {
                            seniors!==undefined && seniors.map((Data)=>(
                              <option selected={data.senior_user_id==Data.id} value={Data.id}>{Data.username} | {Data.designation}</option>
                            ))
                        }
                </select>
            </div>
          )
        }
      
        <div className={`col-12 ps-0 mt-3 `}>
        <label for="name" className="form__label p-0 m-0 position-relative">Current Role</label>
            <select className='form-control ps-0 w-50 border-0 border-bottom rounded-0' value={data!=undefined&&data.role_id!==undefined?data.role_id:''} onChange={(e)=>  setdata(prevState=>({...prevState,role_id:e.target.value}))}>
              <option className='text-gray2' value="0">roles</option>
                        {
                            roles!==undefined && roles.map((Data)=>(
                              <option selected={data.role_id==Data.id} value={Data.id}>{Data.role}</option>
                            ))
                        }
    
            </select>
        </div>
        <div className="col-12 ps-0 mt-3">
          <div className="form__group field ">
          <input type="password" disabled className="form__field w-100 bg-light" value={data&&data.password?data.password:""} placeholder="Type password here..."    />
          <label for="name" className="form__label">Current Password</label>
          </div>
        </div>
        <div className="col-12 ps-0 mt-3">
          <div className="form__group field">
          <input type="password" className="form__field w-100" value={data&&data.resetpassword?data.resetpassword:""} onChange={(e)=>  setdata(prevState=>({...prevState,resetpassword:e.target.value}))} placeholder="Type new password here..."    />
          <label for="name" className="form__label">Reset Password</label>
          </div>
        </div>
        </div>
        <div className="col-1 mt-3">
        <div className="mt-4 d-flex align-items-center cursor-pointer" onClick={()=>confirmmessage()}>
          <small className='text-blue1'>Save</small><i class='bx bx-chevrons-right text-blue1' ></i>
          </div>
        </div>
    
        </div>
    
      )

    }
    </Fragment>

  )
}

export default Update_User