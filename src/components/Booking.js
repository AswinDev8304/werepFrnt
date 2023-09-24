import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { bookingApi, getBooking, cancelBooking } from '../services/allAPIs';

function Booking() {
  const uname = localStorage.getItem("currentUser")
  const navigate = useNavigate()
  useEffect(() => {
    if (!uname) {
      alert("please login")
      navigate("/login")
    }
  }, [])

  const [bookingData, setBookingData] = useState("")
  const getBookingDetails = async () => {

    const { data } = await getBooking(uname)

    setBookingData(data)

  }




  useEffect(() => {
    getBookingDetails()
  }, [])
  console.log(bookingData);
  const [userData, setUserData] = useState({
    uname: "",
    psw: "",
    location: "",
    service: ""
  })

  const userDetails = (e) => {

    let { name, value } = e.target

    setUserData({ ...userData, [name]: value })


  }
  const booking = async (e) => {
    e.preventDefault()
    const headerConfig = {
      "Content-Type": "application/json"
    }
    const data = new FormData()
    const { uname, psw, location, service } = userData
    if (uname == "") {
      toast.error('uname required')
    }
    else if (psw == "") {
      toast.error("psw required")
    }
    else if (location == "") {
      toast.error("location required")
    }
    else if (service == "") {
      toast.error("service required")
    }
    else {
      data.append('uname', uname)
      data.append('psw', psw)
      data.append('location', location)
      data.append('service', service)
      const response = await bookingApi(headerConfig, data)
      // console.log(response);
      if (response.status == 200) {
        alert("Booking Successfull")
        navigate('/')
      }
      else {
        alert(response.response.data)
        navigate('/')
      }
    }

  }
  const cancelbooking = async (e) => {
    e.preventDefault()
    const response = await cancelBooking(uname)
    console.log(response);
    if (response.status == 200) {
      alert("Booking Canceled")
      navigate('/')
    }
    else{
      alert(response.response.data)
    }
  }
  console.log(userData);
  return (
    <div className='text-center container rounded mt-3 mb-2 p-2  w-50 text-white' style={{ backgroundColor: 'black' }}>
      <h3 style={{ color: 'black' }} className='text-center text-white mt-3'>Book Here </h3>

      <form id='d' class='container   w-50 mt-2 '>



        <div className="row">
          <div className="col">
            <label for="exampleInputFname" class="form-label mt-3">User Name:</label>
            <input onChange={userDetails} name='uname' required type="text" class="form-control" id="exampleInputFname" />
            <label for="exampleInputEmail" class="form-label mt-3">Password</label>
            <input onChange={userDetails} name='psw' required type="password" class="form-control" id="exampleInputEmail" />
            <label for="exampleInputEmail" class="form-label mt-3">Location</label>
            <input onChange={userDetails} name='location' required type="text" class="form-control" id="exampleInputEmail" />
            <label for="exampleI" class="form-label mt-4">Service needed</label>

            <select onChange={userDetails} name='service' class="dropdown w-100 form-control" id="s1" >
              <option class="dropdown-item disabled" aria-disabled="true" value="">Select ...</option>

              <option class="dropdown-item" value={'Plumbing'}>Plumbing</option>
              <option class="dropdown-item" value={'Vehicle Repair'}>Vehicle Repair</option>
              <option class="dropdown-item" value={'Both'}>Both</option>
            </select>
          </div>

        </div>
        <div className='text-center mt-5'>
          <button onClick={booking} style={{ backgroundColor: 'yellow', color: 'white' }}
            type="submit" class="btn btn-primary  text-dark">Book Now !</button>
          <button style={{ backgroundColor: 'yellow', color: 'white' }}
            type="button" class="btn btn-primary ms-4  text-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> Your bookings</button>


        </div>

      </form>

      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-dark">
              <h1 className="modal-title text-light fs-5" id="staticBackdropLabel">Your Bookings</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <table class="table table-dark table-striped">
                <thead>
                  <tr>
                    <th scope="col">Sl.no</th>
                    <th scope="col">Name</th>
                    <th scope="col">Location</th>
                    <th scope="col">Service</th>

                  </tr>
                </thead>
                <tbody>
                  {bookingData ? <tr>
                    <th scope="row">1</th>
                    <td>{uname}</td>
                    <td>{bookingData[0].location}</td>
                    <td>{bookingData[0].service}</td>

                  </tr> : <h1 className='text-center text-dark'>No bookings found !</h1>
                  }
                </tbody>
              </table>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={cancelbooking} class="btn btn-primary">Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" theme="dark" />
    </div>

  )
}

export default Booking