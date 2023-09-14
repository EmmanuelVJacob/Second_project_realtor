import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Features/agentSlice";
import { verifyOtp } from "../../utils/agentApi";

const AgentOtp = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [otp, setotp] = useState("");
    const handleSubmit = async () => {
      const agent = await verifyOtp({ agentOtp: otp });
      console.log(agent)
      if (agent) {
        const newAgent = agent.agent1;
        const token = agent.token;
        localStorage.setItem("token", token);
        dispatch(
          login({
            name: newAgent.name,
            email: newAgent.email,
            password: newAgent.password,
            loggedin: true,
          })
        );
        Navigate('/agent');
      } else {
        toast.error("user not signed up");
      }
    };
  return (
    <>
    <div className="wrapper flexCenter">
      <div className="container flexColCenter paddings">
        <div className="flexColCenter">
          <img width={40} src="../../../../public/logo-1.png" alt="logo" />
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
  )
}

export default AgentOtp
