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
};
const updateArticle = (req, res) => {
};
const deleteArticle = (req, res) => {
};
exports.articleController = {
    getArticle,
    getArticles,
    createArticle,
    updateArticle,
    deleteArticle
};
