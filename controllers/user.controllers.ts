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
        { 
            attributes: { exclude: ['password', "updatedAt"]}} 
        )
    .then((user: any)=>{
        if(user === null)
            res.status(404).json({"msg" : "user does not exist"});
        else
            res.status(200).json(user);
    }).catch((err: any)=>{
        res.status(500).json({ error :  err});
    })
}

const createUser = (req: Request, res: Response) => {

    function isValidField(field: string): boolean {
        if(field === undefined)
            return false;
        if(field.length === 0)
            return false;
        return true;
    }

    if( 
        isValidField(req.body.name) === false || 
        isValidField(req.body.email) === false || 
        isValidField(req.body.password) === false  
        )
        return res.status(400).send({msg : "field missing"});

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    user.password =  crypto.pbkdf2Sync(user.password, "salt", 10000, 100, 'sha512').toString('hex');

    db.User.findAll({where: {email : user.email}} ).then((result: Array<object>)=>{
        if(result.length)
            res.status(400).json({msg: "email already used"})
        else{
            db.User.create(user).then( (user: any)=>{
                const toSend = user.dataValues;
                delete toSend["password"];
                toSend["token"] = user.generateJWT();
                res.status(201).json(toSend);
            }).catch( (err: object)=> {
                console.log(err);
                res.status(500).json({error : err})
            })
        }
    }).catch( (err: object)=>{
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
        if(req.body.name && req.body.name.length > 0  ) user.name =  req.body.name;
        if(req.body.password && req.body.password.length > 0 )
            user.password =  crypto.pbkdf2Sync(req.body.password, "salt", 10000, 100, 'sha512').toString('hex');
        db.User.update(
            user,
            {
                where: { id: userId }
            }).then( (result: any)=>{
                db.User.findByPk( 
                    userId, 
                    { 
                        attributes: { exclude: ['password', "updatedAt"]}} 
                    )
                .then((user: any)=>{
                    if(user === null)
                        res.status(404).json({"msg" : "user does not exist"});
                    else
                        res.status(200).json(user);
                }).catch((err: any)=>{
                    res.status(500).json({ error :  err});
                });
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
            res.status(200).json({msg: "user deleted"})
        })
        .catch( (err: any)=>{
            res.status(500).json({error : err})
        })
}

const getUserArticles = (req: Request, res: Response) =>{
    const userId = req.params.userId
    db.Article.findAll({where: {UserId : userId}} ).then((result: Array<object>)=>{
        if(result.length)
            res.send(result)
        else
            res.status(404).json({msg : "No articles found"})
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