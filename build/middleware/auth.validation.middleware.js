"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validJWT = void 0;
const jwt = __importStar(require("jsonwebtoken"));
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const validJWT = (req, res, next) => {
    if (req.headers["authorization"]) {
        try {
            let authorization = req.headers["authorization"].split(" ");
            if (authorization[0] !== "Bearer")
                return res.status(401).json({ error: "Invalid token" });
            else {
                req.params.jwt = JSON.stringify(jwt.verify(authorization[1], JWT_SECRET));
                return next();
            }
        }
        catch (err) {
            return res.status(401).json({ error: "Invalid request" });
        }
    }
    else {
        return res.status(401).json({ error: "Invalid token" });
    }
};
exports.validJWT = validJWT;
