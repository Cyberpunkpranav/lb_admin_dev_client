import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import CK_Editor from '../../text_editor/ck_editor';
import { Get_filters } from '../../api/get_apis';
import { useNavigate } from 'react-router-dom';
import { Save_Blog } from '../../api/post_apis';
import { decryptNumber } from '../../security/crypto';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';


const New_blog = () => {
  const encrypted_user_id = Cookies.get('user_id')
  const user_id = decryptNumber(encrypted_user_id)
  const encrypted_senior_user_id = Cookies.get('senior_user_id')
  const senior_user_id = decryptNumber(encrypted_senior_user_id)
  const navigate = useNavigate()
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
    status:0,
    image_file: ''
  })
    async function Save_blog (){
      const formData = new FormData()
      formData.append('image',data.image_file)
      formData.append('user_id',data.user_id)
      formData.append('senior_user_id',data.senior_user_id)
      formData.append('title',data.title)
      formData.append('description',data.description)
      formData.append('content',data.content)
      formData.append('topic_id',data.topic_id)
      formData.append('category_id',data.category_id)
      formData.append('industry_id',data.industry_id)
      formData.append('status',data.status)

      const Data = await Save_Blog(formData)
      if(Data.data.status == true){
        toast.success(Data.data.message)
        setdata({
            title:'',
            description:'',
            content:'',
            topic_id:'',
            category_id:'',
            industry_id:'',
            status:0
          })
        setTimeout(()=>{
          navigate('../Admin/blogs')
        },1000)
      }else{
        toast.error(Data.data.message)
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

    const handleCheckboxChange = () => {
        // Toggle the status when the checkbox is clicked
        data.status == 0 
        ?setdata(prevStatus => ({...prevStatus , status:1})) 
        :setdata(prevStatus => ({...prevStatus , status:0}));
    
      };
  return (
    <div className='container-fluid mt-4 position-relative'>
      <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><Link to="/Admin/dashboard">Home</Link></li>
        <li class="breadcrumb-item"><Link to="/Admin/blogs">blogs</Link></li>
        <li class="breadcrumb-item active" aria-current="user">new blog</li>
      </ol>
      </nav>
      <div className="container mt-4 py-4 d-flex justify-content-center align-items-center">
           <div className="row">
           <div className="col-12">
            <div className="row g-4">
                <div className="col-8">
                <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={data.status} onChange={handleCheckboxChange} />
                <label className="form-check-label">Show this blog to users?</label>
                </div>
                </div>  
                <div className="col-4">
                <div className="row justify-content-end">
                <div className="col-auto cursor-pointer d-flex align-items-center" onClick={()=>{Save_blog()}}>
                <span>Update</span><i className='bx bx-save fs-5 text-blue1'></i>
                </div>
                <div className="col-auto cursor-pointer d-flex align-items-center" onClick={()=>setdata({ title:'', description:'', content:'', topic_id:'', category_id:'', industry_id:'', status:0 })}>
                <span>Cancel</span><i class='bx bx-x fs-4 text-redmain' ></i>
                </div>
                </div>
                </div>
                <div className="col-12">
                <h6>Choose blog image</h6>
                <input onChange={(e)=>{setdata(prevState=>({...prevState,image_file:e.target.files[0]}))}} type='file' className='form-control'/>
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
                <CK_Editor data={''} setdata={setdata}/>
                {/* <textarea className='form-control' onChange={(e)=>setdata(prevState =>({...prevState,content:e.target.value}))} maxLength={200} value={data.content?data.content:""}/> */}
              </div>
            </div>
            </div>
            <div className="col-12 mt-4">
            <div className="row">
        <div className="col-4">
        <select className="form-select" value={data.topic_id?data.topic_id:""} onChange={(e)=>setdata(prevState =>({...prevState,topic_id:e.target.value}))} aria-label="Default select example">
  <option selected>Topics</option>
  {
    options && options.topics && options.topics.map((data,i)=>(
      <option key={i} value={data.id}>{data.topic_name}</option>

    ))
  }
</select>
        </div>
        <div className="col-4">
        <select className="form-select" value={data.category_id?data.category_id:''} onChange={(e)=>setdata(prevState =>({...prevState,category_id:e.target.value}))} aria-label="Default select example">
  <option selected>Categories</option>
  {
    options && options.categories&& options.categories.map((data,i)=>(
      <option key={i} value={data.id}>{data.category_name}</option>

    ))
  }
</select>
        </div>
        <div className="col-4">
        <select className="form-select" value={data.industry_id?data.industry_id:''} onChange={(e)=>setdata(prevState =>({...prevState,industry_id:e.target.value}))} aria-label="Default select example">
  <option selected>Industry</option>
  {
    options && options.industry&& options.industry.map((data,i)=>(
      <option key={i} value={data.id}>{data.industry_name}</option>
    ))
  }
</select>
        </div>
          </div>
            </div>
          </div>

    </div>
    </div>
  )
}

export default New_blog

