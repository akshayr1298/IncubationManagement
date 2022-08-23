

import React from 'react'
import Spinner from "react-spinkit"

function UserProccessing() {
  return (
    <div >

    <h1 style={{marginTop:'3%'}} align='center' >Thanks for your application</h1>          
    <h1 style={{marginTop:'3%',color:'orange'}} align='center' >Your request is being  Proccesseing</h1>
    <div className='d-flex'>
    <Spinner className='justify-content-center mt-2 text-danger mx-auto' name="circle" style={{ width: 100, height: 100 }} />
    </div>
    </div>
  )
}

export default UserProccessing