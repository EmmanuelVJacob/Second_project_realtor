import React, { useState } from 'react'
import './UserSignUp.css'
import { Link, NavLink } from "react-router-dom";
import { createUser } from "../../utils/Api";
import { useDispatch } from 'react-redux';
import { login } from '../../Features/UserSlice';


const UserSignUp = () => {
    const [userName,setUserName] = useState('')
    const [password,setPassword]= useState('')
    const [confirmPass,setConfirmPass] = useState('')
    const [email,setEmail] = useState('')
    const dispatch = useDispatch()
    const handleSubmit = async()=>{
        let newUser = await createUser({name:userName,email,password})
        dispatch(login({
            name:newUser.name,
            email:newUser.email,
            password:newUser.password,
            loggedin:true
        } ))
       }
      
  return (
    <>
    <div className="wrapper flexCenter">
      <div className="container flexColCenter paddings">
       <div className="flexColCenter">
       <img width={40} src="logo-1.png" alt="logo" />
        <h1 className="primaryText">Sign Up</h1>
       </div>
       <div className="cred flexColCenter">
       <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} placeholder="   username.." />
        <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password"  placeholder="  password.." />
        <input value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)} type="password" placeholder='confirm password...' />
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='email...' />
       </div>
        <button onClick={handleSubmit} className="button" style={{margin:"1rem"}}> Sing Up</button>
        <p className="secondaryText"> already a member ? <NavLink to="/login"><u>log in</u></NavLink> </p>
      </div>
    </div>
    </>
  )
}

export default UserSignUp
