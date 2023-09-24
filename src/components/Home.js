import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { deleteAcc } from '../services/allAPIs'

function Home() {
    const uname = localStorage.getItem("currentUser")
    console.log(uname);
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('currentUser')
        localStorage.removeItem('currentpsw')
        alert("you have logged out successfully")
        navigate("/")
    }
    const deleteAccount = async (e) => {
        e.preventDefault()
        const response = await deleteAcc(uname)
        if (response.status == 200) {
            alert(`${uname}  has removed sucessfully`)
        }
        logout()
    }
    return (
        <div>
            <header class="bg-dark py-5">
                <div class="container px-5">
                    <div class="row gx-5 align-items-center justify-content-center">
                        <div class="col-lg-8 col-xl-7 col-xxl-6">
                            <div class="my-5 text-center text-xl-start">
                                <h1 class="display-5 fw-bolder text-white mb-2">Something need Repairing ? </h1>
                                <p class="lead fw-normal text-white-50 mb-4">We-repair is small group of plumbers and mechanics that is capable of repairing anything. You name it !  </p>
                                <div class="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                                    <Link to={'/booking'} class="btn btn-primary btn-lg px-4 me-sm-3">Book Now!</Link>
                                    <button class="btn btn-outline-light btn-lg px-4" data-bs-toggle="modal" data-bs-target="#contactModal">Contact us</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-5 col-xxl-6 d-none d-xl-block text-center"><img className='rounded w-100 h-100' src="https://i.postimg.cc/nLB9MR3z/c201c6b40dbd939cae10a8f68ae22490.jpg" alt="" /></div>
                    </div>
                </div>
            </header>
            {uname ? <div class="bg-primary py-5 mb-5 mt-4 ">
                <div class="container px-4 px-lg-5 my-5 ">
                    <div class="text-center text-white">
                        <h1 class="display-4 fw-bolder">Hi {uname} !</h1>
                        <div class="btn-group  mt-4" role="group" aria-label="Basic example">

                            <button onClick={logout} type="button" class="btn btn-secondary">Logout</button>
                            <button onClick={deleteAccount} type="button" class="btn btn-danger">Remove Account</button>



                        </div>
                    </div>

                </div>
            </div> : ""}
            <section class="py-5" id="features">
                <div class="container px-5 my-5 bg-success text-white  border border-primary rounded p-5">
                    <div class="row gx-5">
                        <div class="col-lg-4 mb-5 mb-lg-0"><h2 class="fw-bolder mb-0">WE DO :</h2></div>
                        <div class="col-lg-8">
                            <div class="row gx-5 row-cols-1 row-cols-md-2">
                                <div class="col mb-5 h-100">
                                    <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3 p-2"><i class="fa-solid fa-wrench fa-beat"></i></div>
                                    <h2 class="h5">Plumbing</h2>
                                    <p class="mb-0">A Group of expert plumbers who are always ready to repair any pipes in your home.</p>
                                </div>
                                <div class="col mb-5 h-100">
                                    <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3 p-2"><i class="fa-solid fa-car fa-beat"></i></div>
                                    <h2 class="h5">Vehicle Repair</h2>
                                    <p class="mb-0">Expert mechanics ready to repair your vehicle anytime.</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <p><strong>*more services are on the way!</strong></p>
                    <strong>*Pay only after service on site!</strong>
                </div>
            </section>
            <section class="py-5 border-bottom mb-5 ">
                <div class="container bg-dark text-white p-5 px-5 my-5 px-5 rounded">
                    <div class="text-center mb-5">
                        <h2 class="fw-bolder">Customer testimonials</h2>
                        <p class="lead mb-0">Honest reviews from our valuable few customers !</p>

                    </div>
                    <div class="row gx-5 justify-content-center">
                        <div class="col-lg-6">

                            <div class="card mb-4">
                                <div class="card-body p-4">
                                    <div class="d-flex">
                                        <div class="flex-shrink-0"><i class="fa-solid fa-message fa-fade"></i></div>
                                        <div class="ms-4">
                                            <p class="mb-1">Thank you for putting together such a great service. We loved working with you and the whole team, and we will be recommending you to others!</p>
                                            <div class="small text-muted">- Sharan Nair, Kollakadavu</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card">
                                <div class="card-body p-4">
                                    <div class="d-flex">
                                        <div class="flex-shrink-0"><i class="fa-solid fa-message fa-fade"></i></div>
                                        <div class="ms-4">
                                            <p class="mb-1">The whole team was a huge help with putting things together for our company and House. We will be hiring them again in the near future for additional work!</p>
                                            <div class="small text-muted">- Krishnankutty, Alappuzha</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="modal fade" id="contactModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header bg-success">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Connect with us:</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <h4><i class="fa-solid fa-envelope fa-bounce"></i> : <a href="#">werep2023@gmail.com</a> </h4> 
                        <h4><i class="fa-solid fa-phone fa-shake"></i> : <a href="#">+91 9445695321</a> </h4>

                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home