"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const user_controllers_1 = require("../controllers/user.controllers");
const userRoutes = function (app) {
    app.get("/users", [user_controllers_1.userController.getUsers]);
    app.get("/users/:userId", [user_controllers_1.userController.getUser]);
    app.post("/users", [user_controllers_1.userController.createUser]);
    app.put("/users/:userId", [user_controllers_1.userController.updateUser]);
    app.delete("/users/:userId", [user_controllers_1.userController.deleteUser]);
    app.get("/users/:userId/articles", [user_controllers_1.userController.getUserArticles]);
};
exports.userRoutes = userRoutes;
