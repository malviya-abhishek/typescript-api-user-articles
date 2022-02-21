import {Express} from 'express'
import { userController } from '../controllers/user.controllers'

export const userRoutes = function (app:Express) {
    app.get("/users", [userController.getUser]);
    app.get("/users/:userId", [userController.getUser]);
    app.post("/users", [userController.createUser]);
    app.put("/users/:userId", []);
    app.delete("/users/:userId", []);
}
