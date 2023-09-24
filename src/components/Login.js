import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginApi } from '../services/allAPIs';


function Login() {
  //state to hold user details:
  const [userData, setUserData] = useState({
    uname: "",
    psw: ""
  })
  const navigate = useNavigate()
  // function to update userData 
  const userDetails = (e) => {

    let { name, value } = e.target

    setUserData({ ...userData, [name]: value })


  }
  const login = async (e) => {
    e.preventDefault()

    const headerConfig = {
      "Content-Type": "application/json"
    }
    const data = new FormData()
    const { uname, psw } = userData
    if (uname == "") {
      toast.error('uname required')
    }
    else if (psw == "") {
      toast.error("psw required")
    }
    else {
      data.append('uname', uname)
      data.append('psw', psw)
      const response = await loginApi(headerConfig, data)
      console.log(response);
      if (response.status == 200) {
        localStorage.setItem("currentUser", uname)
        localStorage.setItem("currentpsw", psw)
        alert("Login Success")
        navigate('/')
      }
      else {
        toast.error('enter valid user details')
      }

    }

  }

  console.log(userData);
  return (

    <div className='text-center container rounded mt-4  p-2  w-50 text-white' style={{ backgroundColor: 'black' }}>
      <h3 style={{ color: 'black' }} className='text-center text-white mt-3'>Welcome !</h3>
      <p>dont have an account ?  <Link to={'/register'} style={{ textDecoration: 'none' }}>Create an Account !</Link> </p>
      <form id='d' class='container  p-2 w-50 mt-2'>



        <div className="row">
          <div className="col">
            <label for="exampleInputUname" class="form-label mt-3">User Name:</label>
            <input onChange={userDetails} name='uname' required type="text" class="form-control" id="exampleInputUname" />
            <label for="exampleInputPassword" class="form-label mt-3">Password</label>
            <input onChange={userDetails} name='psw' required type="password" class="form-control" id="exampleInputPassword" />


          </div>

        </div>
        <div className='text-center mt-5'>
          <button onClick={login} style={{ backgroundColor: 'yellow', color: 'white' }}
            type="submit" class="btn btn-primary w-50 text-dark">Submit</button>


        </div>            </form>
      <ToastContainer position="top-center" theme="dark" />
    </div>

  )
}

export default Login