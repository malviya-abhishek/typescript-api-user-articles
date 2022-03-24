'use strict';
import { Model } from 'sequelize';

interface ArticleAttributes{
  id: number;
  title: string;
  content: string;
  UserId: number
}

/**
 * @openapi
 * components:
 * 
 *  schemas:
 *    GetAllArticles:
 *      type: array
 *      items: 
 *        type: object
 *        properties:
 *          id: 
 *            type: string
 *          title:
 *            type: string
 *          content:
 *            type: string
 *          User:
 *            type: object
 *            properties:
 *              id: 
 *                type: string
 *              name:
 *                type: string
 *          createdAt:
 *            type: string
 *          updatedAt:
 *            type: string
 *    GetAArticle:
 *      type: object
 *      properties:
 *        id: 
 *          type: string
 *        title:
 *          type: string
 *        content:
 *          type: string
 *        User:
 *          type: object
 *          properties:
 *            id: 
 *              type: string
 *            name:
 *              type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string    
 *    CreateArticleInput:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        content:
 *          type: string
 *    DeleteArticle:
 *      type: object
 *      properties:
 *        msg:
 *          type: string 
 */

module.exports = (sequelize: any, DataTypes: any) => {
  class Article extends Model<ArticleAttributes> implements ArticleAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: number;
    title!: string;
    content!: string;
    UserId!: number;

    static associate(models: any) {
      Article.belongsTo(models.User, {onDelete: "cascade"});
    }

    validUser(userId: number) : boolean{
      return this.UserId === userId;
    }

  }
  Article.init({
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title:{
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'Users',
        key: 'id'
      },
      onDelete: "CASCADE"
    }

  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};