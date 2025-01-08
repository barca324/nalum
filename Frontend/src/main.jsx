import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import Usercontext from './context/Usercontext.jsx'
import Alumnicontext from './context/Alumnicontext.jsx'
import { ToastContainer } from 'react-toastify'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Alumnicontext>
   <Usercontext>
     <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
   </Usercontext>
    </Alumnicontext>
  </StrictMode>,
)