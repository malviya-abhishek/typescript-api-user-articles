import {Express} from 'express'
import { articleController } from '../controllers/article.controllers'
import { validJWT } from '../middleware/auth.validation.middleware';

export const articleRoutes = function (app:Express) {

    /**
    * @openapi
    * '/articles/wordsearch':
    *  get:
    *     tags:
    *     - Article
    *     summary: Search a word
    *     parameters:
    *       - in: query
    *         name: word
    *         description: Word to be searched
    *         schema:
    *           type: string
    *     responses:
    *      200:
    *        description: Success
    *        content:
    *          application/json:
    *            schema:
    *              $ref: '#/components/schemas/GetAllArticles'
    *      500:
    *        description: Internal server error
    */
    app.get("/articles/wordsearch", [articleController.wordSearch]);

    /**
    * @openapi
    * '/articles':
    *  get:
    *     tags:
    *     - Article
    *     summary: Get all articles
    *     responses:
    *      200:
    *        description: Success
    *        content:
    *          application/json:
    *            schema:
    *              $ref: '#/components/schemas/GetAllArticles'
    *      500:
    *        description: Internal server error
    */
    app.get("/articles", [articleController.getArticles]);

    /**
    * @openapi
    * '/articles/{articleId}':
    *  get:
    *     tags:
    *     - Article
    *     summary: Get a single article by the articleId
    *     parameters:
    *      - name: articleId
    *        in: path
    *        description: The id of the article
    *        required: true
    *     responses:
    *       200:
    *         description: Success
    *         content:
    *          application/json:
    *           schema:
    *              $ref: '#/components/schemas/GetAArticle'
    *       404:
    *         description: Article not found
    */
    app.get("/articles/:articleId", [articleController.getArticle]);

    /**
    * @openapi
    * '/articles':
    *  post:
    *     tags:
    *     - Article
    *     summary: Create Article
    *     security:
    *       - bearerAuth: []
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *               $ref: '#/components/schemas/CreateArticleInput'
    *     responses:
    *      200:
    *        description: Success
    *        content:
    *          application/json:
    *            schema:
    *              $ref: '#/components/schemas/GetAArticle'
    *      500:
    *        description: Internal server error
    */
    app.post("/articles", [ validJWT, articleController.createArticle]);

    /**
    * @openapi
    * '/articles/{articleId}':
    *  put:
    *     tags:
    *     - Article
    *     summary: Update an Article
    *     security:
    *       - bearerAuth: []
    *     parameters:
    *      - name: articleId
    *        in: path
    *        description: The id of the article
    *        required: true
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *               $ref: '#/components/schemas/CreateArticleInput'
    *     responses:
    *      200:
    *        description: Success
    *        content:
    *          application/json:
    *            schema:
    *              $ref: '#/components/schemas/GetAArticle'
    *      500:
    *        description: Internal server error
    */
    app.put("/articles/:articleId", [validJWT, articleController.updateArticle]);

    /**
    * @openapi
    * '/articles/{articleId}':
    *  delete:
    *     tags:
    *     - Article
    *     summary: Delete an Article
    *     security:
    *       - bearerAuth: []
    *     parameters:
    *      - name: articleId
    *        in: path
    *        description: The id of the article
    *        required: true
    *     responses:
    *      200:
    *        description: Success
    *        content:
    *          application/json:
    *            schema:
    *              $ref: '#/components/schemas/DeleteArticle'
    *      500:
    *        description: Internal server error
    */
    app.delete("/articles/:articleId", [validJWT, articleController.deleteArticle]);

}