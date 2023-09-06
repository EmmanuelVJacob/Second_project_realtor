import React from "react";
import "./LoginUser.css";
import { Link, NavLink } from "react-router-dom";


const LoginUser = () => {
  return (
    <div className="wrapper flexCenter">
      <div className="container flexColCenter paddings">
       <div className="flexColCenter">
       <img width={40} src="logo-1.png" alt="logo" />
        <h1 className="primaryText">Login</h1>
       </div>
       <div className="cred flexColCenter">
       <input type="text" placeholder="   username.." />
        <input type="password" name="" id="" placeholder="  password.." />
       </div>
        <button className="button"> login</button>
        <p className="secondaryText"> Not a member ? <Link to="/signup"><u>sign Up</u></Link> </p>
      </div>
    </div>
  );
};

export default LoginUser;
