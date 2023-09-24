import BASE_URL from "./base_url";
import { commonRequest } from "./commonRequest";

// register
export const registerApi=async(header,body)=>{
    return await commonRequest("POST",`${BASE_URL}/users/register`,body,header)
}
//login
export const loginApi=async(header,body)=>{
    return await commonRequest("POST",`${BASE_URL}/users/login`,body,header)
}
//booking
export const bookingApi=async(header,body)=>{
    return await commonRequest("POST",`${BASE_URL}/users/booking`,body,header)
}
//booking details:
export const getBooking=async(uname)=>{
    return await commonRequest('GET',`${BASE_URL}/users/bookingdetails/${uname}`,"")
}
//cancel booking:
export const cancelBooking=async(uname)=>{
    return await commonRequest('POST',`${BASE_URL}/users/cancelbooking/${uname}`,"")
}
//delete acc:
export const deleteAcc=async(uname)=>{
    return await commonRequest('DELETE',`${BASE_URL}/users/deleteacc/${uname}`,"")
}