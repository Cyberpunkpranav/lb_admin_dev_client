import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Add_New_Keyword } from '../../../../../api/post_apis'
import { Update_Clause_keyword } from '../../../../../api/update_apis'
import { Get_clause_keyword_by_Id,Get_clause_keywords } from '../../../../../api/get_apis'
import Loader from '../../../../../utils/loader'
import { useQuery,useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import Notiflix from 'notiflix'

const Keywords = () => {
  const queryClient = useQueryClient()
  const colors = queryClient.getQueryData(['colors'])
  const [Add_new_keyword,setAdd_new_keyword] = useState({
    keyword:"",
    inactive_keywords:""
  })
  const [Update_keyword,setUpdate_keyword] = useState({
    keyword:"",
    inactive_keywords:'',
    hexcode:''
  })
// const keyword_data=''
  const [id,setid] = useState()

    const get_keywords = async()=>{
      const data = await Get_clause_keywords()
      return data.data.data      
    }

    const { isLoading, isFetching, isError, data:keyword_data , error } = useQuery({ 
    queryKey: ["keywords_list"],
     queryFn:get_keywords,
    })

    const Save_keyword = async()=>{
      const data = await Add_New_Keyword(Add_new_keyword)
      if(data.data.status ==true){
        toast.success(data.data.message)
      }else{
        toast.error(data.data.message)
      }
    }

    const Updatekeyword = async()=>{
      const data = await Update_Clause_keyword(id,Update_keyword)
      if(data.data.status ==true){
        toast.success(data.data.message)
        queryClient.invalidateQueries(['keywords_list']); // Mark as stale
        queryClient.refetchQueries(['keywords_list']); 
      }else{
        toast.error(data.data.message)
      }
    }

    const Add_inactivekeyword = (id)=>{
      setAdd_new_keyword((prevState) => {
        const inactiveKeywordsArray = prevState.inactive_keywords.split(',').map((kw) => kw.trim());
    
        if (inactiveKeywordsArray.includes(id.toString())) {
          const updatedKeywords = inactiveKeywordsArray.filter((kw) => kw != id).join(', ');
          return { ...prevState, inactive_keywords: updatedKeywords };
        } else {
          const updatedKeywords = prevState.inactive_keywords === "" ? id : `${prevState.inactive_keywords}, ${id.toString()}`;
          return { ...prevState, inactive_keywords: updatedKeywords };
        }
      })
    }

    const Update_inactivekeyword = (id) => {
      if (Update_keyword.inactive_keywords == null) {
        setUpdate_keyword((prevState) => ({ ...prevState, inactive_keywords: "" }));
      }
      else {
        setUpdate_keyword((prevState) => {
          const inactiveNumbersArray = prevState.inactive_keywords.split(',').map((num) => num.trim());
    
          if (inactiveNumbersArray.includes(id.toString())) {
            // If the number is already present, remove it
            const updatedNumbers = inactiveNumbersArray.filter((num) => num != id).join(', ');
            return { ...prevState, inactive_keywords: updatedNumbers };
          } else {
            // If the number is not present, add it
            const updatedNumbers =
              prevState.inactive_keywords === "" ? prevState.inactive_keywords : `${prevState.inactive_keywords}, ${id}`;
            return { ...prevState, inactive_keywords: updatedNumbers };
          }
        });
      }
    }
    
    const Is_Add_keyword_exist = (id)=>{
      if(Update_keyword.inactive_keywords!==null&&Update_keyword.inactive_keywords !== undefined){
        const isIDExist = Add_new_keyword.inactive_keywords.split(',').map((str) => str.trim()).includes(id);
        return isIDExist;
        }
    } 

    const Is_Udpate_keyword_exist = (id)=>{
      if(Update_keyword.inactive_keywords!==null&&Update_keyword.inactive_keywords !== undefined){
      const isIDExist = Update_keyword.inactive_keywords.split(',').map((str) => str.trim()).includes(id);
      return isIDExist;
      }
    } 
    const confirmSave = () => {
      Notiflix.Confirm.show(
        `Save Keyword`,
        `Are you sure you want to save this Keyword `,
        "Yes",
        "No",
        () => {
          Save_keyword();
        },
        () => {
          return 0;
        }
      );
    }
    const confirmUpdate = () => {
      Notiflix.Confirm.show(
        `Save Keyword`,
        `Are you sure you want to update this Keyword `,
        "Yes",
        "No",
        () => {
          Updatekeyword();
        },
        () => {
          return 0;
        }
      );
    }
    const Convert_Id_to_Keyword = (ids)=>{
      let IDs = ids.split(',')
      let keywords = ''

      for(let i=0;i<IDs.length;i++){
      for(let j=0;j<keyword_data.length;j++){
          if(IDs[i]==keyword_data[j].id){
            if(keywords.length==0){
              keywords = `${keyword_data[j].keyword}`
            }else{
              keywords = `${keywords}, ${keyword_data[j].keyword}`;
            }
      
          }
      }
      }
      return keywords
    }
    // console.log(Add_new_keyword,Update_keyword)

    console.log(colors)

  if(isLoading||isFetching){
    return <Loader/>
  }

  return (
    <div className="container mt-4">
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/Admin/dashboard">Home</Link></li>
        <li class="breadcrumb-item"><Link to="/Admin/services/libraries/clauses">Clauses</Link></li>
        <li className="breadcrumb-item active" aria-current="page">keyword management</li>
      </ol>
    </nav>
    <div className="d-flex align-items-center">
      <div className="col-auto">
      <h5 className='align-self-center'>Keywords</h5>
      </div>
      <div className='col ms-2'>
      <i className='bx cursor-pointer bxs-plus-circle fs-4' data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas"></i> 
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvas" aria-labelledby="offcanvas">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvas">Add Keyword</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="">
      <div className="row gy-4 p-0 m-0">
        <div className="col-12">
        <div className="col-auto">
      <div className="d-flex align-items-center justify-content-end cursor-pointer " onClick={()=>confirmSave()}>
      <span className='p-0 m-0 text-blue1'>Save</span>
      <i className='bx bx-save fs-5 text-blue1'></i>
      </div>
      </div>
        <p className='mt-2'>New Keyword</p>
        <input type='text' className='border-end-0 border-start-0 border-top-0 border-blue1' onChange={(e)=>{setAdd_new_keyword(prevState=>({...prevState,keyword:e.target.value}))}} placeholder='new keyword'/>
        </div>
        <div className="col-12">
        <p>Inactive keywords when its active</p>
         <div className="row">
         {
           keyword_data.map((data,i)=>(
             <button 
             onClick={() =>Add_inactivekeyword(data.id.toString()) } 
             className={`col-3 border-0 px-3 py-1 rounded-pill m-2 bg-${Is_Add_keyword_exist(data.id.toString())?'blue12 text-blue8':"blue1 text-white"} `}>{data.keyword}</button>
           ))
         }
         </div>
        </div>
        <div className="col-12">
          <p>Choose color</p>
          <select className='border-0 bg-transparent'>
          <option value="">select color</option>
            {
              colors!==undefined&&colors.map((data)=>(
                <option className={`bg-${data.color_name}`} value={data.id}>{data.color_name}
                </option>
              ))
            }
          </select>
        </div>
      </div>

    </div>
    </div>
    </div>
    </div>

    <table className='table w-100 mt-4 align-middle'>
              <thead>
                <tr>
                  <th className='fw-normal'>Id</th>
                  <th className='fw-normal'>Keyword</th>
                  <th className='fw-normal'>Inactive Keywords</th>
                  <th className='fw-normal text-center'>Customise</th>
                </tr>
              </thead>
              <tbody>
      {
        keyword_data.map((data,i)=>(
          <tr>
          <td>{data.id}</td>
          <td>{data.keyword}</td>
          <td className='scroll'>{Convert_Id_to_Keyword(data.inactive_keywords)}</td>
          <td className='text-center'>
          <i className='bx bxs-chevrons-right text-blue1 p-2' onClick={()=>{setUpdate_keyword(prevState=>({...prevState,keyword:data.keyword,inactive_keywords:data.inactive_keywords}));setid(data.id)}} data-bs-toggle={`offcanvas`} data-bs-target={`#offcanvas${data.id}`} aria-controls={`offcanvas${data.id}`} ></i> 
          <div class="offcanvas offcanvas-end" tabindex="-1" id={`offcanvas${data.id}`} aria-labelledby={`offcanvas${data.id}`}>
          <div class="offcanvas-header">
            <h6 class="offcanvas-title" id={`offcanvas${data.id}`}>Update Keyword "{data.keyword}"</h6>
            <button type="button" class="btn-close" data-bs-dismiss={`offcanvas`} aria-label="Close"></button>
          </div>
          <div class="text-start">
            <div className="row gy-4 p-0 m-0">
              <div className="col-12">
              <div className="col-auto">
            <div className="d-flex mb-4 align-items-center cursor-pointer " onClick={()=>confirmUpdate()}>
            <span className='p-0 m-0 text-blue1'>Update</span>
            <i className='bx bx-save fs-5 text-blue1'></i>
            </div>
            </div>
            <p className='fw-normal'>Keyword</p>
              <input type='text' value={Update_keyword.keyword?Update_keyword.keyword:''} className='border-end-0 border-start-0 border-top-0 border-blue1' onChange={(e)=>{setAdd_new_keyword(prevState=>({...prevState,keyword:e.target.value}))}} placeholder='keyword'/>
              </div>
              <div className="col-12 mt-5">
              <p className='fw-normal'>Inactive keywords when its active</p>
               <div className="row p-0 m-0">
               {
                 keyword_data.map((Data,i)=>(
                   <button 
                   onClick={() =>Update_inactivekeyword(Data.id)}
                    className={`border-0 px-3 py-1 d-${Data.id==data.id?'none':"block"} rounded-pill bg-${Is_Udpate_keyword_exist(Data.id.toString())?'blue12 text-blue8':"blue1 text-white"} col-auto m-2`}>{Data.id}.{Data.keyword}</button>
                 ))
               }
               </div>
              </div>
              <div className="col-12">
              <p>Choose color</p>
              <select className='border-0 bg-transparent'>
                <option value="">select color</option>
                {
                  colors!==undefined&&colors.map((data)=>(
                    <option className={`bg-${data.color_name}`} value={data.hexcode}>{data.color_name}
                    <span className={`p-2`}></span>
                    </option>
                  ))
                }
              </select>
            </div>
            </div>
          </div>
          </div>
          </td>
          </tr>
        ))
      }
      </tbody>
      </table>
    </div>
  )
}

export default Keywords