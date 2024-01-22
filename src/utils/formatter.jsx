export const formatted_date=(mysqlDateTime)=>{
    let timeline;
    if(mysqlDateTime !==undefined){
        const dateTime = new Date(mysqlDateTime);
        const date = dateTime.toISOString().slice(0, 10); 
        var currentDate = new Date();
        var timeDifference = currentDate - dateTime;
        var daysDifference = timeDifference / (1000 * 60 * 60 * 24);

          if(daysDifference >30){
           return timeline = (Number(daysDifference)/30).toFixed(0) + ' month ago'
          }
          if(daysDifference > 365){
           return timeline = (Number(daysDifference)/365).toFixed(0) + ' years ago'
          }
          // if(daysDifference == 1){
          //   timeline =  'Today'
          // }
          if(daysDifference>1){
           return timeline = (Number(daysDifference)).toFixed(0) + ' days ago'
          }else{
            return 'few hours ago'
          }
        //  reversed = reversefunction(date)
    }
}

 export const formated_time=(mysqlDateTime)=>{
    const dateTime = new Date(mysqlDateTime);
    const time = dateTime.toISOString().slice(11, 16); // "12:29:29"
    return time
 }

 export  const reversefunction = (date) => {
    if (date) {
      date = date.split("-").reverse().join("-");
      return date;
    }
  };