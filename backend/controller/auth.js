import bcrypt from "bcryptjs"
import db from "../db/db.js"
import jwt from "jsonwebtoken"
export const addEmployee = (req, res)=>{
    const{username, full_name, skills, designation, address} = req.body
    const password_hash = "12345678";

    const salt = bcrypt.genSaltSync();
    const hashPassword = bcrypt.hashSync(password_hash, salt);
    console.log(hashPassword,":hashpassword");


    
    const q = "INSERT INTO users (username, password_hash, role) VALUES (? , ?, ?)"
    db.query(q, [username, hashPassword,  "employee"], (err, result) =>{
        if(err){
            console.error(err);
        }else{
            const q2 = "INSERT INTO employees(user_id, full_name ,  designation, address) VALUES (?, ?, ?, ?)"
            db.query(q2, [result.insertId, full_name, designation, address], (err2, result2)=>{
                if(err2){
                   return console.log("Error while sending employee data", err2);
                }
               skills.map(item =>{
                const q3 = "INSERT INTO skills(employee_id, skill_name) VALUES(?,?)" 
               db.query(q3, [result2.insertId, item],(err3, result3)=>{
                if(err3){
                    return console.log("error while sending skills data", err3);
                    
                }
                 return res.send({message: "Employee created sucessfully"});
               })
               })
            })
        }
    })

   
    

}

export const login = (req, res) =>{
    const{username, password} = req.body
    console.log(username, password);
    

    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q,[username], (err, data) =>{
        if(err){
            return res.send({err, message: "Databse error"});
            
        }
        if(data.length === 0){
            return res.send({ message:"User not found"});
        }
        console.log(data);
        

        const CheckPassword = bcrypt.compareSync(password, data[0].password_hash);
        if(!CheckPassword){
            return res.send({message: "Password is incorrect"});
        }

        const token = jwt.sign({id: data[0].id , role: data[0].role},"secretkey");
        return res.cookie("accessToken",token,{
            httpOnly: false, 
            maxAge: 30*24*60*60*1000
        }).send({message : "Login successful", data, token});
        
    })

    
}