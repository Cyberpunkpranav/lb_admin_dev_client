import React, { Fragment, useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import Draggable_keywords from './draggable_keywords';
import Droppable_keywords from './droppable_keywords';
import { Get_Clause_by_id,Get_Clause_alt_by_id,Get_Clause_alt_ctgry_by_id,Get_clause_keywords,Get_clause_keywordCombinations } from '../../../../api/get_apis'
import { Update_Clause,Add_Clause_alternate,Switch_Clause_alternates,Update_Clause_Alternate_Catergory,Update_Clause_Alternate,Add_clause_keywordCombinations,Update_clause_keywordCombinations} from '../../../../api/post_apis';
import { Delete_Clause_alternate } from '../../../../api/delete_apis';
import {Link,useParams} from 'react-router-dom'
import Notiflix from 'notiflix'
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from 'react-hot-toast';
import '../../../../css/services/clauses/clauses.css'
import '../../../../css/loader.css'

const Update_clause = () => {
    const {id} = useParams()
    const queryclient = useQueryClient()
    const [keyword_combinations,setkeyword_combinations] = useState([])
    const [category,setcategory] = useState('')
    const [categories,setcategories] = useState('')
    const [index,setindex] = useState(0)
    const [ctgryindex,setctgryindex] = useState(0)
    const [clause,setclause] = useState([])
    const [clause_alt,setclause_alt] = useState([])
    const [clause_alt_ctrgy,setclause_alt_ctrgy] = useState([])
    const [new_clause_alt,setnew_clause_alt] = useState({
        clause_id:Number(id),
        nature:'',
        explaination:'',
        rationale:'',
        keyword:''
      }
    ) 
    const [clause_alt_id,setclause_alt_id] = useState('')
    const New_clause_alt_category_obj = {
      clause_id:Number(id),
      clause_alt_id:clause_alt_id,
      html:'',
      category:category,
      keyword:''
    }
    const [editorIndex,seteditorIndex] = useState(0)
    const [carousel,setcarousel] = useState(0)
    // clause editor configs
    const editorConfiguration = {
      toolbar: {
        items: [
          'undo', 'redo',
          '|','highlight',
          '|', 'heading',
          '|',{
            label: 'fonts',
            icon:false,
            items: ['fontfamily','fontsize', 'fontColor', 'fontBackgroundColor'] 
        },
          '|', 'bold', 'italic', 'code',
          '|', 'link', 'uploadImage','imageInsert', 'blockQuote','alignment',
          '|', 'bulletedList', 'numberedList',
          '|', 'outdent', 'indent','FindAndReplace'
      ],
      shouldNotGroupWhenFull: false
      }
    }
    const get_keywords = async()=>{
      const data = await Get_clause_keywords()
      for (let i=0;i<data.data.data.length;i++){
        data.data.data[i].prefix = ''
        data.data.data[i].suffix = ''
      }
        return data.data.data        
    }
    const { isLoading:keyword_loading,isFetching:keyword_fetching, isError, data:keyword_data , error } = useQuery(
    { 
    queryKey: ["keywords_list"],
     queryFn:get_keywords,
    })
    const get_clause = async()=>{
      const QueryData = queryclient.getQueryData(["clause",id]);
      if(QueryData==null||QueryData.length==0){
        const clause = await Get_Clause_by_id(id)
        return clause.data.data
      }else{
        return QueryData
      }
    }
    const { isLoading:isLoading1, isFetching:isFetching1, isError:isError1, data:clause_data , error:error1 } = useQuery(
    { 
    queryKey: ["clause",id],
     queryFn: get_clause ,
    })
    const get_clause_alt = async()=>{
      const QueryData = queryclient.getQueryData(["clause_alt",clause_data!==undefined ? clause_data.id:""]);
      if(QueryData==null||QueryData.length==0){
        const clause_alt = await Get_Clause_alt_by_id(id)
        setclause_alt_id(clause_alt.data.data[0].id)
        return clause_alt.data.data
       }else{
         setclause_alt_id(QueryData[0].id)
         return QueryData
       }
  }
    const { isLoading:isLoading2, isFetching:isFetching2, isError:isError2, data:clause_alt_data , error:error2 } = useQuery({ 
      queryKey: ["clause_alt",clause_data!==undefined ? clause_data.id:""],
      queryFn:clause_data!==undefined ? get_clause_alt:"",
    })
    const get_clause_alt_ctgry = async()=>{
      const QueryData = queryclient.getQueryData(["clause_alt_ctrgy",id,clause_alt_id]);
      if(QueryData==null||QueryData.length==0){
        const data = await Get_Clause_alt_ctgry_by_id(id,clause_alt_id)
        setcategory(data.data.data[0].category)
        let arrctrgy = []
        for(let i=0;i<data.data.data.length;i++){
          arrctrgy.push(data.data.data[i].category)
        }
        const uniqueArray = [...new Set(arrctrgy)];
        setcategories(uniqueArray)
        return data.data.data
      }else{
        setcategory(QueryData[0].category)
        let arrctrgy = []
        for(let i=0;i<QueryData.length;i++){
          arrctrgy.push(QueryData[i].category)
        }
        const uniqueArray = [...new Set(arrctrgy)];
        setcategories(uniqueArray)
        return QueryData
      }

  
    }
    const{isLoading:isLoading3,isFetching:isFetching3,data:clause_alt_ctgry_data} = useQuery({ 
    queryKey: ["clause_alt_ctrgy",id,clause_alt_id],
     queryFn: get_clause_alt_ctgry,
    })
    const Get_keyword_Combination = async()=>{
      const QueryData = queryclient.getQueryData(["keyword_combinations",id,clause_alt_id,category]);
      if(QueryData==undefined || QueryData==null || QueryData.length==0){
        const Data = await Get_clause_keywordCombinations(id,clause_alt_id,category)
        return Data.data.data
      }else{
        return QueryData
      }
    }
    const{isLoading:isLoading4,isFetching:isFetching4,data:keywordcombinations_data} = useQuery({ 
        queryKey: ["keyword_combinations",id,clause_alt_id,category],
         queryFn: Get_keyword_Combination,
    })
    const AddKeyword_combinations=async()=>{
      let obj = {
        clause_id :id,
        clause_alt_id: clause_alt_id,
        category:category,
        keyword_combinations:clause.keyword_combinations
      }
        const Data = await Add_clause_keywordCombinations(obj)
         if(Data.data.status ==true){
          queryclient.setQueryData(["keyword_combinations",id,clause_alt_id,category],Data.data.data)
         }else{
          toast.error(Data.data.message)
         }
    }  
    useEffect(()=>{
      if (clause_data!=undefined) {
        setclause(clause_data)
      }
    },[clause_data])

    useEffect(()=>{
      if (clause_alt_data!=undefined) {
        setclause_alt(clause_alt_data)
      }
    },[clause_alt_data])

    useEffect(()=>{
      setclause_alt_ctrgy(clause_alt_ctgry_data) 
    },[clause_alt_ctgry_data])

    useEffect(()=>{
      if(keywordcombinations_data!==undefined){
        setkeyword_combinations(keywordcombinations_data)
      }
    },[keywordcombinations_data])

    const words_extraction = (word)=>{
      word = word.replaceAll(" ","-")
      word = word.replaceAll("(",'-')
      word = word.replaceAll(")",'-')
      word = word.replaceAll("|",'-')
      word = word.replaceAll("-",'-')
      word = word.replaceAll("_",'-')
      word = word.replaceAll("&",'-')
      word = word.replaceAll("%",'-')
      word = word.replaceAll("#",'-')
      word = word.replaceAll("@",'-')
      word = word.replaceAll("!",'-')
      word = word.replaceAll("{",'-')
      word = word.replaceAll("}",'-')
      word = word.replaceAll("[",'-')
      word = word.replaceAll("]",'-')
      word = word.replaceAll("?",'-')
      word = word.replaceAll(".",'-')
      word = word.replaceAll(",",'-')
      word = word.replaceAll("+",'-')
      word = word.replaceAll(":",'-')
      word = word.replaceAll(";",'-')
      word = word.replaceAll("=",'-')
      word = word.replaceAll('"','-')
      word = word.replaceAll("'",'-') 
      word = word.replaceAll(">",'-') 
      word = word.replaceAll("<",'-') 
      word = word.replaceAll("-",'')
      return word
    }
    const Update = async()=>{
    Notiflix.Loading.arrows()
    const QueryData = queryclient.getQueryData(["clause",id]);
        const Data = await Update_Clause(QueryData)
        if(Data.data.status==true){
          Notiflix.Loading.remove()
          get_clause()
          toast.success(Data.data.message)
          }else{
          Notiflix.Loading.remove()
          toast.error(Data.data.message)
        }
    }
    const Add_new_clause_alt = async()=>{
      Notiflix.Loading.dots()
      const res = await Add_Clause_alternate(new_clause_alt)
      if(res.data.status==true){
        Notiflix.Loading.remove()
        if(clause_alt.length>0){
          queryclient.setQueryData(["clause_alt",clause_data!==undefined ? clause_data.id:""],prevState=>([...prevState,res.data.data]))
        }else{
          queryclient.setQueryData(["clause_alt",clause_data!==undefined ? clause_data.id:""],[res.data.data])

        }
        toast.success(res.data.message)
      }else{
        Notiflix.Loading.remove()
        toast.error(res.data.message)
      }
    }
    const Switch_status = async(id,status)=>{
      const data = await Switch_Clause_alternates(id,status)
      if(data.data.status==true){
        toast.success(data.data.message)
        setTimeout(()=>{
      window.location.reload()
        },1000)
      }else{
        toast.error(data.data.message)
      }
    }
    const Delete_Clause_alt = async(id)=>{
      const data = await Delete_Clause_alternate(id)
      if(data.data.status==true){
        toast.success(data.data.message)
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      }else{
        toast.error(data.data.message)

      }
    } 
    const Confirm_delete = (id)=>{
      Notiflix.Confirm.show(
        `Delete act`,
        `Are you sure you want to delete this sample clause alternate `,
        "Yes",
        "No",
        () => {
          Delete_Clause_alt(id);
        },
        () => {
          return 0;
        },
        {}
      );
    }
    const Update_clause_alt_category = async(data)=>{
      const Data = await Update_Clause_Alternate_Catergory(data)
      if(Data.data.status==true){
        toast.success(Data.data.message)
        queryclient.removeQueries({queryKey:["clause_alt_ctrgy",id,clause_alt_id],exact:true});
        get_clause_alt_ctgry()
      }else{
        toast.error(Data.data.message)
      }
    }
    const update_clauseAlt =async(Data)=>{
      const data = await Update_Clause_Alternate(Data)
      if(data.data.status==true){
        toast.success(data.data.message)
      }else{
        toast.error(data.data.message)
      }
    }
  // its done and working fine to make combinations by keyword
function GenerateCombinations() {
  const combinations = [];
  if(clause.keywords!==undefined&&clause.keywords!==null){
  for (let i = 0; i < clause.keywords.length; i++) {
    for (let j = i + 1; j < clause.keywords.length; j++) {
      if(!clause.keywords[i].inactive_keywords.includes(clause.keywords[j].id) && !clause.keywords[j].inactive_keywords.includes(clause.keywords[i].id)){
        const keyword1 = clause.keywords[i].keyword;
        const keyword2 =  clause.keywords[j].keyword;
        combinations.push(
          { id: Number(id),
            keyword1: keyword1,
            keyword2: keyword2,
            prefix:clause.keywords[i].prefix,
            middle:'',
            suffix:clause.keywords[i].suffix 
          });
          combinations.push(
          { id: Number(id),
            keyword1: keyword1,
            keyword2: keyword2,
            prefix:clause.keywords[i].prefix,
            middle:'',
            suffix:clause.keywords[i].suffix 
          });
      }
    }
  }
  for(let i =0;i<clause.keywords.length;i++){
    combinations.push({
      id:Number(id),
      keyword1:clause.keywords[i].keyword,
      keyword2:'',
      prefix:clause.keywords[i].prefix,
      suffix:clause.keywords[i].suffix
    })
  }
}
const updateClause = {...clause,keyword_combinations:combinations}
queryclient.setQueryData(["clause",id],updateClause)
Update()
}

//JSX change functions
const UpdateKeywordCombination = (keywordCombinationId,variable,value) => {
  setkeyword_combinations((prevData) => { 
        return {
          ...prevData,
          keyword_combinations: prevData.keyword_combinations.map((keywordObj,i) => {
            if (i=== keywordCombinationId) {
              return {
                ...keywordObj,
                [variable]:value, // Update the specific properties you want to change
              };
            }
            return keywordObj;
          }),
        };
    });
};
const updateKC = async()=>{
 const QueryData =  queryclient.getQueryData(["keyword_combinations",id,clause_alt_id,category])
  const data =await Update_clause_keywordCombinations(QueryData)
  if(data.data.status ==true){
    toast.success(data.data.message)
    queryclient.setQueryData(["keyword_combinations",id,clause_alt_id,category],data.data.data)
  }else{
    toast.error(data.data.message)
  }
}
const Add_duplicate = (k1,k2)=>{
const obj = {
  id:id,
  prefix:'',
  keyword1:k1,
  middle:'',
  keyword2:k2,
  suffix:''
}
  setkeyword_combinations(prevState=>({...prevState,keyword_combinations:[...prevState.keyword_combinations,obj]}))
  toast.success('duplicate done !')
}
const Delete_KeywordCombination = (Array,index)=>{
  console.log(index);
if (index > -1) {
  Array.splice(index, 1);
  setkeyword_combinations(prevState=>({...prevState,keyword_combinations:Array}))
}
}
const SaveAll=()=>{
  Update()
  updateKC()
  Update_clause_alt_category(clause_alt_ctrgy)
}

    return (
      <section className='container mt-2'>
      <nav aria-label="breadcrumb position-sticky top-0 bg-white">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/Admin/dashboard">Home</Link></li>
        <li className="breadcrumb-item"><Link to="/Admin/services/libraries/clauses">Clauses</Link></li>
        <li className="breadcrumb-item active" aria-current="page">{clause&&clause.clause_name!==undefined&&clause.clause_name!==null?clause.clause_name:""}</li>
      </ol>
      </nav>
          <div id="carouselExampleDark" className="carousel carousel-dark slide updateclausesection">
            <div className="d-flex justify-content-end">
            <button className='bg-blue1 text-white rounded-2 border-0 px-3 py-2' onClick={()=>SaveAll()}>Save All</button>
            </div>
         <div className="carousel-indicators position-relative p-0 m-0">
           <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active p-0 m-0" aria-current="true" aria-label="Slide 1"></button>
           <button className='p-0 m-0 ms-2' type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
         </div>
        <div className="carousel-inner overflow-scroll" style={{height:'75vh'}}>
        <div className="carousel-item active" data-bs-interval="10000">
          <div className="row position-sticky top-0 align-items-center">
            <div className="col-10">
            <p className='p-0 m-0 text-gray1'>Clause and keywords{' '}|{" "}<span className='p-0 m-0 text-gray2'>Fill and update clause details and arrange keyword selection</span></p>
            </div>
            <div className="col-2">
            <div className="d-flex align-items-center justify-content-end cursor-pointer " onClick={()=>Update()}>
            <div className="col-auto bg-blue13 d-flex align-items-center px-2 py-1 rounded-2 border border-blue1">
            <i className='bx bx-save text-blue1'></i>
            <span className='p-0 m-0 text-blue1'>Save</span>
            </div>
           </div>
            </div>
      </div>
      <div className='d-block w-100'>
        <div className="row justify-content-between">
        {/* Draggable keywords */}
         <div className="col mt-2">
          <div className="row justify-content-between">
            <div className="col-auto">
            <p className='d-flex align-items-center p-0 m-0 text-gray2'>All keywords</p>
            </div>
            <div className="col-auto">
              <span className='text-gray2'>Total keywords : </span>
            <span className='badge text-greenmain fs-6 border-greenmain me-2 bg-transparentgreen1'>{keyword_data!==undefined?keyword_data.length:""}</span>
            </div>
          </div>
           {
           keyword_loading || keyword_fetching ?(
               <div>getting keywords....</div>
           ):(
             <div className="row p-0 m-0 scroll mt-2">
               {
                 keyword_data&&keyword_data.length!==0?(
                   keyword_data.map((data,i)=>(
                      <Draggable_keywords id = {data.id} prefix = {data.prefix} suffix = {data.suffix} keyword={data.keyword} inactive_keywords={data.inactive_keywords} setclause={setclause}/>
                  ))
                ):(
                  <p className='text-center py-2 text-gray2 fw-semibold'>no keywords</p>
                )
                   }
             </div>

           )
           }
         </div>
        {/* Draggable keywords */}

        <div className="col-12">
        <div className="form__group field w-100">
        <input maxLength={100} type="input" className="form__field p-2 " value={clause&&clause.clause_name?clause.clause_name:""} 
        onChange={(e)=>  setclause(prevState=>({...prevState,clause_name:e.target.value}))} 
        onBlur={()=> queryclient.setQueryData(["clause",id],clause)}
        placeholder="Type clause Name here..." name="name" id='name' />
        <span className='position-absolute end-0 bottom-0 me-4'>{clause&&clause.clause_name!==undefined&&clause.clause_name!==null?clause.clause_name.length:0}/100</span>
        <label for="name" className="form__label"> Clause</label>
        </div>
        </div>
        </div>
            <div className="col-12 my-4">
            <div className="form__group field w-100">
            <textarea maxLength={1000} type="input" className="form__field pe-5 p-2" value={clause&&clause.definition?clause.definition:''} 
            onChange={(e)=>setclause(prevState=>({...prevState,definition:e.target.value}))} 
            onBlur={()=> queryclient.setQueryData(["clause",id],clause)}
            />
            <label for="name" className="form__label">Definition of {clause&&clause.clause_name?clause.clause_name.toLowerCase():""}</label>
            <span className='position-absolute end-0 bottom-0 mb-2 me-4'>{clause&&clause.definition!==undefined&&clause.definition!==null?clause.definition.length:0}/1000</span>
            </div>
            </div>
            <div className="col-12 my-4"> 
            <div className="form__group field w-100">
            <textarea maxLength={1000} type="input" className="form__field pe-5 p-2" value={clause&&clause.rationale?clause.rationale:''} 
            onChange={(e)=>setclause(prevState=>({...prevState,rationale:e.target.value}))}
            onBlur={()=> queryclient.setQueryData(["clause",id],clause)}
            />
            <label for="name" className="form__label">Purpose of {clause&&clause.clause_name?clause.clause_name.toLowerCase():""}</label>
            <span className='position-absolute end-0 bottom-0 mb-2 me-4'>{clause&&clause.rationale!==undefined&&clause.rationale!==null?clause.rationale.length:0}/1000</span>
            </div>
            </div>
            <div className="row justify-content-between">
              <div className="col-auto">
              <p className='p-0 m-0 text-gray2'>Add keywords for <h6 className='text-blue1 d-inline p-0 m-0'>{clause&&clause.clause_name?clause.clause_name.toLowerCase():""} </h6><small className='text-redmain p-0 m-0'> &#40; *add minimum two keywords to generate combinations &#41;</small></p>
              </div>
              <div className="col-auto">
              <span className='text-gray2'>Keywords added:</span><span className='bg-transparentgreen1 fs-6 badge text-greenmain'>{' '}{clause&&clause.keywords?clause.keywords.length:0}{' '}</span>
              </div>
            </div>
            <div className="row justify-content-between mt-3 p-0 m-0 align-items-center">
            <div className="col-9 ps-0">
              <Droppable_keywords Data={clause} clause_name={clause&&clause.clause_name?clause.clause_name:""} setclause={setclause}/>
            </div>
            <div className="col-auto p-0 m-0 d-flex align-items-center cursor-pointer border-0 border-bottom border-blue1" onClick={()=>GenerateCombinations()}>
            <i class='bx bx-cog fs-5 text-blue1'></i>
            <p className='p-0 m-0 text-blue1 ' >Generate Combinations</p>
            </div>
            </div>
        </div>
        </div>
        <div className="carousel-item" data-bs-interval="2000">
        <div className="d-block w-100">
        {
        isLoading2 || isFetching2 ? (
          <div className='mt-4'>getting clause alternatives...</div>
        ):(
          <>
          <button className='col-12 wrapper position-sticky top-0 bg-white pt-2 ps-2 pe-4 text-start d-flex justify-content-between text-blue1 mt-3 border-0 '>
            <p className='p-0 m-0 d-inline text-gray1'>
              <span className='fw-smibold text-blue1 p-0 m-0'>{clause&&clause.clause_name?clause.clause_name:''}</span> approaches {' '}|{' '}
              <small className='p-0 m-0 pb-1 text-gray2'>create, update and add approaches and its categories </small></p>
              <div className="d-flex justify-content-end me-2 position-absolute end-0">
                      <button className=' px-2 bg-blue13 py-1 d-flex align-items-center rounded-2 border border-blue1'onClick={()=>Update_clause_alt_category(clause_alt_ctrgy)}>
                      <i className='bx bx-save text-blue1'></i>
                      <small className=' text-blue1'>Save</small>
                      </button>
                      </div>
             </button>
                  <nav className='pt-2'>
                    <div className="nav scroll border-0 border-start-1 nav-tabs clause_nature" id="nav-tab" role="tablist">
                      {
                       clause_alt&&clause_alt !=undefined && clause_alt.length!=0 && clause_alt.map((Data,i)=>(
                        <button className={`nav-link ${i==index?' active':''}`} id={`nav-${i}-tab`} onClick={()=>{setindex(i);setclause_alt_id(Data.id);setcategory('simple')}} data-bs-toggle="tab" data-bs-target={`#nav-${i}`} type="button" role="tab" aria-controls={`nav-${i}`} aria-selected="true">
                        <input
                        maxLength={100} 
                        value={Data.nature?Data.nature:''}
                        onChange={ ( e ) => {
                         const updatednature = clause_alt.map(item => {
                           if (item.id === Data.id) {
                             return { ...item, nature:e.target.value };
                           }
                           return item; 
                         });
                         setclause_alt(updatednature);
                       }}
                       placeholder='clause Nature'
                      />
                  <button className='text-blue1 bg-transparent shadow-0 border-0 ' data-bs-toggle="collapse" data-bs-target="#collapseApproachdetails" aria-expanded="false" aria-controls="collapseApproachdetails">
                  <i class='bx bx-menu' ></i>
                   </button>
                     </button>
                      ))
                      }
                    <button className="nav-link d-flex align-items-center text-gray2 rounded-2 mb-1 bg-gray4" id="nav-new-tab" data-bs-toggle="tab" data-bs-target="#nav-new" type="button" role="tab" aria-controls="nav-new" aria-selected="true">
                     <i className='bx bx-plus-circle fs-5 me-2'></i>approach
                     </button>
                    </div>
                  </nav>
              <div className="tab-content bg-blue13 border-top border-blue1" id="nav-tabContent">
                {
                 clause_alt.length!=0&&clause_alt.map((Data,i)=>(
                  <>
                  <div className={`tab-pane ${i==index?'fade show active':'fade'}`} onClick={()=>setindex(i)} id={`nav-${i}`} role="tabpanel" aria-labelledby={`nav-${i}-tab`} tabindex="0">

                  <div className='collapse px-1' id='collapseApproachdetails'>
                  <div className='row pt-2 pe-4 justify-content-between'>
                    <div className="col-8">
                    </div>
                    <div className="col-auto rounded-2 bg-white text-blue1 border border-blue1 d-flex align-items-center">
                    <i className='bx bx-save text-blue1'></i>
                    <button className='bg-transparent text-blue1 border-0' onClick={()=>update_clauseAlt(Data)}>Update {Data.nature}</button>
                    </div>
                      <div className="col-auto">
                      <div className="dropdown d-flex align-items-center bg-white border border-blue1 px-2 py-1 rounded-2">
                      <i className='bx bx-cog text-blue1' role="button" data-bs-toggle="dropdown" aria-expanded="false" ></i>
                     <span className='text-blue1' role="button" data-bs-toggle="dropdown" aria-expanded="false" >settings</span>                
                    <ul className="dropdown-menu">
                      {
                        Data.status == 0 ? (
                          <li onClick={()=>{Switch_status(Data.id,1)}}><div className="dropdown-item">Enable</div></li>
                        ):(
                          <li onClick={()=>{Switch_status(Data.id,0)}}><div className="dropdown-item">Disable</div></li>
                        )
                      }
                      <li onClick={()=>{Confirm_delete(Data.id)}}><div className="dropdown-item">Delete</div></li>
                    </ul>
                    </div>
                      </div>

                  </div>
                    <div className="form__group field w-100">
                    <textarea maxLength={1000} type="input" className="form__field bg-white w-100 p-2" value={Data.rationale?Data.rationale:''} 
                       onChange={ ( e ) => {
                        const updatedrationale = clause_alt.map(item => {
                          if (item.id === Data.id) {
                            return { ...item, rationale:e.target.value };
                          }
                          return item; 
                        });
                         setclause_alt(updatedrationale)
                      }}
                    placeholder="Type clause purpose here..." name="purpose" />
                    <label for="purpose" className="form__label">Definition of {Data.nature?Data.nature:''}</label>
                    <span className='position-absolute end-0 bottom-0 mb-2 me-4'>{Data.rationale!==undefined||Data.rationale!==null?Data.rationale.length:0}/1000</span>
                    </div>
                    <div className="form__group field w-100">
                    <textarea maxLength={1000} type="input" className="form__field bg-white p-2 w-100" value={Data.explaination?Data.explaination:''} 
                       onChange={ ( e ) => {
                        const updatedrationale = clause_alt.map(item => {
                          if (item.id === Data.id) {
                            return { ...item, explaination:e.target.value };
                          }
                          return item; 
                        });
                         setclause_alt(updatedrationale)
                      }}
                    placeholder="Type clause rationale here..." name="rationale" />
                    <label for="rationale" className="form__label">Purpose or Rationale of {Data.nature?Data.nature:''}</label>
                    <span className='position-absolute end-0 bottom-0 mb-2 me-4'>{Data.explaination!==undefined&&Data.explaination!==null?Data.explaination.length:0}/1000</span>
                    </div>
                    </div>
                    <div className=''>
                    {               
                      categories!==undefined && categories.length!==0 ? (
                        <ul className="nav align-items-center nav-pills bg-white mb-3 px-2" id="pills-tab" role="tablist"> 
                        {
                              categories.map((item,i)=>(
                              <li className={`nav-item`} role="presentation" onClick={()=>(setcategory(item))}>
                              <button className={`nav-link ${ctgryindex==i?'active':""}`} onClick={()=>{setctgryindex(i)}} id={`pills-${item}-tab`} data-bs-toggle="pill" data-bs-target={`#pills-${item}`} type="button" role="tab" aria-controls={`pills-${item}`} aria-selected="true">
                              {item}
                              </button>
                            </li>
                            ))
                        } 
 
                      </ul>
                      ):(<></>)
                    }
                    <button className='col-12 px-2 pe-4 text-start d-flex justify-content-between text-blue1 bg-transparent mt-3 border-0 ' data-bs-toggle="collapse" data-bs-target="#collapseKeywords" aria-expanded="false" aria-controls="collapseKeywords">
                    <p className='p-0 m-0'>
                    Keyword combinations for {category} clauses </p> 
                    <span>
                    <span className='bg-transparentgreen1 text-greenmain rounded-2 px-2 py-1 me-2'>keywords:{keyword_combinations.keyword_combinations!==undefined?keyword_combinations.keyword_combinations.length:0}</span>
                    <i className='bx bxs-down-arrow'></i>
                    </span>
                    </button>
                    <div className='collapse mx-2' id='collapseKeywords'>
                    <div className='d-flex justify-content-end p-0 m-0 ms-3 me-3 mb-1 ' >
                    <button className='text-blue1 border d-flex align-items-center border-blue1 bg-white px-2 my-1 py-1 bg-white rounded-2' onClick={()=>updateKC()}>
                    <i className='bx bx-save text-blue1'></i>
                    <small className=''>Save</small></button>
                    </div>
                    <div className='overflow-scroll position-relative' style={{maxHeight:'40vh'}}>
                   {
                     isLoading4 || isFetching4 ? (
                     <div>loading keyword combinations...</div>):(
                      keyword_combinations!==null&&keyword_combinations!==undefined && keyword_combinations.length!==0?(
                      <table className={`table ps-3 bg-white d-${keyword_combinations.category == category?'':'none'}`}>
                        <thead className='text-gray2 position-sticky top-0 bg-white'>
                            <tr className=''>
                              <th className='fw-normal' scope="col">S.No</th>
                              <th className='fw-normal' scope="col">Prefix</th>
                              <th className='fw-normal' scope="col">Keyword 1</th>
                              <th className='fw-normal' scope="col">Middle</th>
                              <th className='fw-normal' scope="col">Keyword 2</th>
                              <th className='fw-normal' scope="col">Suffix</th>
                              <th className='fw-normal text-center' scope="col">Duplicate</th>
                              <th className='fw-normal text-center' scope="col">Delete</th>
                            </tr>
                        </thead>
                      <tbody>
                        {
                      keyword_combinations.keyword_combinations!==null&&keyword_combinations.keyword_combinations!==undefined && keyword_combinations.length!==0 && keyword_combinations.keyword_combinations.map((item,i)=>(
                      <tr className='border-white'>
                        <th className='fw-normal'>{i+1}.</th>
                        <td>
                          <input className='input_border_bottom bg-transparent'
                          type='text' value={item.prefix}
                          maxLength={100}
                          onChange={(e)=>{UpdateKeywordCombination(i,'prefix',e.target.value)}}
                          onBlur={()=> queryclient.setQueryData(["keyword_combinations",id,clause_alt_id,category],keyword_combinations)}
                          />
                        </td>
                        <td>{item.keyword1}</td>
                        <td>
                        {
                            item.middle!==undefined? (
                              <input className='input_border_bottom' type='text' 
                              value={item.middle}
                              maxLength={100}
                              onChange={(e)=>{UpdateKeywordCombination(i,'middle',e.target.value)}}
                              onBlur={()=> queryclient.setQueryData(["keyword_combinations",id,clause_alt_id,category],keyword_combinations)}
                              />
                            
                            ):(
                              <></>
                            )
                          }
                        </td>
                        <td>{item.keyword2}</td>
                        <td>
                        <input className='input_border_bottom bg-transparent' type='text' 
                        value={item.suffix}
                        maxLength={100}
                        onChange={(e)=>{UpdateKeywordCombination(i,'suffix',e.target.value)}}
                        onBlur={()=> queryclient.setQueryData(["keyword_combinations",id,clause_alt_id,category],keyword_combinations)}
                        />
                        </td>
                        <td className='text-center'>
                          <button className='bg-gray4 border-0 text-gray1 rounded-2 px-2 py-1' onClick={()=>Add_duplicate(item.keyword1,item.keyword2)}>Duplicate</button>
                          </td>
                          <td>
                            <button className='bg-transparentred1 text-redmain px-2 py-1 rounded-2 border-0 ' onClick={()=>Delete_KeywordCombination(keyword_combinations.keyword_combinations,i)}>Delete</button>
                          </td>
                      </tr>
                      )) 
                        }
                      </tbody>
                      </table> 
                       
                  ):(
              keyword_combinations.keyword_combinations==null||clause.keyword_combinations!==null ? (
                <button className='border-0 text-blue1 bg-transparent border-bottom border-blue1 d-flex align-items-center ' 
                onClick={()=>{AddKeyword_combinations()}}><i className='bx bx-plus-circle fs-5'></i>Get Combinations for {category} clauses</button>
              ):(
                <button className='border-0 text-blue1 bg-transparent border-bottom border-blue1 d-flex align-items-center ' 
                onClick={()=>{AddKeyword_combinations()}}><i className='bx bx-plus-circle fs-5'></i>Get Combinations for {category} clauses</button>
              )
             )
                    )
                  }
                  </div>
                    </div>
          {
            isLoading3 || isFetching3 ? (
            <div>loading clause alternate categories ....</div>)
            :(
            clause_alt_ctrgy!==undefined && clause_alt_ctrgy.length!==0 ? (
              <div>
              {
              clause_alt_ctrgy.map((item,i)=>(
                <div className={`d-${item.category==category?'block':'none'} my-2 mx-2`}>
                <select value={item.keyword?item.keyword:""} 
                onFocus={()=>seteditorIndex(i)}
                onChange={(e)=>{                   
                  const updatedClauses = clause_alt_ctrgy.map((data,index) => {
                    const newdata = e.target.value
                  if (editorIndex == index && item.category==category) {
                    return { ...data, keyword: newdata};
                  }
                  return data; 
                })
                setclause_alt_ctrgy(updatedClauses)
                }} 
              onBlur={()=> queryclient.setQueryData(["clause_alt_ctrgy",id,clause_alt_id],clause_alt_ctrgy)}
                className='border rounded-top-1 border-bottom-0 pe-2 py-2'>
                    <option value='null' className='text-gray2'>Choose combination for this sample clause</option>
                   {
                     keyword_combinations!==null && keyword_combinations!==undefined&&keyword_combinations.length!==0&&keyword_combinations.keyword_combinations!==null&&keyword_combinations.keyword_combinations.map((combinations,i)=>(
                       <option className='' value={JSON.stringify(combinations)}>{combinations.prefix}{' '}{combinations.keyword1}{' '}{combinations.middle}{' '}{combinations.keyword2}{' '}{combinations.suffix}</option>
                     ))
                   }
                 </select>
                <CKEditor
                    editor={Editor}
                    config={editorConfiguration}
                    data={item.html?item.html:'<p></p>'}
                   onReady={ ( editor ) => {
                     if(editor){
                       return editor
                     }
                   }}
                   onFocus={()=>seteditorIndex(i)}
                   onChange={ ( event, editor ) => {
                     const newdata = editor.getData()
                     const updatedClauses = clause_alt_ctrgy.map((data,index) => {
                       if (editorIndex == index) {
                        console.log(editorIndex,index);
                         return { ...data, html: newdata };
                       }
                       return data; 
                     })
                     setclause_alt_ctrgy(updatedClauses)
                   }
                  }
                  onBlur={()=> queryclient.setQueryData(["clause_alt_ctrgy",id,clause_alt_id],clause_alt_ctrgy)}
                     />
                </div>

              ))
              }
                <div className="row mx-2 p-0 m-0 mt-3 justify-content-center">
               <div 
               onClick={()=>{
              setclause_alt_ctrgy(prevState=>([...prevState,New_clause_alt_category_obj]));
              queryclient.setQueryData(["clause_alt_ctrgy",id,clause_alt_id],clause_alt_ctrgy);
              }} className="col-12 d-flex align-items-center justify-content-center cursor-pointer rounded-2 bg-white mb-4 py-2 text-center">
               <i className='bx bxs-add-to-queue text-blue1'></i><span className='text-blue1'>Add {category} clause</span>
               </div>
             </div>
              </div>
            ):(<div>no categories found</div>)
            )
          }
                    </div>
                  </div>
                  </>
                ))
                }
                {/* Add new clause Alternate */}
                <div className="tab-pane fade mt-3" id="nav-new" role="tabpanel" aria-labelledby="nav-new-tab" tabindex="0">
                <div className="float-end cursor-pointer me-5 mb-3" style={{width:'min-content'}} onClick={()=>Add_new_clause_alt()} >
                <div className="d-flex align-items-center">
                <span className="text-blue1">Save</span><i className='bx bxs-save text-blue1' ></i>
                </div>
                </div> 
                <section className='col-12'>
                <label htmlFor="clause_tag">clause Nature</label>
                <input type="text" className='mb-4 py-2 border border-gray1 w-100 d-block p-2' 
                value={new_clause_alt&&new_clause_alt.nature?new_clause_alt.nature:''} 
                onChange={(e)=>{setnew_clause_alt(prevState=>({...prevState,nature:e.target.value}))}}/>
                <label htmlFor="rationale" className='text-gray1 p-2'>clause Purpose</label>
                <textarea className='mb-4 py-2 border border-gray1 w-100 d-block p-2' value={new_clause_alt&&new_clause_alt.rationale?new_clause_alt.rationale:''} onChange={(e)=>{setnew_clause_alt(prevState=>({...prevState,rationale:e.target.value}))}} />
                <label htmlFor="rationale" className='text-gray1 p-2'>clause Explaination</label>
                <textarea className='mb-4 py-2 border border-gray1 w-100 d-block p-2' value={new_clause_alt&&new_clause_alt.explaination?new_clause_alt.explaination:''} onChange={(e)=>{setnew_clause_alt(prevState=>({...prevState,explaination:e.target.value}))}} />
                </section>

                </div>
                {/* Add new clause Alternate */}
                </div>
          
          </>
        )
        }
        </div>
        </div>
        </div>
        <div className="d-flex mt-3 mx-3 justify-content-between">
        <button onClick={()=>setcarousel(carousel-1)} className="btn border-0 border-bottom border-blue1 rounded-0" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
            <span className="text-blue1">Previous</span>
          </button>
          <button onClick={()=>setcarousel(carousel+1)} className={`btn d-${carousel==1?'none':'block'} border-0 border-bottom border-blue1 rounded-0`} type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
            <span className="text-blue1">Next</span>
          </button>
        </div>
          </div>
  {/*old ui */}
    <section className='container d-none mt-4 update_clause_section'>

      {
         isLoading1 || isFetching1 ? (
          <span className="loader"><h4 className='mb-5 pb-3'>LegalBuddy</h4></span>
        ):(
      <div className='container-fluid updateclausesection p-0 m-0 position-relative mt-4'>
      <button className='col-12 pe-4 text-start text-blue1 bg-transparent d-flex justify-content-between py-2 ps-2 border-0 ' data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
        <p className='p-0 m-0'>Clause details and keywords</p> 
        <i className='bx bxs-down-arrow'></i>        
      </button>
      <div className='collapse show' id='collapseExample'>

      <div className="row justify-content-between">
              {/* Draggable keywords */}
               <div className="col my-4">
                <div className="row justify-content-between">
                  <div className="col-auto">
                  <p className='d-flex align-items-center p-0 m-0 text-gray2'>All keywords</p>
                  </div>
                  <div className="col-auto">
                    <span className='text-gray2'>Total keywords : </span>
                  <span className='badge text-greenmain fs-6 border-greenmain me-2 bg-transparentgreen1'>{keyword_data!==undefined?keyword_data.length:""}</span>
                  </div>
                </div>
                 {
                 keyword_loading || keyword_fetching ?(
                     <div>getting keywords....</div>
                 ):(
                   <div className="row p-0 m-0 scroll mt-2">
                     {
                       keyword_data&&keyword_data.length!==0?(
                         keyword_data.map((data,i)=>(
                            <Draggable_keywords id = {data.id} prefix = {data.prefix} suffix = {data.suffix} keyword={data.keyword} inactive_keywords={data.inactive_keywords} setclause={setclause}/>
                        ))
                      ):(
                        <p className='text-center py-2 text-gray2 fw-semibold'>no keywords</p>
                      )
                         }
                   </div>

                 )
                 }
               </div>
              {/* Draggable keywords */}
      <div className="d-flex align-items-center justify-content-end cursor-pointer " onClick={()=>Update()}>
      <i className='bx bx-save fs-5 text-blue1'></i>
      <span className='p-0 m-0 text-blue1'>Save</span>
      </div>
      <div className="col-12">
      <div className="form__group field w-100">
      <input maxLength={100} type="input" className="form__field p-2 " value={clause&&clause.clause_name?clause.clause_name:""} 
      onChange={(e)=>  setclause(prevState=>({...prevState,clause_name:e.target.value}))} 
      onBlur={()=> queryclient.setQueryData(["clause",id],clause)}
      placeholder="Type clause Name here..." name="name" id='name' required />
      <span className='position-absolute end-0 bottom-0 me-4'>{clause&&clause.clause_name!==undefined&&clause.clause_name!==null?clause.clause_name.length:0}/100</span>
      <label for="name" className="form__label"> Clause</label>
      </div>
      </div>
      </div>
      
      <div className="col-12 my-4">
      <div className="form__group field w-100">
      <textarea maxLength={1000} type="input" className="form__field pe-5 p-2" value={clause&&clause.definition?clause.definition:''} 
      onChange={(e)=>setclause(prevState=>({...prevState,definition:e.target.value}))} 
      onBlur={()=> queryclient.setQueryData(["clause",id],clause)}
      />
      <label for="name" className="form__label">Definition of {clause&&clause.clause_name?clause.clause_name.toLowerCase():""}</label>
      <span className='position-absolute end-0 bottom-0 mb-2 me-4'>{clause&&clause.definition!==undefined&&clause.definition!==null?clause.definition.length:0}/1000</span>
      </div>
      </div>
      <div className="col-12 my-4"> 
      <div className="form__group field w-100">
      <textarea maxLength={1000} type="input" className="form__field pe-5 p-2" value={clause&&clause.rationale?clause.rationale:''} 
      onChange={(e)=>setclause(prevState=>({...prevState,rationale:e.target.value}))}
      onBlur={()=> queryclient.setQueryData(["clause",id],clause)}
      />
      <label for="name" className="form__label">Purpose of {clause&&clause.clause_name?clause.clause_name.toLowerCase():""}</label>
      <span className='position-absolute end-0 bottom-0 mb-2 me-4'>{clause&&clause.rationale!==undefined&&clause.rationale!==null?clause.rationale.length:0}/1000</span>
      </div>
      </div>
      <div className="row justify-content-between">
        <div className="col-auto">
        <p className='p-0 m-0 text-gray2'>Add keywords for <h6 className='text-blue1 d-inline p-0 m-0'>{clause&&clause.clause_name?clause.clause_name.toLowerCase():""} </h6><small className='text-redmain p-0 m-0'> &#40; *add minimum two keywords to generate combinations &#41;</small></p>
        </div>
        <div className="col-auto">
        <span className='text-gray2'>Keywords added:</span><span className='bg-transparentgreen1 fs-6 badge text-greenmain'>{' '}{clause&&clause.keywords?clause.keywords.length:0}{' '}</span>
        </div>
      </div>
      <div className="row justify-content-between mt-3 p-0 m-0 align-items-center">
      <div className="col-9 ps-0">
        <Droppable_keywords Data={clause} clause_name={clause&&clause.clause_name?clause.clause_name:""} setclause={setclause}/>
      </div>
      <div className="col-auto">
        
        <button className='bg-blue13 text-blue1 border-0 px-2 py-1 rounded-pill' onClick={()=>GenerateCombinations()}>Generate Combinations</button>
      </div>
      </div>
   
      </div>
      {/* clause approaches */}
      {
        isLoading2 || isFetching2 ? (
          <div className='mt-4'>getting clause alternatives...</div>
        ):(
          <>
          <button className='col-12 ps-2 pe-4 text-start d-flex justify-content-between text-blue1 bg-transparent mt-3 border-0 ' data-bs-toggle="collapse" data-bs-target="#collapseApproaches" aria-expanded="false" aria-controls="collapseApproaches">
            <p className='p-0 m-0'>Approaches for {clause&&clause.clause_name?clause.clause_name:''}</p> 
             <i className='bx bxs-down-arrow'></i>            
             </button>
          <div className='collapse show' id='collapseApproaches'>
                  <nav className='pt-2'>
                    <div className="nav scroll border-0 nav-tabs clause_nature" id="nav-tab" role="tablist">
                      {
                       clause_alt&&clause_alt !=undefined && clause_alt.length!=0 && clause_alt.map((Data,i)=>(
                        <button className={`nav-link ${i==index?' active':''}`} id={`nav-${i}-tab`} onClick={()=>{setindex(i);setclause_alt_id(Data.id);setcategory('simple')}} data-bs-toggle="tab" data-bs-target={`#nav-${i}`} type="button" role="tab" aria-controls={`nav-${i}`} aria-selected="true">
                        <input
                        maxLength={100} 
                        value={Data.nature?Data.nature:''}
                        onChange={ ( e ) => {
                         const updatednature = clause_alt.map(item => {
                           if (item.id === Data.id) {
                             return { ...item, nature:e.target.value };
                           }
                           return item; 
                         });
                         setclause_alt(updatednature);
                       }}
                       placeholder='clause Nature'
                      />
                     </button>
                      ))
                      }
                    <button className="nav-link d-flex align-items-center" id="nav-new-tab" data-bs-toggle="tab" data-bs-target="#nav-new" type="button" role="tab" aria-controls="nav-new" aria-selected="true">
                     <i className='bx bx-plus-circle fs-5 me-2'></i>approach
                     </button>
                    </div>
                  </nav>
              <div className="tab-content bg-blue13 pt-2" id="nav-tabContent">
                {
                 clause_alt.length!=0&&clause_alt.map((Data,i)=>(
                  <>
                  <div className={`tab-pane ${i==index?'fade show active':'fade'}`} onClick={()=>setindex(i)} id={`nav-${i}`} role="tabpanel" aria-labelledby={`nav-${i}-tab`} tabindex="0">
                  <button className='col-12 pe-4 d-flex justify-content-between ps-2 text-start text-blue1 py-2 bg-blue13 shadow-0 border-0 ' data-bs-toggle="collapse" data-bs-target="#collapseApproachdetails" aria-expanded="false" aria-controls="collapseApproachdetails">
                    <p className='p-0 m-0'>Approach details</p>
            <i className='bx bxs-down-arrow'></i>                    </button>
                  <div className='collapse show px-1' id='collapseApproachdetails'>
                  <div className='row pt-2 pe-4 justify-content-between'>
                    <div className="col-8">
                    </div>
                    <div className="col-auto d-flex align-items-center">
                    <i className='bx bx-save text-blue1'></i>
                    <button className='bg-transparent text-blue1 border-0' onClick={()=>update_clauseAlt(Data)}>Update {Data.nature}</button>
                    </div>
                      <div className="col-auto">
                      <div className="dropdown d-flex align-items-center">
                      <i className='bx bx-cog text-blue1' role="button" data-bs-toggle="dropdown" aria-expanded="false" ></i>
                     <span className='text-blue1' role="button" data-bs-toggle="dropdown" aria-expanded="false" >settings</span>                
                    <ul className="dropdown-menu">
                      {
                        Data.status == 0 ? (
                          <li onClick={()=>{Switch_status(Data.id,1)}}><div className="dropdown-item">Enable</div></li>
                        ):(
                          <li onClick={()=>{Switch_status(Data.id,0)}}><div className="dropdown-item">Disable</div></li>
                        )
                      }
                      <li onClick={()=>{Confirm_delete(Data.id)}}><div className="dropdown-item">Delete</div></li>
                    </ul>
                    </div>
                      </div>

                  </div>
                    <div className="form__group field w-100">
                    <textarea maxLength={1000} type="input" className="form__field bg-white w-100 p-2" value={Data.rationale?Data.rationale:''} 
                       onChange={ ( e ) => {
                        const updatedrationale = clause_alt.map(item => {
                          if (item.id === Data.id) {
                            return { ...item, rationale:e.target.value };
                          }
                          return item; 
                        });
                         setclause_alt(updatedrationale)
                      }}
                    placeholder="Type clause purpose here..." name="purpose" />
                    <label for="purpose" className="form__label">Definition of {Data.nature?Data.nature:''}</label>
                    <span className='position-absolute end-0 bottom-0 mb-2 me-4'>{Data.rationale!==undefined||Data.rationale!==null?Data.rationale.length:0}/1000</span>
                    </div>

                    <div className="form__group field w-100">
                    <textarea maxLength={1000} type="input" className="form__field bg-white p-2 w-100" value={Data.explaination?Data.explaination:''} 
                       onChange={ ( e ) => {
                        const updatedrationale = clause_alt.map(item => {
                          if (item.id === Data.id) {
                            return { ...item, explaination:e.target.value };
                          }
                          return item; 
                        });
                         setclause_alt(updatedrationale)
                      }}
                    placeholder="Type clause rationale here..." name="rationale" />
                    <label for="rationale" className="form__label">Purpose or Rationale of {Data.nature?Data.nature:''}</label>
                    <span className='position-absolute end-0 bottom-0 mb-2 me-4'>{Data.explaination!==undefined&&Data.explaination!==null?Data.explaination.length:0}/1000</span>
                    </div>
                    </div>
                    <div className=''>
                      <div className="d-flex justify-content-end me-2 ">
                      <button className='nav-link bg-white px-3 py-2 rounded-top-2 text-blue1 border-0'onClick={()=>Update_clause_alt_category(clause_alt_ctrgy)}><i className='bx bx-save text-blue1'></i><small className='fw-bold text-blue1'>Save clauses</small></button>
                      </div>
                    {               
                      categories!==undefined && categories.length!==0 ? (
                        <ul className="nav nav-pills border-bottom border-blue1 bg-white mb-3" id="pills-tab" role="tablist"> 
                        {
                              categories.map((item,i)=>(
                              <li className={`nav-item`} role="presentation" onClick={()=>(setcategory(item))}>
                              <button className={`nav-link ${ctgryindex==i?'active':""}`} onClick={()=>{setctgryindex(i)}} id={`pills-${item}-tab`} data-bs-toggle="pill" data-bs-target={`#pills-${item}`} type="button" role="tab" aria-controls={`pills-${item}`} aria-selected="true">
                              {item}
                              </button>
                            </li>
                            ))
                        } 
                      </ul>
                      ):(<></>)
                    }
                    <button className='col-12 ps-2 pe-4 text-start d-flex justify-content-between text-blue1 bg-transparent mt-3 border-0 ' data-bs-toggle="collapse" data-bs-target="#collapseKeywords" aria-expanded="false" aria-controls="collapseKeywords">
                    <p className='p-0 m-0'>Keyword combinations for {category} clauses</p> 
                    <i className='bx bxs-down-arrow'></i>
                    </button>
                    <div className='collapse show' id='collapseKeywords'>
                    <div className='d-flex justify-content-end p-0 m-0 ms-3 me-3 ' >
                    <button className='text-blue1 border-0 bg-white px-3 py-2 bg-white rounded-top-2' onClick={()=>updateKC()}>
                    <i className='bx bx-save text-blue1'></i>
                    <small className='fw-bold'>Save</small></button>
                    </div>
                    <div className='overflow-scroll position-relative' style={{maxHeight:'40vh'}}>
                   {
                     isLoading4 || isFetching4 ? (
                     <div>loading keyword combinations...</div>):(
                      keyword_combinations!==null&&keyword_combinations!==undefined && keyword_combinations.length!==0?(
                      <table className={`table ps-3 bg-white d-${keyword_combinations.category == category?'':'none'}`}>
                        <thead className='text-gray2'>
                            <tr className=''>
                              <th className='fw-normal' scope="col">S.No</th>
                              <th className='fw-normal' scope="col">Prefix</th>
                              <th className='fw-normal' scope="col">Keyword 1</th>
                              <th className='fw-normal' scope="col">Middle</th>
                              <th className='fw-normal' scope="col">Keyword 2</th>
                              <th className='fw-normal' scope="col">Suffix</th>
                            </tr>
                        </thead>
                      <tbody>
                        {
                      keyword_combinations.keyword_combinations!==null&&keyword_combinations.keyword_combinations!==undefined && keyword_combinations.length!==0 && keyword_combinations.keyword_combinations.map((item,i)=>(
                      <tr className='border-white'>
                        <th className='fw-normal'>{i+1}.</th>
                        <td>
                          <input className='input_border_bottom bg-transparent'
                          type='text' value={item.prefix}
                          onChange={(e)=>{UpdateKeywordCombination(item.id,'prefix',e.target.value)}}
                          onBlur={()=> queryclient.setQueryData(["keyword_combinations",id,clause_alt_id,category],keyword_combinations)}
                          />
                        </td>
                        <td>{item.keyword1}</td>
                        <td>
                        {
                            item.middle!==undefined? (
                            
                              <input className='input_border_bottom' type='text' 
                              value={item.middle}
                              onChange={(e)=>{UpdateKeywordCombination(item.id,'middle',e.target.value)}}
                              onBlur={()=> queryclient.setQueryData(["keyword_combinations",id,clause_alt_id,category],keyword_combinations)}
                              />
                            
                            ):(
                              <></>
                            )
                          }
                        </td>
                        <td>{item.keyword1}</td>
                        <td>
                        <input className='input_border_bottom bg-transparent' type='text' value={item.suffix}
                        onChange={(e)=>{UpdateKeywordCombination(item.id,'suffix',e.target.value)}}
                        onBlur={()=> queryclient.setQueryData(["keyword_combinations",id,clause_alt_id,category],keyword_combinations)}
                        />
                        </td>
                      </tr>
                      )) 
                        }
                      </tbody>
                      </table> 
                       
                  ):(
              keyword_combinations.keyword_combinations==null||clause.keyword_combinations!==null ? (
                <button className='border-0 text-blue1 bg-transparent border-bottom border-blue1 d-flex align-items-center ' 
                onClick={()=>{AddKeyword_combinations()}}><i className='bx bx-plus-circle fs-5'></i>Get Combinations for {category} clauses</button>
              ):(
                <button className='border-0 text-blue1 bg-transparent border-bottom border-blue1 d-flex align-items-center ' 
                onClick={()=>{AddKeyword_combinations()}}><i className='bx bx-plus-circle fs-5'></i>Get Combinations for {category} clauses</button>
              )
             )
                    )
                  }
                  </div>
                  </div>
          {
            isLoading3 || isFetching3 ? (
            <div>loading clause alternate categories ....</div>)
            :(
            clause_alt_ctrgy!==undefined && clause_alt_ctrgy.length!==0 ? (
              <div>

              {
              clause_alt_ctrgy.map((item,i)=>(
                <div className={`d-${item.category==category?'block':'none'} my-2`}>
                <select value={item.keyword?item.keyword:""} 
                onChange={(e)=>{                   
                  const updatedClauses = clause_alt_ctrgy.map((data,i) => {
                    const newdata = e.target.value
                  if (i == editorIndex) {
                    return { ...data, keyword: newdata};
                  }
                  return data; 
                })
                setclause_alt_ctrgy(updatedClauses)
                }} 
              onBlur={()=> queryclient.setQueryData(["clause_alt_ctrgy",id,clause_alt_id],clause_alt_ctrgy)}
                className='border rounded-top-1 border-bottom-0 pe-2 py-2'>
                    <option value='null' className='text-gray2'>Choose combination for this sample clause</option>
                   {
                     keyword_combinations!==null && keyword_combinations!==undefined&&keyword_combinations.length!==0&&keyword_combinations.keyword_combinations!==null&&keyword_combinations.keyword_combinations.map((combinations,i)=>(
                       <option className='' value={JSON.stringify(combinations)}>{combinations.prefix}{' '}{combinations.keyword1}{' '}{combinations.middle}{' '}{combinations.keyword2}{' '}{combinations.suffix}</option>
                     ))
                   }
                 </select>
                <CKEditor
                   editor={Editor}
                   config={editorConfiguration}
                   data={item.html?item.html:'<p></p>'}
                   onReady={ ( editor ) => {
                     if(editor){
                       return editor
                     }
                   }}
                   onChange={(event,editor)=>{          
                    const newdata  = editor.getData()        
                    const updatedClauses = clause_alt_ctrgy.map((data,index) => {
                    if (index == editorIndex) {
                      return { ...data, html: newdata};
                    }
                    return data; 
                  })
                  setclause_alt_ctrgy(updatedClauses)
                  }}
                  onBlur={()=> queryclient.setQueryData(["clause_alt_ctrgy",id,clause_alt_id],clause_alt_ctrgy)}
                     />
                </div>

              ))
              }
                <div className="row p-0 m-0 mt-3 justify-content-center">
               <div 
               onClick={()=>{
              setclause_alt_ctrgy(prevState=>([...prevState,New_clause_alt_category_obj]));
              queryclient.setQueryData(["clause_alt_ctrgy",id,clause_alt_id],clause_alt_ctrgy);
              }} className="col-11 d-flex align-items-center justify-content-center cursor-pointer rounded-2 bg-white mb-4 py-2 text-center">
               <i className='bx bxs-add-to-queue text-blue1'></i><span className='text-blue1'>Add {category} clause</span>
               </div>
             </div>
              </div>
            ):(<div>no categories found</div>)
            )
          }
                    </div>
                  </div>
                  </>
                ))
                }
                {/* Add new clause Alternate */}
                <div className="tab-pane fade mt-3" id="nav-new" role="tabpanel" aria-labelledby="nav-new-tab" tabindex="0">
                <div className="float-end cursor-pointer me-5 mb-3" style={{width:'min-content'}} onClick={()=>Add_new_clause_alt()} >
                <div className="d-flex align-items-center">
                <span className="text-blue1">Save</span><i className='bx bxs-save text-blue1' ></i>
                </div>
                </div> 
                <section className='col-12'>
                <label htmlFor="clause_tag">clause Nature</label>
                <input type="text" className='mb-4 py-2 border border-gray1 w-100 d-block p-2' 
                value={new_clause_alt&&new_clause_alt.nature?new_clause_alt.nature:''} 
                onChange={(e)=>{setnew_clause_alt(prevState=>({...prevState,nature:e.target.value}))}}/>
                <label htmlFor="rationale" className='text-gray1 p-2'>clause Purpose</label>
                <textarea className='mb-4 py-2 border border-gray1 w-100 d-block p-2' value={new_clause_alt&&new_clause_alt.rationale?new_clause_alt.rationale:''} onChange={(e)=>{setnew_clause_alt(prevState=>({...prevState,rationale:e.target.value}))}} />
                <label htmlFor="rationale" className='text-gray1 p-2'>clause Explaination</label>
                <textarea className='mb-4 py-2 border border-gray1 w-100 d-block p-2' value={new_clause_alt&&new_clause_alt.explaination?new_clause_alt.explaination:''} onChange={(e)=>{setnew_clause_alt(prevState=>({...prevState,explaination:e.target.value}))}} />
                </section>

                </div>
                {/* Add new clause Alternate */}
                </div>
          </div>
     

          </>
        )}
      </div>
      )
     }
    </section>
     {/*old ui */}
    </section>
  )
}

export default Update_clause