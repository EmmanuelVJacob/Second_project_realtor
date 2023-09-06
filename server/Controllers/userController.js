import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
import bcrypt from "bcryptjs";
export const createUser = asyncHandler(async (req, res) => {
  let { email, password, name } = req.body;
  console.log(req.body,'sdkjfslkjf')
  try {
    const userExits = await prisma.User.findUnique({ where: { email } });
    if (!userExits) {
      const saltRounds = 5;
      const salt = await bcrypt.genSalt(saltRounds);
      const strPassword = password.toString()
      const passwordHash = await bcrypt.hash(strPassword, salt);

      const user1 = await prisma.User.create({
        data: { email, password: passwordHash, name },
      });
      res.status(201).send({
        message: "User Created Successfully",
        user1,
      });
    } else {
      res.status(200).send({ message: "user already registered" });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.User.findUnique({ where: { email } });
    if (!user) {
      res.status(404).send({message:"no user found"})
      
    }

    const strPassword = password.toString()
    const passwordMatch = await bcrypt.compare(strPassword, user.password);

    if (passwordMatch) {
      res.status(200).send({message:"user successfully logged in"})
    } else {
      res.status(404).send({message:"incorrect password"})
    }
  } catch (error) {
    throw new Error(error.message);
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

export const allFavourites = asyncHandler(async (req, res) => {
  const { id } = req.body;
  try {
    const favourites = await prisma.User.findUnique({
      where: { id },
      select: { favouriteProperties: true },
    });
    res.status(200).send({ favourites });
  } catch (error) {
    throw new Error(error.message);
  }
});
