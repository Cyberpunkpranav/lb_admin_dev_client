import React, { lazy } from 'react'
import {Navigate, Outlet, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
const Websites = lazy(()=>import('../websites'))
const Require_website = () => {
    let website_id = Cookies.get('website_id')
  return (
    website_id?<Outlet/>:<Websites/>
  )
}
export default Require_website