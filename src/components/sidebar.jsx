import React, { useState } from 'react'
import { Link, useNavigate,useLocation } from 'react-router-dom'
import '../css/sidebar.css'
import '../css/bootstrap.css'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import Notiflix from 'notiflix'
const Sidebar = () => {
  const location = useLocation()
  const path = location.pathname
  const navigate = useNavigate()
  const username = Cookies.get('username')
  const designation = Cookies.get('designation')
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  }

  const Logout = ()=>{
    Cookies.remove('accessToken')
    Cookies.remove('user_id')
    Cookies.remove('senior_user_id')
    Cookies.remove('username')
    Cookies.remove('designation')
    Cookies.remove('role_id')
    Cookies.remove('website')
    Cookies.remove("websites")
    window.location.reload()

    toast.success('Logged out')
    setTimeout(() => {
      navigate('login')
    }, 1000)
  }
  const confirm_logout=()=>{
    Notiflix.Confirm.show(
      `logout`,
      `Are you sure you want to logout `,
      "Yes",
      "No",
      () => {
        Logout();
      },
      () => {
        return 0;
      },
      {}
    );
  }
  console.log(path);
  return (

      <div className={`sidebar ${sidebarOpen ? 'close' : ''}`} style={{minHeight:'100vh'}}>
        <div className="logo-details cursor-pointer" onClick={()=>handleSidebarToggle()}>
         <i className='bx bxs-chevrons-right text-blue1'></i>
         <span className="logo_name">LegalBuddy</span>
          </div>
        <ul className="nav-links">
          <li className={`bg-${path=='/Admin/dashboard'?'white':"transparent"}`}>
            <Link to="/Admin/dashboard">
              <i className='bx bx-grid-alt text-blue1' ></i>
              <span className="link_name">Dashboard</span>
            </Link>
            <ul className="sub-menu blank text-blue1">
              <li><a className="link_name" href="#">Dashboard</a></li>
            </ul>
          </li>
          <li className={`bg-${path=='/Admin/blogs'?'white':"transparent"}`}>
          <Link to="/Admin/blogs">
          <i class='bx bx-book-reader'></i>
          <span className="link_name">Blogs</span>
          </Link>
          <ul className="sub-menu blank">
              <li><a className="link_name" href="#">Blogs</a></li>
            </ul>
          </li>
          <li className={`bg-${path=='/Admin/services/libraries/clauses'?'white':"transparent"}`}>
          <Link to='Admin/services/libraries/clauses'>
              <i class='bx bx-book-alt'></i>
              <span className="link_name">Clauses</span>
            </Link>
            <Link>
            </Link>
            <ul className="sub-menu blank">
              <li><a className="link_name" href="#">Clauses</a></li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className='bx bx-pie-chart-alt-2' ></i>
              <span className="link_name">Analytics</span>
            </a>
            <ul className="sub-menu blank">
              <li><a className="link_name" href="#">Analytics</a></li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className='bx bx-line-chart' ></i>
              <span className="link_name">Chart</span>
            </a>
            <ul className="sub-menu blank">
              <li><a className="link_name" href="#">Chart</a></li>
            </ul>
          </li>
          <li>
            <Link to="/Admin/users">
            <i class='bx bx-user' ></i>
            <span className="link_name">Users</span>
            </Link>
            <ul className="sub-menu blank">
              <li><a className="link_name" href="#">Users</a></li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className='bx bx-history'></i>
              <span className="link_name">History</span>
            </a>
            <ul className="sub-menu blank">
              <li><a className="link_name" href="#">History</a></li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className='bx bx-cog' ></i>
              <span className="link_name">Setting</span>
            </a>
            <ul className="sub-menu blank">
              <li><a className="link_name" href="#">Setting</a></li>
            </ul>
          </li>
          <li>
        <div className="d-flex profile-details">
          <div className="">
          <img src={process.env.PUBLIC_URL+'/images/menu.png'}/>
          </div>
          <div className="name-job">
            <p className="profile_name mb-0">{username?username:''}</p>
            <small className="job">{designation?designation:''}</small>
          </div>
          <i className='bx bx-log-out text-danger' onClick={()=>confirm_logout()}></i>
        </div>
          </li>
    </ul>
      </div>
       
  )
}

export default Sidebar