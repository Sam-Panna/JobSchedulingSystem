import db from "../db/db.js";
import axios from "axios";


const getAIData = async () => {
  const [employees] = await db.promise().query("SELECT id FROM employees");
  const result = [];

  for (const emp of employees) {
    const [skills] = await db.promise().query("SELECT skill_name FROM skills WHERE employee_id = ?", [emp.id]);
    const [taskCount] = await db.promise().query("SELECT COUNT(*) AS count FROM tasks WHERE assigned_to = ? AND status != 'Completed'", [emp.id]);

    result.push({
      id: emp.id,
      skills: skills.map(s => s.skill_name),
      workload: taskCount[0].count
    });
  }

  return result;
};



// Get employees list (id and full_name)
export const getEmployees = (req, res) => {
  const q = `
    SELECT e.id, e.full_name 
    FROM employees e
    JOIN users u ON e.user_id = u.id
  `;

  db.query(q, (err, data) => {
    if (err) return res.status(500).send({ message: "Error fetching employees", error: err });
    return res.status(200).send({ message: "Employees fetched successfully", data });
  });
};

// Add new task




export const addTask = async (req, res) => {
  try {
    console.log(req.body);
    
    const { title, description, priority, deadline, status} = req.body;

    if (!title || !description || !priority || !deadline || !status ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const aiData= {
      title: title,
      description : description,
      priority: priority
    }
    await axios.post("http://127.0.0.1:5001/assign-task",aiData).then((aires)=>{
      // console.log(aires);
       const q = "Insert Into tasks (title, description, priority, deadline, status, assigned_to) Values (?,?,?,?,?,?)"
   db.query(q,[title, description, priority, deadline, status, aires.data.assigned_to],(err, result)=>{
    if(err){
      return res.send(err);
    }
    const query= "Update employees set availability =? , current_workload = current_workload+1  Where id = ?"
    db.query(query,[0, aires.data.assigned_to],(err2, result2)=>{
      if(err2){
        return res.send(err2);
      }else{
        console.log({result2, message:`task assign to employee_id: ${aires.data.assigned_to}`,assign_id:aires.data.assigned_to});
        
        return res.send({result2, message:`task assign to employee_id: ${aires.data.assigned_to}`,assign_id:aires.data.assigned_to});
      }
    })

   });


    }).catch((err)=>{
      console.log(err);
      
    })
  
  } catch (error) {
    console.error("Error in addTask:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

// Get single task by id
export const getSingleTask = (req, res) => {
  const taskId = req.params.id;

  const q = `SELECT * FROM tasks WHERE id = ?`;

  db.query(q, [taskId], (err, result) => {
    if (err) return res.status(500).send({ message: "Error fetching task", error: err });
    if (result.length === 0) return res.status(404).send({ message: "Task not found" });
    return res.status(200).send({ message: "Task fetched", data: result[0] });
  });
};

// Get all tasks
// controller/tasks.js
export const getAllTasks = async (req, res) => {
  try {
    const [rows] = await db.promise().query(`
      SELECT 
        tasks.*, 
        employees.full_name AS employeeName
      FROM 
        tasks 
      LEFT JOIN 
        employees 
      ON 
        tasks.assigned_to = employees.id
    `);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};




// Delete task by id
export const deleteTask = (req, res) => {
  const taskId = req.params.id;

  const q = `DELETE FROM tasks WHERE id = ?`;

  db.query(q, [taskId], (err, result) => {
    if (err) return res.status(500).send({ message: "Error deleting task", error: err });
    return res.status(200).send({ message: "Task deleted successfully" });
  });
};
