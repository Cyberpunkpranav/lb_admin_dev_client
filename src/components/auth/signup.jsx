import React,{useState,useEffect,useRef} from 'react'
import toast,{Toaster} from 'react-hot-toast'
import jwt_decode from 'jwt-decode'
import axios from '../../api/axios'
import Cookies from 'js-cookie'
import {GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import {useNavigate} from 'react-router-dom'
import { encryptNumber, encryptString } from '../../security/crypto';
import '../../css/auth/signup.css'

const Signup = () => {
  const email = useRef(null)
  const email_validation = useRef(null)
  const name = useRef(null)
  const name_validation = useRef(null)
  const password = useRef(null)
  const password_validation = useRef(null)

  const navigate = useNavigate()
  const[load,setload]=useState(false)
  const [creds,setcreds]=useState({
    email_id:'',
    username:'',
    employee_id:'',
    designation:'',
    password:'',
  })

function hasNumber(text) {
  for (let i = 0; i < text.length; i++) {
    if (/\d/.test(text[i])) {
      return true;
    }
  }
  return false;
}
function hasSpecialChar(text) {
  for (let i = 0; i < text.length; i++) {
    if (/[\W_]/.test(text[i])) {
      return false;
    }
  }
  return true;
}


const verify_email_text = ()=>{
  if(email.current!==undefined&&email.current.value.includes('@')){
    email_validation.current.style.display ="none"
    email.current.classList.remove('border-danger')
  }else{
    email_validation.current.style.display ="block"
    email.current.classList.add('border-danger')
    email_validation.current.innerHTML ="enter valid email"
  }
}
const verify_name_text = ()=>{
  if(name.current!==undefined&&hasNumber(name.current.value)||hasSpecialChar(name.current.value)==false){
    name_validation.current.style.display ="block"
    name.current.classList.add('border-danger')
    name_validation.current.innerHTML ="enter valid name"
  }else{
    name_validation.current.style.display ="none"
    name.current.classList.remove('border-danger')

  }
}
const verify_password_text = ()=>{
  if(password.current!==undefined&&hasNumber(password.current.value)==false||hasSpecialChar(password.current.value)){
    password_validation.current.style.display ="block"
    password.current.classList.add('border-danger')
    password_validation.current.innerHTML ="should includes special characters like @ # $ and numbers"
  }else{
    password_validation.current.style.display ="none"
    password.current.classList.remove('border-danger')
  }
}

const set_values=(email_id,username,employee_id,designation,password)=>{
  setcreds({
    email_id:email_id,
    username:username,
    employee_id:employee_id,
    designation:designation,
    password:password,
  })
}
const Signup = async()=>{
  if(creds.email_id&&creds.password&&creds.username){
    try{
      setload(true)
    await axios.post(`/api/admin/auth/signup`,creds).then((response)=>{
        if(response.data.status==true){
          toast.success(response.data.message);
          setTimeout(() => {
            navigate('/Login')
          }, 1000);
        }else{
          toast.error(response.data.message);
        }
        setload(false)
      })
    }catch(e){
      setload(false)
      toast.error(e.message);
    }
  }else{
    toast.error('Please fill all the mandatory fields')
  }
}

  return (
    <div className="container mainapp align-items-center d-flex justify-content-center">
    <div className="row align-items-center">
    <div className='signupsection container py-3 px-4 w-50'>
      <img className='img-fluid d-flex mx-auto logo' src={process.env.PUBLIC_URL +'logo192.png'}/>
        <div className="row p-0 m-0">
          <p className='fw-normal text-center my-2 ps-0 m-0 text-gray2'>Create an account</p>
          <small className='text-gray2 text-end mt-3'><span className='text-redmain'>*</span> represents mandatory fields  </small>
          <div className="col-12 mt-2 ps-0 pb-3 position-relative">
            <label htmlFor=''> Email id *</label>
            <input ref={email} className='ps-0 w-100 border-bottom rounded-0' placeholder='xyz@legalbuddy.in | xyz@gmail.com' type='text'  
            onBlur={()=>{email_validation.current.style.display='none';email.current.classList.remove('border-danger')}}  
            value={creds.email_id?creds.email_id:''} 
            onChange={(e)=>{set_values(e.target.value,creds.username,creds.employee_id,creds.designation,creds.password);verify_email_text()}}/>
            <small ref={email_validation}className='text-redmain p-0 m-0 me-3 position-absolute top-0 end-0'></small>
          </div>
            <div className="col-12 ps-0 pb-3 position-relative">
                <label htmlFor=''>Name *</label>
                <input ref={name} className='w-100 ps-0 border-bottom rounded-0' placeholder='official name' type='text'
                onBlur={()=>{name_validation.current.style.display='none';name.current.classList.remove('border-danger')}} 
                value={creds.username?creds.username:''} 
                onChange={(e)=>{set_values(creds.email_id,e.target.value,creds.employee_id,creds.designation,creds.password);verify_name_text()}}/>
                <small ref={name_validation} className='text-redmain p-0 m-0 me-3 position-absolute top-0 end-0'></small>
            </div>
            <div className="col-12 ps-0 pb-3 position-relative">
                <label htmlFor="">Password *</label>
                <input ref={password} className='w-100 ps-0 border-bottom rounded-0' 
                onBlur={()=>{password_validation.current.style.display='none';password.current.classList.remove('border-danger')}} 
                value={creds.password?creds.password:''} 
                onChange={(e)=>{set_values(creds.email_id,creds.username,creds.employee_id,creds.designation,e.target.value);verify_password_text()}} type='password' placeholder='password@123'/>
                <small ref={password_validation} className='text-redmain p-0 m-0 me-3 position-absolute top-0 end-0'></small>
            </div>
            <div className="col-12 my-3 p-0 m-0">
              <div className="row p-0 m-0 align-items-center justify-content-center">
              <div className="col-4">
                <hr />
              </div>
              <div className="col-auto text-center">
              <small className='p-0 m-0 text-gray2'>Other details</small>
              </div>
              <div className="col-4">
                <hr />
              </div>
              </div>
            </div>
            <div className="col-12 ps-0 pb-3 pt-1 ">
                <label htmlFor="">Employee id</label>
                <div className="row p-0 m-0 align-items-end">
                  <div className="col-2 p-0 m-0">
                    <select className="ps-0 form-control border-0 border-bottom rounded-0" id="">
                      <option value="">code</option>
                      <option value="LBI">LBI</option>
                      <option value="LBI">RGA</option>
                      <option value="LBI">MRC</option>
                    </select>
                  </div>
                  <div className="col-10 p-0 m-0">
                  <input className='form-control w-100 ps-2 border-0 border-bottom rounded-0' 
                value={creds.employee_id?creds.employee_id:''} 
                onChange={(e)=>{set_values(creds.email_id,creds.username,e.target.value,creds.designation,creds.password)}} type='number' placeholder='000'/>
                  </div>
                </div>

            </div>
            <div className="col-12 ps-0 pb-3 pt-1">
                <label htmlFor="">Designation</label>
                <input className='form-control ps-0 border-0 border-bottom rounded-0' value={creds.designation?creds.designation:''} onChange={(e)=>set_values(creds.email_id,creds.username,creds.employee_id,e.target.value,creds.password)} type='text' placeholder='designation'/>
            </div>
            <div className="col-12 ps-0 justify-content-center text-center d-flex mx-auto ">
              {
                load?(
                  <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                  </div>
                ):(
                  <button className='btn btn-light rounded-4 border'onClick={()=>Signup()}>Signup</button>
                )
              }
            </div>
            <div className="col-12 text-center mt-2">
              <small>Already have an account ? <a href='' onClick={()=>{navigate('/Login')}}>login</a> </small>
            </div>

        </div>  
    </div>
    </div>
    </div>
  )
}

export default Signup