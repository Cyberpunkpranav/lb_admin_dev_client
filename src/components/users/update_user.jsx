import React, { useState,useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import {Get_Admin_users_list, Get_Admin_user_by_Id } from '../../api/get_apis';
import { Update_AdminUser } from '../../api/update_apis';
import Checkbox from '../elements/checkbox';
import Notiflix from 'notiflix';
import toast from 'react-hot-toast';

const Update_User = () => {
    const {id} = useParams()
    const [users,setusers] = useState([])
    const [data,setdata] = useState({
        id:'',
        username:'',
        email_id:'',
        employee_id:'',
        designation:'',
        is_verified:'',
        password:'',
        resetpassword:'',
        role:'',
        senior_user_id:''
    })
    const fetch = async()=>{
    const Data = await Get_Admin_user_by_Id(id)     
    if(Data.data.status==true){
        setdata({
                id:Data.data.data.id,
                username:Data.data.data.username,
                email_id:Data.data.data.email_id,
                employee_id:Data.data.data.employee_id,
                designation:Data.data.data.designation,
                is_verified:Data.data.data.is_verified,
                password:Data.data.data.password,
                resetpassword:'',
                role:Data.data.data.role,
                senior_user_id:Data.data.data.senior_user_id
        })
    }
    }
    useEffect(() => {
      fetch()
    }, [])
    const get_users = async()=>{
      const Data  = await Get_Admin_users_list(3)
      if(Data.data.status ==true){
        setusers(Data.data.data)
      }
  }

  useEffect(()=>{
    get_users()
  },[])

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
        // if(verified == 0){
        //     setdata(prevState=>({...prevState,is_verified:0}))

        // }
        
    }
  return (
    <div className="container mt-4">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><Link to="/">Home</Link></li>
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
      data!=undefined&&data.role == 'master admin' ? (
          <></>
      ):(
        <div className="col-6 ps-0 mt-3">
        <label for="name" className="form__label p-0 m-0 position-relative">Assigned Senior</label>
            <select className='form-control ps-0 w-50 border-0 border-bottom rounded-0' value={data!=undefined&&data.senior_user_id?data.senior_user_id:''} onChange={(e)=>  setdata(prevState=>({...prevState,senior_user_id:e.target.value}))}>
                    <option className='text-gray2' value="0">Assign senior</option>
                    {
                        users!==undefined && users.map((Data)=>(
                          <option value={Data.id}>{Data.username} | {Data.designation}</option>
                        ))
                    }
            </select>
        </div>
      )
    }
  
    <div className="col-12 ps-0 mt-3">
    <label for="name" className="form__label p-0 m-0 position-relative">Current Role</label>
        <select className='form-control ps-0 w-50 border-0 border-bottom rounded-0' value={data!=undefined&&data.role?data.role:''} onChange={(e)=>  setdata(prevState=>({...prevState,role:e.target.value}))}>
            <option value='choose role'>choose role</option>
            <option value='master admin'>master admin</option>
            <option value="super admin">super admin</option>
            <option value="admin">admin</option>
            <option value="head engineer">head engineer</option>
            <option value="senior engineer">senior engineer</option>
            <option value="junior engineer">junior engineer</option>
            <option value="creator">senior creator</option>
            <option value="creator">junior creator</option>
            <option value="intern">intern</option>

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

export default Update_User