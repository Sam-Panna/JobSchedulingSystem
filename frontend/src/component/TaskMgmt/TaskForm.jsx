import React, { useState } from 'react';

const TaskForm = ({ onTaskAdded, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    deadline: '',
    status: 'Pending',
    requiredSkill: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/add-tasks", {
 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Task created & assigned to best employee");
        onTaskAdded && onTaskAdded();
        onCancel && onCancel(); // close the form
      } else {
        alert("❌ Error: " + data.message);
      }
    } catch (err) {
      alert("❌ Server Error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl relative"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">Add New Task</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Title */}
          <div>
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded shadow-sm focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="text-sm font-medium text-gray-700">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded shadow-sm"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded shadow-sm"
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="text-sm font-medium text-gray-700">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded shadow-sm"
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded shadow-sm"
            >
              <option value="Pending">Pending</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Required Skill */}
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-gray-700">Required Skill</label>
            <input
              name="requiredSkill"
              value={formData.requiredSkill}
              onChange={handleChange}
              placeholder="e.g., React, Python"
              required
              className="w-full mt-1 px-3 py-2 border rounded shadow-sm"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
