from flask import Flask, request, jsonify
from task_assigner import get_best_employee

app = Flask(__name__)

@app.route('/assign-task', methods=['POST'])
def assign_task():
    task_data = request.json
    employee = get_best_employee(task_data)
    return jsonify({"assigned_to": employee})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
