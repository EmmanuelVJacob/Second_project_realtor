import express from 'express'
import { agentLogin, createAgent, verifyOtp } from '../Controllers/agentControllers.js'
const router = express.Router()
router.post('/agentSingUp', createAgent)
router.post('/otp',verifyOtp)
router.post('/login',agentLogin)


export {router as AgentRoute}