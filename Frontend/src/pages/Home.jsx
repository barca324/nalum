import React from 'react';
import { Link } from 'react-router-dom';
import image from '../images/xyz.jpg';

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Overlay to darken the background */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="relative z-10 text-center text-white px-4 sm:px-12">
        <h1 className="text-5xl font-extrabold mb-6 leading-tight">Welcome to the Alumni-Student Portal</h1>
        <p className="text-xl sm:text-2xl mb-8 max-w-2xl mx-auto">A platform where Alumni and Students come together to connect, share, and grow professionally.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 sm:px-12">
          {/* Alumni Section */}
          <div className="p-8 bg-opacity-70 bg-white shadow-2xl rounded-lg text-center hover:shadow-3xl transition duration-300 transform hover:scale-105">
            <h2 className="text-4xl font-bold text-blue-600 mb-4">Alumni</h2>
            <p className="text-lg mb-6 text-gray-700">Reconnect with your peers and help guide the next generation of students.</p>
            <div className="space-y-4">
              <Link to="/alumni/login">
                <button className="px-6 py-3 w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 shadow-md hover:shadow-lg mb-4">
                  Login
                </button>
              </Link>
              <Link to="/alumni/signup">
                <button className="px-6 py-3 w-full bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 shadow-md hover:shadow-lg">
                  Signup
                </button>
              </Link>
            </div>
          </div>

          {/* Student Section */}
          <div className="p-8 bg-opacity-70 bg-white shadow-2xl rounded-lg text-center hover:shadow-3xl transition duration-300 transform hover:scale-105">
            <h2 className="text-4xl font-bold text-blue-600 mb-4">Student</h2>
            <p className="text-lg mb-6 text-gray-700">Join a network of professionals and alumni, and explore endless opportunities for your future.</p>
            <div className="space-y-4">
              <Link to="/login">
                <button className="px-6 py-3 w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 shadow-md hover:shadow-lg mb-4">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-6 py-3 w-full bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 shadow-md hover:shadow-lg">
                  Signup
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
