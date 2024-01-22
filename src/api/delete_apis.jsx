import axios from "./axios";
import Notiflix from "notiflix";
import toast from "react-hot-toast";

export const Delete_Blog = async(id)=>{
    let res ;
    await axios.delete(`/api/admin/blogs/delete?id=${id}`).then((response)=>{
        res =response
    })
    return res
}
export const Delete_act = async(id)=>{
    let res;
    try {
        Notiflix.Loading.dots({
            backgroundColor:'#ffffff79',
            svgColor:'#4B82FB',
            svgSize:'100px'
          })
        await axios.post(`/api/admin/acts_and_rules/act/delete?id=${id}`).then((response)=>{
            res=response
        }).catch((e)=>{
            toast.error(e.message)
        }).finally(()=>{
            Notiflix.Loading.remove()
        })
    } catch (error) {
        toast.error(error.message)
    }
    return res
  }
  export const Delete_Clause_alternate = async(id)=>{
    let res;
    try {
        Notiflix.Loading.dots({
            backgroundColor:'#ffffff79',
            svgColor:'#4B82FB',
            svgSize:'100px'
          })
        await axios.delete(`/api/admin/services/libraries/clauses/alternate/delete?id=${id}`).then((response)=>{
            res=response
        }).catch((e)=>{
            toast.error(e.message)
        }).finally(()=>{
            Notiflix.Loading.remove()
        })
    } catch (error) {
        toast.error(error.message)
    }
    return res
  }
