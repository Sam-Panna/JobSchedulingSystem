import db from "../db/db.js";

// Helper function to get best-matching employee
export const getBestEmployeeForTask = async (requiredSkill) => {
  try {
    const [rows] = await db.promise().query(
      `
      SELECT e.id, e.full_name, COUNT(t.id) AS task_count
      FROM employees e
      LEFT JOIN tasks t ON e.id = t.assigned_to
      JOIN skills s ON s.employee_id = e.id
      WHERE s.skill_name = ?
      GROUP BY e.id
      ORDER BY task_count ASC
      `,
      [requiredSkill]
    );

    if (rows.length === 0) return null;

    return rows[0]; // Least busy employee with required skill
  } catch (error) {
    console.error("Error in getBestEmployeeForTask:", error);
    throw error;
  }
};
