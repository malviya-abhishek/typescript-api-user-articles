import {Request, Response} from 'express';
import db from '../models'

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
    .then((result: any)=>{
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

const updateUser = (req: Request, res: Response) => {
    const userId = req.params.userId;
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
        res.status(500).json({error : err})
    })
}

const deleteUser = (req: Request, res: Response) => {
    const userId = req.params.userId;
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