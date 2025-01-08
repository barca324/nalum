import React, { useState,useContext } from 'react';
import { Link,useNavigate } from 'react-router';
import { AlumniDataContext } from '../context/Alumnicontext';
import axios from 'axios';
import { toast } from 'react-toastify';
const AlumniLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const {alumni, setAlumni} = useContext(AlumniDataContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const alumniData={
        email:formData.email,
        password:formData.password
    }
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/alumni/login`, alumniData);
        
        if (response.status === 200) {
          const { data } = response;
          setAlumni(data);
          console.log('dataalumni',alumni);
          localStorage.setItem('token',data.token);
          console.log("datauser",data)
          toast.success('Login Successful');
          navigate('/home/alumni');
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error('Invalid credentials');
        } else {
          toast.error('Something went wrong. Please try again later.');
        }
      }

   
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Alumni Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-between items-center mb-6">
            <Link to="/alumnisignup" className="text-blue-500 text-sm">Don't have an account? Signup</Link>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AlumniLogin;
