import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jsonWebTokens.js";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "realtorwebsite54@gmail.com",
    pass: "wlvy xwhg szed mhhi",
  },
});
let globalEmail;
let globalPassword;
let globalName;
let otp;

export const createUser = asyncHandler(async (req, res) => {
  let { email, password, name } = req.body;
  try {
    const userExits = await prisma.User.findUnique({ where: { email } });
    if (!userExits) {
      otp = parseInt((Math.random() * 1000000).toString(), 10);

      const mailOptions = {
        from: "realtorwebsite54@gmail.com",
        to: email,
        subject: "Sending Email using Node.js",
        html:
          "<h3>OTP for account verification is </h3>" +
          "<h1 style='font-weight:bold;'>" +
          otp +
          "</h1>",
        text: "That was easy!",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error(error);
        } else {
          console.log("Verification sent to your email");
          globalEmail = email;
          globalName = name;
          globalPassword = password;
          const user1 = { globalEmail, globalName, globalPassword };
          res.status(200).json({ user1 });
        }
      });
    } else {
      res.status(200).send({ message: "user already registered" });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const { UserOtp } = req.body;
  const intOtp = parseInt(UserOtp);
  try {
    if (intOtp === otp) {
      const saltRounds = 5;
      const salt = await bcrypt.genSalt(saltRounds);
      const strPassword = globalPassword.toString();
      const passwordHash = await bcrypt.hash(strPassword, salt);

      const user1 = await prisma.User.create({
        data: { email: globalEmail, password: passwordHash, name: globalName },
      });
      const token = generateToken(user1.id);
      res.status(201).send({
        message: "User Created Successfully",
        user1,
        token,
      });
    } else {
      res.send({ message: "incorrect otp" });
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
      res.status(200).send({ message: "no user found" });
    }
    const strPassword = password.toString();
    const passwordMatch = await bcrypt.compare(strPassword, user.password);
    if (passwordMatch) {
      console.log(user.id);
      const token = generateToken(user.id.toString());
      res
        .status(200)
        .send({ message: "user successfully logged in", user, token });
    } else {
      res.status(200).send({ message: "incorrect password" });
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
