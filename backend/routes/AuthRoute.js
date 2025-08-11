import express from "express"
import { addEmployee, changePassword, login } from "../controller/auth.js"

const routes = express.Router();

routes.post("/addemployees", addEmployee);
routes.post("/login", login);
routes.post("/changePassword", changePassword);

export default routes;

