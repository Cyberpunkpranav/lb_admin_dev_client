import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import Draggable_scenerios from './draggable_scenerios';
import Droppable_Active_scenerois from './droppable_active_scenerios';
import Droppable_Inactive_scenerois from './droppable_inactive_scenerios';
import { Get_Clause_by_id,Get_Clause_alt_by_id,Get_Clause_alt_ctgry_by_id } from '../../../../api/get_apis'
import { Update_Clause,Add_Clause_alternate,Switch_Clause_alternates } from '../../../../api/post_apis';
import { Delete_Clause_alternate } from '../../../../api/delete_apis';
import {Link,useParams} from 'react-router-dom'
import Notiflix from 'notiflix'
import { useQuery } from "@tanstack/react-query";
import toast from 'react-hot-toast';
import '../../../../css/services/clauses/clauses.css'
import '../../../../css/loader.css'

const Update_clause = () => {
    const {id} = useParams()
    let clauses=[]
    const [clauseloading,setclauseloading] = useState(false)
    const [index,setindex] = useState(0)
    const [clause,setclause] = useState([])
    const [clause_alt,setclause_alt] = useState([])
    const [clause_alt_ctgry,setclause_alt_ctgry] = useState([])
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

    const get_clause = async()=>{
        const clause = await Get_Clause_by_id(id)
        return clause
    }
    const { isLoading:isLoading1, isFetching:isFetching1,isFetched, isError:isError1, data:clause_data , error:error1 } = useQuery(
    { 
    queryKey: ["clause",id],
     queryFn: get_clause ,
    })
    const get_clause_alt = async()=>{
        const clause_alt = await Get_Clause_alt_by_id(clause_data.data.id)
        return clause_alt
    }
    const { isLoading:isLoading2, isFetching:isFetching2, isError:isError2, data:clause_alt_data , error:error2 } = useQuery(
      { 
      queryKey: ["clause_alt",clause_data!==undefined ? clause_data.data.id:""],
       queryFn:get_clause_alt,
      })
    const  get_clause_alt_ctgry = async()=>{
      const clause_alt_ctgry = await Get_Clause_alt_ctgry_by_id(id)
      return clause_alt_ctgry
    }
    const { isLoading:isLoading3, isFetching:isFetching3, isError:isError3, data:clause_alt_ctgry_data , error:error3 } = useQuery(
      { 
      queryKey: ["clause_alt_ctgry",clause_data!==undefined ? clause_data.data.id:""],
       queryFn:get_clause_alt_ctgry,
      })  
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
    useEffect(()=>{
      if (clause_data && clause_data.data) {
        setclause(clause_data.data)
      }
    },[clause_data])

    useEffect(()=>{
      if (clause_alt_data && clause_alt_data.data) {
        setclause_alt(clause_alt_data.data)
      }
    },[clause_alt_data])
    useEffect(()=>{
      if (clause_alt_ctgry_data && clause_alt_ctgry_data.data) {
        setclause_alt_ctgry(clause_alt_ctgry_data.data)
      }
    },[clause_alt_ctgry_data])
    
    const Update = async()=>{
    Notiflix.Loading.arrows()
        const Data = await Update_Clause(clauses)
        if(Data.data.status==true){
          Notiflix.Loading.remove()
          // getData()
          toast.success(Data.data.message)
          }else{
          Notiflix.Loading.remove()
          toast.error(Data.data.message)
        }
    }
    const Add_new_clause_alt = async()=>{
      Notiflix.Loading.dots()
      const res = await Add_Clause_alternate(clause_alt)
      if(res.data.status==true){
        Notiflix.Loading.remove()
       toast.success(res.data.message)
      //  window.location.reload()
      // getData()
      }else{
        Notiflix.Loading.remove()
        toast.error(res.data.message)
      }
    }
    const Switch_status = async(id,status)=>{
      const data = await Switch_Clause_alternates(id,status)
      console.log(data);
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

    const handleDeleteScenerio= (index) => {
      setclause((prevData) => {
        const updatedScenerios = [...prevData.scenerios];
        updatedScenerios.splice(index, 1);
        return { ...prevData, scenerios: updatedScenerios };
      });
    };

    if(clause&&clause.scenerios!==undefined&&typeof(clause.scenerios)=='string'){
      clause.scenerios = JSON.parse(clause.scenerios)
    }

    if(clause)
    console.log(clause_alt_ctgry);
    return (
    <section className='container mt-4'>
      <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><Link to="/">Home</Link></li>
        <li class="breadcrumb-item"><Link to="/Admin/services/libraries/clauses">Clauses</Link></li>
        <li class="breadcrumb-item active" aria-current="page">{clause&&clause.clause_name!==undefined&&clause.clause_name!==null?clause.clause_name:""}</li>
      </ol>
      </nav>
      {
         isLoading1 || isFetching1 ? (
          <span class="loader"><h4 className='mb-5 pb-3'>LegalBuddy</h4></span>
        ):(
      <div className='container-fluid updateclausesection p-0 m-0 position-relative mt-4'>
      <div className="row justify-content-between">
      <div className="col-10">
      <div className="form__group field">
      <input maxLength={100} type="input" className="form__field w-100" value={clause&&clause.clause_name?clause.clause_name:""} onChange={(e)=>  setclause(prevState=>({...prevState,clause_name:e.target.value}))} placeholder="Type clause Name here..." name="name" id='name' required />
      <span className='position-absolute end-0 bottom-0'>{clause&&clause.clause_name!==undefined&&clause.clause_name!==null?clause.clause_name.length:0}/100</span>
      <label for="name" className="form__label"> Clause</label>
      </div>
      </div>
      <div className="col-auto">
      <div className="d-flex align-items-center justify-content-end cursor-pointer " onClick={()=>Update()}>
      <span className='p-0 m-0 text-blue1'>Save & Update</span>
      <i className='bx bx-save fs-5 text-blue1'></i>
      </div>
      </div>
      </div>

      <div className="col-11 my-4">
      <div className="form__group field w-100">
      <textarea maxLength={1000} type="input" className="form__field pe-5" value={clause&&clause.definition?clause.definition:''} onChange={(e)=>setclause(prevState=>({...prevState,definition:e.target.value}))} />
      <label for="name" className="form__label">Definition of {clause&&clause.clause_name?clause.clause_name:""}</label>
      <span className='position-absolute end-0 bottom-0 mb-2'>{clause&&clause.definition!==undefined&&clause.definition!==null?clause.definition.length:0}/1000</span>
      </div>
      </div>
      <div className="col-11 my-4"> 
      <div className="form__group field w-100">
      <textarea maxLength={1000} type="input" className="form__field pe-5" value={clause&&clause.rationale?clause.rationale:''} onChange={(e)=>setclause(prevState=>({...prevState,rationale:e.target.value}))} />
      <label for="name" className="form__label">Purpose of {clause&&clause.clause_name?clause.clause_name:""}</label>
      <span className='position-absolute end-0 bottom-0 mb-2'>{clause&&clause.rationale!==undefined&&clause.rationale!==null?clause.rationale.length:0}/1000</span>
      </div>
      </div>
        <div className="col my-4">
        <p className='d-flex align-items-center'>keywords<i class='bx cursor-pointer bxs-plus-circle fs-4 ms-2 text-blue1' onClick={()=>setclause(prevState=>({...prevState,scenerios:[...clause.scenerios,'']}))} ></i>  
        </p>
        {
          clause.scenerios&&clause.scenerios!==undefined&&clause.scenerios.length!==0?(
            clause.scenerios!==undefined && clause.scenerios.map((scenerio,i)=>(
              <span className='me-2'>
                {/* <input className='border-bottom text-black' onChange={(e)=>handleScenerioChange(i,e.target.value)} value={scenerio?scenerio:""}/> */}
                <Draggable_scenerios index={i} scenerio={scenerio} setclause={setclause}/>
                <i class='bx bx-x text-redmain cursor-pointer' onClick={() => handleDeleteScenerio(i)}></i>
              </span>
            ))
          ):(
            <p className='text-gray2'>no keywords</p>
          )
        
        }
        
      </div>
      {
        isLoading2 || isFetching2 ? (
          <div>getting clause alternatives...</div>
        ):(
          <>
                  <nav className='pt-2'>
                    <div className="nav scroll nav-tabs" id="nav-tab" role="tablist">
                      {
                       clause_alt&&clause_alt !=undefined && clause_alt.length!=0&& clause_alt.map((Data,i)=>(
                        <button className={`nav-link ${i==index?' active':''}`} id={`nav-${i}-tab`} onClick={()=>setindex(i)} data-bs-toggle="tab" data-bs-target={`#nav-${i}`} type="button" role="tab" aria-controls={`nav-${i}`} aria-selected="true">
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
                         clause_alt = updatednature;
                       }}
                       placeholder='clause Nature'
                      />
                     </button>
                      ))
                      }
                    <button className="nav-link d-flex align-items-center" id="nav-new-tab" data-bs-toggle="tab" data-bs-target="#nav-new" type="button" role="tab" aria-controls="nav-new" aria-selected="true">
                    add <i className='bx bx-plus'></i>
                     </button>
                    </div>
                  </nav>
              <div className="tab-content" id="nav-tabContent">
                {
                clause_alt&&clause_alt !=undefined && clause_alt.length!=0&&clause_alt.map((Data,i)=>(
                  <>
                  <div className={`tab-pane ${i==index?'fade show active':'fade'}`} onClick={()=>setindex(i)} id={`nav-${i}`} role="tabpanel" aria-labelledby={`nav-${i}-tab`} tabindex="0">
                  <div className='row mt-4 justify-content-between'>
                      <div className="col-10">
                        <p className='p-0 m-0'><span className='text-greenmain'>Active Scenerios</span> for {Data.nature?Data.nature:''}</p>
                        <Droppable_Active_scenerois Data={Data} clause_alt = {clause_alt} setclause_alt={setclause_alt}/>
                        </div>
                      <div className="col-auto">
                      <div className="dropdown">
                     <span className='text-blue1' role="button" data-bs-toggle="dropdown" aria-expanded="false" >settings</span>                
                    <i className='bx bx-cog text-blue1' role="button" data-bs-toggle="dropdown" aria-expanded="false" ></i>
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

                      <div className="col-10">
                        <p className='p-0 m-0'><span className='text-redmain'>Inactive Scenerios</span> for {Data.nature?Data.nature:''}</p>
                        <Droppable_Inactive_scenerois Data={Data} clause_alt = {clause_alt} setclause_alt={setclause_alt}/>
                        </div>
                  </div>
    
                    <div className="form__group field w-100">
                    <textarea maxLength={1000} type="input" className="form__field w-100" value={Data.rationale?Data.rationale:''} 
                               onChange={ ( e ) => {
                                setclause_alt(prevState=>({...prevState,rationale:e.target.value}))
                              }}
                    placeholder="Type clause purpose here..." name="purpose" required />
                    <label for="purpose" className="form__label">Definition of {Data.nature?Data.nature:''}</label>
                    <span className='position-absolute end-0 bottom-0 mb-2'>{Data.rationale!==undefined||Data.rationale!==null?Data.rationale.length:0}/1000</span>
                    </div>

                    <div className="form__group field w-100">
                    <textarea maxLength={1000} type="input" className="form__field w-100" value={Data.explaination?Data.explaination:''} 
                       onChange={ ( e ) => {
                        const updatedrationale = clause_alt.map(item => {
                          if (item.id === Data.id) {
                            return { ...item, explaination:e.target.value };
                          }
                          return item; 
                        });
                         setclause_alt(prevState=>({...prevState,clauses:updatedrationale}))
                      }}

                    placeholder="Type clause rationale here..." name="rationale" required />
                    <label for="rationale" className="form__label">Purpose or Rationale of {Data.nature?Data.nature:''}</label>
                    <span className='position-absolute end-0 bottom-0 mb-2'>{Data.explaination!==undefined&&Data.explaination!==null?Data.explaination.length:0}/1000</span>
                    </div>
                    </div>
                        <ul className="nav nav-pills mb-3 mt-3" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                              <button className="nav-link active" id={`pills-${Data.nature?words_extraction(Data.nature):`clausetype${Data.id}`}-simple-tab`} data-bs-toggle="pill" data-bs-target={`#pills-${Data.nature?words_extraction(Data.nature):`clausetype${Data.id}`}-simple`} type="button" role="tab" aria-controls={`pills-${Data.nature?words_extraction(Data.nature):`clausetype${Data.id}`}-simple`} aria-selected="true">
                              simple
                              </button>
                        </li>
                        </ul>
                        {
                          clause_alt_ctgry!==undefined&&clause_alt_ctgry.length!==0?(
                            <div className="tab-content " id="pills-tabContent">
                            {
                           clause_alt_ctgry&&clause_alt_ctgry.map((data)=>(
                          <div className={`tab-pane fade show active ${Data.nature} d-${data.clause_alt_id==Data.id?'block':'none'}`} id={`pills-${Data.nature?words_extraction(Data.nature):`clausetype${Data.id}`}-simple`} role="tabpanel" aria-labelledby={`pills-${Data.nature?words_extraction(Data.nature):`clausetype${Data.id}`}-simple-tab`} tabindex="0">
                          <div name='clause_simple' className={`ck_editor d-${data.category=='simple'?'block':"none"}`}>
                           {Data.nature?Data.nature:''} {data.category}
                          <CKEditor
                          editor={Editor}
                          config={editorConfiguration}
                          data={data.html?data.html:'<p></p>'}
                          onReady={ ( editor ) => {
                            if(editor ){
                              return editor
                            }
                          }}
                          onChange={ ( event, editor ) => {
                            const newdata = editor.getData()
                            const updatedClauses =data.map(item => {
                              if (item.id === data.id) {
                                return { ...item, html: newdata };
                              }
                              return item; 
                            });
                            setclause_alt_ctgry(prevState=>({...prevState,data:updatedClauses}))
                          }
                        }
                        />
                          </div>
                          </div>
                              ))
                            }
                            </div>
                         
                          ):(
                            <div>no simple category of sample clauses found</div>
         
                          )
                    
                        }
                 
                      </>
                ))
                }
            
              </div>
          </>
        )}
      

        
      


     {/* <div className="col">
      {
        clause_alt&&clause_alt !=undefined && clause_alt.length!=0?(
          <>
              <nav className='pt-2'>
                <div className="nav scroll nav-tabs" id="nav-tab" role="tablist">
                  {
                     clause_alt.map((Data,i)=>(
                    <button className={`nav-link ${i==index?' active':''}`} id={`nav-${i}-tab`} onClick={()=>setindex(i)} data-bs-toggle="tab" data-bs-target={`#nav-${i}`} type="button" role="tab" aria-controls={`nav-${i}`} aria-selected="true">
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
                     setdata(prevState=>({...prevState,clauses:updatednature}))
                   }}
                   placeholder='clause Nature'
                  />
                 </button>
                  ))
                  }
                <button className="nav-link d-flex align-items-center" id="nav-new-tab" data-bs-toggle="tab" data-bs-target="#nav-new" type="button" role="tab" aria-controls="nav-new" aria-selected="true">
                add <i className='bx bx-plus'></i>
                 </button>
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                {
                   data.clauses !=undefined && data.clauses.map((Data,i)=>(
                    <div className={`tab-pane ${i==index?'fade show active':'fade'}`} onClick={()=>setindex(i)} id={`nav-${i}`} role="tabpanel" aria-labelledby={`nav-${i}-tab`} tabindex="0">

            <ul className="nav nav-pills mb-3 mt-3" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active" id={`pills-${Data.nature?words_extraction(Data.nature):`clausetype${Data.id}`}-simple-tab`} data-bs-toggle="pill" data-bs-target={`#pills-${Data.nature?words_extraction(Data.nature):`clausetype${Data.id}`}-simple`} type="button" role="tab" aria-controls={`pills-${Data.nature?words_extraction(Data.nature):`clausetype${Data.id}`}-simple`} aria-selected="true">
                simple 
                <span className='text-gray2 ms-2'>
                <small>
                {Data.simple!==undefined&&Data.simple!==null
                ?
                <span className={`${Data.simple.length==0?'text-redmain':'text-gray2'}`}>{Data.simple.length}</span>
                :
                <span className='text-redmain'>0</span>}
                </small>
                </span>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id={`pills-${Data.nature?words_extraction(Data.nature):`clausetype${Data.id}`}-moderate-tab`} data-bs-toggle="pill" data-bs-target={`#pills-${Data.nature?words_extraction(Data.nature):`clausetype${Data.id}`}-moderate`} type="button" role="tab" aria-controls={`pills-${Data.nature?words_extraction(Data.nature):`clausetype${Data.id}`}-moderate`} aria-selected="false">
                  moderate 
                  <span className='text-gray2 ms-2'>
                  <small>
                  {Data.moderate!==undefined&&Data.moderate!==null
                  ?
                  <span className={`${Data.moderate.length==0?'text-redmain':'text-gray2'}`}>{Data.moderate.length}</span>
                  :
                  <span className='text-danger'>0</span>}
                  </small>
                  </span>
                  </button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id={`pills-${Data.nature?words_extraction(Data.nature):`clausetype${Data.id}`}-complex-tab`} data-bs-toggle="pill" data-bs-target={`#pills-${Data.nature?words_extraction(Data.nature):`clausetype${Data.id}`}-complex`} type="button" role="tab" aria-controls={`pills-${Data.nature?words_extraction(Data.nature):`clausetype${Data.id}`}-complex`} aria-selected="false">
                  complex 
                  <span className='text-gray2 ms-2'>
                  <small>{Data.complex!==undefined&&Data.complex!==null?<span className={`${Data.complex.length==0?'text-redmain':'text-gray2'}`}>{Data.complex.length}</span>:<span className='text-danger'>0</span>}</small></span></button>
              </li>
            </ul>
            <div className="tab-content " id="pills-tabContent">
              <div className="tab-pane fade show active" id={`pills-${Data.nature?words_extraction(Data.nature):`clausetype${Data.id}`}-simple`} role="tabpanel" aria-labelledby={`pills-${Data.nature?words_extraction(Data.nature):`clausetype${Data.id}`}-simple-tab`} tabindex="0">
              <div  name='clause_simple' className='ck_editor'>
                  <CKEditor
                  editor={Editor}
                  config={editorConfiguration}
                  data={Data.simple?Data.simple:'<p></p>'}
                  onReady={ ( editor ) => {
                    if(editor ){
                      return editor
                    }
                  }}
                  onChange={ ( event, editor ) => {
                    const newdata = editor.getData()
                    const updatedClauses =data.clauses.map(item => {
                      if (item.id === Data.id) {
                        return { ...item, simple: newdata };
                      }
                      return item; 
                    });
                    setdata(prevState=>({...prevState,clauses:updatedClauses}))
                  }
                }
                />
            </div>
              </div>
              <div className="tab-pane fade" id={`pills-${Data.nature?words_extraction(Data.nature):`clausetype${Data.id}`}-moderate`} role="tabpanel" aria-labelledby={`pills-${Data.nature?words_extraction(Data.nature):`clausetype${Data.id}`}-moderate-tab`} tabindex="1">
              <div name='clause_moderate' className='ck_editor'>
                  <CKEditor
                  editor={Editor}
                  config={editorConfiguration}
                  data={Data.moderate?Data.moderate:'<p></p>'}
                  onReady={ ( editor ) => {
                    if(editor ){
                      return editor
                    }
                  }}
                  onChange={ ( event, editor ) => {
                    const newdata = editor.getData()
                    const updatedClauses =data.clauses.map(item => {
                      if (item.id === Data.id) {
                        return { ...item, moderate: newdata };
                      }
                      return item; 
                    });
                    setdata(prevState=>({...prevState,clauses:updatedClauses}))
                  }
                }
                />
              
        
            </div>
              </div>
              <div className="tab-pane fade" id={`pills-${Data.nature?words_extraction(Data.nature):`clausetype${Data.id}`}-complex`} role="tabpanel" aria-labelledby={`pills-${Data.nature?words_extraction(Data.nature):`clausetype${Data.id}`}-complex-tab`} tabindex="2">
              <div name='clause_complex' className='ck_editor'>
                  <CKEditor
                  editor={Editor}
                  config={editorConfiguration}
                  data={Data.complex?Data.complex:'<p></p>'}
                  onReady={ ( editor ) => {
                    if(editor ){
                      return editor
                    }
                  }}
                  onChange={ ( event, editor ) => {
                    const newdata = editor.getData()
                    const updatedClauses =data.clauses.map(item => {
                      if (item.id === Data.id) {
                        return { ...item, complex: newdata };
                      }
                      return item; 
                    });
                    setdata(prevState=>({...prevState,clauses:updatedClauses}))
                  }
                }
                />
            </div>
            </div>
            </div>
            </div>
                ))
                }
            <div className="tab-pane fade mt-3" id="nav-new" role="tabpanel" aria-labelledby="nav-new-tab" tabindex="0">
            <div className="float-end cursor-pointer me-5 mb-3" style={{width:'min-content'}} onClick={()=>Add_new_clause_alt()}>
              <div className="d-flex align-items-center">
              <span className="text-blue1">Save</span><i class='bx bxs-save text-blue1' ></i>
              </div>
           </div> 
                <section className='col-12'>
                <label htmlFor="clause_tag">clause Nature</label>
                <input type="text" className='mb-4 py-2 border border-gray1 w-100 d-block p-2' value={clause_alt&&clause_alt.nature?clause_alt.nature:''} onChange={(e)=>{setclause_alt(prevState=>({...prevState,nature:e.target.value}))}}/>
                <label htmlFor="rationale" className='text-gray1 p-2'>clause Purpose</label>
                <textarea className='mb-4 py-2 border border-gray1 w-100 d-block p-2' value={clause_alt&&clause_alt.rationale?clause_alt.rationale:''} onChange={(e)=>{setclause_alt(prevState=>({...prevState,rationale:e.target.value}))}} />
                <label htmlFor="rationale" className='text-gray1 p-2'>clause Explaination</label>
                <textarea className='mb-4 py-2 border border-gray1 w-100 d-block p-2' value={clause_alt&&clause_alt.explaination?clause_alt.explaination:''} onChange={(e)=>{setclause_alt(prevState=>({...prevState,explaination:e.target.value}))}} />
                <label htmlFor="sample clause" className='text-gray1'>Sample clause:Simple</label>
                <div className='ck_editor mb-4' name='simple clause'>
                  <CKEditor
                    editor={Editor}
                    config={editorConfiguration}
                  data={clause_alt.simple?clause_alt.simple:''}
                  onReady={ ( editor ) => {
                    if(editor && editor.model){
                      return editor
                    }
                  }}
                  onChange={ ( event, editor ) => {
                      if(editor && editor.model){
                        const newdata = editor.getData();
                        setclause_alt(prevState=>({...prevState,simple:newdata}))
                      }
                  }}
                />
            </div>
            <label htmlFor="sample clause" className='text-gray1'>Sample clause:Moderate</label>
            <div className='ck_editor mb-4' name='simple clause'>
                  <CKEditor
                    editor={Editor}
                    config={editorConfiguration}
                  data={clause_alt.moderate?clause_alt.moderate:''}
                  onReady={ ( editor ) => {
                    if(editor && editor.model){
                      return editor
                    }
                  }}
                  onChange={ ( event, editor ) => {
                      if(editor && editor.model){
                        const newdata = editor.getData();
                        setclause_alt(prevState=>({...prevState,moderate:newdata}))
                      }
                  }}
                />
            </div>
            <label htmlFor="sample clause" className='text-gray1'>Sample clause:Complex</label>
            <div className='ck_editor mb-4' name='simple clause'>
                  <CKEditor
                    editor={Editor}
                    config={editorConfiguration}
                  data={clause_alt.complex?clause_alt.complex:''}
                  onReady={ ( editor ) => {
                    if(editor && editor.model){
                      return editor
                    }
                  }}
                  onChange={ ( event, editor ) => {
                      if(editor && editor.model){
                        const newdata = editor.getData();
                        setclause_alt(prevState=>({...prevState,complex:newdata}))
                      }
                  }}
                />
            </div>
            </section>
    
            </div>
            </div>
          </>
        ):(
          <div className="container text-center text-gray2 ">No clause alternates found</div>
        )
      }
     </div> */}
     </div>
      )
     }
    </section>
  )
}

export default Update_clause