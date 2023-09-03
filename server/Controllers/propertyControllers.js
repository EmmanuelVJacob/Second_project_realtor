import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createProperty = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    city,
    country,
    image,
    aminities,
    aroundProperty,
    carpetArea,
    bedroomType,
    furnishType,
    PricePerSq,
    buildingProgress,
    bathroom,
    soldStatus,
    userEmail,
    nearProperties,
  } = req.body.data;

  try {
    const property = await prisma.properties.create({
      data: {
        title,
        description,
        price,
        address,
        city,
        country,
        image,
        aminities,
        aroundProperty,
        carpetArea,
        bedroomType,
        furnishType,
        PricePerSq,
        buildingProgress,
        bathroom,
        soldStatus,
        nearProperties,
        owner: {
          connect: { email: userEmail }, // Connect the property with the owner using email
        },
      },
    });
    res.status(201).send({ message: "Property created successfully" });
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("Property already exists");
    }
    throw new Error(err.message);
  }
});

export const getAllProperties = asyncHandler(async(req,res)=>{
  try {
    const allProperties = await prisma.properties.findMany()
    res.status(200).send(allProperties)
    
  } catch (error) {
    throw new Error(error.message)

  }
})

export const getProperty = asyncHandler(async(req,res)=>{
  const {id}= req.params
 try {
  const property = await prisma.properties.findUnique({where:{id}})
  res.status(200).send(property)
 } catch (error) {
  throw new Error(error.message)
  
 }
})