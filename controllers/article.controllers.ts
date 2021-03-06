import {Request, Response} from 'express';
import db from '../models'
import { Op } from 'sequelize';

const getArticle = (req: Request, res: Response) => {
    const articleId = req.params.articleId;
    const options = {
        include: [
            {
                model : db.User,  
                attributes: { exclude: ['password', "updatedAt", "email", "createdAt"]} 
            }
        ],
        attributes:{
            exclude:['UserId']
        }
    };
    db.Article.findByPk(articleId, options)
    .then((result: any)=>{
        if(result == null)
            res.status(404).json({"msg" : "article does not exist"})
        else
            res.status(200).json(result);
    }).catch((err: any)=>{
        res.status(500).json({ error :  err});
    })
}

const getArticles = (req: Request, res: Response) => {
    const options = {
        include: [
            {
                model : db.User,  
                attributes: { exclude: ['password', "updatedAt", "email", "createdAt"]} 
            }
        ],
        attributes:{
            exclude:['UserId']
        }
    };
    db.Article.findAll(options).then((result: object)=>{
        res.send(result)
    }).catch( (err: object)=>{
        res.status(500).json({error : err})
    }) 
}

const createArticle = (req: Request, res: Response) => {
    const jwt = JSON.parse(req.params.jwt);
    const {title, content} = req.body
    
    if( title && content){
        const article = {
            title: title,
            content: content,
            UserId: jwt.id
        }
        
        db.Article.create(article)
        .then( ( article : any ) => {
            const articleId = article.id;
            const options = {
                include: [
                    {
                        model : db.User,  
                        attributes: { exclude: ['password', "updatedAt", "email", "createdAt"]} 
                    }
                ],
                attributes:{
                    exclude:['UserId']
                }
            };
            db.Article.findByPk(articleId, options)
            .then((result: any)=>{
                if(result == null)
                    res.status(404).json({"msg" : "article does not exist"})
                else
                    res.status(200).json(result);
            }).catch((err: any)=>{
                res.status(500).json({ error :  err});
            })

        })
        .catch( (err: any) => {
            res.status(400).json({error: err});
        });
    }
    else
        res.status(400).json({msg : "field missing"});
}

const updateArticle = (req: Request, res: Response) => {
    const jwt = JSON.parse(req.params.jwt);
    const userId = jwt.id;
    const articleId = req.params.articleId;

    
   
    db.Article.findByPk(articleId)
    .then((article: any)=>{

        if(!article)
            return res.status(404).json({"msg": "Article does not exist"});
        else if(article.validUser(userId) === false)
            return res.status(400).json({"error": "Invalid token"});
        else{
        
            const newArticle: {[k: string]: any} = {};
            if(req.body.title && req.body.title.length ) newArticle.title = req.body.title; 
            if(req.body.content && req.body.content.length) newArticle.content = req.body.content; 
            
            db.Article.update(
                newArticle,
                {where: {id: articleId}})
            .then( (result : any )=>{
                const options = {
                    include: [
                        {
                            model : db.User,  
                            attributes: { exclude: ['password', "updatedAt", "email", "createdAt"]} 
                        }
                    ],
                    attributes:{
                        exclude:['UserId']
                    }
                };
                db.Article.findByPk(articleId, options)
                .then((result: any)=>{
                    if(result == null)
                        res.status(404).json({"msg" : "article does not exist"})
                    else
                        res.status(200).json(result);
                }).catch((err: any)=>{
                    res.status(500).json({ error :  err});
                });

            })
            .catch( (err: any)=>{
                console.log(err);
                res.status(500).json({error : err})
            });

        }
    
    }).catch((err: any)=>{
        res.status(500).json({ error :  err});
    })


}

const deleteArticle = (req: Request, res: Response) => {
    const jwt = JSON.parse(req.params.jwt);
    const userId = jwt.id;
    const articleId = req.params.articleId;

    db.Article.findByPk(articleId)
    .then((article: any)=>{
        if(!article)
            res.status(200).json({msg: "article does not exist"})
        else if(article.validUser(userId) === false)
            return res.status(400).json({"error": "Incorrect token"});
        else{
            article.destroy().then( (result: any)=>{
                res.status(200).json({msg: "Article deleted"});
            }).catch( (err: any)=>{
                console.log(err);
                res.status(500).json({error: err})
            })
        }
    }).catch((err: any)=>{
        res.status(500).json({ error :  err});
    })

}

const wordSearch = (req: Request, res: Response) =>{
    const word = req.query.word;
    if(word){
        const options = {
            where: {
              [Op.or]: [
                { 'title': { [Op.like]: `%${word}%` }},
                { 'content': { [Op.like]: `%${word}%` }},
                { '$User.name$': { [Op.like]: `%${word}%` }}
              ]
            },
            include: [
                {
                    model : db.User,  
                    attributes: { exclude: ['password', "updatedAt", "email", "createdAt"]} 
                }
            ],
            attributes:{
                exclude:['UserId']
            }
          };

        

        db.Article.findAll(options).then((result : any)=>{
            res.status(200).json({result});
        }).catch((err : any)=>{
            console.log(err);
            res.status(500).json({"msg": "Something went wrong"});
        })
    }
    else
        res.status(400).json({"msg" : "empty key word"})

}


export const articleController = {
    getArticle,
    getArticles,
    createArticle,
    updateArticle,
    deleteArticle,
    wordSearch
};