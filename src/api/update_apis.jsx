import toast from "react-hot-toast"
import axios from './axios'
import Notiflix from "notiflix";

export const Update_AdminUser=async(id,Data)=>{
    let data ;
    try {
        Notiflix.Loading.dots({
            backgroundColor:'#ffffff79',
            svgColor:'#4B82FB',
            svgSize:'100px'
          })
        await axios.put(`/api/admin/admin_users/user/update/${id}`,Data,{
        }).then((response)=>{
            data = response
       }).catch((e)=>{
        Notiflix.Loading.remove()
        toast.error(e.message)
       }).finally(()=>{
        Notiflix.Loading.remove()
       })   
    } catch (error) {
        toast.error(error)
    }
   return data
}

export const Update_blogs=async(id,Data)=>{
    let data ;
    try {
        Notiflix.Loading.dots({
            backgroundColor:'#ffffff79',
            svgColor:'#4B82FB',
            svgSize:'100px'
          })
        await axios.put(`/api/admin/blogs/update/${id}`,Data,{
           headers:{
            "Content-Type":"multipart/form-data"
           }
        }).then((response)=>{
            data = response
       }).catch((e)=>{
        Notiflix.Loading.remove()
        toast.error(e.message)
       }).finally(()=>{
        Notiflix.Loading.remove()
       })   
    } catch (error) {
        toast.error(error)
    }

   return data
}

export const Update_acts=async(id,Data)=>{
    let data ;
    try {
        Notiflix.Loading.dots({
            backgroundColor:'#ffffff79',
            svgColor:'#4B82FB',
            svgSize:'100px'
          })
        await axios.put(`/api/admin/acts_and_rules/act/update/${id}`,Data,{
        }).then((response)=>{
            data = response
       }).catch((e)=>{
        Notiflix.Loading.remove()
        toast.error(e.message)
       }).finally(()=>{
        Notiflix.Loading.remove()
       })   
    } catch (error) {
        toast.error(error)
    }

   return data
}
export const Update_section  = async(id,Data)=>{
    let data;
    try {
        Notiflix.Loading.dots({
            backgroundColor:'#ffffff79',
            svgColor:'#4B82FB',
            svgSize:'100px'
          })
        await axios.put(`/api/admin/acts_and_rules/acts/section/update/${id}`,Data,{
        }).then((response)=>{
            data = response
       }).catch((e)=>{
        Notiflix.Loading.remove()
        toast.error(e.message)
       }).finally(()=>{
        Notiflix.Loading.remove()
       })   
    } catch (error) {
        toast.error(error)
    }

   return data
}

export const Update_chapter  = async(id,Data)=>{
    let data;
    try {
        Notiflix.Loading.dots({
            backgroundColor:'#ffffff79',
            svgColor:'#4B82FB',
            svgSize:'100px'
          })
        await axios.put(`/api/admin/acts_and_rules/acts/chapter/update/${id}`,Data,{
        }).then((response)=>{
            data = response
       }).catch((e)=>{
        Notiflix.Loading.remove()
        toast.error(e.message)
       }).finally(()=>{
        Notiflix.Loading.remove()
       })   
    } catch (error) {
        toast.error(error)
    }

   return data
}

export const Update_Subsection  = async(id,Data)=>{
    let data;
    try {
        Notiflix.Loading.dots({
            backgroundColor:'#ffffff79',
            svgColor:'#4B82FB',
            svgSize:'100px'
          })
        await axios.put(`/api/admin/acts_and_rules/acts/section/subsection/update/${id}`,Data,{
        }).then((response)=>{
            data = response
       }).catch((e)=>{
        Notiflix.Loading.remove()
        toast.error(e.message)
       }).finally(()=>{
        Notiflix.Loading.remove()
       })   
    } catch (error) {
        toast.error(error)
    }

   return data
}
export const Update_Clause  = async(id,Data)=>{
    let data;
    try {
        Notiflix.Loading.dots({
            backgroundColor:'#ffffff79',
            svgColor:'#4B82FB',
            svgSize:'100px'
          })
        await axios.put(`/api/admin/acts_and_rules/acts/section/subsection/clause/update/${id}`,Data,{
        }).then((response)=>{
            data = response
       }).catch((e)=>{
        Notiflix.Loading.remove()
        toast.error(e.message)
       }).finally(()=>{
        Notiflix.Loading.remove()
       })   
    } catch (error) {
        toast.error(error)
    }

   return data
}
export const Update_SubClause  = async(id,Data)=>{
    let data;
    try {
        Notiflix.Loading.dots({
            backgroundColor:'#ffffff79',
            svgColor:'#4B82FB',
            svgSize:'100px'
          })
        await axios.put(`/api/admin/acts_and_rules/acts/section/subsection/clause/subclause/upadte/${id}`,Data,{
        }).then((response)=>{
            data = response
       }).catch((e)=>{
        Notiflix.Loading.remove()
        toast.error(e.message)
       }).finally(()=>{
        Notiflix.Loading.remove()
       })   
    } catch (error) {
        toast.error(error)
    }

   return data
}