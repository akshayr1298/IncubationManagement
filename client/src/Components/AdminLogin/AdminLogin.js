
import React, { useState } from 'react'
import './AdminLogin.css'
import { useNavigate } from 'react-router-dom'

function AdminLogin() {
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
let navigate = useNavigate()
 
const loginSubmit = async (e)=>{
    e.preventDefault();
    let response = await fetch('http://localhost:1300/api/adminlogin',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    let data = await response.json()
    if(data.admin) {
        localStorage.setItem('token',data.adtoken)
        navigate('/adminhome')
    }else{
       alert('invalid user name or password')
    }
   
}

  return (
    <div>
      <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={loginSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
             value={password}
             onChange={(e)=>{setPassword(e.target.value)}}
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          
        </div>
      </form>
    </div>
    </div>
  )
}

export default AdminLogin
