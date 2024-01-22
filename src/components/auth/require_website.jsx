import React, { lazy } from 'react'
import {Navigate, Outlet, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
const Websites = lazy(()=>import('../websites'))
const Require_website = () => {
    const location =useLocation()
    let website = Cookies.get('website')
  return (
    website?<Outlet/>:<Websites/>
  )
}
export default Require_website