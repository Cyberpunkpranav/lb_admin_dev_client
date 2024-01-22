import Cookies from "js-cookie"
import { Get_websites } from "../api/get_apis"
import { Navigate, useNavigate } from "react-router-dom"
import { QueryClient } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import '../css/loader.css'
const Websites = () => {
    const navigate = useNavigate()

    const fetch = async()=>{
        const data = await Get_websites()
        return data.data
    }
    const { isLoading:isLoading1, isFetching,isFetched, isError, data , error } = useQuery(
        { 
        queryKey: ["websites"],
         queryFn: fetch ,
        })
    const Get_users = ()=>{
     const data =  QueryClient.getQuerydata('login_info')
    }
    const redirect = (website)=>{
        Cookies.set('website',website)
        navigate('/Admin/dashboard')
    }
    
  return (
    <div className="container mt-4">
        <h4 className="fw-normal text-center"><img className="w-25" src={process.env.PUBLIC_URL+'/logo192.png'}/></h4>
        <h5 className="mt-5 text-center">Choose Website to access the Dashboard</h5>
            
            {
                isFetching || isLoading1 ? (
                    <span class="loader"><h4 className='mb-5 pb-3'>LegalBuddy</h4></span>
                ):(
                    <div className="row g-4 mt-5">
                    {      
                    data!==undefined&& data.length!=0&&data.data.map((data)=>(
                        <div className="col-4 d-flex">
                            <div className="card border-blue1 cursor-pointer rounded-2 bg-blue13 text-blue1 p-2">
                            <img/>
                            <h5 onClick={()=>{redirect(data.website_name)}} className=""> {data.website_name} </h5>
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