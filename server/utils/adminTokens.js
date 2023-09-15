import jwt from "jsonwebtoken";
import "dotenv/config";

export const adminToken = (id) => {
  const payload = { userId: id };
  const token = jwt.sign(payload, process.env.JWT_ADMIN_KEY, {
    expiresIn: "30d",
  });
  return token;
};

export const verifyAdminToken = (req, res, next) => {
  const token = req.headers["jwt_admin_"];
  if (!token) {
    res.status(404).send({message:"you need a token"});
  }else{
    jwt.verify(token,process.env.JWT_ADMIN_KEY,(err,decoded)=>{
        if(err){
            res.send({message:"you failed to authenticate"})
        }else{
            req.userId = decoded.id
            next()
        }
    })
  }

};
