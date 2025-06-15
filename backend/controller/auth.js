import bcrypt from "bcryptjs"
import db from "../db/db.js"
export const addEmployee = (req, res)=>{
    const{username, password_hash, full_name} = req.body

    const salt = bcrypt.genSaltSync();
    const hashPassword = bcrypt.hashSync(password_hash, salt);
    console.log(hashPassword,":hashpassword");
    
    const q = "INSERT INTO users (username, password_hash, role) VALUES (? , ?, ?)"
    db.query(q, [username, hashPassword, "employee"], (err, result) =>{
        if(err){
            console.error(err);
        }else{
            const q2 = "INSERT INTO employees(user_id, full_name) VALUES (?, ?)"
            db.query(q2, [result.insertId, full_name], (err2, result2)=>{
                if(err){
                   return res.send("Error while sending employee data");
                }
                return res.send({message: "Employee created sucessfully"});
            })
        }
    })

}