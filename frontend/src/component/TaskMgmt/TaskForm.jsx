import React, { useState } from 'react';

const initialTasks = [
  {
    id: 1,
    title: 'Design Homepage',
    description: 'Create a responsive homepage layout.',
    status: 'In Progress',
    priority: 'High Priority',
    dueDate: '2025-03-18',
    done: 2,
    total: 5,
    assignedTo: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ],
  },
  {
    id: 2,
    title: 'Write Blog Post',
    description: 'Write a clean blog post about React performance optimization.',
    status: 'In Progress',
    priority: 'Medium Priority',
    dueDate: '2025-03-27',
    done: 3,
    total: 5,
    assignedTo: [
      { id: 3, name: 'Charlie' },
      { id: 4, name: 'David' },
    ],
  },
];

const statusColor = {
  'Pending': 'bg-purple-200 text-purple-800',
  'In Progress': 'bg-blue-200 text-blue-800',
  'Completed': 'bg-green-200 text-green-800',
};

const priorityColor = {
  'High Priority': 'bg-red-200 text-red-800',
  'Medium Priority': 'bg-yellow-200 text-yellow-800',
  'Low Priority': 'bg-green-200 text-green-800',
};

const TaskForm = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium Priority',
    dueDate: '',
    done: 0,
    total: 5,
    assignedTo: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateTask = (e) => {
    e.preventDefault();

    const newTask = {
      ...formData,
      id: Date.now(),
      assignedTo: [
        { id: Date.now(), name: 'Unassigned' } // Default dummy employee
      ],
    };

    setTasks([...tasks, newTask]);
    setFormData({
      title: '',
      description: '',
      status: 'Pending',
      priority: 'Medium Priority',
      dueDate: '',
      done: 0,
      total: 5,
      assignedTo: [],
    });
    setShowForm(false);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + Add Task
        </button>
      </div>

      {/* Task Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => {
  const progressPercent = (task.done / task.total) * 100;

  return (
    <div key={task.id} className="bg-white p-4 rounded-lg shadow-md">
      {/* Status & Priority Tags */}
      <div className="flex justify-between mb-2">
        <span className={`px-2 py-1 rounded text-sm font-medium ${statusColor[task.status]}`}>{task.status}</span>
        <span className={`px-2 py-1 rounded text-sm font-medium ${priorityColor[task.priority]}`}>{task.priority}</span>
      </div>

      {/* Title & Description */}
      <h2 className="text-lg font-bold mb-1">{task.title}</h2>
      <p className="text-sm text-gray-600 mb-2">{task.description}</p>

      {/* Progress Text */}
      <p className="text-sm text-blue-500 font-semibold mb-1">
        Task Done: {task.done} / {task.total}
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* Due Date */}
      <p className="text-sm text-gray-500 mb-2">Due Date: {task.dueDate}</p>

      {/* Assigned Members */}
      <div className="flex space-x-2">
        {task.assignedTo.map((person) => (
          <span
            key={person.id}
            className="text-sm bg-gray-100 px-2 py-1 rounded-full"
          >
            {person.name}
          </span>
        ))}
      </div>
    </div>
  );
})}

      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form onSubmit={handleCreateTask} className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create Task</h2>
            <input
              name="title"
              type="text"
              placeholder="Task Title"
              onChange={handleChange}
              value={formData.title}
              className="w-full border p-2 mb-2 rounded"
              required
            />
            <textarea
              name="description"
              placeholder="Task Description"
              onChange={handleChange}
              value={formData.description}
              className="w-full border p-2 mb-2 rounded"
              required
            />
            <select name="priority" onChange={handleChange} className="w-full border p-2 mb-2 rounded" value={formData.priority}>
              <option>High Priority</option>
              <option>Medium Priority</option>
              <option>Low Priority</option>
            </select>
            <select name="status" onChange={handleChange} className="w-full border p-2 mb-2 rounded" value={formData.status}>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <input
              name="dueDate"
              type="date"
              onChange={handleChange}
              value={formData.dueDate}
              className="w-full border p-2 mb-4 rounded"
              required
            />
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowForm(false)} className="text-gray-600">
                Cancel
              </button>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Save Task
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TaskForm;
