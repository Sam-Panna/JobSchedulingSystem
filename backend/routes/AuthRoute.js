import express from "express"
import { addEmployee } from "../controller/auth.js"

const routes = express.Router();

routes.post("/addemployees", addEmployee);

export default routes;

