import {Request, Response, NextFunction} from 'express';
import * as jwt from "jsonwebtoken";
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const validJWT = (req: Request, res: Response, next: NextFunction) =>{
    if (req.headers["authorization"]) {
		try {
			let authorization = req.headers["authorization"].split(" ");
			if (authorization[0] !== "Bearer") return res.status(401).json({error: "Invalid token"});
			else {
				req.params.jwt = JSON.stringify( jwt.verify(authorization[1], JWT_SECRET) );
				return next();
			}
		} catch (err) {
			return res.status(401).json({error: "Invalid token"});
		}
	} else {
		return res.status(401).json({error: "Invalid token"});
	}
}