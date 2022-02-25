import {Request, Response} from 'express';
import db from '../models';

const userLogin = (req : Request, res: Response)=>{
    const {email, password} = req.body;
    if(!email || !password )
        return res.status(400).json({ error: "Incorrect email or password" })

   db.User.findOne( { where: { email: email }} )
           .then( (user:any) => {
               if (!user || user.validPassword(password) === false ) 
                   return res.status(400).json({ msg: "Incorrect email or password" });
               return res.status(200).json({token : user.generateJWT(), userId : user.id});
          })
          .catch( (err:any) => {
              return res.status(400).json({ error: "Incorrect email or password" });
          });
}

export const authController = {
    userLogin
};
