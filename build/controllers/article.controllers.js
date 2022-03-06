"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleController = void 0;
const models_1 = __importDefault(require("../models"));
const getArticle = (req, res) => {
    const articleId = req.params.articleId;
    models_1.default.Article.findByPk(articleId)
        .then((result) => {
        if (result == null)
            res.status(404).json({ "msg": "article does not exist" });
        else
            res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
};
const getArticles = (req, res) => {
    models_1.default.Article.findAll().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
};
const createArticle = (req, res) => {
    const jwt = JSON.parse(req.params.jwt);
    const { title, content } = req.body;
    if (title && content) {
        const article = {
            title: title,
            content: content,
            UserId: jwt.id
        };
        models_1.default.Article.create(article)
            .then((article) => {
            res.status(201).json(article);
        })
            .catch((err) => {
            res.status(400).json({ error: err });
        });
    }
    else
        res.status(400).json({ msg: "field missing" });
};
const updateArticle = (req, res) => {
    const jwt = JSON.parse(req.params.jwt);
    const userId = jwt.id;
    const articleId = req.params.articleId;
    models_1.default.Article.findByPk(articleId)
        .then((article) => {
        if (!article || article.validUser(userId) === false)
            return res.status(400).json({ "error": "Incorrect token" });
        else {
            const newArticle = {};
            if (req.body.title && req.body.title.length)
                newArticle.title = req.body.title;
            if (req.body.content && req.body.content.length)
                newArticle.content = req.body.content;
            models_1.default.Article.update(newArticle, { where: { id: articleId } })
                .then((result) => {
                res.status(200).json({ "msg": "Article updated" });
            })
                .catch((err) => {
                console.log(err);
                res.status(500).json({ error: err });
            });
        }
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
};
const deleteArticle = (req, res) => {
    const jwt = JSON.parse(req.params.jwt);
    const userId = jwt.id;
    const articleId = req.params.articleId;
    models_1.default.Article.findByPk(articleId)
        .then((article) => {
        if (!article)
            res.status(200).json({ msg: "article does not exist" });
        else if (article.validUser(userId) === false)
            return res.status(400).json({ "error": "Incorrect token" });
        else {
            article.destroy().then((result) => {
                res.status(200).json({ result });
            }).catch((err) => {
                console.log(err);
                res.status(500).json({ error: err });
            });
        }
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
};
exports.articleController = {
    getArticle,
    getArticles,
    createArticle,
    updateArticle,
    deleteArticle
};
