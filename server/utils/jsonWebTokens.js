import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = (id) => {
  const payload = { userId: id };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
  return token;
};

export const verifyToken = (req, res, next) => {
  const token = req.headers["jwt_access_to"];
  console.log(req.headers,'jsjsj')
  console.log(token,'tokenname')
  if (!token) {
    res.status(404).send({message:"you need a token"});
  }else{
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
        if(err){
            res.send({message:"you failed to authenticate"})
        }else{
            req.userId = decoded.id
            next()
        }
    })
  }

};
