import jwt from "jsonwebtoken";
import "dotenv/config";

export const agentToken = (id) => {
  const payload = { userId: id };
  const token = jwt.sign(payload, process.env.JWT_AGENT_KEY, {
    expiresIn: "30d",
  });
  return token;
};

export const verifyAgentToken = (req, res, next) => {
  const token = req.headers["jwt_agent_"];
  console.log(req.headers,'jsjsj')
  if (!token) {
    res.status(404).send({message:"you need a token"});
  }else{
    jwt.verify(token,process.env.JWT_AGENT_KEY,(err,decoded)=>{
        if(err){
            res.send({message:"you failed to authenticate"})
        }else{
            req.userId = decoded.id
            next()
        }
    })
  }

};
