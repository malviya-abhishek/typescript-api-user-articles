'use strict';
import { Model } from 'sequelize';
import crypto from 'crypto';
import * as jwt from 'jsonwebtoken'
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET as string;


interface UserAttributes{
  id: number;
  name: string;
  email: string;
  password: string;
}


module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    id!: number;
    name!: string;
    email!: string;
    password!: string; 

    static associate(models: any) {
      User.hasMany(models.Article, {
        onDelete: "cascade",
      })
    }

    validPassword(password : string) : boolean {
      const hashedPassword = crypto.pbkdf2Sync(password, "salt", 10000, 100, 'sha512').toString('hex');;
      return this.password === hashedPassword;
    }

    generateJWT(){
      const today = new Date();
      const exp = new Date(today);
      exp.setDate(today.getDate() + 60);
      return jwt.sign({
        id : this.id,
        email: this.email,
        exp: exp.getTime() / 1000,
      }, JWT_SECRET)
    }

  }
  User.init({
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique:  true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        }

  }, 
  {
    sequelize, 
    modelName: 'User',
    
  });
  return User;
};