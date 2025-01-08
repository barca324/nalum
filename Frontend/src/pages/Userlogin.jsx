import React, { useState,useContext } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { UserDataContext } from "../context/Usercontext";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 const {user,setUser}=useContext(UserDataContext);
 const navigate=useNavigate();


  const handleSubmit = async(e) => {
    e.preventDefault();
    const userData={
        email:formData.email,
        password:formData.password
    }
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
        
        if (response.status === 200) {
          const { data } = response;
          setUser(data);
          localStorage.setItem('token',data.token);
          console.log("datauser",data)
          toast.success('Login Successful');
          navigate('/home/user');
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error('Invalid credentials');
        } else {
          toast.error('Something went wrong. Please try again later.');
        }
      }
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Student Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-between items-center mb-6">
            <Link to="/signup" className="text-blue-500 text-sm">Don't have an account? Signup</Link>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
