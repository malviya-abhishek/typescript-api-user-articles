"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const models_1 = __importDefault(require("../models"));
const getUsers = (req, res) => {
    models_1.default.User.findAll({
        attributes: { exclude: ['password', "updatedAt"] }
    })
        .then((result) => {
        res.status(201).json(result);
    })
        .catch((err) => {
        res.status(500).json({ msg: err });
    });
};
const getUser = (req, res) => {
    const userId = req.params.userId;
    models_1.default.User.findByPk(userId, { attributes: { exclude: ['password', "updatedAt"] } })
        .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
};
const createUser = (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    models_1.default.User.create(user).then((result) => {
        const toSend = result.dataValues;
        delete toSend["password"];
        res.status(201).json(toSend);
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
};
const updateUser = (req, res) => {
    const userId = req.params.userId;
    const user = {};
    if (req.body.name)
        user.name = req.body.name;
    if (req.body.email)
        user.email = req.body.email;
    if (req.body.password)
        user.password = req.body.password;
    models_1.default.User.update(user, {
        where: { id: userId }
    }).then((result) => {
        res.status(200).json(result);
    })
        .catch((err) => {
        res.status(500).json({ error: err });
    });
};
const deleteUser = (req, res) => {
    const userId = req.params.userId;
    models_1.default.User.destroy({ where: { id: userId }, cascade: true }).then((result) => {
        res.status(200).json(result);
    })
        .catch((err) => {
        res.status(500).json({ error: err });
    });
};
const getUserArticles = (req, res) => {
    const userId = req.params.userId;
    models_1.default.Article.findAll({ where: { UserId: userId } }).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
};
exports.userController = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserArticles
};
