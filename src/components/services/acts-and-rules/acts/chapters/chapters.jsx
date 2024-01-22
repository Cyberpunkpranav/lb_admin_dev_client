import React ,{lazy, useEffect, useState,useContext} from 'react'
import { Get_Chapter_by_Act } from '../../../../../api/get_apis.jsx'
import { Get_Sections_by_Chapter } from '../../../../../api/get_apis.jsx'
import convertToRoman from '../../../../../utils/number_to_roman.js'
import { useParams ,Link, useLocation,useNavigate } from 'react-router-dom'
import { encryptID,decryptID} from '../../../../../security/crypto.js'


const AdminNewSection = lazy(()=>import('../chapters/new_section.jsx'))
const AdminUpdateSection = lazy(()=>import('./update_section'))
const AdminUpdateChapter = lazy(()=>import('./update_chapter.jsx'))

const Chapters = () => {
  
  const {act} = useParams()
  const {state} = useLocation()
  const act_id = state.data.id
    
    const [data,setdata] = useState([])
    const [index,setindex] = useState('')
    const [loading,setloading] = useState(false)
    //objects
    let chapterobj={
        id: '',
        act_id: '',
        chapter_number: '',
        chapter_part: '',
        chapter:'',
        sections :[]
    }
    let sectionobj = {
        id: '',
        act_id: '',
        chapter_id:'',
        section_number: '',
        section: '',
        subsection:[]
    }
    let chapter_req = {
        search:'',
        act_id:act_id
    }
   let section_req = {
        chapter_id : '',
        act_id:''
    }
    //objects


    const fetch=async()=>{
        setloading(true)
        const res = await Get_Chapter_by_Act(chapter_req)
        if(res.data.status == true){
            let arr = []
            let chapter = res.data.data         
            for(let i=0;i<chapter.length;i++){
                chapterobj={
                    id: chapter[i].id,
                    act_id: chapter[i].act_id,
                    chapter_number: chapter[i].chapter_number,
                    chapter_part: chapter[i].chapter_part,
                    chapter:chapter[i].chapter,
                    sections:[]
                }
                arr.push(chapterobj)
            }

            for(let j=0;j<arr.length;j++){
                section_req = {
                    chapter_id : arr[j].id,
                    act_id:arr[j].act_id
                }
                let response  = await Get_Sections_by_Chapter(section_req)
                if(response.data&&response.data.status==true){
                    let secs =[]
                    for(let k=0;k<response.data.data.length;k++){
                    sectionobj = {
                        id: response.data.data[k].id,
                        act_id: response.data.data[k].act_id,
                        chapter_id:response.data.data[k].chapter_id,
                        section_number: response.data.data[k].section_number,
                        notified_date:response.data.data[k].notified_date,
                        section: response.data.data[k].section,
                    } 
                    secs.push(sectionobj)
                   
                }
                arr[j].sections = secs
                }
            }
            setdata(arr)
        }
        setloading(false)
    }
    useEffect(()=>{
        // fetch()
          fetch()
    },[])
    const handleSearchChange = (e) => {
        chapter_req = {
          ...chapter_req,
          search: e.target.value
        };
      };
      const clearInput =()=>{
        if(chapter_req.search.length==0){
          fetch()
        }
      }

  return (
    <section className='container-fluid position-relative mt-4'>
        <Link to='../Admin/acts' state={act} className='position-absolute start-0 ms-lg-5 top-0'><img className='icons img-fluid' src={process.env.PUBLIC_URL+'/images/back.png'}/></Link>
        <h5 className='text-center my-4'>{act}</h5>
        <div className="container position-relative mt-4">
        <div className="container position-relative">
        <div className="row p-0 m-0 justify-content-center">
        <div className="col-lg-5 col-10 p-0 m-0 position-relative">
        <input className='form-control' placeholder='search chapters..' onBlur={()=>clearInput()}  onChange={handleSearchChange}/>
        <button className='btn p-0 m-0 position-absolute end-0 top-0 mt-1 me-1' onClick={()=>fetch()}><img className='icons img-fluid' alt='...' src={process.env.PUBLIC_URL+'/images/search.png'}/></button>
        </div>  
        <div className="col-2 position-absolute top-0 end-0 ">
        <Link to={`../Admin/acts/${act}/${encryptID(act_id)}/chapter/new`} className='btn btn-blue1 text-white position-absolute top-0 end-0'>+ New Chapter</Link>
        </div>
        </div>
        </div>
        </div>
        {
            loading ? (<div className='text-center'> loading...</div>):(
                <div className="container mt-4">
                    {
                        data && data.map((Data,i)=>(
                            <div className="container" key={i}>
                              <div className="row g-4 my-4">
                                <div className="col-10">
                                <button className="btn w-100 text-start rounded-3  fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample${Data.id}`} aria-expanded="false" aria-controls="collapseExample" >
                                      <span className='me-2'>Chapter{" "}{convertToRoman(Data.chapter_number)}</span><span className='me-2'>{Data.chapter_part==0?'':isNaN(Data.chapter_part)?'Part '+Data.chapter_part:'Part '+convertToRoman(Data.chapter_part)}</span>
                                      {Data.chapter}<img src={process.env.PUBLIC_URL+'/images/down_arrow.png'} className='img-fluid p-1 ms-4 fw-bold icons' data-bs-toggle="collapse" data-bs-target={`#collapseExample${Data.id}`} aria-expanded="false" aria-controls="collapseExample" />
                                    </button>
                                
                                </div>
                                <div className="col-2">
                                <button type="button" className="btn btn-blue13 text-blue1" data-bs-toggle="modal" data-bs-target={`#updatesectionstaticBackdrop${Data.id}`} onFocus={()=>{setindex(i)}}>
                                  Update
                                </button>
                                </div>
                              </div>
                                    {
                                      index==i?(          
                                      <div className="modal fade" id={`updatesectionstaticBackdrop${Data.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby={`updatesectionstaticBackdropLabel1${Data.id}`} aria-hidden="true">
                                      <div className="modal-dialog">
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <h1 className="modal-title fs-5" id={`updatesectionstaticBackdropLabel1${Data.id}`}>Update Chapter</h1>
                                            <button type="button" className="btn-close" onClick={()=>{setindex('')}} data-bs-dismiss="modal" aria-label="Close"></button>
                                          </div>
                                          <div className="modal-body">
                                            <AdminUpdateChapter act_id={Data.act_id} id={Data.id} chapter_number={Data.chapter_number} chapter_part={Data.chapter_part} chapter={Data.chapter}/>
                                          </div>
                                          <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>{setindex('')}}>Close</button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>):(<></>)
                                    }
                                    <div className="collapse " id={`collapseExample${Data.id}`}>
                                    <div className="card card-body p-0 rounded-0 border-0">

                                        {
                                              Data.sections.map((sections,i)=>(
                                                <div className="row p-0 m-0 align-items-center p-2 border-top border-start border-end bg-white" key={i}>
                                                <Link 
                                                to={`../Admin/acts/${act}/${Data.chapter}/${sections.section}`} 
                                                key={i} state={{chapter:Data,section:sections}} className='text-decoration-none text-black py-2 col-10'>{sections.section_number}. {sections.section}
                                              </Link>
                                            <div className="col-2">
                                            <button type="button" className="btn btn-blue13 text-blue1" data-bs-toggle="modal" data-bs-target={`#staticBackdrop${sections.id}`} onFocus={()=>{setindex(i)}}>
                                              Update
                                            </button>      
                                            </div>
                                            {
                                              index==i ? (
                                                <div className="modal fade" id={`staticBackdrop${sections.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby={`staticBackdropLabel${sections.id}`} aria-hidden="true">
                                                <div className="modal-dialog">
                                                  <div className="modal-content">
                                                    <div className="modal-header">
                                                      <h1 className="modal-title fs-5" id={`staticBackdropLabel${sections.id}`}>Update Section</h1>
                                                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setindex('')}}></button>
                                                    </div>
                                                    <div className="modal-body">
                                                      <AdminUpdateSection act_id={sections.act_id} chapter_id={sections.chapter_id} id={sections.id} notified_date={sections.notified_date} section_number={sections.section_number} section={sections.section}/>
                                                    </div>
                                                    <div className="modal-footer">
                                                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>{setindex('')}}>Close</button>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              ):(<></>)
                                            }
                                            </div>
                                                   ))
                                          
                                                }
                                        
                                        <div className="col-12">
                                            <button type="button" className=" bg-blue13 border-blue5 text-blue1 w-100 p-2" data-bs-toggle="modal" data-bs-target={`#staticBackdrop2${Data.id}`} onClick={()=>{setindex(i)}}>
                                            Add New Section in {Data.chapter}
                                            </button>      
                                                    <div className="modal fade" id={`staticBackdrop2${Data.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby={`staticBackdropLabel2${Data.id}`} aria-hidden="true">
                                                    <div className="modal-dialog">
                                                      <div className="modal-content">
                                                        <div className="modal-header">
                                                          <h1 className="modal-title fs-5" id={`staticBackdropLabel2${Data.id}`}>New Section</h1>
                                                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                          <AdminNewSection act_id={act_id} chapter_id={Data.id}/>
                                                        </div>
                                                        <div className="modal-footer">
                                                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                            </div>
                                    </div>
                                    </div>
                        
                            </div>
                        ))
                    }                        
                </div>
            )
        }
      
    </section>
   
  )
}

export default Chapters