import React, { useState,useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Update_blogs } from '../../api/update_apis';
import { Get_Blog_by_Id } from '../../api/get_apis';
import { Get_filters } from '../../api/get_apis';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { decryptNumber } from '../../security/crypto';
import toast from 'react-hot-toast';
import '../../css/blogs/edit_blog.css'
import CK_Editor from '../../text_editor/ck_editor';

const Edit_Blog = () => {
  const encrypted_user_id = Cookies.get('user_id')
  const user_id = decryptNumber(encrypted_user_id)
  const encrypted_senior_user_id = Cookies.get('senior_user_id')
  const senior_user_id = decryptNumber(encrypted_senior_user_id)
  const navigate = useNavigate()
  const params = useParams();
  const { id } = params;
  const[ options,setoptions] = useState([])
  const [data,setdata] =useState({
    title:'',
    user_id:user_id,
    senior_user_id:senior_user_id,
    description:'',
    content:'',
    topic_id:'',
    category_id:'',
    industry_id:'',
    image_file:'',
    writer:'',
    handler:''
  })
  async function Fetch(){
    const data = await Get_Blog_by_Id(id)
    setdata({
      title:data.data[0].title,
      user_id:data.data[0].user_id,
      senior_user_id:data.data[0].senior_user_id,
      description:data.data[0].description,
      content:data.data[0].content,
      topic_id:data.data[0].topic_id,
      category_id:data.data[0].category_id,
      industry_id:data.data[0].industry_id,
      image:data.data[0].image,
      image_url:data.data[0].image_url,
      writer:data.data[0].writer,
      handler:data.data[0].handler
    })  
  }

  useEffect(()=>{
    Fetch()
  },[id])

    async function Update (){
      const formData = new FormData()
      formData.append('image',data.image_file)
      formData.append('title',data.title)
      formData.append('description',data.description)
      formData.append('content',data.content)
      formData.append('topic_id',data.topic_id)
      formData.append('category_id',data.category_id)
      formData.append('industry_id',data.industry_id)

      const Data = await Update_blogs(id,formData)
      
      if(Data.data.status = true){ 
        toast.success(Data.data.message)
        setTimeout(()=>{
          navigate('../Admin/blogs')
        },1000)
      }else{
        toast.error('Something went wrong, please try again.')
      }
    }
    // Update()
    async function Options (){
      const data = await Get_filters()
        setoptions(data.data.data)
    }
    useEffect(()=>{
      Options()
    },[])
  return (
    <div className='container edit_blog mt-4 position-relative'>
      <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><Link to="/Admin/dashboard">Home</Link></li>
        <li class="breadcrumb-item"><Link to="/Admin/blogs">blogs</Link></li>
        <li class="breadcrumb-item active" aria-current="user">{data!==undefined&&data.title!==undefined&&data.title!==null?data.title:''}</li>
      </ol>
      </nav>
      <div className="col-12">
      <div className="row justify-content-end">
        <div className="col-auto cursor-pointer d-flex align-items-center" onClick={()=>{Update()}}>
        <span>Update</span><i className='bx bx-save fs-5 text-blue1'></i>
        </div>
        <div className="col-auto cursor-pointer d-flex align-items-center" onClick={()=>Fetch()}>
        <span>Reset to Default</span>
        <i class='bx bx-undo text-blue1 fs-4' ></i>
        </div>  
      </div>
      </div>
          <div className="row mt-4 ">
           <div className="col-12">
            <div className="row g-4 mt-2">
              <div className="row align-items-center">
                <div className="col-12">
                  <div className="row justify-content-end">
                    <div className="col-auto">
                    <small>Written By</small>
                    <p className='text-black'>{data!==undefined&&data.writer!==undefined?data.writer.username:''}</p> 
                    </div>
                    <div className="col-auto">
                    <small>Managed By</small>
                    <p className='text-black'>{data!==undefined&&data.handler!==undefined?data.handler.username:''}</p> 
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                <img className='img-fluid' style={{width:'20rem'}} src={`${data.image_url}`}/>
                <small>{data.image}</small>
                </div>
                <div className="col-12">
                <h6>Choose new image</h6>
                <input onChange={(e)=>{setdata(prevState=>({...prevState,image_file:e.target.files[0]}))}} type='file' className='form-control'/>
                </div>
              </div>
              <div className="col-12">
                <h6>Title</h6>
                <textarea className='form-control' onChange={(e)=>setdata(prevState =>({...prevState,title:e.target.value}))}  maxLength={100} value={data.title?data.title:''}/>
              </div>
              <div className="col-12">
                <h6>Description</h6>  
                <textarea className='form-control' onChange={(e)=>setdata(prevState =>({...prevState,description:e.target.value}))} maxLength={100} value={data.description?data.description:""}/>
              </div>
              <div className="col-12">
                <h6>Content</h6>
                <CK_Editor data={data.content} setdata={setdata}/>
                {/* <textarea className='form-control' onChange={(e)=>setdata(prevState =>({...prevState,content:e.target.value}))} maxLength={200} value={data.content?data.content:""}/> */}
              </div>
            </div>
            </div>
            <div className="col-12 mt-4">
            <div className="row gy-md-0 gy-3">
        <div className="col-md-4 col-10">
        <select class="form-select" value={data.topic_id?data.topic_id:""} onChange={(e)=>setdata(prevState =>({...prevState,topic_id:e.target.value}))} aria-label="Default select example">
  <option selected>Topics</option>
  {
    options && options.topics&& options.topics.map((data)=>(
      <option  value={data.id}>{data.topic_name}</option>

    ))
  }
</select>
        </div>
        <div className="col-md-4 col-10 ">
        <select class="form-select" value={data.category_id?data.category_id:''} onChange={(e)=>setdata(prevState =>({...prevState,category_id:e.target.value}))} aria-label="Default select example">
  <option selected>Categories</option>
  {
    options && options.categories && options.categories.map((data)=>(
      <option value={data.id}>{data.category_name}</option>

    ))
  }
</select>
        </div>
        <div className="col-md-4 col-10">
        <select class="form-select" value={data.industry_id?data.industry_id:''} onChange={(e)=>setdata(prevState =>({...prevState,industry_id:e.target.value}))} aria-label="Default select example">
  <option selected>Industry</option>
  {
    options && options.industry&& options.industry.map((data)=>(
      <option value={data.id}>{data.industry_name}</option>
    ))
  }
</select>
        </div>
          </div>
            </div>
          </div>
           </div>
  )
}

export default Edit_Blog