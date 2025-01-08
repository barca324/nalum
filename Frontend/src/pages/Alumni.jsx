import React, { useState, useContext } from "react";
import { AlumniDataContext } from "../context/Alumnicontext";
import { Link } from "react-router";
  // Correct usage
const Alumni = () => {
    const { alumni, setAlumni } = useContext(AlumniDataContext);
    console.log("hi",alumni.alumni.name)
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col  justify-center items-center">
        <div>
        Welcome {alumni.alumni.name}
        </div>
       
        <div>
       <Link  to='/alumni/logout'><button className="bg-blue-500 mt-2 rounded-md text-center w-28">Logout</button></Link>
       </div>
    </div>
  )
}

export default Alumni
