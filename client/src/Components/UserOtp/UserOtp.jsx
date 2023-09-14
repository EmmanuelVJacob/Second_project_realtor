import React, { useState } from "react";
import "./UserOtp.css";
import { toast } from "react-toastify";
import { verifyOtp } from "../../utils/Api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Features/UserSlice";

const UserOtp = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [otp, setotp] = useState("");
  const handleSubmit = async () => {
  
    const newUser1 = await verifyOtp({ UserOtp: otp });
    if (newUser1) {
      const newUser = newUser1.user1;
      const token = newUser1.token;
      localStorage.setItem("token", token);
      dispatch(
        login({
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          loggedin: true,
        })
      );
      Navigate('/');
    } else {
      toast.error("user not signed up");
    }
  };
  return (
    <>
      <div className="wrapper flexCenter">
        <div className="container flexColCenter paddings">
          <div className="flexColCenter">
            <img width={40} src="logo-1.png" alt="logo" />
            <h1 className="primaryText">USER OTP</h1>
          </div>
          <div className="cred flexColCenter">
            <input
              value={otp}
              onChange={(e) => setotp(e.target.value)}
              type="number"
              placeholder="  enter otp.."
            />
          </div>
          <button onClick={handleSubmit} className="button">
            {" "}
            enter otp
          </button>
        </div>
      </div>
    </>
  );
};

export default UserOtp;
