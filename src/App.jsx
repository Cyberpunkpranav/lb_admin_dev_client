import { lazy,Suspense, useEffect,useState} from "react";
import { Routes, Route } from "react-router-dom";
import './utils/notiflix'
import './css/checkbox.css'

//apis
// import { Non_user_Access } from "./api/get_apis";
const Layout = lazy(()=>import('./components/layout'))
// authentication
const Signup = lazy(()=>import('./components/auth/signup'))
const RequireAuth = lazy(()=>import('./components/auth/require_auth'))
const RequireWebsite= lazy(()=>import('./components/auth/require_website'))
const Login = lazy(()=>import('./components/auth/login'))
//dashboard 
const Dashboard = lazy(()=>import('./components/dashboard'))
//pages
const AdminBlogs = lazy(()=>import('./components/blogs/blogs'))
const EditBlog = lazy(()=>import('./components/blogs/edit_blog'))
const NewBlog = lazy(()=>import('./components/blogs/new_blog'))
const AdminClauses = lazy(()=>import('./components/services/libraries/clauses/clauses'))
const NewClause = lazy(()=>import('./components/services/libraries/clauses/new_clause'))
const UpdateClause = lazy(()=>import('./components/services/libraries/clauses/update_clause'))
const AdminActs = lazy(()=>import('./components/services/acts-and-rules/acts/acts'))
const NewAct = lazy(()=>import('./components/services/acts-and-rules/acts/new_act'))
const EditAct = lazy(()=>import('./components/services/acts-and-rules/acts/edit_act'))
const AdminChapters = lazy(()=>import('./components/services/acts-and-rules/acts/chapters/chapters'))
const AdminNewChapter = lazy(()=>import('./components/services/acts-and-rules/acts/chapters/new_chapter'))
const AdminNewSubSection = lazy(()=>import('./components/services/acts-and-rules/acts/subsections/new_subsection'))
const AdminSubsection = lazy(()=>import('./components/services/acts-and-rules/acts/subsections/subsections'))
const AdminUpdateSubsection = lazy(()=>import('./components/services/acts-and-rules/acts/subsections/updatesubsection'))
const AdminNewClause = lazy(()=>import('./components/services/acts-and-rules/acts/clauses/new_clause'))
const Users = lazy(()=>import('./components/users/users'))
const UpdateUser = lazy(()=>import('./components/users/update_user'))
const PermissionsUser = lazy(()=>import('./components/users/permissions'))
//Not Found
const NotFound = lazy(()=>import('./components/not_found'))

function App(){
  // const Access_token = async()=>{
  //   const data = await Non_user_Access()
  //   Cookies.set('accessToken',data.data.access_token)
  // }
  // useEffect(()=>{
  //   Access_token()  
  // },[])
  return(
    <Suspense fallback={<div className="text-charcoal75 fs-6 fw-bold text-center"> {" "} loading..{" "} </div>} >
    <Routes>
      <Route path='login' element={<Login/>}/>
      <Route path='signup' element={<Signup/>}/>
      <Route element={<RequireAuth/>}>
      <Route element={<RequireWebsite/>}>
      <Route element={<Layout/>}>
      <Route path='/Admin/dashboard' element={<Dashboard/>}/>
      <Route path='Admin/services/libraries/clauses' element={<AdminClauses/>}/>
      <Route path='Admin/services/libraries/clauses/update/:id' element={<UpdateClause/>} />
      <Route path='Admin/services/libraries/clauses/new' element={<NewClause/>} />
      <Route path='Admin/blogs' element={<AdminBlogs/>}/>
      <Route path='Admin/blogs/new_blog' element = {<NewBlog/>} />
      <Route path='Admin/blogs/edit_blog/:id' element = {<EditBlog/>}/>
      <Route path='Admin/acts' element={<AdminActs/>}/>
      <Route path='Admin/services/acts-and-rules/acts/new' element={<NewAct/>}/>
      <Route path='Admin/services/acts-and-rules/acts/update/:id' element={<EditAct/>}/>
      <Route path='Admin/services/acts-and-rules/acts/:act' element={<AdminChapters/>}/>
      <Route path='Admin/services/acts-and-rules/acts/:act/:act_id/chapter/new' element={<AdminNewChapter/>}/>
      <Route path='Admin/services/acts-and-rules/acts/:act/:chapter/:section' element={<AdminSubsection/>}/>
      <Route path='Admin/services/acts-and-rules/acts/:act/:chapter/:section/subsection/new' element={<AdminNewSubSection/>}/>
      <Route path='Admin/services/acts-and-rules/acts/:act/:chapter/:section/subsection/update' element={<AdminUpdateSubsection/>}/>
      <Route path='Admin/services/acts-and-rules/acts/:act/:chapter/:section/subsection/clause/new' element={<AdminNewClause/>}/>
      <Route path='Admin/users' element={<Users/>}/>
      <Route path='Admin/users/update/:id' element={<UpdateUser/>} />
      <Route path='Admin/users/permissions/:id' element={<PermissionsUser/>} />
      </Route>
      </Route> 
      <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
    </Suspense> 
  )
}

export default App;
