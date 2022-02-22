import path from 'path'
import * as dotenv from "dotenv";
dotenv.config( { path: path.join( __dirname, '.env')  } );

import express from "express";
import db from './models';
import cors from 'cors'


const PORT = process.env.PORT || 4000;


const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));


import {userRoutes} from './routes/user.routes';
userRoutes(app);

import {articleRoutes} from './routes/article.routes';
articleRoutes(app)


db.sequelize.sync().then( ()=>{
    app.listen(PORT, ()=>{
        console.log("Server started at port", PORT);
    });
}).catch( (err : any)=>{
    console.log(err);
});
