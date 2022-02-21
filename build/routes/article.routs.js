"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleRoutes = void 0;
const article_controllers_1 = require("../controllers/article.controllers");
const articleRoutes = function (app) {
    app.get("/articles", [article_controllers_1.articleController.getArticles]);
    app.get("/articles/:articleId", [article_controllers_1.articleController.getArticle]);
    app.post("/articles", [article_controllers_1.articleController.createArticle]);
    app.put("/articles/:articleId", [article_controllers_1.articleController.updateArticle]);
    app.delete("/articles/:articleId", [article_controllers_1.articleController.deleteArticle]);
};
exports.articleRoutes = articleRoutes;
