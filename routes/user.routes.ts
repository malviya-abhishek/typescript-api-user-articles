import {Express} from 'express'
import { authController } from '../controllers/auth.controllers';
import { userController } from '../controllers/user.controllers'
import { validJWT } from '../middleware/auth.validation.middleware';

export const userRoutes = function (app:Express) {
    app.get("/users", [userController.getUsers]);
    app.get("/users/:userId", [userController.getUser]);
    app.post("/users", [userController.createUser]);
    app.put("/users/:userId", [validJWT, userController.updateUser]);
    app.delete("/users/:userId", [validJWT, userController.deleteUser]);
    
    app.get("/users/:userId/articles", [userController.getUserArticles]);
    app.post("/users/login", [authController.userLogin]);
}
