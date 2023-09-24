import React, { useState } from 'react'
import { registerApi } from '../services/allAPIs'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Register() {

  //state to password confirmation:
  const [pswConfirm, setPswConfirm] = useState("")

  const navigate = useNavigate()
  //function for passconfirm
  const confirmPass = (e) => {
    let { value } = e.target
    setPswConfirm(value)
  }


  //state to hold user data:
  const [userData, setUserData] = useState({
    uname: "",
    mobile: "",
    psw: ""
  })

  // function to update userData 
  const userDetails = (e) => {

    let { name, value } = e.target

    setUserData({ ...userData, [name]: value })


  }
  //function for submit button:
  const registerUser = async (e) => {
    e.preventDefault()

    const headerConfig = {
      "Content-Type": "application/json"
    }

    const data = new FormData()

    const { uname, mobile, psw } = userData
    if (uname == "") {
      toast.error('uname required')
    }
    else if (mobile == "") {
      toast.error('Mobile required')
    }
    else if (psw == "") {
      toast.error("psw required")
    }
    else if (pswConfirm == "") {
      toast.error("pls enter the same password to confirm required")
    }
    else {
      if (pswConfirm == userData.psw) {

        data.append('uname', uname)
        data.append('mobile', mobile)
        data.append('psw', psw)

        const response = await registerApi(headerConfig, data)
        console.log(response);
        if (response.status == 200) {
          alert("User Sucessfully Registered")
          navigate('/login')
        }

        else {
          toast.error(response.response.data)
        }

      }
      else {
        toast.error("passwords don`t match");
      }
    }
  }
  console.log(userData);
  console.log(pswConfirm);

  return (

    <div className='text-center container rounded w-50  mt-2 text-white' style={{ backgroundColor: 'black' }}>

      <p className='fs-1'>Register here !</p>
      <form id='d' class='container w-50 mt-2'>



        <div className="row">
          <div className="col">
            <label for="exampleInputUname" class="form-label mt-3">Username</label>
            <input onChange={userDetails} name='uname' required type="text" class="form-control" id="exampleInputFname" />

            <label for="exampleInputMobile" class="form-label mt-3">Mobile No</label>
            <input onChange={userDetails} name='mobile' required type="text" class="form-control" id="exampleInputEmail" />




            <label for="exampleInputPassword" class="form-label mt-3">Password</label>
            <input onChange={userDetails} name='psw' required type="Password" class="form-control" id="exampleInputMobile" />




            <label for="exampleInputCPassword" class="form-label mt-3">Confirm Password</label>
            <input onChange={confirmPass} name='cpsw' required type="Password" class="form-control" id="exampleInputCPass" />

            <button onClick={registerUser} style={{ backgroundColor: 'yellow', color: 'white' }}
              type="submit" class="btn btn-primary w-50 text-dark mt-5 mb-3 ">Submit</button>



          </div>
        </div>

      </form>
      <ToastContainer position="top-center" theme="dark" />
    </div>

  )
}

export default Register