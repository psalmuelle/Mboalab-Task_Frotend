
import {Progress } from "../../forms";
import "./hospitalStyles.css";
import { useEffect } from "react";
import '../../styles.scss';
import { Outlet,useLocation, useNavigate } from "react-router-dom";


function HospitalData() {
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(()=>{
    if ("token" in localStorage){
       return
    }else{
       navigate("/login")
    }
    },[])


  return (
    <div className='App'>
      <h2 className='sub__heading'>Hospital/Medical Facility Data</h2>
      <Progress path={location.pathname}/>
      <div className='hospital-form__container'>
     <Outlet/>
      </div>
    </div>
  );
}

export default HospitalData;
