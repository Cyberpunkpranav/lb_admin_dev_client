import React, { useContext, useEffect, useState } from 'react'
import { Get_Admin_users_list } from '../../api/get_apis'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { decryptNumber, encryptString } from '../../security/crypto'
import { useQuery } from "@tanstack/react-query"
import { Permissions } from '../../App'
import { encryptNumber } from '../../security/crypto'
const Users = () => {
  const permissions = useContext(Permissions)
  const encrypted_role_id = Cookies.get('role_id')
  const encrypted_user_id = Cookies.get('user_id')
  const role_id = decryptNumber(encrypted_role_id)
  const user_id = decryptNumber(encrypted_user_id)

    const fetch = async()=>{
        const Data  = await Get_Admin_users_list(role_id,user_id)
        if(Data.data.status ==true){
          return Data.data.data
        }
    }
    const { isLoading, isFetching, isError, data , error } = useQuery(
      { 
      queryKey: ["users"],
       queryFn:fetch,
      }) 

  return (

      isFetching || isLoading ? (
        <span class="loader"><h4 className='mb-5 pb-3'>LegalBuddy</h4></span>
      ):(
        <div className='container mt-4'>
        <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to="/Admin/dashboard">Home</Link></li>
          <li class="breadcrumb-item active" aria-current="page">Users</li>
        </ol>
        </nav>
          <h4 className='text-start p-0 m-0 fw-normal'>Users</h4>
          <table className='table align-middle mt-4'>
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Designation</th>
                      <th>Role</th>
                      <th className={`d-${permissions.data.edit_user==0&&permissions.data.disable_user==0&&permissions.data.delete_user==0?'none':"block"}`}>more</th>
                  </tr>
              </thead>
              <tbody>
                  {
                      data!==undefined && data.map((Data)=>(
                          <tr>
                          <td>
                            {
                              permissions.data.edit_user==1?(
                                <Link to={`update/${Data.id}/${Data.role_id}`} className='text-decoration-none link'>{Data.username}</Link>

                              ):(<div>{Data.username}</div>)
                            }
                            </td>
                          <td>{Data.designation}</td>
                          <td>{Data.user_role.role}</td>
                          <td><>
                          <div className={`dropdown d-${permissions.data.edit_user==0&&permissions.data.disable_user==0&&permissions.data.delete_user==0?'none':"inline"} `}>
                            <i class='bx bx-menu fs-4' role="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
                            <ul className="dropdown-menu border-0 shadow">
                              <li className={`d-${permissions.data.edit_user==1?'block':'none'}`}><Link to={`update/${Data.id}/${Data.role_id}`} className="dropdown-item border-bottom" href="#">Change Details</Link></li>
                              <li className={`d-${permissions.data.disable_user==1?'block':'none'}`}><div className="dropdown-item border-bottom" href="#">Disable User</div></li>
                              <li className={`d-${permissions.data.delete_user==1?'block':'none'}`}><div className="dropdown-item">Delete User</div></li>
                            </ul>
                          </div>
                          </></td>
                          </tr>
                      ))
                  }
              </tbody>
          </table>
      </div>
      )
    
  
  )
}

export default Users