import pickle
import numpy as np
import mysql.connector
from utils import vectorize_task

# Load saved models and employee data
vectorizer = pickle.load(open('tfidf_vectorizer.pkl', 'rb'))
employee_data = pickle.load(open('employee_data.pkl', 'rb'))

# Connect to MySQL
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="12345",
    database="job_system"
)
cursor = db.cursor(dictionary=True)

def update_workload_in_db(employee_id):
    """
    Increments workload in MySQL employees table.
    """
    cursor.execute("""
        UPDATE employees
        SET current_workload = current_workload + 1
        WHERE id = %s
    """, (employee_id,))
    db.commit()

def update_workload_in_pkl(employee_id):
    """
    Increments workload in the employee_data.pkl file (AI memory).
    """
    employee_data[employee_id]["workload"] += 1
    pickle.dump(employee_data, open('employee_data.pkl', 'wb'))

def get_best_employee(task):
    task_vector = vectorize_task(task)
    similarities = {}

    # Step 1: Calculate similarity
    for emp_id, data in employee_data.items():
        emp_vec = data["vector"]
        similarity = np.dot(task_vector, emp_vec) / (
            np.linalg.norm(task_vector) * np.linalg.norm(emp_vec) + 1e-10
        )
        similarities[emp_id] = similarity

    # Step 2: Find max similarity
    max_similarity = max(similarities.values())
    top_employees = [emp_id for emp_id, score in similarities.items() if score == max_similarity]

    # Step 3: Tie-break by lowest workload
    if len(top_employees) > 1:
        best_employee = min(top_employees, key=lambda emp: employee_data[emp]["workload"])
    else:
        best_employee = top_employees[0]

    # Step 4: Update workload in both DB & .pkl
    update_workload_in_db(best_employee)
    update_workload_in_pkl(best_employee)

    return best_employee
