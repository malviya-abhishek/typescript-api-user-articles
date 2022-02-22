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
    const jwt = JSON.parse(req.params.jwt);
    const {title, content} = req.body

    const article = {
        title: title,
        content: content.substring(0, Math.min(content.length, 200)),
        UserId: jwt.id
    }

    console.log("asd" ,article);
    

    db.Article.create(article)
    .then( ( article : any ) => {
        res.status(201).json(article)
    })
    .catch( (err: any) => {
        res.status(400).json({error: err});
    });
    
}

const updateArticle = (req: Request, res: Response) => {
    const jwt = JSON.parse(req.params.jwt);
    const userId = jwt.id;
    const articleId = req.params.articleId;

    
   
    db.Article.findByPk(articleId)
    .then((article: any)=>{

        if(!article || article.validUser(userId) === false)
            return res.status(400).json({"error": "Incorrect token"});
        else{
        
            const newArticle: {[k: string]: any} = {};
            if(req.body.title) newArticle.title = req.body.title; 
            if(req.body.content) newArticle.content = req.body.content; 
            
            db.Article.update(
                newArticle,
                {where: {id: articleId}})
            .then( (result : any )=>{
                res.status(200).json(result)
            })
            .catch( (err: any)=>{
                console.log(err);
                res.status(500).json({error : err})
            })

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
                res.status(200).json({result});
            }).catch( (err: any)=>{
                console.log(err);
                res.status(500).json({error: err})
            })
        }
    }).catch((err: any)=>{
        res.status(500).json({ error :  err});
    })

}


export const articleController = {
    getArticle,
    getArticles,
    createArticle,
    updateArticle,
    deleteArticle
};