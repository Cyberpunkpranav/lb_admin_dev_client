import React, { useState,useEffect } from 'react'
import toast from 'react-hot-toast'
import Notiflix from 'notiflix'
import ReactPaginate from "react-paginate";
import { formatted_date } from '../../utils/formatter';
import { Get_blogs,Get_blogs_by_senior,Get_blog_count,Get_filters} from '../../api/get_apis'
import {Switch_Blogs} from '../../api/post_apis'
import {Get_category,Get_industry,Get_topic} from '../extras/common_functions'
import { Delete_Blog } from '../../api/delete_apis'
import { Link } from 'react-router-dom'
import '../../css/blogs/blogs.css'
import Cookies from 'js-cookie';
import { decryptNumber, decryptString } from '../../security/crypto';
import Pagination from '../extras/pagination';

const Blogs = () => {
  const encrypted_user_id = Cookies.get('user_id')
  const encrypted_role = Cookies.get('role')
  const user_id = decryptNumber(encrypted_user_id)
  const role  =decryptString(encrypted_role)
  const [search,setsearch] = useState('')
  const [filter,setfilter] = useState([])
  const [total_count,settotal_count] = useState('')
  const [data,setdata] = useState({
        senior_user_id:'',
        user_id:role =='master admin'?0:user_id,
        limit:9,
        offset:0
  })
  const max_count = 10
  // const Set_user_id = ()=>{
  //   if(role =='master admin'){
  //     setdata(prevState=>({...prevState,user_id:0}))
  //   }
  // }
  useEffect(()=>{
    // Set_user_id()
    Get_types()
    Get_count()
  },[])
    const [blogs,setblogs]=useState([])
    const[load,setload]=useState(false)

    async function Fetch(Data){
      if (Data == undefined || Data.selected == undefined) {
      try {
        setload(true)
        const Data =  await Get_blogs(data.user_id,data.limit,data.offset,search)
          setblogs(Data.data)
        setload(false)
      } catch (err) {
        toast.error(err.message)
      }
    }else{
      try {
        setload(true)
        const responseData =  await Get_blogs(data.user_id,data.limit,Data.selected*max_count,search)
          setblogs(responseData.data)
        setload(false)
      } catch (err) {
        toast.error(err.message)
      }
    }
    }

    async function Get_types(){
      const Data = await Get_filters()
      setfilter(Data.data.data)
    }

    async function Switch_status(id,status){
      const data = await Switch_Blogs(id,status)
      if(data.data.status == true){
        toast.success(data.data.message)
        Fetch()
      }
      if(data.data.status == false){
        toast.error(data.data.message)
      }
    }
    async function delete_blog(id){
      const data = await Delete_Blog(id)
      if(data.data.status==true){
        toast.success(data.data.message)
        Fetch()
      }else{
        toast.error(data.data.message)
      }
    }
    const confirmmessage = (id) => {
      Notiflix.Confirm.show(
        `Delete Blog`,
        `Are you sure you want to delete this blog `,
        "Yes",
        "No",
        () => {
          delete_blog(id);
        },
        () => {
          return 0;
        },
        {}
      );
    }

    const Get_count = async()=>{
      const data = await Get_blog_count()
      if(data.data.status == true){
        settotal_count(data.data.data)
      }else{
        toast.error(data.data.message)
      }
    }

    useEffect(() => {
      Fetch()
  }, [data])
  return (
    <div className="container admin_blogs mt-4 text-dark position-relative">
      <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><Link to="/Admin/dashboard">Home</Link></li>
        <li class="breadcrumb-item active" aria-current="user">blogs</li>
      </ol>
      </nav>
  <div className="container position-relative">
  <div className="d-flex align-items-center">
          <div className="col-auto p-0 m-0">
          <h4 className='text-start p-0 m-0 fw-normal'>Blogs</h4>
          </div>
          <div className='col-auto p-0 m-0 ms-3 mt-1'>
          <Link to='new_blog' className='p-0 m-0'><i class='bx bxs-plus-circle fs-4 text-dark' ></i></Link>
          </div>
        </div>
        <div className="d-flex justify-content-end position-relative mt-4">
        <div className="col-auto p-0 m-0 position-relative">
        <input className=' w-100 rounded-2 bg-blue13 px-2 py-2 ' placeholder='blog title...' value={search?search:''} onChange={(e)=>setsearch(e.target.value)} />
        <i class='bx cursor-pointer bg-blue5 rounded-3 text-white bx-search position-absolute end-0 top-0 px-2 py-2 mt-1 me-1 ' onClick={()=>Fetch()} ></i>
        </div>
      </div>
  </div>
  <div className="" style={{minHeight:'90vh'}}>
  {
    load ? (
      <div className="container d-flex align-items-center">
  <strong role="status">Loading...</strong>
  <div className="spinner-border ms-auto" aria-hidden="true"></div>
</div>
    ):(
      <>
      <div style={{minHeight:'60vh'}}>
      {
             blogs!==undefined && blogs.length!==0?(
              <table className='table w-100 mt-4 align-middle'>
              <thead>
                <tr>
                  <th className='fw-normal'>Update</th>
                  <th className='fw-normal'>more</th>
                </tr>
              </thead>
              <tbody>
                {
              blogs.map((data)=>(
                <tr>
                <td><Link to={`edit_blog/${data.id}`} className="text-decoration-none link" href="#">{data.title}</Link></td>
                <td className=''><><div className="dropdown d-inline ">
                  <i class='bx bx-menu fs-4' role="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
                  <ul className="dropdown-menu border-0 shadow">
                    <li><Link to={`edit_blog/${data.id}`} className="dropdown-item border-bottom" href="#">Update</Link></li>
                    {
                      data.status == 0 ? (
                        <li><div className="dropdown-item border-bottom">Enable</div></li>
                      ):(
                        <li><div className="dropdown-item border-bottom">Disable</div></li>
                      )
                    }
                    <li onClick={()=>confirmmessage(data.id)}><div className="dropdown-item">Delete</div></li>
                  </ul>
                </div></></td>
              </tr>
              ))
              }
              </tbody>
              </table>
            ):(
              <tr style={{minHeight:'70vh'}} className='container d-flex justify-content-center align-items-center text-gray2 fw-semibold'>          
              <Link to='new_blog' className='p-0 m-0 d-flex justify-content-center text-decoration-none'><i class='bx bxs-plus-circle fs-4 me-2 text-blue1' ></i><h5>Add blog to see here</h5></Link>
              
              </tr>
            ) 
          }
      </div>

        </>
    )
  }
  <Pagination total_count={total_count} max_count={max_count} pages_display={3} pges_range_display={4} Fetch={Fetch}/>
     {/* <div className="container-fluid mt-2 d-flex align-items-center justify-content-center">
    <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"."}
          pageCount={total_count/10}
          marginPagesDisplayed={3}
          pageRangeDisplayed={2}
          onPageChange={Fetch}
          containerClassName={
            "pagination scroll align-self-center align-items-center"
          }
          pageClassName={"page-item text-charcoal"}
          pageLinkClassName={
            "page-link text-decoration-none text-charcoal border-charcoal rounded-1 mx-1"
          }
          previousClassName={"btn button-charcoal-outline me-2"}
          previousLinkClassName={"text-decoration-none text-charcoal"}
          nextClassName={"btn button-charcoal-outline ms-2"}
          nextLinkClassName={"text-decoration-none text-charcoal"}
          breakClassName={"d-flex mx-2 text-charcoal fw-bold fs-4"}
          breakLinkClassName={"text-decoration-none text-charcoal"}
          activeClassName={"active "}
        />

    </div> */}
</div>
 
    </div>
  
  )
}

export default Blogs