import React, { useEffect, useState } from 'react'
import { Get_Admin_users_list } from '../../api/get_apis'
import { Link } from 'react-router-dom'

const Users = () => {
    const [data,setdata] = useState()

    const fetch = async()=>{
        const Data  = await Get_Admin_users_list()
        if(Data.data.status ==true){
            setdata(Data.data.data)
        }
    }

    useEffect(()=>{
        fetch()
    },[])
  return (
    <div className='container mt-4'>
      <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><Link to="/">Home</Link></li>
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
                    <th>more</th>
                </tr>
            </thead>
            <tbody>
                {
                    data!==undefined && data.map((Data)=>(
                        <tr>
                        <td><Link to={`update/${Data.id}`} className='text-decoration-none link'>{Data.username}</Link></td>
                        <td>{Data.designation}</td>
                        <td>{Data.role}</td>
                        <td><>
                        <div className="dropdown d-inline ">
                          <i class='bx bx-menu fs-4' role="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
                          <ul className="dropdown-menu border-0 shadow">
                            <li><Link to={`update/${Data.id}`} className="dropdown-item border-bottom" href="#">Update User</Link></li>
                            <li><Link to={`permissions/${Data.id}`} className="dropdown-item border-bottom" href="#">permissions</Link></li>
                            <li><div className="dropdown-item">Delete User</div></li>
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
}

export default Users