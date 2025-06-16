import express from "express"
import { addEmployee, login } from "../controller/auth.js"

const routes = express.Router();

routes.post("/addemployees", addEmployee);
routes.post("/login", login);

export default routes;

