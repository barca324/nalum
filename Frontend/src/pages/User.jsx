import React, { useState, useContext } from "react";
import { UserDataContext } from "../context/Usercontext"; 
import { Link } from "react-router";
  // Correct usage
const User = () => {
    const { user, setUser } = useContext(UserDataContext);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col  justify-center items-center">
        <div>
        Welcome {user.user.name}
        </div>
       
        <div>
       <Link  to='/users/logout'><button className="bg-blue-500 mt-2 rounded-md text-center w-28">Logout</button></Link>
       </div>
    </div>
  )
}

export default User
