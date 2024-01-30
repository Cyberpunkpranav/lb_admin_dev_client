import Cookies from "js-cookie"
import {Get_website_by_id } from "../api/get_apis"
import { Navigate, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import '../css/loader.css'
import { useEffect, useState } from "react"

const Websites = () => {
    const navigate = useNavigate()
    const id = Cookies.get('website_ids')
    const Get_user_websites = ()=>{
     const data = Get_website_by_id(id)
     return data
    }

    const redirect = (website)=>{
        Cookies.set('website_id',website)
        navigate('/Admin/dashboard')
        window.location.reload()
    }
    const { isLoading, isFetching,isFetched, isError, data , error } = useQuery(
        { 
        queryKey: ["user_websites",id],
         queryFn: Get_user_websites ,
        })

  return (
    <div className="container mt-4">
        <h4 className="fw-normal text-center"><img className="w-25" src={process.env.PUBLIC_URL+'/logo192.png'}/></h4>
        <h5 className="mt-5 text-center">Choose Website to access the Dashboard</h5>
            
            {
                isFetching || isLoading ? (
                    <span class="loader"><h4 className='mb-5 pb-3'>LegalBuddy</h4></span>
                ):(
                    <div className="row g-4 mt-5">
                    {      
                    data!==undefined&&data.data.data!==undefined&&data.data.data.length!=0&&data.data.data.map((data)=>(
                        <div className="col-4 d-flex">
                            <div className="card border border-blue1 cursor-pointer rounded-2 bg-blue13 text-blue1 p-2">
                            <img/>
                            <h5 onClick={()=>{redirect(data.id)}} className=""> {data.website_name} </h5>
                            </div>
               
                        </div>
                        
                    )) 
                    }
                    </div>  
                )

            }
     
    </div>
  )
}

export default Websites