'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const crypto_1 = __importDefault(require("crypto"));
const jwt = __importStar(require("jsonwebtoken"));
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
module.exports = (sequelize, DataTypes) => {
    class User extends sequelize_1.Model {
        static associate(models) {
            User.hasMany(models.Article, {
                onDelete: "cascade",
            });
        }
        validPassword(password) {
            const hashedPassword = crypto_1.default.pbkdf2Sync(password, "salt", 10000, 100, 'sha512').toString('hex');
            ;
            return this.password === hashedPassword;
        }
        generateJWT() {
            const today = new Date();
            const exp = new Date(today);
            exp.setDate(today.getDate() + 60);
            return jwt.sign({
                id: this.id,
                email: this.email,
                exp: exp.getTime() / 1000,
            }, JWT_SECRET);
        }
    }
    User.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};
