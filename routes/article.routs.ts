import {Express} from 'express'
import { articleController } from '../controllers/article.controllers'

export const articleRoutes = function (app:Express) {
    app.get("/articles", [articleController.getArticles]);
    app.get("/articles/:articleId", [articleController.getArticle]);
    app.post("/articles", [articleController.createArticle]);
    app.put("/articles/:articleId", [articleController.updateArticle]);
    app.delete("/articles/:articleId", [articleController.deleteArticle]);
}