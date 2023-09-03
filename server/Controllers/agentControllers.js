import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createAgent = asyncHandler(async(req,res)=>{
    const {email} = req.body
    const agentExists = await prisma.Agent.findUnique({where:{email}})
    if(!agentExists){
        const agent = await prisma.Agent.create({data:req.body})
        res.status(201).send({
            message:"Agent created successfully",
            agent
        })
    }else{
        res.status(200).send({
            message:"Agent already created"
        })
    }
})