import React,{useState,useEffect,useRef} from 'react'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode'
import axios from '../../api/axios'
// import {GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import { encryptNumber,encryptString } from '../../security/crypto';
import { useQuery } from '@tanstack/react-query';
import '../../css/auth/login.css'

const Login = () => {
    const navigate = useNavigate()
    const[load,setload]=useState(false)
    const googlecreds = {
        username:'',
        email:'',
        email_verified:'',
        password:''
      }
      const [creds,setcreds]=useState({
        username:'',
        password:'',
      })
    
    
    const set_values=(user,pass)=>{
      setcreds({username:user,password:pass})
    }
    
    const login = ()=>{
        try{
          setload(true)
          axios.post(`/api/admin/auth/login`,creds).then((response)=>{
            if(response.data.status){
              toast.success(response.data.message);
              let user_id = encryptNumber(response.data.data.id)
              let senior_user_id = response.data.data.senior_user_id?encryptNumber(response.data.data.senior_user_id):""
              let role_id = encryptNumber(response.data.data.role_id)
              Cookies.set('accessToken',response.data.access_token)
              Cookies.set('username',response.data.data.username)
              Cookies.set('designation',response.data.data.designation)
              Cookies.set('role_id',role_id)
              Cookies.set('user_id',user_id)
              Cookies.set('senior_user_id',senior_user_id)
              setTimeout(() => {
                navigate('/Admin/dashboard')
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
    }
    const { isLoading, isFetching, isError, data , error } = useQuery(
      { 
      queryKey: ["login_info",data!==undefined ? data.data.id:""],
       queryFn:login,
      })  
  return (
    <div className="container mainapp align-items-center d-flex justify-content-center">
    <div className="row align-items-center p-0 m-0">
    <div className='signupsection bg-white container py-3 px-4 w-50'>
      <img className='img-fluid d-flex mx-auto logo' src={process.env.PUBLIC_URL +'logo192.png'}/>
        <div className="row p-0 m-0">
        {/* <div className="col-12 mx-auto text-center mt-4">
              <div className='d-inline-block'>
              <GoogleOAuthProvider clientId='238984833221-rc5s0bmt65pj6riarg9bd9lusvff3l24.apps.googleusercontent.com'>
              <GoogleLogin 
              onSuccess={responseMessage} 
              onError={errorMessage} 
              useOneTap={true} 
              size='medium'
              text='continue_with'
               />
              </GoogleOAuthProvider>
              </div>      
            </div> */}
          <p className='text-center text-gray2'>Dashboard Login</p>
            <div className="col-12 pb-1">
                <p className='m-0 p-0'>Email id</p>
                <input className='w-100 ms-0 ps-0 border-bottom' placeholder='@email' type='text' value={creds.username?creds.username:''} onChange={(e)=>set_values(e.target.value,creds.password)}/>
            </div>
            <div className="col-12 pb-3 pt-2">
                <p className='p-0 m-0'>Password</p>
                <input className='w-100 ms-0 ps-0 border-bottom' value={creds.password?creds.password:''} onChange={(e)=>set_values(creds.username,e.target.value)} type='password' placeholder='password@123'/>
            </div>
            <div className="col-12 justify-content-center text-center d-flex mx-auto ">
              {
                load?(
                  <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                  </div>
                ):(
                  <button className='btn btn-light rounded-4 border'onClick={()=>login()}>Login</button>
                )
              }
            </div>
            <div className="col-12 text-center mt-2">
              <small>New to legalbuddy? <a href='' onClick={()=>{navigate('/Signup')}}>Signup</a> </small>
            </div>
     
        </div>  
    </div>
    </div>
    </div>
  )
}

export default Login