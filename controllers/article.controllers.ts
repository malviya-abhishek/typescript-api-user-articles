import {Request, Response} from 'express';
import db from '../models'

const getArticle = (req: Request, res: Response) => {
    const articleId = req.params.articleId;
    db.Article.findByPk(articleId)
    .then((result: any)=>{
        res.status(200).json(result);
    }).catch((err: any)=>{
        res.status(500).json({ error :  err});
    })
}

const getArticles = (req: Request, res: Response) => {
    db.Article.findAll().then((result: object)=>{
        res.send(result)
    }).catch( (err: object)=>{
        res.status(500).json({error : err})
    }) 
}

const createArticle = (req: Request, res: Response) => {
    
}

const updateArticle = (req: Request, res: Response) => {
    
}

const deleteArticle = (req: Request, res: Response) => {
    
}


export const articleController = {
    getArticle,
    getArticles,
    createArticle,
    updateArticle,
    deleteArticle
};