import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Get_permissions_by_role_id, Get_Role_By_Id } from '../../api/get_apis'
import Loader from '../../utils/loader'
import Checkbox from '../elements/checkbox'
import { Link } from 'react-router-dom'
const Edit_role = () => {
    const {id} = useParams()
    const [permissions,setpermissions] = useState([])
    const [loading,setloading] = useState(false)
    const get_permission =async ()=>{
        setloading(true)
        const Data  = await Get_permissions_by_role_id(id)
        setpermissions(Data.data.data)
        setloading(false)
    } 

     useEffect(()=>{
         get_permission()
     },[])

    const get_Role_by_Id =async ()=>{
        const Data  = await  Get_Role_By_Id(id)
        return Data.data.data
    } 
    const {isLoading,isFetching,data:role_data,isError } = useQuery(
        { 
        queryKey: ["role",id],
         queryFn:get_Role_by_Id,
        }) 
        const change_value = (data, field) => {
        const newData = { ...data };
        newData[field] = newData[field] === 1 ? 0 : 1;
        setpermissions(newData);
          };
          console.log(permissions);
      if (isFetching || isLoading || loading){
        return <Loader/>
      }
      if(isError){
        return(
            <div>Something went wrong !</div>
        )
      }

      const Update_permissions = ()=>{

      }
  return (
    <div className='container mt-4'>

    <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><Link to="/Admin/dashboard">Home</Link></li>
      <li class="breadcrumb-item"><Link to="/Admin/users/roles">Roles</Link></li>
      <li class="breadcrumb-item active">{role_data.role}</li>
    </ol>
    </nav>
    <div className="row mt-5 justify-content-between">
        <div className="col-8">
        <h5 className=''>Permissions</h5>
        </div>
        <div className="col-auto">
            <div className="row">
                <div className="col-auto">
                <div className="d-flex align-items-center justify-content-end cursor-pointer " onClick={()=>Update_permissions()}>
                <span className='p-0 m-0 text-blue1'>Save & Update</span>
                <i className='bx bx-save fs-5 text-blue1'></i>
                </div>
                </div>
            </div>
        </div>
    </div>
   <div className="row g-3 mt-4">
   {   
  permissions!==undefined&& Object.entries(permissions).map(([field,value])=>(
   <div className={`col-3 d-${field =='id'|| field =='role_id'||field =='created_on'||field=='updated_on'?'none':''}`}>
     <Checkbox value={value} title={field} disabled={role_data.id} onChange={()=>{change_value(permissions,field)}}/>
     </div>
     ))
   }
   </div>
    </div>
  )
}

export default Edit_role