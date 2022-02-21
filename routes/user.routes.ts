import {Express} from 'express'
import { userController } from '../controllers/user.controllers'

export const userRoutes = function (app:Express) {
    app.get("/users", [userController.getUsers]);
    app.get("/users/:userId", [userController.getUser]);
    app.post("/users", [userController.createUser]);
    app.put("/users/:userId", [userController.updateUser]);
    app.delete("/users/:userId", [userController.deleteUser]);
}
