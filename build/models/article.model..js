'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Article extends sequelize_1.Model {
        static associate(models) {
            Article.belongsTo(models.User, { onDelete: "cascade" });
        }
        validUser(userId) {
            return this.UserId === userId;
        }
    }
    Article.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
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
            references: {
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
