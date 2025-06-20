import express from "express"
import { employeeData, employeeEdit, employeeDelete } from "../controller/employee.js";

const routes = express.Router();
routes.get("/employee-data", employeeData);
routes.post("/edit-employee/:id",employeeEdit);
routes.post("/del-employee/:id", employeeDelete);

export default routes;