"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const auth_controllers_1 = require("../controllers/auth.controllers");
const user_controllers_1 = require("../controllers/user.controllers");
const auth_validation_middleware_1 = require("../middleware/auth.validation.middleware");
const userRoutes = function (app) {
    app.get("/users", [user_controllers_1.userController.getUsers]);
    app.get("/users/:userId", [user_controllers_1.userController.getUser]);
    app.post("/users", [user_controllers_1.userController.createUser]);
    app.put("/users/:userId", [auth_validation_middleware_1.validJWT, user_controllers_1.userController.updateUser]);
    app.delete("/users/:userId", [auth_validation_middleware_1.validJWT, user_controllers_1.userController.deleteUser]);
    app.get("/users/:userId/articles", [user_controllers_1.userController.getUserArticles]);
    app.post("/users/login", [auth_controllers_1.authController.userLogin]);
};
exports.userRoutes = userRoutes;
