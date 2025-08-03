import pickle
import mysql.connector
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans

# Step 1: Connect to MySQL database
db = mysql.connector.connect(
    host="localhost",         # replace with your DB host
    user="root",              # replace with your DB user
    password="12345", # replace with your DB password
    database="job_system"  # replace with your DB name
)

cursor = db.cursor(dictionary=True)

# Step 2: Fetch employee skills using JOIN
query = """
SELECT 
    e.id AS employee_id,
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
employee_data = {}
for row in rows:
    if row["skills"]:
        employee_data[row["employee_id"]] = row["skills"].replace(",", " ")
    else:
        employee_data[row["employee_id"]] = ""  # Handle employees with no skills

# Step 4: Vectorize skills
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(employee_data.values())

# Step 5: Cluster employees (can adjust n_clusters as needed)
kmeans = KMeans(n_clusters=2, random_state=42)
kmeans.fit(X)

# Step 6: Store employee vectors
employee_vectors = {
    emp_id: vec for emp_id, vec in zip(employee_data.keys(), X.toarray())
}

# Step 7: Save models and vectors
pickle.dump(vectorizer, open('tfidf_vectorizer.pkl', 'wb'))
pickle.dump(kmeans, open('cluster_model.pkl', 'wb'))
pickle.dump(employee_vectors, open('employee_vectors.pkl', 'wb'))

print("✅ Training complete. Models saved.")
