import React from 'react'

const Not_found = () => {
  return (
    <div className='bg-white d-flex justify-content-center align-items-center' style={{height:'100vh',width:'100%'}}>
    <div className="row">
      <div className="col-12 d-flex justify-content-center">
        <img src={process.env.PUBLIC_URL+'/images/error_page.jpg'} className='ing-fluid' style={{width:'40vw'}}/>
      </div>
      <div className="col-12">
      <h4 className='text-center'>It looks like you are at the wrong page</h4>
      </div>
      <div className="col-12">
      <h6 className='text-center'>404 Not Found</h6>
      </div>
    </div>

   
    </div>
  )
}

export default Not_found