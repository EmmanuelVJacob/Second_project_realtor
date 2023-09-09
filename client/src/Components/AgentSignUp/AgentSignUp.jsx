import React,{useState} from 'react'
import './AgentSignUp.css' 
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { login } from "../../Features/UserSlice";
import { toast } from "react-toastify";
import { createAgent } from '../../utils/agentApi';
import { login } from '../../Features/agentSlice';


const AgentSignUp = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
  
    const handleSubmit = async () => {
        console.log(email,password,userName,'i')
      if (!isValidEmail(email)) {
        toast.error("invalid email");
        return;
      }
      const strength = getPasswordStrength(password);
  
      if (strength !== "strong") {
        toast.error("Password must be strong");
        return;
      }
  
      if (password !== confirmPass) {
        toast.error("Passwords do not match");
        return;
      }
      let newAgent = await createAgent({ name: userName, email, password });
      console.log(newAgent,'newAgent')
      dispatch(
        login({
          name: newAgent.name,
          email: newAgent.email,
          password: newAgent.password,
          loggedin: true,
        })
      );
      navigate(-2);
    };
  
    return (
      <>
        <div className="wrapper flexCenter">
          <div className="container flexColCenter paddings">
            <div className="flexColCenter">
              <img width={40} src="../../../../public/logo-1.png" alt="logo" />
              <h1 className="primaryText">Sign Up</h1>
            </div>
            <div className="cred flexColCenter">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="   username.."
              />
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="  password.."
              />
              <input
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                type="password"
                placeholder="confirm password..."
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="email..."
              />
            </div>
            <button
              onClick={handleSubmit}
              className="button"
              style={{ margin: "1rem" }}
            >
              {" "}
              Sing Up
            </button>
            <p className="secondaryText">
              {" "}
              already a member ?{" "}
              <NavLink to="/agent/login">
                <u>log in</u>
              </NavLink>{" "}
            </p>
          </div>
        </div>
      </>
    );
}

export default AgentSignUp
