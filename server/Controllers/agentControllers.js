import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { agentToken } from "../utils/agentToken.js";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "realtorwebsite54@gmail.com",
    pass: "wlvy xwhg szed mhhi",
  },
});
let globalEmail;
let globalPassword;
let globalName;
let otp;

export const createAgent = asyncHandler(async (req, res) => {
  let { email, password, name } = req.body;
  try {
    const agentExist = await prisma.Agent.findUnique({ where: { email } });
    if (!agentExist) {
      otp = parseInt((Math.random() * 1000000).toString(), 10);

      const mailOptions = {
        from: "realtorwebsite54@gmail.com",
        to: email,
        subject: "Sending Email using Node.js",
        html:
          "<h3>OTP for account verification is </h3>" +
          "<h1 style='font-weight:bold;'>" +
          otp +
          "</h1>",
        text: "That was easy!",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error(error);
        } else {
          console.log("Verification sent to your email");
          globalEmail = email;
          globalName = name;
          globalPassword = password;
          const agent1 = { globalEmail, globalName, globalPassword };
          res.status(200).json({ agent1 });
        }
      });
    } else {
      res.status(200).send({ message: "agent already registered" });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const { agentOtp } = req.body;
  const intOtp = parseInt(agentOtp);
  try {
    if (intOtp === otp) {
      const saltRounds = 5;
      const salt = await bcrypt.genSalt(saltRounds);
      const strPassword = globalPassword.toString();
      const passwordHash = await bcrypt.hash(strPassword, salt);

      const agent1 = await prisma.Agent.create({
        data: { email:globalEmail, password: passwordHash, name:globalName },
      });
      const token = agentToken(agent1.id);
      res.status(201).send({
        message: "agent Created Successfully",
        agent1,
        token,
      });
    }else{
      res.send({message:"incorrect otp"})
    }
  } catch (error) {
    throw new Error (error.message)
  }
});

export const agentLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const agent = await prisma.Agent.findUnique({ where: { email } });
    if (!agent) {
      res.status(200).send({ message: "no agent found" });
    }
    const strPassword = password.toString();
    const passwordMatch = await bcrypt.compare(strPassword, agent.password);
    if (passwordMatch) {
      const token = agentToken(agent.id);
      res
        .status(200)
        .send({ message: "user successfully logged in", agent, token });
    } else {
      res.status(200).send({ message: "incorrect password" });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});
