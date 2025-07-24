import db from "../db/db.js";
import { getBestEmployeeForTask } from "../services/aiTaskAssigner.js";


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
    const { title, description, priority, deadline, status, requiredSkill } = req.body;

    if (!title || !description || !priority || !deadline || !status || !requiredSkill) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const bestEmployee = await getBestEmployeeForTask(requiredSkill);

    if (!bestEmployee) {
      return res.status(400).json({ message: "No suitable employee found for assignment" });
    }

    const assigned_to = bestEmployee.id;

    const [result] = await db.promise().query(
      `INSERT INTO tasks 
       (title, description, priority, deadline, status, assigned_to) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, description, priority, deadline, status, assigned_to]
    );

    return res.status(201).json({
      message: "Task created successfully",
      task: {
        id: result.insertId,
        title,
        description,
        priority,
        deadline,
        status,
        assigned_to,
      }
    });

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
