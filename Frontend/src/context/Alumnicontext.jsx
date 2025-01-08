import {createContext,useState,useContext} from 'react'  
export const AlumniDataContext=createContext();
const Alumnicontext = ({children}) => {
    const [alumni,setAlumni]=useState({
        name:'',
        email:'',
        password:'',
        branch:'',
        batch:'',
        company:'',
        designation:'',
        linkedin:'',
        contact:''
    })
    return (
        <div>
            <AlumniDataContext.Provider value={{alumni,setAlumni}}>
                {children}
            </AlumniDataContext.Provider>
        </div>
    )
} 
export default Alumnicontext