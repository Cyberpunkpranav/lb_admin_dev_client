import React from 'react'
import {Navigate, Outlet, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
const Require_auth = () => {
    const location =useLocation()
    let token = Cookies.get('accessToken')
  return (
    token?<Outlet/>:<Navigate to ='login' state={{from:location}} replace/>
  )
}

export default Require_auth