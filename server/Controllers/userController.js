import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
export const createUser = asyncHandler(async (req, res) => {
  console.log("creating a user");

  let { user } = req.body;
  let email = user?.email
  try {
   console.log(email,'emailemail')
  const userExits = await prisma.User.findUnique({ where: { email } });
  console.log(userExits,'usrEmxoj')
  if (!userExits) {
    const user1 = await prisma.User.create({ data: {email:user?.email,name:user?.name,image:user?.picture,} });
    res.status(201).send({
      message: "User Created Successfully",
     user1
    });
  } else {
    res.status(200).send({ message: "user already registered" });
  }
 } catch (error) {
  throw new Error(error.message)
 }
});

export const bookProperty = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id, userEmail } = req.query;

  try {
    const alreadyBooked = await prisma.User.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    if (alreadyBooked.bookedVisits.some((visits) => visits.id === id)) {
      res.status(400).send({ message: "this property already booked by you" });
    } else {
      await prisma.User.update({
        where: { email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });
      await prisma.Agent.update({
        where: { email: userEmail },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });
      res.status(201).send({ message: "property booked successfully" });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

export const allBookings = asyncHandler(async (req, res) => {
  const { id } = req.body;
  try {
    const bookings = await prisma.User.findUnique({
      where: { id },
      select: { bookedVisits: true },
    });
    res.send(bookings);
  } catch (error) {
    throw new Error(error.message);
  }
});

export const cancelBooking = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const { pid, userEmail } = req.query;
  try {
    const user = await prisma.User.findUnique({
      where: { id },
      select: { bookedVisits: true },
    });
    const agent = await prisma.Agent.findUnique({
      where: { email: userEmail },
      select: { bookedVisits: true },
    });
    const index = user.bookedVisits.findIndex((visits) => visits.id === pid);
    const agentIndex = agent.bookedVisits.findIndex(
      (visits) => visits.id === pid
    );

    if (index === -1 || agentIndex === -1) {
      res.status(404).send({ message: "booking not found" });
    } else {
      user.bookedVisits.splice(index, 1);
      await prisma.User.update({
        where: { id },
        data: {
          bookedVisits: user.bookedVisits,
        },
      });
      agent.bookedVisits.splice(agentIndex, 1);
      await prisma.Agent.update({
        where: { email: userEmail },
        data: {
          bookedVisits: agent.bookedVisits,
        },
      });
    }
    res.status(200).send({ message: "booking cancelled" });
  } catch (error) {
    throw new Error(error.message);
  }
});

export const favourites = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const { pid } = req.params;
  try {
    const user = await prisma.User.findUnique({ where: { id } });
    if (user.favouriteProperties.includes(pid)) {
      const updateUser = await prisma.User.update({
        where: { id },
        data: {
          favouriteProperties: {
            set: user.favouriteProperties.filter((prid) => prid !== pid),
          },
        },
      });
      res
        .status(200)
        .send({ message: "property removed from favourites", updateUser });
    } else {
      const updateUser = await prisma.User.update({
        where: { id },
        data: {
          favouriteProperties: {
            push: pid,
          },
        },
      });
      res.send({ message: "property added to favourites", updateUser });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

export const allFavourites = asyncHandler(async(req,res)=>{
  const {id} = req.body
  try {
    const favourites = await prisma.User.findUnique({
      where:{id},
      select:{favouriteProperties:true}
    })
    res.status(200).send({favourites})
  } catch (error) {
    throw new Error(error.message)
  }
})
