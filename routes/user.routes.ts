import {Express} from 'express'
import { authController } from '../controllers/auth.controllers';
import { userController } from '../controllers/user.controllers'
import { validJWT } from '../middleware/auth.validation.middleware';

export const userRoutes = function (app:Express) {

    /**
    * @openapi
    * '/users':
    *  get:
    *     tags:
    *     - User
    *     summary: Get all users
    *     responses:
    *      200:
    *        description: Success
    *        content:
    *          application/json:
    *            schema:
    *              $ref: '#/components/schemas/GetAllUsers'
    *      500:
    *        description: Internal server error
    */
    app.get("/users", [userController.getUsers]);


    /**
    * @openapi
    * '/users/{userId}':
    *  get:
    *     tags:
    *     - User
    *     summary: Get a single user by the userId
    *     parameters:
    *      - name: userId
    *        in: path
    *        description: The id of the user
    *        required: true
    *     responses:
    *       200:
    *         description: Success
    *         content:
    *          application/json:
    *           schema:
    *              $ref: '#/components/schemas/GetAUser'
    *       404:
    *         description: User not found
    */
    app.get("/users/:userId", [userController.getUser]);

    /**
     * @openapi
     * '/users':
     *  post:
     *     tags:
     *     - User
     *     summary: Register a user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *              $ref: '#/components/schemas/CreateUserInput'
     *     responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/CreateUserResponse'
     *      400:
     *        description: Bad request
     *      500:
     *        description: Internal server error
    */
    app.post("/users", [userController.createUser]);

    /**
    * @openapi
    * '/users/{userId}':
    *  put:
    *     tags:
    *     - User
    *     summary: Edit a user
    *     security:
    *       - bearerAuth: []
    *     parameters:
    *      - name: userId
    *        in: path
    *        type: string
    *        description: The id of the user
    *        required: true
    *     requestBody:
    *      required: true
    *      content:
    *        application/json:
    *           schema:
    *              $ref: '#/components/schemas/EditUserInput'
    *     responses:
    *       200:
    *         description: Success
    *         content:
    *          application/json:
    *           schema:
    *              $ref: '#/components/schemas/GetAUser'
    *       404:
    *         description: User not found
    */
    app.put("/users/:userId", [validJWT, userController.updateUser]);

    /**
    * @openapi
    * '/users/{userId}':
    *  delete:
    *     tags:
    *     - User
    *     summary: Delete a user
    *     security:
    *       - bearerAuth: []
    *     parameters:
    *      - name: userId
    *        in: path
    *        type: string
    *        description: The id of the user
    *        required: true
    *     responses:
    *       200:
    *         description: Success
    *         content:
    *          application/json:
    *           schema:
    *              $ref: '#/components/schemas/GetAUser'
    *       404:
    *         description: User not found
    */
    app.delete("/users/:userId", [validJWT, userController.deleteUser]);
    
    app.get("/users/:userId/articles", [userController.getUserArticles]);
    app.post("/users/login", [authController.userLogin]);
}
