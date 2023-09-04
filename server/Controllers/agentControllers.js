import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createAgent = asyncHandler(async(req,res)=>{
    const {user} = req.body
    const agent1 = {...user}
    console.log(req.body,'bidt6')
    let email = agent1?.email
    console.log(email,'kjsdhfkjshdfkjsdfsdfg')
    const agentExists = await prisma.Agent.findUnique({where:{email}})
    try {
        if(!agentExists){
            const agent = await prisma.Agent.create({data:{email:agent1?.email,name:agent1?.name,image:agent1?.picture,phone:0}})
            res.status(201).send({
                message:"Agent created successfully",
                agent
            })
        }else{
            res.status(200).send({
                message:"Agent already created"
            })
        }
        
    } catch (error) {
        throw new Error(error.message)
    }
})