"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const models_1 = __importDefault(require("../models"));
const userLogin = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ error: "Incorrect email or password" });
    models_1.default.User.findOne({ where: { email: email } })
        .then((user) => {
        if (!user || user.validPassword(password) === false)
            return res.status(400).json({ msg: "Incorrect email or password" });
        return res.status(200).json({ token: user.generateJWT(), userId: user.id });
    })
        .catch((err) => {
        return res.status(400).json({ error: "Incorrect email or password" });
    });
};
exports.authController = {
    userLogin
};
