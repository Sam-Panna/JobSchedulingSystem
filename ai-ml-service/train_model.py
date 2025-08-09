import pickle
import mysql.connector
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans

# Step 1: Connect to MySQL database
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="12345",
    database="job_system"
)

cursor = db.cursor(dictionary=True)

# Step 2: Fetch employee skills + workload
query = """
SELECT 
    e.id AS employee_id,
    e.current_workload AS workload,
    e.full_name,
    GROUP_CONCAT(DISTINCT s.skill_name ORDER BY s.skill_name ASC) AS skills
FROM employees e
JOIN users u ON e.user_id = u.id
LEFT JOIN skills s ON e.id = s.employee_id
GROUP BY e.id;
"""

cursor.execute(query)
rows = cursor.fetchall()

# Step 3: Prepare data for ML
employee_text_data = {}
workload_map = {}
for row in rows:
    skills_text = row["skills"].replace(",", " ") if row["skills"] else ""
    employee_text_data[row["employee_id"]] = skills_text
    workload_map[row["employee_id"]] = row["workload"] if row["workload"] is not None else 0

# Step 4: Vectorize skills
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(employee_text_data.values())

# Step 5: Cluster employees
kmeans = KMeans(n_clusters=2, random_state=42)
kmeans.fit(X)

# Step 6: Store both vectors and workloads together
employee_data = {}
for emp_id, vec in zip(employee_text_data.keys(), X.toarray()):
    employee_data[emp_id] = {
        "vector": vec,
        "workload": workload_map[emp_id]
    }

# Step 7: Save models and combined employee data
pickle.dump(vectorizer, open('tfidf_vectorizer.pkl', 'wb'))
pickle.dump(kmeans, open('cluster_model.pkl', 'wb'))
pickle.dump(employee_data, open('employee_data.pkl', 'wb'))

print("✅ Training complete. Models + workload saved.")
