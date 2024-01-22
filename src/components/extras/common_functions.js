import Cookies from "js-cookie"

let types = Cookies.get('types')
types =  types? JSON.parse(types):''

export const Get_topic = (id)=>{
    let topic_name = ''
    if(types !=undefined && types.topics !== undefined) {
      for(let j=0;j<types.topics.length;j++){
        if(types.topics[j].id == id){
          topic_name = types.topics[j].topic_name
        }
      } 
  }
    return topic_name
  }
 export const Get_category = (id)=>{
    let category_name = ''
    if(types !=undefined && types.categories !== undefined) {
      for(let j=0;j<types.categories.length;j++){
        if(types.categories[j].id == id){
          category_name = types.categories[j].category_name
        }
      } 
  }
    return category_name
  }
 export const Get_industry = (id)=>{
    let industry_name = ''
    if(types !=undefined && types.industry !== undefined) {
      for(let j=0;j<types.industry.length;j++){
        if(types.industry[j].id == id){
          industry_name = types.industry[j].industry_name
        }
      } 
  }
    return industry_name
  }