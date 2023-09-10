import express from 'express'
import { agentLogin, createAgent } from '../Controllers/agentControllers.js'
const router = express.Router()
router.post('/agentSingUp', createAgent)
router.post('/login',agentLogin)

export {router as AgentRoute}