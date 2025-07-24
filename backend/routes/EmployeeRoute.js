import express from "express"
import { employeeData, employeeEdit, employeeDelete, singleEmployeeData } from "../controller/employee.js";

const routes = express.Router();
routes.get("/employee-data", employeeData);
routes.post("/edit-employee/:id",employeeEdit);
routes.post("/del-employee/:id", employeeDelete);
routes.get("/single-employee/:id", singleEmployeeData);



export default routes;