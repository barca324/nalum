import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Upw = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]); // Dependencies ensure it runs when token or navigate changes

  if (!token) {
    return null; // Prevent rendering protected content until navigation is complete
  }

  return <div>{children}</div>;
};

export default Upw;
