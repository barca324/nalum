import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

const Alumnilogout = () => {
    const token=localStorage.getItem('token')
    const navigate=useNavigate()
    axios.get(`${import.meta.env.VITE_API_URL}/alumni/logout`,{
         headers:{
                Authorization:`Bearer ${token}`
         }
    }).then((response)=>{
        if(response.status===200)
        {
            localStorage.removeItem('token')
            toast.success('Logout Successful')
             navigate('/')
        }
       
    }).catch((error)=>{
       console.log(error)
    })
  return (
    <div>
      
    </div>
  )
}
export default Alumnilogout