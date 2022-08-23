
import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [emailerr,setEmailerr] = useState('')
    const [passworderr,setPassworderr] = useState('')

    let navigate = useNavigate();

    async function loginUser(event){   
        event.preventDefault()

        if(!email){
          setEmailerr("Email is required")
          return false
        }
        if(!password){
          setPassworderr("Password is required")
          return false
        }
         const response = await fetch('http://localhost:1300/api/login',{
            method:"POST", 
            headers:{
              'Content-Type':'application/json',
      
            },
            body:JSON.stringify({
              email,
              password
            }),
          })
          const data = await response.json()
      
          if(data.user){
            localStorage.setItem('token',data.user)
            alert("Login successful")
            navigate('/')
          }else{
            alert("Please check your username and password")
          }
          console.log(data);
        }


  return (
    <div>
       <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={loginUser}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <small className='text-danger'> {emailerr}</small>
            <input
              type="email"
              value={email}
              onChange={(e)=>{
                setEmailerr('')
                setEmail(e.target.value)}}
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <small className='text-danger'> {passworderr}</small>
            <input
              type="password"
              value={password}
              onChange={(e)=>{
                setPassworderr('')
                setPassword(e.target.value)}}
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Click here <a href="/signup">Register</a>
          </p>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Login
