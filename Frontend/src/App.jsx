import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Alumnisignup from './pages/Alumnisignup';
import Alumnilogin from './pages/Alumnilogin';
import Userlogin from './pages/Userlogin';
import Usersignup from './pages/Usersignup';
import User from './pages/User';
import Upw from './pages/Upw';
import Userlogout from './pages/Userlogout';
import Alumni from'./pages/Alumni'
import Alumnilogout from './pages/Alumnilogout';

const App = () => {
  return (
    
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Usersignup />} />
          <Route path="/login" element={<Userlogin />} />
          <Route path="/alumni/signup" element={<Alumnisignup />} />
          <Route path="/alumni/login" element={<Alumnilogin />} />
          <Route path='/home/user' element={
            <Upw>
               <User/>
            </Upw>
          }/>
          <Route path='/users/logout' element={
            <Upw>
               <Userlogout/>
            </Upw>

          }/>
          <Route path='/home/alumni' element={
            <Upw>
               <Alumni/>
            </Upw>
          }/>
          <Route path='/alumni/logout' element={
            <Upw>
               <Alumnilogout/>
            </Upw>
          }/>
        </Routes>
        
      </div>
      
    
  );
};

export default App;
