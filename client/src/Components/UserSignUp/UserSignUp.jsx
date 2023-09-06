import React from 'react'
import './UserSignUp.css'
import { Link, NavLink } from "react-router-dom";


const UserSignUp = () => {
  return (
    <>
    <div className="wrapper flexCenter">
      <div className="container flexColCenter paddings">
       <div className="flexColCenter">
       <img width={40} src="logo-1.png" alt="logo" />
        <h1 className="primaryText">Sign Up</h1>
       </div>
       <div className="cred flexColCenter">
       <input type="text" placeholder="   username.." />
        <input type="password" name="" id="" placeholder="  password.." />
        <input type="password" placeholder='confirm password...' />
        <input type="email" name="" id="" placeholder='email...' />
       </div>
        <button className="button" style={{margin:"1rem"}}> Sing Up</button>
        <p className="secondaryText"> already a member ? <Link to="/login"><u>log in</u></Link> </p>
      </div>
    </div>
    </>
  )
}

export default UserSignUp
