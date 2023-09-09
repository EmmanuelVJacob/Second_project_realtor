import express from 'express'
import { agentLogin, createAgent } from '../Controllers/agentControllers.js'
import { verifyToken } from '../utils/jsonWebTokens.js'
const router = express.Router()
router.post('/agentSingUp',verifyToken, createAgent)
router.post('/login',agentLogin)

export {router as AgentRoute}