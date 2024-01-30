import React from 'react'
import { Get_Role_By_Id } from '../../api/get_apis'
import { Get_Roles } from '../../api/get_apis'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
const Roles = () => {
    const fetch_roles = async()=>{
        const data = await Get_Roles()
        if(data.data.data!==undefined){
            for(let i=0;i<data.data.data.length;i++){
                const role =  await Get_Role_By_Id(data.data.data[i].parent_role_id)
                console.log(role);
                data.data.data[i].parent_role = role.data.data.role
            }
        }
        return data.data
    }
    const { isLoading, isFetching, isError, data:roles , error } = useQuery(
        { 
        queryKey: ["roles"],
         queryFn:fetch_roles,
        }) 
  return (
    <div className="container mt-4">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><Link to="/Admin/dashboard">Home</Link></li>
        <li class="breadcrumb-item active">Roles</li>
      </ol>
    </nav>
    {
    isFetching || isLoading ? 
    (      
    <span class="loader"><h4 className='mb-5 pb-3'>LegalBuddy</h4></span>
    )
    :(
              <table className='table w-100 mt-4 align-middle'>
              <thead>
                <tr>
                  <th className='fw-normal'>Roles</th>
                  <th className='fw-normal'>Senior</th>
                </tr>
              </thead>
              <tbody>
                {
              roles.data.map((data)=>(
                <tr>
                <td><Link to={`/Admin/users/roles/${data.id}`} className="text-decoration-none link" href="#">{data.role}</Link></td>
                <td>{data.parent_role}</td>
              </tr>
              ))
              }
              </tbody>
              </table>

    )
    }
    </div> 
  )
}

export default Roles