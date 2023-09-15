import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import {adminToken} from '../utils/adminTokens.js'
 