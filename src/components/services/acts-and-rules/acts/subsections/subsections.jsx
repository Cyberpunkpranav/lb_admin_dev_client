import React ,{Fragment, useEffect, useState} from 'react'
import { Get_SubSections_by_Section,Get_Clause_by_Subsection,Get_SubClause_by_Clause } from '../../../../../api/get_apis'
import { Update_Clause,Update_SubClause } from '../../../../../api/update_apis'
import { Add_Clause,Add_SubClause } from '../../../../../api/post_apis'
import convertToRoman from '../../../../../utils/number_to_roman'
import CK_Editor  from '../../../../../text_editor/ck_editor' 
import {Link, useLocation, useParams } from 'react-router-dom'
import '../../../../../css/acts/subsections.css' 
import Notiflix from 'notiflix'
import toast from 'react-hot-toast'

const Subsections = () => {
  const {state} = useLocation()

  const chapter_number = state.chapter.chapter_number
  const chapter_part = state.chapter.chapter_part
  const act_id = state.section.act_id
  const chapter_id = state.section.chapter_id
  const section_id = state.section.id
  const section_number = state.section.section_number
  const notified_date = state.section.notified_date
  const section = state.section.section
  const {act,chapter} = useParams()
const [subsections,setsubsections] = useState([])
const [loading,setloading] = useState(false)
const [subsection_id,setsubsection_id]=useState()
const [clause_id,setclause_id] = useState('')
const [subclause_id,setsubclause_id] = useState('')

const [updateclause_data ,setupdateclause_data] = useState({
  act_id: '',
  chapter_id:'',
  section_id:'',
  subsection_id:'',
  clause_number:'',
  content:''
})
const[newsubclause_data,setnewsubclause_data] = useState({
  act_id:'',
  chapter_id:'',
  section_id:'',
  subsection_id:'',
  clause_id:'',
  subclause_number:'',
  content:''
})
const [updatesubclause_data,setupdatesubclause_data] = useState({
  act_id:'',
  chapter_id:'',
  section_id:'',
  subsection_id:'',
  clause_id:'',
  subclause_number:'',
  content:''
})
let req = {
  act_id:act_id,
  chapter_id:chapter_id,
  section_id:section_id,
}
let subsectionobj = {
    id: '',
    act_id: '',
    chapter_id:'',
    section_id:'',
    subsection_number:'',
    subsection:'',
    clauses:[]
}
let clause_req = {
  id:'',
  act_id: '',
  chapter_id:'',
  section_id:'',
  subsection_id:'',
}
let clause_obj = {
  id:'',
  act_id: '',
  chapter_id:'',
  section_id:'',
  subsection_id:'',
  clause_number:'',
  clause:'',
  subclauses:[] 
}
let subclause_req={
  act_id: '',
  chapter_id:'',
  section_id:'',
  subsection_id:'',
  clause_id:'',
}
let subclause_obj={
  id:"",
  act_id: '',
  chapter_id:'',
  section_id:'',
  subsection_id:'',
  clause_id:'',
  subclause_number:'',
  subclause:''
}


function Setcurrentclause(Data){
  setclause_id(Data.id)
  setupdateclause_data({
    act_id:Data.act_id,
    chapter_id:Data.chapter_id,
    section_id:Data.section_id,
    subsection_id:Data.subsection_id,
    clause_number:Data.clause_number?Data.clause_number:'',
    content:Data.clause?Data.clause:''
  })
}
function Setnewsubclausedata(Data){
  setclause_id(Data.id)
  setnewsubclause_data({
    act_id:Data.act_id,
    chapter_id:Data.chapter_id,
    section_id:Data.section_id,
    subsection_id:Data.subsection_id,
    clause_id:Data.id,
  })
}
function Setcurrentsubclause(Data){
  setsubclause_id(Data.id)
  setupdatesubclause_data({
    act_id:Data.act_id,
    chapter_id:Data.chapter_id,
    section_id:Data.section_id,
    subsection_id:Data.subsection_id,
    clause_id:Data.clause_id,
    subclause_number:Data.subclause_number,
    content:Data.subclause
  })
}
const fetch = async()=>{
  setloading(true)
      let res = await Get_SubSections_by_Section(req)
      let subsections = res.data.data
      if(subsections){
        let arr = []
        for(let i =0;i<subsections.length;i++){
          subsectionobj = {
            id: subsections[i].id,
            act_id: subsections[i].act_id,
            chapter_id:subsections[i].chapter_id,
            section_id:subsections[i].section_id,
            subsection_number:subsections[i].subsection_number,
            subsection:subsections[i].subsection,
            clauses:[]
        }
        arr.push(subsectionobj)
        }
        for(let j=0;j<arr.length;j++){
          clause_req = {
            act_id: arr[j].act_id,
            chapter_id:arr[j].chapter_id,
            section_id:arr[j].section_id,
            subsection_id:arr[j].id,
          }
          let res2 = await Get_Clause_by_Subsection(clause_req)
          let clauses = []
          if(res2.data && res2.data.status == true){
            for(let k=0;k<res2.data.data.length;k++){
              clause_obj = {
                id:res2.data.data[k].id,
                act_id: res2.data.data[k].act_id,
                chapter_id:res2.data.data[k].chapter_id,
                section_id:res2.data.data[k].section_id,
                subsection_id:res2.data.data[k].subsection_id,
                clause_number:res2.data.data[k].clause_number,
                clause:res2.data.data[k].clause,
                subclauses:[]
              }
              clauses.push(clause_obj)
            }
          }
          arr[j].clauses = clauses
          for(let l=0;l<clauses.length;l++){
            subclause_req = {
              act_id: clauses[l].act_id,
              chapter_id:clauses[l].chapter_id,
              section_id:clauses[l].section_id,
              subsection_id:clauses[l].subsection_id,
              clause_id:clauses[l].id,
            }
            let res3 = await Get_SubClause_by_Clause(subclause_req)
            let subclauses = []
            if(res3.data && res3.data.status == true){
              for(let k=0;k<res3.data.data.length;k++){
                subclause_obj = {
                  id:res3.data.data[k].id,
                  act_id: res3.data.data[k].act_id,
                  chapter_id:res3.data.data[k].chapter_id,
                  section_id:res3.data.data[k].section_id,
                  subsection_id:res3.data.data[k].subsection_id,
                  clause_id:res3.data.data[k].clause_id,
                  subclause_number:res3.data.data[k].subclause_number,
                  subclause:res3.data.data[k].subclause
                }
                subclauses.push(subclause_obj)
              }
            }
            arr[j].clauses[l].subclauses = subclauses
          }
        }
     
        setsubsections(arr)
      }
      setloading(false)
}
// save and update functions



const Update_clause = async()=>{
  const res  = await Update_Clause(clause_id,updateclause_data)
  if(res.data.status==true){
    toast.success(res.data.message)
    setTimeout(()=>{
      window.location.reload()
    },1000)
  }else{
    toast.error(res.data.message)
  }
}
const Save_Subclause = async()=>{
  const res  = await Add_SubClause(newsubclause_data)
  if(res.data.status==true){
    toast.success(res.data.message)
    setTimeout(()=>{
      window.location.reload()
    },1000)
  }else{
    toast.error(res.data.message)
  }
}
const Update_Subclause = async()=>{
  const res  = await Update_SubClause(subclause_id,updatesubclause_data)
  if(res.data.status==true){
    toast.success(res.data.message)
    setTimeout(()=>{
      window.location.reload()
    },1000)
  }else{
    toast.error(res.data.message)
  }
}
// confirm popups



const confirm_Updateclause = () => {
  Notiflix.Confirm.show(
    `Update Clause`,
    `Are you sure you want to update this clause `,
    "Yes",
    "No",
    () => {
      Update_clause();
    },
    () => {
      return 0;
    },
    {}
  );
}
const confirm_AddSubclause = ()=>{
  Notiflix.Confirm.show(
    `Save Sub Clause`,
    `Are you sure you want to save this sub clause `,
    "Yes",
    "No",
    () => {
      Save_Subclause();
    },
    () => {
      return 0;
    },
    {}
  );
}
const confirm_UpdateSubclause = ()=>{
  Notiflix.Confirm.show(
    `Update Sub Clause`,
    `Are you sure you want to update this sub clause `,
    "Yes",
    "No",
    () => {
      Update_Subclause();
    },
    () => {
      return 0;
    },
    {}
  );
}
  useEffect(()=>{
        fetch()
  },[])
  let data ={
    id:act_id
  }
  const newsubsection_route_data = {
    act_id:act_id,
    chapter_id:chapter_id,
    section_id:section_id

  }
  return (
    <section className='container-fluid position-relative mt-4 py-4 '>
              <Link to={`../Admin/acts/${act}`}state={{data}} className='position-absolute start-0 ms-lg-5 top-0'><img className='icons img-fluid' src={process.env.PUBLIC_URL+'/images/back.png'}/></Link>
            <div className='position-absolute top-0 end-0 mt-5 me-5 pe-5'>Notified Date:{notified_date}</div>
            <h3 className='text-center'>{" "}{act}{" "}</h3> 
        <h4 className='text-center'>Chapter {convertToRoman(chapter_number)}{" "}{chapter}{" "}</h4> 
        <h5 className='text-center fw-normal mb-4'>{chapter_part==0?'':isNaN(chapter_part)?'Part '+ chapter_part:'Part '+convertToRoman(chapter_part)}</h5>
        <h5 className='text-center mb-4'>{section_number}. {section}</h5> 
        {
          loading?(
          <div className="loader">
          <div className="container  d-flex align-items-center">
          <strong role="status">Loading...</strong>
          <div className="spinner-border ms-auto" aria-hidden="true"></div>
        </div>
        </div>):(
          <div className="container mt-5">
            {
            subsections!=undefined && subsections.length>0?(     
              subsections && subsections.map((Data,i)=>(
                  <div className="row p-0 m-0 mt-5 justify-content-center" key={i}>
                    <div className="col-auto">{Data.subsection_number}</div>
                    <div className="col-8" dangerouslySetInnerHTML={{__html:Data.subsection?Data.subsection:''}}></div>
                  {/* UPDATE SECTION */}

                  <div className="col-1">
                  <Link className='btn btn-sm bg-blue13 text-blue1' to={`../Admin/acts/${act}/${chapter}/${section}/subsection/update`} state={{Data}}>Update</Link>
                  </div>
                  {/* NEW CLAUSE */}
                  <div className="col-2">
                  <Link className='btn btn-sm bg-blue13 text-blue1' to={`../Admin/acts/${act}/${chapter}/${section}/subsection/clause/new`} state={{Data}}>+ clause</Link>
                  </div>
                  {
                    Data.clauses.length>0 && Data.clauses.map((clauses,i)=>(
                    <div className="row mt-5 p-0 m-0 justify-content-center " key={i}>
                      <div className="col-auto">{clauses.clause_number}</div>
                      <div className="col-8" dangerouslySetInnerHTML={{__html:clauses.clause?clauses.clause:''}}></div>
                      {/* UPDATE CLAUSE */}
                      <div className="col-1">
                      <button type='button' className='btn btn-sm btn-blue13 text-blue1' data-bs-toggle="modal" data-bs-target={`#updateclause${clauses.id}`} onFocus={()=>{Setcurrentclause(clauses)}}>Update</button>
                        {
                          clause_id == clauses.id ?(
                            <div className="modal fade" id={`updateclause${clauses.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby={`updateclauseLabel${clauses.id}`} aria-hidden="true">
                            <div className="modal-dialog modal-dialog-scrollable modal-fullscreen">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h1 className="modal-title fs-5" id={`updateclauseLabel${Data.id}`}>Update Clause</h1>
                                  <button type="button" className="btn-close" onClick={()=>setclause_id('')} data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                <div className="col-2">
                                  <label htmlFor="subsection_number">Clause Number </label>
                                  <input type="text" name='subsection_number' className='form-control' value={updateclause_data.clause_number?updateclause_data.clause_number:''} onChange={(e)=>{setupdateclause_data(prevState=>({...prevState,clause_number:e.target.value}))}} />
                                  </div>
                                  <div className="col-10">
                                    <label htmlFor="subsection">Clause</label>
                                    <CK_Editor data={updateclause_data.content !==undefined?updateclause_data.content:''} setdata={setupdateclause_data}/>
                                  </div>
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-gray4" data-bs-dismiss="modal" onClick={()=>setclause_id('')}>Cancel</button>
                                  <button type="button" className="btn btn-blue1 text-white" onClick={()=>confirm_Updateclause()}>Done</button>
                                </div>
                              </div>
                            </div>
                          </div>
                          ):(<></>)
                        }
                      </div>
                      <div className="col-2">
                      <button type='button' className='btn btn-sm btn-blue13 text-blue1' data-bs-toggle="modal" data-bs-target={`#newsubclause${clauses.id}`} onFocus={()=>{Setnewsubclausedata(clauses)}}>+subclause</button>
                        {
                          clause_id == clauses.id ?(
                            <div className="modal fade" id={`newsubclause${clauses.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby={`newsubclauseLabel${clauses.id}`} aria-hidden="true">
                            <div className="modal-dialog modal-dialog-scrollable modal-fullscreen">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h1 className="modal-title fs-5" id={`newsubclauseLabel${Data.id}`}>New Sub Clause</h1>
                                  <button type="button" className="btn-close" onClick={()=>setclause_id('')} data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                <div className="col-2">
                                  <label htmlFor="subclause_number">SubClause Number </label>
                                  <input type="text" name='subclause_number' className='form-control' value={newsubclause_data.subclause_number?newsubclause_data.subclause_number:''} onChange={(e)=>{setnewsubclause_data(prevState=>({...prevState,subclause_number:e.target.value}))}} />
                                  </div>
                                  <div className="col-10">
                                    <label htmlFor="subclause">SubClause</label>
                                        <CK_Editor data={newsubclause_data.content!=undefined?newsubclause_data.content:'<p></p>'} setdata={setnewsubclause_data}/>
                                  </div>
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-gray4" data-bs-dismiss="modal" onClick={()=>setclause_id('')}>Cancel</button>
                                  <button type="button" className="btn btn-blue1 text-white" onClick={()=>confirm_AddSubclause()}>Done</button>
                                </div>
                              </div>
                            </div>
                          </div>
                          ):(<></>)
                        }
                      
                      </div>
                      {
                        clauses.subclauses.map((subclauses)=>(
                          <div className="row mt-2 p-0 m-0 justify-content-center">
                          <div className="col-auto">{subclauses.subclause_number}</div>
                          <div className="col-8" dangerouslySetInnerHTML={{__html:subclauses.subclause?subclauses.subclause:''}}></div>
                          <div className="col-1">
                          <button type='button' className='btn btn-sm btn-blue13 text-blue1' data-bs-toggle="modal" data-bs-target={`#updatesubclause${subclauses.id}`} onFocus={()=>{Setcurrentsubclause(subclauses)}}>Update</button>
                        {
                          subclause_id == subclauses.id ?(
                            <div className="modal fade" id={`updatesubclause${subclauses.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby={`updatesubclauseLabel${subclauses.id}`} aria-hidden="true">
                            <div className="modal-dialog modal-dialog-scrollable modal-fullscreen">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h1 className="modal-title fs-5" id={`updatesubclauseLabel${subclauses.id}`}>Update SubClause</h1>
                                  <button type="button" className="btn-close" onClick={()=>setsubclause_id('')} data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                <div className="col-2 mt-2">
                                  <label htmlFor="subsection_number">SubClause Number </label>
                                  <input type="text" name='subsection_number' className='form-control' value={updatesubclause_data.subclause_number?updatesubclause_data.subclause_number:''} onChange={(e)=>{updatesubclause_data(prevState=>({...prevState,subclause_number:e.target.value}))}} />
                                  </div>
                                  <div className="col-10 mt-2">
                                    <label htmlFor="subsection">SubClause</label>
                                    <CK_Editor data={updatesubclause_data.content !==undefined?updatesubclause_data.content:''} setdata={setupdatesubclause_data}/>
                                  </div>
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-gray4" data-bs-dismiss="modal" onClick={()=>setsubclause_id('')}>Cancel</button>
                                  <button type="button" className="btn btn-blue1 text-white" onClick={()=>confirm_UpdateSubclause()}>Done</button>
                                </div>
                              </div>
                            </div>
                          </div>
                          ):(<></>)
                        }
                          </div>
                          <div className="col-2">
                              
                              </div>
                          </div>
                        ))
                      }
                    </div>
                  ))
                  }
                </div>
              ))
              
            ):(
              <div className="row align-items-center mt-5">
            <h5 className='text-center py-5'>no subsections found</h5>
              </div>
            )
          }
          <div className="container d-flex justify-content-center">
          <Link to={`../Admin/acts/${act}/${chapter}/${section}/subsection/new`} state={{newsubsection_route_data}} className='btn btn-blue13 text-blue1'>+ subsection</Link>
          </div>
          </div>
          )
        }
       
    </section>
  )
}

export default Subsections