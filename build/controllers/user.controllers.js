"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const models_1 = __importDefault(require("../models"));
const crypto_1 = __importDefault(require("crypto"));
const getUsers = (req, res) => {
    models_1.default.User.findAll({
        attributes: { exclude: ['password', "updatedAt"] }
    })
        .then((result) => {
        res.status(200).json(result);
    })
        .catch((err) => {
        res.status(500).json({ msg: err });
    });
};
const getUser = (req, res) => {
    const userId = req.params.userId;
    models_1.default.User.findByPk(userId, {
        attributes: { exclude: ['password', "updatedAt"] }
    })
        .then((user) => {
        if (user === null)
            res.status(404).json({ "msg": "user does not exist" });
        else
            res.status(200).json(user);
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
};
const createUser = (req, res) => {
    function isValidField(field) {
        if (field === undefined)
            return false;
        if (field.length === 0)
            return false;
        return true;
    }
    if (isValidField(req.body.name) === false ||
        isValidField(req.body.email) === false ||
        isValidField(req.body.password) === false)
        return res.status(400).send({ msg: "field missing" });
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    user.password = crypto_1.default.pbkdf2Sync(user.password, "salt", 10000, 100, 'sha512').toString('hex');
    models_1.default.User.create(user).then((user) => {
        const toSend = user.dataValues;
        delete toSend["password"];
        toSend["token"] = user.generateJWT();
        res.status(201).json(toSend);
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
};
const updateUser = (req, res) => {
    const jwt = JSON.parse(req.params.jwt);
    const userId = req.params.userId;
    if (userId != jwt.id)
        res.status(400).json({ error: "Incorrect token" });
    else {
        const user = {};
        if (req.body.name && req.body.name.length > 0)
            user.name = req.body.name;
        if (req.body.email && req.body.email.length > 0)
            user.email = req.body.email;
        if (req.body.password && req.body.password.length > 0)
            user.password = req.body.password;
        models_1.default.User.update(user, {
            where: { id: userId }
        }).then((result) => {
            res.status(200).json({ msg: "user updated" });
        })
            .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
    }
};
const deleteUser = (req, res) => {
    const jwt = JSON.parse(req.params.jwt);
    const userId = req.params.userId;
    if (jwt.id != userId) {
        res.status(400).json({ error: "Incorrect token" });
    }
    else
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
        if (result.length)
            res.send(result);
        else
            res.status(404).json({ msg: "No articles found" });
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
