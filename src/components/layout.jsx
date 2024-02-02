import React from 'react'
import { Fragment, lazy } from "react";
import { Outlet } from "react-router-dom";
const Sidebar = lazy(()=>import('./sidebar.jsx'))

const Layout = () => {
  return (
    <Fragment>
      <div className="d-flex">
        <div className="">
        <Sidebar/>
        </div>
        <div className="" style={{width:'100%'}}>
        <Outlet/>
        </div>
      </div>
    </Fragment>
  )
}

export default Layout