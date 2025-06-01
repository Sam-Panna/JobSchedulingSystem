import express from "express"
import db from "./db/db.js";
const app = express()
app.listen(5000, ()=>{
    console.log("The server is starting");

})