import express from "express"
import db from "./db/db.js";
import AuthRoute from "./routes/AuthRoute.js"
import EmployeeRoute from "./routes/EmployeeRoute.js"
import cors from "cors"

const app = express()
app.use(express.json());

app.use(cors());
app.use("/api", AuthRoute);
app.use("/api", EmployeeRoute);
app.listen(5000, ()=>{
    console.log("The server is starting");

})