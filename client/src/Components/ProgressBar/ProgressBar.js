

import React, { useEffect, useState } from 'react'

function ProgressBar() {
    const [newapp ,setnewApp] = useState([])

    const progressBar = async()=>{
       const req = await fetch('http://localhost:1300/api/progress',{

       }) 
       const data  =  await req.json()
       console.log('data',data);
       setnewApp(data.response);
    }

    useEffect(()=>{
        progressBar()
        
    },[])

  return (
   
      <div className='container'>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Sl.No</th>
            <th scope="col">Company Name</th>
            <th scope="col">Email </th>
            <th scope="col">New Registration</th>
            <th scope="col">Under Process</th>
            <th scope="col"> Approved</th>
          </tr>
        </thead>
        <tbody>
          {newapp.map((value, index) => (
            <tr>
              <th scope="row">{index +1} </th>
              <td>{value.form.companyName} </td>
              <td>{value.email} </td>
              <td colspan="3">
                <div class="progress">
            {   value.status ==="New" ?  <div
                    class="progress-bar progress-bar-striped bg-danger"
                    role="progressbar"
                    
                    style={{width:"25%" }}
                   
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >25%</div> : value.status === "decline" ? <div
                  class="progress-bar progress-bar-striped bg-warning"
                  role="progressbar"
                  
                  style={{width:"60%" }}
                 
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >60%</div> :<div
                class="progress-bar bg-success"
                role="progressbar"
                
                style={{width:"100%" }}
               
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >100%</div>}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   
  )
}

export default ProgressBar
