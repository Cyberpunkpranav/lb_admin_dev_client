import axios from "./axios"
import { userData } from "../security/decryption";
import toast from "react-hot-toast";
import Notiflix from 'notiflix'
//Admin blogs
export const Switch_Blogs = async(id,status)=>{
    let res;
    try {
    Notiflix.Loading.dots({
        backgroundColor:'#ffffff79',
        svgColor:'#4B82FB',
        svgSize:'100px'
      })
    await axios.post('/api/admin/blogs/switch',{
    id:id,
    status:status
}).then((response)=>{
    res = response
}).catch((e)=>{
    Notiflix.Loading.remove()
    toast.error(e.message)
}).finally(()=>{
    Notiflix.Loading.remove()
    return res
})
} catch (error) {
    Notiflix.Loading.remove()
    toast.error(error.message) 
}
return res
}
export const Save_Blog = async(data)=>{
    Notiflix.Loading.dots({
        backgroundColor:'#ffffff79',
        svgColor:'#4B82FB',
        svgSize:'100px'
      })
    let res;
    await axios.post('/api/admin/blogs/new',data ,{
        headers:{
        "Content-Type":"multipart/form-data"
       }
    }).then((response)=>{
        res=response
    }).catch((e)=>{
        Notiflix.Loading.remove()
        toast.error(e.message)
    }).finally(()=>{
        Notiflix.Loading.remove()
        return res
    })
    return res
}
export const Change_Admin_Blog_view = async(blog_view)=>{
let res;
try {
Notiflix.Loading.dots({
    backgroundColor:'#ffffff79',
    svgColor:'#4B82FB',
    svgSize:'100px'
  })
await axios.post('/api/admin/blogs/change_admin_blog_view',{
    user_id:userData.id,
    admin_blog:blog_view
}).then((response)=>{
    res = response
}).catch((e)=>{
    Notiflix.Loading.remove()
    toast.error(e.message)
}).finally(()=>{
    Notiflix.Loading.remove()
})
} catch (error) {
    toast.error(error.message)
}
return res
}
// Admin Clauses
export const Switch_Clause_alternates = async(id,status)=>{
    let res;
    try {
    Notiflix.Loading.dots({
        backgroundColor:'#ffffff79',
        svgColor:'#4B82FB',
        svgSize:'100px'
      })
    await axios.post('api/admin/services/libraries/clauses/alternate/switch',{
    id:id,
    status:status
}).then((response)=>{
    res = response
}).catch((e)=>{
    Notiflix.Loading.remove()
    toast.error(e.message)
}).finally(()=>{
    Notiflix.Loading.remove()
    return res
})
} catch (error) {
    Notiflix.Loading.remove()
    toast.error(error.message) 
}
return res
}
export const Update_Clause = async(data)=>{
let res;
try {
    Notiflix.Loading.dots({
        backgroundColor:'#ffffff79',
        svgColor:'#4B82FB',
        svgSize:'100px'
      })
    await axios.post('/api/admin/services/libraries/clauses/update',data).then((response)=>{
        res =  response
    }).catch((e)=>{
        Notiflix.Loading.remove()
        toast.error(e.message)
    }).finally(()=>{
        Notiflix.Loading.remove()
    })
} catch (error) {
    Notiflix.Loading.remove()
    toast.error(error.message)
}

return res
}
export const Add_Clause_alternate=async(data)=>{
    let res;
await axios.post('/api/admin/services/libraries/clause/alternate/new',data).then((response)=>{
    res =  response
})
return res
} 
export const Add_New_clause  =async (data)=>{
    let res;
    try {
        Notiflix.Loading.dots({
            backgroundColor:'#ffffff79',
            svgColor:'#4B82FB',
            svgSize:'100px'
          })
         await axios.post('/api/admin/services/libraries/clauses/create',data).then((response)=>{
            res = response
        }).catch((e)=>{
            toast.error(e.message)
        }).finally(()=>{
            Notiflix.Loading.remove()
        })
    } catch (error) {
        Notiflix.Loading.remove()
        toast.error(error.message)
    }

    return res
  }

// Admin Acts
  export const Add_act = async(data)=>{
    let res;
    try {
        Notiflix.Loading.dots({
            backgroundColor:'#ffffff79',
            svgColor:'#4B82FB',
            svgSize:'100px'
          })
        await axios.post('/api/admin/acts_and_rules/act/new',data).then((response)=>{
            res=response
        }).catch((e)=>{
            toast.error(e.message)
        }).finally(()=>{
            Notiflix.Loading.remove()
        })
    } catch (error) {
        Notiflix.Loading.remove()
        toast.error(error.message)
    }
    return res
  }
  export const Switch_Act =async(id,status)=>{
        let res;
        try {
        Notiflix.Loading.dots({
            backgroundColor:'#ffffff79',
            svgColor:'#4B82FB',
            svgSize:'100px'
          })
        await axios.post('/api/admin/act/switch',{
        id:id,
        status:status
        }).then((response)=>{
            res = response
            
        }).catch((e)=>{
            Notiflix.Loading.remove()
            toast.error(e.message)
        }).finally(()=>{
            Notiflix.Loading.remove()
            return res
        })
        } catch (error) {
            Notiflix.Loading.remove()
               toast.error(error.message) 
        }
        return res
  }

  export const Add_Chapter = async(Data)=>{
    let res;
    try {
        Notiflix.Loading.dots({
            backgroundColor:'#ffffff79',
            svgColor:'#4B82FB',
            svgSize:'100px'
          })
        await axios.post('/api/admin/acts_and_rules/acts/chapter/new',Data).then((response)=>{
            res=response
        }).catch((e)=>{
            Notiflix.Loading.remove()
            toast.error(e.message)
        }).finally(()=>{
            Notiflix.Loading.remove()
            return res
        })
    } catch (error) {
        Notiflix.Loading.remove()
        toast.error(error.message)
    }   
    return res
  }

  export const Add_section = async(data)=>{
    let res;
    try {
        Notiflix.Loading.dots({
            backgroundColor:'#ffffff79',
            svgColor:'#4B82FB',
            svgSize:'100px'
          })
        await axios.post('/api/admin/acts_and_rules/acts/section/new',data).then((response)=>{
        res = response
 
        }).catch((e)=>{
            Notiflix.Loading.remove()
            toast.error(e.message)
        }).finally(()=>{
            Notiflix.Loading.remove()
            return res
        })
    } catch (error) {
        Notiflix.Loading.remove()
        toast.error(error.message)   
    }
    return res
  }
  export const Add_subsection = async(data)=>{
    let res;
    try {
        Notiflix.Loading.dots({
            backgroundColor:'#ffffff79',
            svgColor:'#4B82FB',
            svgSize:'100px'
          })
          await axios.post('/api/admin/acts_and_rules/acts/section/subsection/new',data).then((response)=>{
            res = response
     
            }).catch((e)=>{
                Notiflix.Loading.remove()
                toast.error(e.message)
            }).finally(()=>{
                Notiflix.Loading.remove()
                return res
            })
    } catch (error) {
        Notiflix.Loading.remove()
        toast.error(error.message)   
    }
    return res
  }

  export const Add_Clause = async(data)=>{
    let res;
    try {
        Notiflix.Loading.dots({
            backgroundColor:'#ffffff79',
            svgColor:'#4B82FB',
            svgSize:'100px'
          })
          await axios.post('/api/admin/acts_and_rules/acts/section/subsection/clause/new',data).then((response)=>{
            res = response
     
            }).catch((e)=>{
                Notiflix.Loading.remove()
                toast.error(e.message)
            }).finally(()=>{
                Notiflix.Loading.remove()
                return res
            })
    } catch (error) {
        Notiflix.Loading.remove()
        toast.error(error.message)   
    }
    return res
  }
  export const Add_SubClause = async(data)=>{
    let res;
    try {
        Notiflix.Loading.dots({
            backgroundColor:'#ffffff79',
            svgColor:'#4B82FB',
            svgSize:'100px'
          })
          await axios.post('/api/admin/acts_and_rules/acts/section/subsection/clause/subclause/new',data).then((response)=>{
            res = response
     
            }).catch((e)=>{
                Notiflix.Loading.remove()
                toast.error(e.message)
            }).finally(()=>{
                Notiflix.Loading.remove()
                return res
            })
    } catch (error) {
        Notiflix.Loading.remove()
        toast.error(error.message)   
    }
    return res
  }
