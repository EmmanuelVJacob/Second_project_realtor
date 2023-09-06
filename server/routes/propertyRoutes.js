import express from 'express'
import { createProperty, getAllProperties, getProperty } from '../Controllers/propertyControllers.js'
import jwtCheck from '../config/auth0Config.js'

const router = express.Router()
router.post("/create",createProperty)
router.get('/allProperties',getAllProperties)
router.get('/singleProperty/:id',getProperty)

export {router as propertyRoute}