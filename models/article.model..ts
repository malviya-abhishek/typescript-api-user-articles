'use strict';
import { Model } from 'sequelize';

interface ArticleAttributes{
  id: number;
  title: string;
  content: string;
  UserId: number
}


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
      type: DataTypes.STRING,
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