import db from "../db/db.js";
import bcrypt, { hashSync } from "bcryptjs";

export const employeeData = (req, res) => {
    const q = "SELECT u.*,u.id as userId,e.*,s.* FROM users u JOIN employees e ON u.id = e.user_id JOIN skills s ON e.id = s.employee_id"
    db.query(q,(err, data) =>{

        if(err){
            return res.status(500).send(err);
    }
    return res.status(200).send({message: "data send sucessful", data});
    })
}

export const employeeEdit = (req, res) => {
    const {username, password_hash} = req.body;
    console.log(username);
    console.log(password_hash);
    
    
    const id = req.params.id;

    const salt = bcrypt.genSaltSync();
    const password_hash2 = bcrypt.hashSync(password_hash,salt);
    const q = "UPDATE users set username = ?, password_hash = ? WHERE id= ? "
    db.query(q, [username, password_hash2, id],(err, result)=>{
        if(err){
            return res.status(500).send(err);
        }
        return res.status(200).send({message:"successful"});
    })
}

export const employeeDelete = (req, res) =>{
    const id = req.params.id;
    console.log(id);
    

    const q = "DELETE FROM users WHERE id = ?"
    db.query(q,[id],(err, result)=>{
        if(err){
            return res.status(500).send(err);
        }
        return res.status(200).send({message:"delete successful"});
    })
}

export const singleEmployeeData = (req, res) =>{
    const id = req.params.id;
    console.log(id);
    

    const q = "SELECT u.*,e.*,s.* FROM users u JOIN employees e ON u.id = e.user_id JOIN skills s ON e.id = s.employee_id WHERE u.id = ?"
    db.query(q, [id], (err,result) =>{
        if(err){

            return res.status(500).send(err);
        }
        return res.status(200).send({message: "edit successful", result});

    })
}