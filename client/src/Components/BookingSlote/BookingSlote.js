
import React, { useEffect, useState } from 'react'
import './BookingSlote.css'
import { Button, Modal } from 'react-bootstrap';


function BookingSlot() {

    let A, B, C, D, E

    // let applicantId
    // var slotId,slotSection

    const [sectionA, setSectionA] = useState([])
    const [sectionB, setSectionB] = useState([])
    const [sectionC, setSectionC] = useState([])
    const [sectionD, setSectionD] = useState([])
    const [sectionE, setSectionE] = useState([])
    const[refresh,setRefresh] = useState('')


    const [slotId, setSlotId] = useState()
    const [slotSection, setSlotSection] = useState()

    const [applicantsList, setApplicantsList] = useState([])

    // modal

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);




    useEffect(() => {
        displaySlots()
        applicants()
    },[refresh])


    const applicants = async () => {    
        const req = await fetch('http://localhost:1300/api/applicant')
        const response = await req.json()

       
        console.log('res',response)
        const records = response
        // const records = response.filter((item) => {
        //         return (!item.isBooked)
        //     })

             console.log('pp',records.response);
             await setApplicantsList(records.response);  
             console.log('appli',applicantsList);
        }



    const displaySlots = async () => {
            const req = await fetch('http://localhost:1300/api/slots')
            const response = await req.json()
            const slots = response

            console.log(slots,'asdfdsa')
             
            setSectionA(slots.A)
            setSectionB(slots.B)
            setSectionC(slots.C)
            setSectionD(slots.D)
            setSectionE(slots.E)


        }
        const handleShow = (slot_id, slot_section) => {
            //  slotId = slot_id
            setSlotId(slot_id)
            //  slotSection=slot_section
            setSlotSection(slot_section)
            console.log('hols',slotId, slotSection)

            setShow(true);
        }



        const slotBooking = async (id) => {
            let applicantId = id
            console.log(applicantId, slotId, slotSection);
            const req = await fetch(`http://localhost:1300/api/update?applicantId=${applicantId}&slotId=${slotId}&slotSection=${slotSection}`)
            setRefresh(req)

        }

        return (
            <div>
                <div className="d-flex sectionA ms-lg-5 mx-auto">
                    {sectionA &&
                        sectionA.map((item) => {

                            return (
                                <div className={item.isBooked ? 'slot  bg-secondary' : 'slot  bg-warning'} onClick={() => { return (item.isBooked ? " " : handleShow(item.slot, item.section)) }}></div>
                            )
                        })
                    }
                </div>
                <div className="row ms-5">
                    <div className="col-md-2 col-sm-6 ms-5 section">
                        {sectionB &&
                            sectionB.map((item) => {
                                return (
                                    <div className={item.isBooked ? 'subSlot col-4  bg-secondary' : 'subSlot col-4  bg-warning'} onClick={() => { return (item.isBooked ? " " : handleShow(item.slot, item.section)) }}></div>
                                )
                            })}
                    </div>
                    <div className="col-md-2 col-sm-6   section">
                        {sectionB &&
                            sectionC.map((item) => {
                                return (
                                    <div className={item.isBooked ? 'subSlot col-4  bg-secondary' : 'subSlot col-4  bg-warning'} onClick={() => { return (item.isBooked ? " " : handleShow(item.slot, item.section)) }}></div>
                                )
                            })}
                    </div>
                    <div className="col-md-2 col-sm-6   section">
                        {sectionB &&
                            sectionD.map((item) => {
                                return (
                                    <div className={item.isBooked ? 'subSlot col-4  bg-secondary' : 'subSlot col-4  bg-warning'} onClick={() => { return (item.isBooked ? " " : handleShow(item.slot, item.section)) }}></div>
                                )
                            })}
                    </div>
                    <div className="col-md-2 col-sm-6  section">
                        {sectionB &&
                            sectionE.map((item) => {
                                return (
                                    <div onClick={() => { return (item.isBooked ? " " : handleShow(item.slot, item.section)) }} className={item.isBooked ? 'subSlot col-4  bg-secondary' : 'subSlot col-4  bg-warning'} ></div>
                                )
                            })}
                    </div>
                </div>






                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Select a Company</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <select class="form-select" aria-label="Default select example"

                            onChange={(e) => {
                                slotBooking(e.target.value)
                            }}
                        >
                            <option selected>--select--</option>
                            {console.log('oyreahhhh',applicantsList)}

                            {applicantsList &&

                                applicantsList.map((item,index) => {
                                    return (
                                        <option key = {index} value={item._id}> {item.email}</option>


                                    )
                                })



                            }
                        </select>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                         
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

    export default BookingSlot