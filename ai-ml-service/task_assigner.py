import pickle
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from utils import vectorize_task

# Load the trained model and employee vectors
kmeans = pickle.load(open("cluster_model.pkl", "rb"))
employee_vectors = pickle.load(open("employee_vectors.pkl", "rb"))  # {emp_id: vector}

def get_best_employee(task):
    task_vector = vectorize_task(task)
    task_cluster = kmeans.predict([task_vector])[0]
    
    best_match = None
    best_similarity = -1
    
    for emp_id, emp_vector in employee_vectors.items():
        emp_cluster = kmeans.predict([emp_vector])[0]
        if emp_cluster == task_cluster:
            similarity = cosine_similarity([task_vector], [emp_vector])[0][0]
            if similarity > best_similarity:
                best_similarity = similarity
                best_match = emp_id
                
    return best_match
