import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskAdded, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    deadline: '',
    status: 'Pending',
   
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
     await axios.post("http://localhost:5000/api/add-tasks",formData).then(async(res)=>{
      console.log(res.data.assign_id);
      const empres= await axios.get(`http://localhost:5000/api/get-single-employee/${res.data.assign_id}`)
      console.log(empres);
      

      alert(`task assigned to ${empres.data[0].full_name}`)

     }
    ).catch((err)=>{
      console.log(err);
      
    })

     
      
   
  };

  return (
    <div className="flex items-center justify-center bg-[#2E2E2E] py-10">
      <form
        onSubmit={handleSubmit}
        className="rounded-lg shadow-xl p-8 w-full max-w-2xl relative border-2"
        style={{
          backgroundColor: '#F7E8D0',
          borderColor: '#8E3B46'
        }}
      >
        <h2 
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: '#2E2E2E' }}
        >
          Add New Task
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label 
              className="block text-sm font-semibold mb-2"
              style={{ color: '#2E2E2E' }}
            >
              📝 Task Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:scale-105"
              style={{
                borderColor: '#8E3B46',
                backgroundColor: '#ffffff',
                color: '#2E2E2E'
              }}
              placeholder="Enter task title"
            />
          </div>

          {/* Priority */}
          <div>
            <label 
              className="block text-sm font-semibold mb-2"
              style={{ color: '#2E2E2E' }}
            >
              🚨 Priority Level
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2"
              style={{
                borderColor: '#8E3B46',
                backgroundColor: '#ffffff',
                color: '#2E2E2E'
              }}
            >
              <option value="Low">🟢 Low Priority</option>
              <option value="Medium">🟡 Medium Priority</option>
              <option value="High">🔴 High Priority</option>
            </select>
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label 
              className="block text-sm font-semibold mb-2"
              style={{ color: '#2E2E2E' }}
            >
              📄 Task Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-3 rounded-lg border-2 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 resize-vertical"
              style={{
                borderColor: '#8E3B46',
                backgroundColor: '#ffffff',
                color: '#2E2E2E'
              }}
              placeholder="Describe the task in detail..."
            />
          </div>

          {/* Deadline */}
          <div>
            <label 
              className="block text-sm font-semibold mb-2"
              style={{ color: '#2E2E2E' }}
            >
              📅 Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2"
              style={{
                borderColor: '#8E3B46',
                backgroundColor: '#ffffff',
                color: '#2E2E2E'
              }}
            />
          </div>

          {/* Status */}
          <div>
            <label 
              className="block text-sm font-semibold mb-2"
              style={{ color: '#2E2E2E' }}
            >
              📊 Current Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2"
              style={{
                borderColor: '#8E3B46',
                backgroundColor: '#ffffff',
                color: '#2E2E2E'
              }}
            >
              <option value="Pending">⏳ Pending</option>
              <option value="Ongoing">🔄 Ongoing</option>
              <option value="Completed">✅ Completed</option>
            </select>
          </div>

        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:opacity-80 hover:scale-105 border-2"
            style={{
              backgroundColor: '#2E2E2E',
              color: '#F7E8D0',
              borderColor: '#2E2E2E'
            }}
          >
            ❌ Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:opacity-90 hover:scale-105 shadow-lg"
            style={{
              backgroundColor: '#8E3B46',
              color: '#F7E8D0'
            }}
          >
            ✅ Create Task
          </button>
        </div>

        {/* Info Box */}
        <div 
          className="mt-6 p-4 rounded-lg border-l-4"
          style={{
            backgroundColor: '#ffffff',
            borderLeftColor: '#F4A259',
            color: '#2E2E2E'
          }}
        >
          <p className="text-sm">
            <strong>💡 Smart Assignment:</strong> This task will be automatically assigned to the most suitable employee based on their skills and availability.
          </p>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;