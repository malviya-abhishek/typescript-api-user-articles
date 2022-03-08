import {Express} from 'express'
import { articleController } from '../controllers/article.controllers'
import { validJWT } from '../middleware/auth.validation.middleware';

export const articleRoutes = function (app:Express) {
    app.get("/articles", [articleController.getArticles]);
    app.get("/articles/:articleId", [articleController.getArticle]);
    app.post("/articles", [ validJWT, articleController.createArticle]);
    app.put("/articles/:articleId", [validJWT, articleController.updateArticle]);
    app.delete("/articles/:articleId", [validJWT, articleController.deleteArticle]);
    
    app.post("/articles/wordsearch", [articleController.wordSearch]);
}