import express from "express";
import db from './models';
import path from 'path'

import * as dotenv from "dotenv";

dotenv.config( { path: path.join( __dirname, '.env')  } );

const app = express();
const PORT = process.env.PORT || 4000;



app.use(express.json());
app.use(express.urlencoded({extended: true}));


import {userRoutes} from './routes/user.routes';
userRoutes(app);



db.sequelize.sync().then( ()=>{
    app.listen(PORT, ()=>{
        console.log("Server started at port", PORT);
    });
}).catch( (err : any)=>{
    console.log(err);
});

// app.get("/", (req, res)=>{
//     db.User.findAll({
//         include: {
//             model: db.Article
//         }
//     }).then((result: object)=>{
//         res.send(result)
//     }).catch( (err: object)=>{
//         res.send(err)
//     } )
// })