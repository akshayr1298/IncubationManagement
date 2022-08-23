
import React, { useEffect, useState } from 'react'
import 'jquery/dist/jquery.min.js';
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal'

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
function AdminHome() {
    const [users,setUsers] = useState([])
    const [pendingApplication , setPendingApplication] = useState([])
    const [form,setForm] = useState([])
    const [show, setShow] = useState(false);
    const[refresh,setRefresh] = useState('')


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


    $(document).ready(function () {
        setTimeout(function () {
            $('#example').DataTable();
        }, 1000);
    });

    const pendingList = async(id)=>{ 
      
        const userId = {_id:id}
      const req =   await fetch('http://localhost:1300/api/pendinglist',{
              method:"PUT",
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({
                userId
              })           
        })
        const datas = await req.json()
        console.log(datas.update)
        setPendingApplication(datas.update.pending)
        setRefresh(req)
    }


    const approve = async(id)=>{ 
      const userId = {_id:id}
      const req =   await fetch('http://localhost:1300/api/approved',{
              method:"PUT",
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({
                userId
              })           
        })
        const apr = await req.json()
        console.log(apr.response)
        setPendingApplication(apr.response.approved)
        setRefresh(req)
    }

    const decline = async(id)=>{ 
        const userId = {_id:id}
      const req =   await fetch('http://localhost:1300/api/decline',{
              method:"PUT",
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({
                userId
              })           
        })
        const decline = await req.json()
        console.log(decline.response)
        setPendingApplication(decline.response.decline)
        setRefresh(req)
    }

    

    const userDetails = async()=>{
        const response = await fetch('http://localhost:1300/api/applicationlist',{

        })
        const data = await response.json()
        console.log('data',data)
        console.log('new',data.new);
        console.log('all',data.all);
        setUsers(data.new)
        setPendingApplication(data.all)
    }

    useEffect(()=>{

        userDetails()
       

    },[refresh])

    return (
        <div className=''>


          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <div className=" col-12">
            <form>
                {/* <p>{form ? form.name : "uiu"}</p> */}
                <h3>Application For Incubation</h3>
                <div className="row">
                    <div className="mb-3 col-6">
                        <label>Name</label>
                        <input
                            required
                            value={form.name}
                            type="text"
                            className="form-control"
                            placeholder="First name"
                        />
                    </div>

                    <div className="mb-3 col-6">
                        <label>Address</label>
                        <input
                            required
                            value={form.address}
                            type="text"
                            className="form-control"
                            placeholder="Enter email"
                            // onChange={(e) => setForm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col-6">
                        <label>City</label>
                        <input 
                            required
                            value={form.city}
                            type="text"
                            className="form-control"
                            placeholder="First name"
                            // onChange={(e) => setForm(e.target.value)}
                        />
                    </div>

                    <div className="mb-3 col-6">
                        <label>State</label>
                        <input
                            required
                            value={form.state}
                            type="text"
                            className="form-control"
                            placeholder="Enter email"
                            // onChange={(e) => setForm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col-6">
                        <label>Email</label>
                        <input
                            required
                            value={form.email}
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            // onChange={(e) => setForm(e.target.value)}
                        />
                    </div>

                    <div className="mb-3 col-6">
                        <label>Phone no</label>
                        <input
                            required
                            value={form.phone}
                            type="text"
                            className="form-control"
                            placeholder="Phone Number"
                            // onChange={(e) => setForm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col-6">
                        <label>Company Name</label>
                        <input
                            required
                            value={form.companyName}
                            type="text"
                            className="form-control"
                            placeholder="Company name"
                            // onChange={(e) => setForm(e.target.value)}
                        />
                    </div>

                    {/* <div className="mb-3 col-6">
                        <input type="file" />
                    </div> */}
                </div>
                <div className="mb-3 ">
                    <label>Describe Your Team and Background</label>
                    <textarea
                        required
                        value={form.teamAndBackground}
                        type="text"
                        className="form-control"
                        placeholder="Enter details"
                        // onChange={(e) => setForm(e.target.value)}
                    />
                </div>
                <div className="mb-3 ">
                    <label>Describe Your Company and Products</label>
                    <textarea
                        required
                        value={form.companyAndProducts}
                        type="text"
                        className="form-control"
                        placeholder="Enter details "
                        // onChange={(e) => setForm(e.target.value)}
                    />
                </div>
                <div className="mb-3 ">
                    <label>Describe the problem you are trying to solve</label>
                    <textarea
                        required
                        value={form.solvingProblem}
                        type="text"
                        className="form-control"
                        placeholder="Enter details"
                        // onChange={(e) => setForm(e.target.value)}

                    />
                </div>
                <div className="mb-3 ">
                    <label>What is unique about your solution </label>
                    <textarea
                        required
                        value={form.uniqueness}
                        type="text"
                        className="form-control"
                        placeholder="Enter details"
                        // onChange={(e) => setForm(e.target.value)}

                    />
                </div>
                <div className="mb-3 ">
                    <label> what is your value proposition for the customer</label>
                    <textarea
                        required
                        value={form.valueProposition}
                        type="text"
                        className="form-control"
                        placeholder="Enter details"
                        // onChange={(e) => setForm(e.target.value)}

                    />
                </div>
                <div className="mb-3 ">
                    <label>Who are your competitors and what is your competative advantage ?</label>
                    <textarea
                        required
                        value={form.competitors}
                        type="text"
                        className="form-control"
                        placeholder="Enter details"
                        // onChange={(e) => setForm(e.target.value)}

                    />
                </div>
                <div className="mb-3 ">
                    <label>Explain your revenue model</label>
                    <textarea
                        required
                        value={form.revenueModel}
                        type="text"
                        className="form-control"
                        placeholder="Enter details"
                        // onChange={(e) => setForm(e.target.value)}

                    />
                </div>
                <div className="mb-3 ">
                    <label>What is the potential market size of the product ?</label>
                    <textarea
                        required
                        value={form.marketSize}
                        type="text"
                        className="form-control"
                        placeholder="Enter details"
                        // onChange={(e) => setForm(e.target.value)}

                    />
                </div>
                <div className="mb-3 ">
                    <label>How do you market or plan to market your product and services </label>
                    <textarea
                        required
                        value={form.marketing}
                        type="text"
                        className="form-control"
                        placeholder="Enter details"
                        // onChange={(e) => setForm(e.target.value)}

                    />
                </div>
                <div>
                    <p>Types of incubation needed</p>
                    <div class="form-check mv-3" >
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value='physical' required
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Physical Incubation
                        </label>
                    </div>
                    <div class="form-check mb-4">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  value= 'virtual'required
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Virtual Incubation
                        </label>
                    </div>
                </div>
                <div className="mb-3 ">
                    <label>Upload a detailed bussiness proposal</label>
                    <textarea
                        required
                        value={form.bussinessProposal}
                        type="text"
                        className="form-control"
                        placeholder="Enter details"
                    // onChange={(e) => console.log(form)}

                    />
                </div>
                {/* <div className="d-grid" >
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div> */}
                {/* <p className="forgot-password text-right">
                    Already registered <a href="/login">sign in?</a>
                </p> */}
            </form>


        </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

            <div className="MainDiv ">
                <div class="jumbotron text-center">
                    <h3>New Application List</h3>
                </div>

                <div className="container mt-5">

                    <table id="example" class="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>S.no</th>
                                <th>Campany Name</th>
                                <th>Company Details</th>
                                {/* <th>  </th> */}
                                <th>  </th>
                            </tr>
                        </thead>
                        <tbody>

                           {users.map((data,index)=>{ 
                            
                            return(
                                <tr>
                                <td>{index+1} </td>
                                <td>{data.form.companyName}   </td>
                                <td> {data.form.address} , {data.form.city} ,{data.form.state} </td>
                                {/* <td><Button variant="contained" color="primary" onClick={handleShow}>
                                    Open
                                </Button> </td> */}
                                <td><Button variant="outlined" color="error" onClick={()=>{
                                    pendingList(data._id)
                                }}>
                                    Pending
                                </Button> </td>

                            </tr>

                            )

                             })}
                           
                        </tbody>
                    </table>

                </div>
            </div>

            <div className="MainDiv">
                <div class="jumbotron text-center mt-3">
                    <h3>Pending Applicaton List</h3>
                </div>

                <div className="container mt-5">

                    <table id="example" class="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>S.no</th>
                                <th>Campany Name</th>
                                <th>Company Details</th>
                                <th>  </th>
                                <th>  </th>
                                <th>  </th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingApplication.map((data,index)=>{
                                return(
                                    <tr>
                                <td>{index+1} </td>
                                <td>{data.form.name} </td>
                                <td>{data.form.address} , {data.form.city} ,{data.form.state} </td>
                                <td><Button variant="contained" color="primary" onClick={()=>{
                                    return(handleShow(),setForm(data))
                                }}>
                                    Open
                                </Button> </td>
                                <td> {data.status === 'approved' ?<p className='text-success fw-bolder'>Approved </p> :<Button variant="contained" color="success" onClick={()=>{
                                    approve(data._id)
                                }}>
                                    Approve
                                </Button> }</td>

                                <td>{data.status === 'decline' ?<p className='text-danger fw-bolder'>Declined</p>:
                                 
                                    <Button variant="outlined" color="error" onClick={()=>{
                                    decline(data.id)
                                }}>
                                   Decline
                                </Button>}</td>
                            </tr>

                                )})}


                        </tbody>
                    </table>

                </div>
            </div>

        </div>
    )
}

export default AdminHome
