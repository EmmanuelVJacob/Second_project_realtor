import express from 'express'
import { createAgent } from '../Controllers/agentControllers.js'
const router = express.Router()
router.post('/agentSingUp',createAgent)

export {router as AgentRoute}