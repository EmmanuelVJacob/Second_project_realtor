import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
import bcrypt from "bcryptjs";
export const createAgent = asyncHandler(async (req, res) => {
  console.log('hi')
  let { email, password, name } = req.body;
  console.log(req.body,'sdkjfslkjf')
  try {
    const agentExist = await prisma.Agent.findUnique({ where: { email } });
    if (!agentExist) {
      const saltRounds = 5;
      const salt = await bcrypt.genSalt(saltRounds);
      const strPassword = password.toString()
      const passwordHash = await bcrypt.hash(strPassword, salt);

      const agent1 = await prisma.Agent.create({
        data: { email, password: passwordHash, name },
      });
      res.status(201).send({
        message: "agent Created Successfully",
        agent1,
      });
    } else {
      res.status(200).send({ message: "agent already registered" });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

export const agentLogin = asyncHandler(async (req, res) => {
  console.log('emmman')
  const { email, password } = req.body;
  try {
    const agent = await prisma.Agent.findUnique({ where: { email } });
    if (!agent) {
      res.status(200).send({message:"no agent found"})
      
    }
    const strPassword = password.toString()
    const passwordMatch = await bcrypt.compare(strPassword, agent.password);
    if (passwordMatch) {
      res.status(200).send({message:"user successfully logged in",agent})
    } else {
      res.status(200).send({message:"incorrect password"})
    }
  } catch (error) {
    throw new Error(error.message);
  }
});