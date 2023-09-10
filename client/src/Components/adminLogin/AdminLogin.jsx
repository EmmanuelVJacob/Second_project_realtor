import React,{useState} from 'react'
import {  NavLink,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../Features/adminSlice";
import { adminLogin } from '../../utils/adminApi';

const AdminLogin = () => {
    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
      };
      const getPasswordStrength = (pass) => {
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pass)) {
          return "strong";
        }
        return "weak";
      };
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const handleSubmit = async()=>{
        if (!isValidEmail(email)) {
          console.log(email)
          toast.error("invalid email");
          return;
        }
        // const strength = getPasswordStrength(password);
    
        // if (strength !== "strong") {
        //   toast.error("Enter a valid password");
        //   return;
        // }
        let admin = await adminLogin({email,password})
        if(admin){
            dispatch(
                login({
                 email,password
                })
              );
              navigate('/admin');
        }else{
            return
        }
      }
  return (
    <div className="wrapper flexCenter">
      <div className="container flexColCenter paddings">
       <div className="flexColCenter">
       <img width={40} src="../../../../public/logo-1.png" alt="logo" />
        <h1 className="primaryText">Login</h1>
       </div>
       <div className="cred flexColCenter">
       <input value={email} onChange={(e)=>setEmail(e.target.value)}  type="text" placeholder="   email.." />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password"  placeholder="  password.." />
       </div>
        <button onClick={handleSubmit} className="button"> login</button>
        <p className="secondaryText"> Not a member ? <NavLink to="/signup"><u>sign Up</u></NavLink> </p>
      </div>
    </div>
  )
}

export default AdminLogin
