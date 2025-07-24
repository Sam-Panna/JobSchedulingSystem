import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';

const ManageTask = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/tasks');
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="relative p-4 min-h-screen bg-gray-100">
      {/* Add Task Button */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded shadow"
          onClick={() => setShowForm(true)}
        >
          + Add Task
        </button>
      </div>

      {/* Tasks Display */}
      <div className="grid gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="text-gray-700">{task.description}</p>
            <div className="text-sm text-gray-500 mt-2">
              <p><strong>Priority:</strong> {task.priority}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <p><strong>Deadline:</strong> {task.deadline}</p>
              <p className="text-sm text-gray-600">
                Assigned to: <span className="font-medium">{task.employeeName || 'Unassigned'}</span>
              </p>

            </div>
          </div>
        ))}
      </div>

      {/* Overlay Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl relative">
            <TaskForm
              onTaskAdded={() => {
                fetchTasks();
                setShowForm(false);
              }}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTask;
