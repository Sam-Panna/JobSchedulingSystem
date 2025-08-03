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

// export const employeeEdit = (req, res) => {
//     const {username, password_hash} = req.body;
//     console.log(username);
//     console.log(password_hash);
    
    
//     const id = req.params.id;

//     const salt = bcrypt.genSaltSync();
//     const password_hash2 = bcrypt.hashSync(password_hash,salt);
//     const q = "UPDATE users set username = ?, password_hash = ? WHERE id= ? "
//     db.query(q, [username, password_hash2, id],(err, result)=>{
//         if(err){
//             return res.status(500).send(err);
//         }
//         return res.status(200).send({message:"successful"});
//     })
// }




export const employeeEdit = async (req, res) => {
    const connection = await db.getConnection(); // Get a connection for transaction
    await connection.beginTransaction(); // Start transaction

    try {
        const { username, password_hash, full_name, availability, skills } = req.body;
        const userId = req.params.id;

        if (!username || !full_name || !Array.isArray(skills)) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // 1. Update users table (only if password is provided)
        if (password_hash) {
            const salt = bcrypt.genSaltSync();
            const hashedPassword = bcrypt.hashSync(password_hash, salt);
            await connection.query(
                "UPDATE users SET username = ?, password_hash = ? WHERE id = ?",
                [username, hashedPassword, userId]
            );
        } else {
            await connection.query(
                "UPDATE users SET username = ? WHERE id = ?",
                [username, userId]
            );
        }

        // 2. Update employees table
        const [employeeResult] = await connection.query(
            `UPDATE employees 
             SET full_name = ?, availability = ? 
             WHERE user_id = ?`,
            [full_name, availability, userId]
        );

        // 3. Handle skills update
        const [employeeRow] = await connection.query(
            "SELECT id FROM employees WHERE user_id = ?",
            [userId]
        );
        
        if (!employeeRow.length) {
            await connection.rollback();
            return res.status(404).json({ message: "Employee not found" });
        }

        const employeeId = employeeRow[0].id;

        // Delete old skills
        await connection.query(
            "DELETE FROM employee_skills WHERE employee_id = ?",
            [employeeId]
        );

        // Insert new skills
        for (const skill of skills) {
            await connection.query(
                `INSERT INTO employee_skills 
                 (employee_id, skill_id, proficiency_level) 
                 VALUES (?, ?, ?)`,
                [employeeId, skill.skill_id, skill.proficiency_level || "intermediate"]
            );
        }

        await connection.commit(); // Commit transaction
        return res.status(200).json({ message: "Employee updated successfully" });

    } catch (error) {
        await connection.rollback(); // Rollback on error
        console.error(error);
        return res.status(500).json({ message: "Server error", error });
    } finally {
        connection.release(); // Release connection
    }
};


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
    

    const q = "SELECT u.*,e.*,e.id as emp_id,s.* FROM users u JOIN employees e ON u.id = e.user_id JOIN skills s ON e.id = s.employee_id WHERE u.id = ?"
    db.query(q, [parseInt(id)], (err,result) =>{
        if(err){

            return res.status(500).send(err);
        }
        return res.status(200).send({message: "edit successful", result});

    })
}

export const getSingleEmployee = (req, res) =>{
    const id = req.params.id;
    console.log(id);

    const q = "Select * From employees Where id = ?"
    db.query(q, [id],(err,result)=>{
        if(err) return res.status(500).send(err);
        return res.status(200).send(result);
    })
}