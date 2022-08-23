
import React, { useState } from 'react'
import './Signup.css'
import { useNavigate } from 'react-router-dom'
function Signup() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [nameerr,setNameerr] = useState('')
    const [emailerr,setEmailerr] = useState('')
    const [passworderr,setPassworderr] = useState('')
    let navigate = useNavigate()

    const signupUser = async(event)=>{
        event.preventDefault()
        if(!name){
          setNameerr("Name is required")
          return false
        }
        if(!email){
          setEmailerr("Email is required")
          return false
        }
        if(!password){
          setPassworderr("Password is required")
          return false
        }
     const response = await fetch('http://localhost:1300/api/signup',{
        method :"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            name,
            email,
            password
        })
      })  
     const data  = await response.json()
     console.log(data);
     if(data.status === 'ok'){
        navigate('/login')
    }
    }

   

    return (
        <div>
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={signupUser}>

        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" >
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <small className='text-danger'> {nameerr}</small>
            <input
              type="text"
              value={name} 
              onChange={(e)=>{
                setNameerr('')
                setName(e.target.value)
              }}
              
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
            />
          </div>
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
              placeholder="Email Address"
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
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Already a member? <a href="/login">Login</a>
          </p>
        </div>
      </form>
    </div>

        </div>
    )
}

export default Signup
