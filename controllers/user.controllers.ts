import {Request, Response} from 'express';
import db from '../models';
import crypto from 'crypto';

const getUsers = (req: Request, res: Response) =>{
    db.User.findAll({ 
        attributes: { exclude: ['password', "updatedAt"]} 
        })
        .then( (result : any )=>{
            res.status(200).json(result);
        })
        .catch( (err: any) => {
            res.status(500).json({msg : err})
        })
}

const getUser = (req: Request, res: Response) => {
    const userId = req.params.userId;
    db.User.findByPk( 
        userId, 
        { attributes: { exclude: ['password', "updatedAt"]}} 
        )
    .then((user: any)=>{
        res.status(200).json(user);
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

    user.password =  crypto.pbkdf2Sync(user.password, "salt", 10000, 100, 'sha512').toString('hex');
    

    db.User.create(user).then( (user: any)=>{
        const toSend = user.dataValues;
        delete toSend["password"];
        toSend["token"] = user.generateJWT();
        res.status(201).json(toSend);
    }).catch( (err: object)=> {
        res.status(500).json({error : err})
    })
}

const updateUser = (req: Request, res: Response) => {

    const jwt = JSON.parse(req.params.jwt);
    const userId = req.params.userId;
    
    if(userId != jwt.id)
        res.status(400).json({error : "Incorrect token"})
    else{
        const user: {[k: string]: any} = {};
        if(req.body.name) user.name =  req.body.name;
        if(req.body.email) user.email =  req.body.email;
        if(req.body.password) user.password =  req.body.password;
        
        db.User.update(
            user,
            {
                where: { id: userId }
            }).then( (result: any)=>{
            res.status(200).json(result)
        })
        .catch( (err: any)=>{
            console.log(err);
            res.status(500).json({error : err})
        })
    }
}

const deleteUser = (req: Request, res: Response) => {

    const jwt = JSON.parse(req.params.jwt);
    const userId = req.params.userId;
    
    if(jwt.id != userId){
        res.status(400).json({error: "Incorrect token"})
    }
    else
        db.User.destroy( {where: {id : userId} , cascade: true } ).then( (result: any)=>{
            res.status(200).json(result)
        })
        .catch( (err: any)=>{
            res.status(500).json({error : err})
        })
}

const getUserArticles = (req: Request, res: Response) =>{
    const userId = req.params.userId
    db.Article.findAll({where: {UserId : userId}} ).then((result: object)=>{
        res.send(result)
    }).catch( (err: object)=>{
        res.status(500).json({error : err})
    })
}

export const userController = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserArticles
};