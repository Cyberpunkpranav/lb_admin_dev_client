import { lazy,Suspense, useEffect,useState,useContext,createContext} from "react";
import { Routes, Route } from "react-router-dom";
import { Get_permissions_by_role_id,Get_Colors } from "./api/get_apis";
import { useQuery } from "@tanstack/react-query"; 
import Cookies from "js-cookie";
import './utils/notiflix'
import './css/checkbox.css'
import './css/loader.css'
import { decryptNumber } from "./security/crypto";

const Permissions  = createContext() 
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
const Roles = lazy(()=>import('./components/roles/roles'))
const EditRole = lazy(()=>import('./components/roles/edit_role'))
const Keywords = lazy(()=>import('./components/services/libraries/clauses/keyword_management/keywords'))
//Not Found
const NotFound = lazy(()=>import('./components/not_found'))

function App(){
  const encrypterd_role_id = Cookies.get('role_id')
  const role_id = decryptNumber(encrypterd_role_id)

  const colors = async()=>{
    const data = await Get_Colors()
    return data.data.data
  }
  const permissions = async()=>{
    const data = await Get_permissions_by_role_id(role_id)
    return data.data
  }
  const {data:colors_data} = useQuery({
      queryKey:['colors'],
      queryFn:colors
    }
  )
  const { data:permission_data } = useQuery(
    { 
    queryKey: ["permissions",role_id],
     queryFn:permissions,
    }) 

    // useEffect(()=>{
    //   if(permission_data!==undefined){
    //     setpermissions(permission_data)
    //   }
    // },[permission_data])

    // useEffect(()=>{
    //   Access_token()  
    // },[])

  return(
    <Suspense fallback={<div className="text-charcoal75 fs-6 fw-bold text-center"> {" "} loading..{" "} </div>} >
    <Permissions.Provider value={permission_data}>
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
      <Route path='Admin/users/update/:id/:role_id' element={<UpdateUser/>} />
      <Route path="Admin/users/roles" element={<Roles/>}/>
      <Route path="Admin/users/roles/:id" element={<EditRole/>}/>
      <Route path="Admin/clause/keywords_management" element={<Keywords/>}/>
      </Route>
      </Route> 
      <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
    </Permissions.Provider>
    </Suspense> 
  )
}

export default App;
export {Permissions}