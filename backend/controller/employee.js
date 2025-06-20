import db from "../db/db.js";
import bcrypt, { hashSync } from "bcryptjs";

export const employeeData = (req, res) => {
    const q = "SELECT u.*,e.*,s.* FROM users u JOIN employees e ON u.id = e.user_id JOIN skills s ON e.id = s.employee_id"
    db.query(q,(err, data) =>{

        if(err){
            return res.status(500).send(err);
    }
    return res.status(200).send({message: "data send sucessful", data});
    })
}

export const employeeEdit = (req, res) => {
    const {username, password} = req.body;
    const id = req.params.id;

    const salt = bcrypt.genSaltSync();
    const password_hash = bcrypt.hashSync(password,salt);
    const q = "UPDATE users set username = ?, password_hash = ? WHERE id= ? "
    db.query(q, [username, password_hash, id],(err, result)=>{
        if(err){
            return res.status(500).send(err);
        }
        return res.status(200).send({message:"successful"});
    })
}

export const employeeDelete = (req, res) =>{
    const id = req.params.id;

    const q = "DELETE FROM users WHERE id = ?"
    db.query(q,[id],(err, result)=>{
        if(err){
            return res.status(500).send(err);
        }
        return res.status(200).send({message:"delete successful"});
    })
}