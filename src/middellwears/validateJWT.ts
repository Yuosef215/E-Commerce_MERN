import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";


interface ExtendeRequst extends Request {
    user?:any;
}

const validateJWT = (req: ExtendeRequst, res: Response, next: NextFunction) => {
    const authorization = req.get("authorization");

if (!authorization) {
  return res.status(403).send("Authorization header was not provided!");
}

const token = authorization.split(" ")[1];

if (!token) {
  return res.status(403).send("Bearer token not found");
}

    jwt.verify(token, 'ibVFBzyN7tO7E6q0maJsOwVsGZ4/nGbaP3fVaCOtZmc=',async (err, pyload) => {
        if (err) {
            res.status(403).send("Invaild token");
            return;
        }
        if (!pyload) {
            res.status(403).send("Invalid pyload");
            return;
        }

        const userPyload = pyload as ({ email: string, firstName: string, lastName: string })

        const user =await userModel.findOne({ email: userPyload.email })
        req.user = user;
        next();
    });
}


export default validateJWT;