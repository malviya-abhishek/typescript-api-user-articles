import {Request, Response} from 'express';
import db from '../models'

const getUsers = (req: Request, res: Response) =>{
    console.log("Hello world");
    
    db.User.findAll( {} ).then( (result : any )=>{
        res.status(201).json(result);
    } ).catch( (err: any) => {
        res.status(500).json({msg : err})
    } )
}

const getUser = (req: Request, res: Response) => {
    const userId = req.params.userId;
    db.User.findByPk(userId).then((result: any)=>{
        const toSend = result.dataValues;
        delete toSend["password"];
        delete toSend["updatedAt"];
        res.status(200).json(result);
    }).catch((err: any)=>{
        res.status(500).json({ error :  err});
    })
}

const createUser = (req: Request, res: Response) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    db.User.create(user).then( (result: any)=>{
        const toSend = result.dataValues;
        delete toSend["password"];
        res.status(201).json(toSend);
    }).catch( (err: object)=> {
        res.status(500).json({error : err})
    })
}


export const userController = {
    getUser,
    getUsers,
    createUser
};