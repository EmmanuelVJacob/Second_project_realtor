import express from 'express'
import { allBookings, allFavourites, bookProperty, cancelBooking, createUser, favourites } from '../Controllers/userController.js'
const router = express.Router()
router.post("/register",createUser)
router.post(`/bookVisit`,bookProperty)
router.post('/allBookings',allBookings)
router.post('/cancelBooking',cancelBooking)
router.post('/favourites/:pid',favourites)
router.post('/allFavourite',allFavourites)

export {router as userRoute} 